<?php

$recepient = "michael.voloshyn@gmail.com";
$sitename = "http://bmwi8.esy.es/";

$name = trim($_POST["name"]);
$email = trim($_POST["email"]);
$message = "Имя: $name \nE-mail: $email";

$pagetitle = "Новая заявка на подписку новостей с сайта \"$sitename\"";

mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");

$file = "clientbase.txt";
$string = $pagetitle.$message."\r\n";
$Saved_File = fopen($file, 'a+');
fwrite($Saved_File, $string);
fclose($Saved_File);

?>
