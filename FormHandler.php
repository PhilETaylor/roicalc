<?php
/**
 * FormHandler Class
 *
 * This class handles form operations including CSRF token generation and form submission processing.
 */
class FormHandler {
    /**
     * Start a session if one doesn't exist
     */
    private function startSession() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
    }

    /**
     * Generate a secure CSRF token if one doesn't exist
     *
     * @return string The CSRF token
     */
    private function generateToken() {
        $this->startSession();

        if (!isset($_SESSION['csrf_token'])) {
            // Generate a random token using a more compatible method
            $token = md5(uniqid(mt_rand(), true));

            // Store it in the session
            $_SESSION['csrf_token'] = $token;
        }

        return $_SESSION['csrf_token'];
    }

    /**
     * Get the CSRF token
     *
     * @return void Outputs JSON with the CSRF token
     */
    public function getToken() {
        $token = $this->generateToken();

        // Return the token as JSON
        header('Content-Type: application/json');
        echo json_encode(['csrf_token' => $token]);
    }

    /**
     * Process form submission
     *
     * @return void Outputs JSON with the status of the form submission
     */
    public function processForm() {
        $this->startSession();

        // Check if the CSRF token is present and valid
        if (isset($_POST['csrfToken']) && isset($_SESSION['csrf_token'])) {
            // Validate the CSRF token against the stored value
            if ($_POST['csrfToken'] === $_SESSION['csrf_token']) {
                // Token is valid, process the form data
                $data = $_POST;

                // Log the data
                error_log('Form data received: ' . print_r($data, true));

                // For debugging purposes, dump the POST data
                // Comment this out in production
                error_log('POST data: ' . print_r($_POST, true));

                // Uncomment for debugging, but comment out in production
                // as it will break the JSON response
                // var_dump($_POST);

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
    }
}

// Handle the request based on the action parameter
$formHandler = new FormHandler();

// Determine which method to call based on the request
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // GET request - return a CSRF token
    $formHandler->getToken();
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // POST request - process the form submission
    $formHandler->processForm();
} else {
    // Unsupported method
    header('HTTP/1.1 405 Method Not Allowed');
    header('Content-Type: application/json');
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
}
