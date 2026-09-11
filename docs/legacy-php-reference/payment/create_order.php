<?php
require("config.php");

error_reporting(E_ALL);
ini_set('display_errors', 1);

// GET params
$userId = $_GET['user_id'] ?? 1;
$courseId = $_GET['course_id'] ?? 1;
$installment = $_GET['installment'] ?? 'full';

$totalPrice = 10;

// Calculate amount
if ($installment == "full") {
    $amount = $totalPrice;
    $installmentNumber = 0;
} else {
    $amount = $totalPrice * 0.25;
    $installmentNumber = (int)$installment;
}

$amountPaise = $amount * 100;

// Razorpay Order Create
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://api.razorpay.com/v1/orders");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_USERPWD, $keyId . ":" . $keySecret);

$data = [
    "amount" => $amountPaise,
    "currency" => "INR",
    "receipt" => "course_" . time()
];

curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

$response = curl_exec($ch);

if (!$response) {
    echo json_encode(["error" => "Curl error: " . curl_error($ch)]);
    exit;
}

$result = json_decode($response, true);

// 🔥 Check if Razorpay returned error
if (!isset($result['id'])) {
    echo json_encode([
        "error" => "Razorpay order failed",
        "response" => $result
    ]);
    exit;
}

$order_id = $result['id'];

// Save in DB
$stmt = $conn->prepare("
    INSERT INTO course_payments 
    (user_id, course_id, razorpay_order_id, amount, installment_number, status)
    VALUES (?, ?, ?, ?, ?, 'pending')
");

$stmt->bind_param("iisdi",
    $userId,
    $courseId,
    $order_id,
    $amount,
    $installmentNumber
);

$stmt->execute();

// Return JSON
echo json_encode([
    "order_id" => $order_id,
    "amount" => $amountPaise,
    "key" => $keyId
]);
exit;