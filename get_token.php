<?php
// Start a session to store the CSRF token
session_start();

// Generate a secure CSRF token if one doesn't exist
if (!isset($_SESSION['csrf_token'])) {
    // Generate a random token using a more compatible method
    $token = md5(uniqid(mt_rand(), true));

    // Store it in the session
    $_SESSION['csrf_token'] = $token;
}

// Return the token as JSON
header('Content-Type: application/json');
echo json_encode(['csrf_token' => $_SESSION['csrf_token']]);
