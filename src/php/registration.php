<?php
session_start();
include 'connectToDB.php';

$arr = array();

if (!empty($_POST['username']) && !empty($_POST['first_name']) && !empty($_POST['last_name']) && !empty($_POST['email']) && !empty($_POST['password']) && !empty($_POST['repeatPassword'])) {
    $username = $_POST['username'];
    $firstName = $_POST['first_name'];
    $lastName = $_POST['last_name'];
    $email = $_POST['email'];
    $hashedPassword = hash("sha512", $_POST['password']);
    $hashedRepeatedPassword = hash("sha512", $_POST['repeatPassword']);

    if ($hashedPassword == $hashedRepeatedPassword) {
        $uid = uniqid(rand(0, 9), true);
        $savePW = "insert into account_password(id_account_password, account_password) Values ('$uid','$hashedPassword')";
        $saveUser = " insert into person(username, email, first_name, last_name, enabled, is_admin, fk_account_password) Values ('$username', '$email', '$firstName', '$lastName', true, true, '$uid')";
        if (mysqli_query($mysqli, $savePW) && mysqli_query($mysqli, $saveUser)) {
            $arr =array(
                "message" => "Account successfully created."
            );
            $userIDQuery = "SELECT id_person FROM person where username = '$username'";
            $selectUserID = mysqli_query($mysqli, $userIDQuery);
            $_SESSION['userID'] = mysqli_fetch_assoc($selectUserID);
        } else {

            $checkEmailUsername = "SELECT username, email FROM person where username = '$username' or email = '$email'";
            $selectEmailUsername = mysqli_query($mysqli, $checkEmailUsername);
            $results = mysqli_fetch_assoc($selectEmailUsername);
            if ($results["username"] == $username) {
                $arr = array(
                    "message" => "This username is already in use. Please enter a different one."
                );
            } elseif ($results["email"] == $email) {
                $arr = array(
                    "message" => "This email is already in use. Please enter a different one, log in or reset login credentials for this account."
                );
            } else {
            $arr = array(
                "message" => "An unknown error occurred. Please try again later."
            );
        }
        }
    } else {
        $arr = array(
            "message" => "The passwords don't match."
        );
    }
} else {
    $arr = array(
        "message" => "You must supply the entire required information."
    );
}

echo json_encode($arr);

?>
