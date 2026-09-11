<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
if (file_exists(__DIR__ . "/../db/config.php")) {
    require_once __DIR__ . "/../db/config.php";
}

// Razorpay Test Keys (read from environment or default fallback)
$keyId = getenv('RAZORPAY_KEY_ID') ?: "rzp_test_placeholder_key";
$keySecret = getenv('RAZORPAY_KEY_SECRET') ?: "rzp_test_placeholder_secret";

// Note: We are using cURL instead of the SDK to avoid dependency issues for now.
?>

