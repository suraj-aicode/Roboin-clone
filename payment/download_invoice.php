<?php
// payment/download_invoice.php
session_start();
require_once __DIR__ . "/../db/config.php";

// 1. Auth Guard (Allows student or admin)
$user_id = isset($_SESSION['user_id']) ? (int)$_SESSION['user_id'] : 0;
$admin_id = isset($_SESSION['admin_user_id']) ? (int)$_SESSION['admin_user_id'] : 0;

if (!$user_id && !$admin_id) {
    die("Error: Unauthorized access. Please log in.");
}

$order_id = trim($_GET['order_id'] ?? '');

if (empty($order_id)) {
    die("Error: Missing Order ID.");
}

// 2. Fetch Payment & User & Course Details
$stmt = $conn->prepare("
    SELECT cp.*, u.email, u.full_name, u.mobile, c.title AS course_title
    FROM course_payments cp
    JOIN users u ON cp.user_id = u.id
    JOIN courses c ON cp.course_id = c.id
    WHERE cp.razorpay_order_id = ?
    LIMIT 1
");
$stmt->bind_param("s", $order_id);
$stmt->execute();
$payment = $stmt->get_result()->fetch_assoc();

if (!$payment) {
    die("Error: Transaction record not found.");
}

// 3. Authorization Check
if (!$admin_id && (int)$payment['user_id'] !== $user_id) {
    die("Error: Access denied. You cannot view invoices for other users.");
}

// 4. Calculations (Inclusive of 18% GST)
$total_amount = (float)$payment['amount'];
$taxable_value = $total_amount / 1.18;
$gst_amount = $total_amount - $taxable_value;
$cgst = $gst_amount / 2;
$sgst = $cgst;

$payment_status = strtoupper($payment['status']);
$issue_date = date('d-M-Y', strtotime($payment['created_at']));
$payment_id = !empty($payment['razorpay_payment_id']) ? $payment['razorpay_payment_id'] : 'N/A';

// 5. Generate FPDF Invoice (Portrait A4)
require_once __DIR__ . "/../admin/Reports/fpdf/fpdf.php";

class GSTInvoicePDF extends FPDF {
    function Header() {
        // Gold line decoration at the very top
        $this->SetDrawColor(222, 190, 8);
        $this->SetLineWidth(1.5);
        $this->Line(10, 10, 200, 10);
        $this->Ln(5);
    }
    
    function Footer() {
        $this->SetY(-20);
        $this->SetFont('Arial', 'I', 8);
        $this->SetTextColor(120, 130, 140);
        $this->Cell(0, 5, 'Thank you for choosing Market Monarch for your financial education.', 0, 1, 'C');
        $this->Cell(0, 5, 'Page ' . $this->PageNo() . ' of {nb}', 0, 0, 'C');
    }
}

$pdf = new GSTInvoicePDF('P', 'mm', 'A4');
$pdf->AliasNbPages();
$pdf->AddPage();

// Company Name & Header
$pdf->SetFont('Arial', 'B', 18);
$pdf->SetTextColor(13, 110, 253); // Blue #0d6efd
$pdf->Cell(110, 10, 'MARKET MONARCH', 0, 0);

$pdf->SetFont('Arial', 'B', 14);
$pdf->SetTextColor(80, 90, 100);
$pdf->Cell(80, 10, 'TAX INVOICE', 0, 1, 'R');

$pdf->SetFont('Arial', '', 9);
$pdf->SetTextColor(100, 110, 120);
$pdf->Cell(110, 5, 'Financial Market Training & Development', 0, 0);
$pdf->Cell(80, 5, 'Invoice No: MM-INV-' . $payment['id'], 0, 1, 'R');

$pdf->Cell(110, 5, 'Office: 12 Wall Street, Financial District, NY', 0, 0);
$pdf->Cell(80, 5, 'Date: ' . $issue_date, 0, 1, 'R');

$pdf->Cell(110, 5, 'GSTIN: 07AAHCM1010C1Z0', 0, 0);
$pdf->Cell(80, 5, 'Status: ' . $payment_status, 0, 1, 'R');

$pdf->Cell(110, 5, 'Email: billing@marketmonarch.com', 0, 0);
$pdf->Cell(80, 5, 'Ref Order ID: ' . $payment['razorpay_order_id'], 0, 1, 'R');

$pdf->Cell(110, 5, 'Support: +91 12345 67890', 0, 0);
$pdf->Cell(80, 5, 'Payment ID: ' . $payment_id, 0, 1, 'R');

$pdf->Ln(12);

// Double rule line
$pdf->SetDrawColor(180, 190, 200);
$pdf->SetLineWidth(0.4);
$pdf->Line(10, $pdf->GetY(), 200, $pdf->GetY());
$pdf->Ln(6);

// Bill To Block
$pdf->SetFont('Arial', 'B', 10);
$pdf->SetTextColor(20, 30, 40);
$pdf->Cell(0, 6, 'BILL TO:', 0, 1);

$pdf->SetFont('Arial', '', 9.5);
$pdf->SetTextColor(80, 90, 100);
$pdf->Cell(30, 5, 'Name:', 0, 0);
$pdf->Cell(0, 5, !empty($payment['full_name']) ? htmlspecialchars($payment['full_name']) : 'Student Account', 0, 1);

$pdf->Cell(30, 5, 'Email:', 0, 0);
$pdf->Cell(0, 5, htmlspecialchars($payment['email']), 0, 1);

if (!empty($payment['mobile'])) {
    $pdf->Cell(30, 5, 'Mobile:', 0, 0);
    $pdf->Cell(0, 5, htmlspecialchars($payment['mobile']), 0, 1);
}

$pdf->Ln(10);

// Items Table Header
$pdf->SetDrawColor(222, 190, 8);
$pdf->SetLineWidth(0.5);
$pdf->SetFillColor(13, 110, 253);
$pdf->SetTextColor(255, 255, 255);
$pdf->SetFont('Arial', 'B', 9);

$pdf->Cell(10, 8, 'S.No', 1, 0, 'C', true);
$pdf->Cell(80, 8, 'Course Description / Services', 1, 0, 'L', true);
$pdf->Cell(20, 8, 'SAC Code', 1, 0, 'C', true);
$pdf->Cell(25, 8, 'Taxable Val (Rs)', 1, 0, 'R', true);
$pdf->Cell(15, 8, 'CGST', 1, 0, 'R', true);
$pdf->Cell(15, 8, 'SGST', 1, 0, 'R', true);
$pdf->Cell(25, 8, 'Total (Rs)', 1, 1, 'R', true);

// Items Table Row
$pdf->SetTextColor(20, 30, 40);
$pdf->SetFont('Arial', '', 8.5);
$pdf->SetFillColor(255, 255, 255);

$pdf->Cell(10, 10, '1', 1, 0, 'C');
$pdf->Cell(80, 10, htmlspecialchars($payment['course_title']), 1, 0, 'L');
$pdf->Cell(20, 10, '999249', 1, 0, 'C');
$pdf->Cell(25, 10, number_format($taxable_value, 2), 1, 0, 'R');
$pdf->Cell(15, 10, '9% / ' . number_format($cgst, 2), 1, 0, 'R');
$pdf->Cell(15, 10, '9% / ' . number_format($sgst, 2), 1, 0, 'R');
$pdf->Cell(25, 10, number_format($total_amount, 2), 1, 1, 'R');

$pdf->Ln(5);

// Totals Summary Block
$pdf->SetX(110);
$pdf->SetFont('Arial', '', 9);
$pdf->Cell(50, 6, 'Total Taxable Value:', 0, 0, 'R');
$pdf->Cell(30, 6, 'Rs ' . number_format($taxable_value, 2), 0, 1, 'R');

$pdf->SetX(110);
$pdf->Cell(50, 6, 'Total CGST (9%):', 0, 0, 'R');
$pdf->Cell(30, 6, 'Rs ' . number_format($cgst, 2), 0, 1, 'R');

$pdf->SetX(110);
$pdf->Cell(50, 6, 'Total SGST (9%):', 0, 0, 'R');
$pdf->Cell(30, 6, 'Rs ' . number_format($sgst, 2), 0, 1, 'R');

$pdf->SetX(110);
$pdf->SetDrawColor(13, 110, 253);
$pdf->SetLineWidth(0.4);
$pdf->Line(110, $pdf->GetY() + 1, 190, $pdf->GetY() + 1);
$pdf->Ln(2);

$pdf->SetX(110);
$pdf->SetFont('Arial', 'B', 10);
$pdf->SetTextColor(13, 110, 253);
$pdf->Cell(50, 8, 'Grand Total (Inclusive of Tax):', 0, 0, 'R');
$pdf->Cell(30, 8, 'Rs ' . number_format($total_amount, 2), 0, 1, 'R');

// Payment Badge / Seal
$pdf->SetY(175);
if ($payment_status === 'PAID') {
    $pdf->SetDrawColor(22, 163, 74); // Green
    $pdf->SetTextColor(22, 163, 74);
    $pdf->SetFont('Arial', 'B', 14);
    $pdf->SetLineWidth(0.6);
    $pdf->Rect(20, 172, 45, 12);
    $pdf->SetY(174);
    $pdf->SetX(20);
    $pdf->Cell(45, 8, 'PAYMENT SUCCESS', 0, 1, 'C');
} else {
    $pdf->SetDrawColor(220, 120, 8); // Orange/Red
    $pdf->SetTextColor(220, 120, 8);
    $pdf->SetFont('Arial', 'B', 14);
    $pdf->SetLineWidth(0.6);
    $pdf->Rect(20, 172, 45, 12);
    $pdf->SetY(174);
    $pdf->SetX(20);
    $pdf->Cell(45, 8, $payment_status, 0, 1, 'C');
}

$pdf->Output("D", "Invoice_" . $payment['razorpay_order_id'] . ".pdf");
exit;
?>
