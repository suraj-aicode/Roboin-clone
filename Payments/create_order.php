<?php
require_once "config.php";

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["error" => "Unauthorized"]);
    exit;
}

$userId = $_SESSION['user_id'];
$courseId = $_POST['course_id'] ?? 0;
$installment = $_POST['installment'] ?? 'full';

// Fetch course price from database
$stmt = $conn->prepare("SELECT price FROM courses WHERE id = ?");
$stmt->bind_param("i", $courseId);
$stmt->execute();
$res = $stmt->get_result();
if ($res->num_rows === 0) {
    echo json_encode(["error" => "Course not found"]);
    exit;
}
$courseRow = $res->fetch_assoc();
$totalPrice = (float)$courseRow['price'];

// Calculate amount based on installment
if ($installment === "full") {
    $amount = $totalPrice;
    $installmentNumber = 0;
} else {
    $amount = $totalPrice * 0.25;
    $installmentNumber = (int)$installment;
}

if ($courseId == 0 || $amount <= 0) {
    echo json_encode(["error" => "Invalid course or amount"]);
    exit;
}

$amountPaise = round($amount * 100);

// Razorpay Order Create via cURL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://api.razorpay.com/v1/orders");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_USERPWD, $keyId . ":" . $keySecret);

$data = [
    "amount" => $amountPaise,
    "currency" => "INR",
    "receipt" => "course_" . $courseId . "_" . time()
];

curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

$response = curl_exec($ch);
$result = json_decode($response, true);

if (isset($result['id'])) {
    $order_id = $result['id'];

    // Save in DB
    $stmt = $conn->prepare("
        INSERT INTO course_payments 
        (user_id, course_id, razorpay_order_id, amount, installment_number, status)
        VALUES (?, ?, ?, ?, ?, 'pending')
    ");
    $stmt->bind_param("iisdi", $userId, $courseId, $order_id, $amount, $installmentNumber);
    $stmt->execute();

    echo json_encode([
        "order_id" => $order_id,
        "amount" => $amountPaise,
        "key" => $keyId,
        "course_title" => $_POST['course_title'] ?? "Course Subscription"
    ]);
} else {
    echo json_encode([
        "error" => "Razorpay order failed",
        "details" => $result
    ]);
}
?>
