<?php
require('config.php');

$data       = json_decode(file_get_contents("php://input"), true);
$order_id   = $data['razorpay_order_id']  ?? '';
$payment_id = $data['razorpay_payment_id'] ?? '';

if (!$order_id || !$payment_id) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Missing payment data"]);
    exit;
}

// Use a transaction so enrollment + payment update are atomic
$conn->begin_transaction();

try {
    // 1. Mark order as paid (prepared statement — no SQL injection)
    $stmt = $conn->prepare("
        UPDATE course_payments 
        SET status = 'paid', razorpay_payment_id = ?
        WHERE razorpay_order_id = ? AND status = 'pending'
    ");
    $stmt->bind_param("ss", $payment_id, $order_id);
    $stmt->execute();

    if ($stmt->affected_rows === 0) {
        // Either already processed or order not found — safe to return success
        $conn->commit();
        echo json_encode(["status" => "success", "note" => "already_processed"]);
        exit;
    }

    // 2. Fetch user + course from the order
    $stmt2 = $conn->prepare("
        SELECT user_id, course_id, amount 
        FROM course_payments 
        WHERE razorpay_order_id = ?
        LIMIT 1
    ");
    $stmt2->bind_param("s", $order_id);
    $stmt2->execute();
    $row = $stmt2->get_result()->fetch_assoc();

    if (!$row) {
        throw new Exception("Order not found after update");
    }

    $uid    = (int)$row['user_id'];
    $cid    = (int)$row['course_id'];
    $amount = (float)$row['amount'];

    // 3. Enroll user in the course (INSERT IGNORE respects UNIQUE KEY)
    $enroll = $conn->prepare("
        INSERT IGNORE INTO course_enrollments (user_id, course_id) 
        VALUES (?, ?)
    ");
    $enroll->bind_param("ii", $uid, $cid);
    $enroll->execute();

    // 4. Archive payment success record (for admin Reports)
    $arch = $conn->prepare("
        INSERT INTO payments (user_id, course_id, amount, status) 
        VALUES (?, ?, ?, 'success')
    ");
    $arch->bind_param("iid", $uid, $cid, $amount);
    $arch->execute();

    $conn->commit();
    echo json_encode(["status" => "success"]);

} catch (Exception $e) {
    $conn->rollback();
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}