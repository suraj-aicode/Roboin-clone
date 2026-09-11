<?php
require('config.php');

$user_id = $_GET['user_id'];
$course_id = $_GET['course_id'];

$result = $conn->query("
SELECT * FROM course_payments 
WHERE user_id='$user_id' AND course_id='$course_id'
ORDER BY installment_number ASC
");

$payments = [];

while ($row = $result->fetch_assoc()) {
    $payments[] = $row;
}

echo json_encode($payments);