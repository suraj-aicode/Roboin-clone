<!DOCTYPE html>
<html>
<head>
    <title>Razorpay Test</title>
    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
</head>
<body>

<h2>Pay ₹1</h2>
<button id="pay-btn">Pay Now</button>

<script>
document.getElementById('pay-btn').onclick = function () {

    fetch('create_order.php')
    .then(res => res.json())
    .then(data => {

        var options = {
            key: data.key,
            amount: data.amount,
            currency: "INR",
            order_id: data.order_id,

            handler: function (response) {

                // Send to backend for verification
                fetch('verify_payment.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(response)
                })
                .then(res => res.json())
                .then(result => {

                    if (result.status === "success") {

                        // 🔥 SHOW DATA IN CONSOLE
                        console.log("🔥 Payment Stored Data:", result.data);
                        console.table(result.data);

                        alert("Payment Successful 🎉");

                        document.body.innerHTML += `
                            <h3 style='color:green;'>Payment Successful!</h3>
                            <pre>${JSON.stringify(result.data, null, 2)}</pre>
                        `;

                    } else {
                        console.error("❌ Error:", result.error);
                        alert("Payment Verification Failed ❌");
                    }
                });
            }
        };

        var rzp = new Razorpay(options);
        rzp.open();
    });
};
</script>

</body>
</html>