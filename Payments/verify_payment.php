<?php
require_once "config.php";

header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['razorpay_order_id']) || !isset($data['razorpay_payment_id'])) {
    echo json_encode(["status" => "error", "message" => "Missing IDs"]);
    exit;
}

$order_id = $data['razorpay_order_id'];
$payment_id = $data['razorpay_payment_id'];
$signature = $data['razorpay_signature'] ?? '';

// Verify signature
if ($keySecret && $keySecret !== "XXXXXXXXXXXXXXXXXXXXXXXX") {
    $generated_signature = hash_hmac('sha256', $order_id . '|' . $payment_id, $keySecret);
    if (!hash_equals($generated_signature, $signature)) {
        echo json_encode(["status" => "error", "message" => "Invalid signature verification"]);
        exit;
    }
}

$stmt = $conn->prepare("UPDATE course_payments SET status='paid', razorpay_payment_id=? WHERE razorpay_order_id=?");
$stmt->bind_param("ss", $payment_id, $order_id);

if ($stmt->execute()) {
    // Enroll user in the course & record payment in payments table
    $res = $conn->query("SELECT user_id, course_id, amount FROM course_payments WHERE razorpay_order_id='$order_id'");
    if ($res && $res->num_rows > 0) {
        $row = $res->fetch_assoc();
        $uid = (int)$row['user_id'];
        $cid = (int)$row['course_id'];
        $amount = (float)$row['amount'];
        
        // Enroll user in the course
        $enroll_stmt = $conn->prepare("INSERT IGNORE INTO course_enrollments (user_id, course_id) VALUES (?, ?)");
        $enroll_stmt->bind_param("ii", $uid, $cid);
        $enroll_stmt->execute();
        
        // Insert into payments table for admin records
        $pay_stmt = $conn->prepare("INSERT INTO payments (user_id, course_id, amount, status, payment_date) VALUES (?, ?, ?, 'success', NOW())");
        $pay_stmt->bind_param("iid", $uid, $cid, $amount);
        $pay_stmt->execute();
    }
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $conn->error]);
}
?>
