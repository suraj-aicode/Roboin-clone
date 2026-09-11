<?php
require('config.php');

$user_id = $_GET['user_id'];
$course_id = $_GET['course_id'];

$totalPrice = 10;
$totalVideos = 10;

// total paid
$result = $conn->query("
SELECT SUM(amount) as total_paid 
FROM course_payments 
WHERE user_id='$user_id' 
AND course_id='$course_id' 
AND status='paid'
");

$row = $result->fetch_assoc();
$total_paid = $row['total_paid'] ?? 0;

// percentage
$percentage = ($total_paid / $totalPrice) * 100;

// videos allowed
$videosAllowed = floor(($percentage / 100) * $totalVideos);

echo json_encode([
    "percentage" => $percentage,
    "videosAllowed" => $videosAllowed
]);