<?php
session_start();
include 'connectToDB.php';

$arr = array();

if (!empty($_POST['loginUsername']) && !empty($_POST['loginPassword'])) {
    $username = $_POST['loginUsername'];
    $hashedPassword = hash("sha512", $_POST['loginPassword']);
    $checkCombination = "SELECT p.id_person FROM person p join account_password a on p.fk_account_password = a.id_account_password where p.username = '$username' AND a.account_password = '$hashedPassword'";
    if ($selectUserID = mysqli_query($mysqli, $checkCombination)) {
        $checkCombinationNum = mysqli_num_rows($selectUserID);
        if ($checkCombinationNum == 0) {
            $arr = array(
                    "error" => 1,
                    "message" => "Invalid username/password combination. Please try again."
            );
        } else if ($checkCombinationNum == 1) {
            $_SESSION['userID'] = mysqli_fetch_assoc($selectUserID);
            $arr =array("error" => 0,
                "message" => "",
                "page" => '<h1 class="title">Ich bin en Titel</h1><p>Lorem Ipsum Dolor</p>');
        } else {
            $arr =array("error" => 1,
                "message" => "An unknown error occurred. Please try again later."
            );
        }
    }
} else {
    $arr = array(
        "error" => 1,
        "message" => "You must supply a username and a password."
    );
}

echo json_encode($arr);
