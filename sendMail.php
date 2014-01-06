<?php

$name = "Name: " . $_POST["name"] . "\n";
$mail = "Mail Address: " . $_POST["mail"] . "\n";
$message = "Message: " . $_POST["message"] . "\n";

$emailBody = $name . $mail . $message;

$to = "mail@habitats.no";
$subject = "test";
$headers = 'From: mail@habitats.no' . "\r\n" .
		'Reply-To: mail@habitats.com' . "\r\n" .
		'X-Mailer: PHP/' . phpversion();

mail($to, $subject, $emailBody, $headers);

?>