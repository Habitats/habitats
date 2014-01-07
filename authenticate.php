<?php
$username = $_POST["username"];
$password = $_POST["password"];

echo "Username: " . $username . "\n" . "Password: " . $password;
if($username == "habitats" && $password == "derp"){
	header("Location: content/about.php?loggedIn");

}
?>