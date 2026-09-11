<?php
$user_id = 1;
$course_id = 1;
?>

<!DOCTYPE html>
<html>
<head>
<title>Course</title>
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
</head>

<body>

<h2>Course Progress</h2>

<div style="width:100%; background:#ddd;">
  <div id="progressBar" style="width:0%; background:green; color:white;">
    0%
  </div>
</div>

<br>

<button onclick="pay('1')">Pay Installment 1</button>
<button onclick="pay('2')">Pay Installment 2</button>
<button onclick="pay('3')">Pay Installment 3</button>
<button onclick="pay('4')">Pay Installment 4</button>
<button onclick="pay('full')">Pay Full</button>

<h3>Videos</h3>
<div id="videos"></div>

<script>
let user_id = <?= $user_id ?>;
let course_id = <?= $course_id ?>;

function loadProgress() {
    fetch(`/helping_3rd_years-main/get_progress.php?user_id=${user_id}&course_id=${course_id}`)
    .then(res => res.json())
    .then(data => {

        document.getElementById("progressBar").style.width = data.percentage + "%";
        document.getElementById("progressBar").innerText = data.percentage + "%";

        let html = "";

        for (let i = 0; i < 10; i++) {
            if (i < data.videosAllowed) {
                html += `<p>🎥 Video ${i+1} (Unlocked)</p>`;
            } else {
                html += `<p>🔒 Video ${i+1} (Locked)</p>`;
            }
        }

        document.getElementById("videos").innerHTML = html;
    });
}

function pay(installment) {
    fetch(`/helping_3rd_years-main/create_order.php?user_id=${user_id}&course_id=${course_id}&installment=${installment}`)
    .then(res => res.json())
    .then(order => {

        var options = {
            "key": order.key,
            "amount": order.amount,
            "currency": "INR",
            "order_id": order.order_id,

            "handler": function (response) {

                fetch("/helping_3rd_years-main/verify_payment.php", {
                    method: "POST",
                    body: JSON.stringify(response)
                }).then(() => {
                    alert("Payment Success");
                    loadProgress();
                });
            }
        };

        var rzp = new Razorpay(options);
        rzp.open();
    });
}

loadProgress();
</script>

</body>
</html>