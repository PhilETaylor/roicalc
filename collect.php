<?php
// Start a session to store the CSRF token
session_start();

// Check if the CSRF token is present and valid
if (isset($_POST['csrfToken']) && isset($_SESSION['csrf_token'])) {
    // Validate the CSRF token against the stored value
    if ($_POST['csrfToken'] === $_SESSION['csrf_token']) {
        // Token is valid, process the form data
        $data = $_POST;

        // Log the data
        error_log('Form data received: ' . print_r($data, true));

        // Return a success response
        header('Content-Type: application/json');
        echo json_encode(['status' => 'success', 'message' => 'Data received successfully']);
    } else {
        // Token is invalid
        error_log('Invalid CSRF Token received: ' . $_POST['csrfToken'] . ' Expected: ' . $_SESSION['csrf_token']);
        header('HTTP/1.1 403 Forbidden');
        header('Content-Type: application/json');
        echo json_encode(['status' => 'error', 'message' => 'Invalid CSRF token']);
    }
} else {
    // Return an error response if the CSRF token is missing
    header('HTTP/1.1 400 Bad Request');
    header('Content-Type: application/json');
    echo json_encode(['status' => 'error', 'message' => 'CSRF token missing']);
}

// For debugging purposes, dump the POST data
var_dump($_POST);
