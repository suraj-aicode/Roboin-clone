<?php
require("config.php");

$webhookSecret = "omkar_super_secret_123";

$inputJSON = file_get_contents("php://input");
$signature = $_SERVER['HTTP_X_RAZORPAY_SIGNATURE'] ?? '';

if (empty($signature)) {
    http_response_code(400);
    exit("No signature found");
}

try {

    // Verify Razorpay signature
    $api->utility->verifyWebhookSignature(
        $inputJSON,
        $signature,
        $webhookSecret
    );

    $data = json_decode($inputJSON, true);

    $paymentId = $data['payload']['payment']['entity']['id'] ?? null;
    $orderId   = $data['payload']['payment']['entity']['order_id'] ?? null;
    $status    = $data['payload']['payment']['entity']['status'] ?? null;

    // 🔥 Map Razorpay status to your ENUM
    if ($status === "captured") {
        $dbStatus = "paid";
    } elseif ($status === "failed") {
        $dbStatus = "failed";
    } else {
        $dbStatus = "pending";
    }

    // Update payment record
    $stmt = $conn->prepare("
        UPDATE course_payments
        SET razorpay_payment_id = ?, 
            status = ?
        WHERE razorpay_order_id = ?
    ");

    $stmt->bind_param("sss",
        $paymentId,
        $dbStatus,
        $orderId
    );

    $stmt->execute();

    http_response_code(200);

} catch (Exception $e) {
    http_response_code(400);
    echo "Error: " . $e->getMessage();
}