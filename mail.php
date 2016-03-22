<?php

$recepient = "mihavol@mail.ru";
$sitename = "http://bmwi8.esy.es/";

$name = trim($_POST["name"]);
$email = trim($_POST["email"]);
$phone = trim($_POST["phone"]);
$color = trim($_POST["color"]);
$sale = trim($_POST["sale"]);

if ( !empty($phone)) {
	$message = "Имя: $name \nТелефон: $phone \nE-mail: $email \nЦвет: $color \nСкидка: $sale";
	$pagetitle = "Новая заявка на покупку авто с сайта \"$sitename\"";
}
else {
	$message = "Имя: $name \nE-mail: $email";
	$pagetitle = "Новая заявка на тест-драйв с сайта \"$sitename\"";
}

mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");

$file = "clientbase.txt";
$string = $pagetitle.$message."\r\n";
$Saved_File = fopen($file, 'a+');
fwrite($Saved_File, $string);
fclose($Saved_File);

?>