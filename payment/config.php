<?php
require('vendor/autoload.php');

use Razorpay\Api\Api;

// Razorpay Test Keys
$keyId = getenv('RAZORPAY_KEY_ID') ?: "your_razorpay_key_id";
$keySecret = getenv('RAZORPAY_KEY_SECRET') ?: "your_razorpay_key_secret";

// DB Connection
$conn = new mysqli("localhost", "root", "", "login-system ");

if ($conn->connect_error) {
    die("DB Connection Failed: " . $conn->connect_error);
}

$api = new Api($keyId, $keySecret);
?>