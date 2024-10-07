<?php
$servername = "localhost"; // Change as necessary
$username = "root"; // Change as necessary
$password = ""; // Change as necessary
$dbname = "family_feud"; // Change as necessary

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Capture player names and score
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $playerAName = mysqli_real_escape_string($conn, $_POST['player_a_name']);
    $playerBName = mysqli_real_escape_string($conn, $_POST['player_b_name']);
    $score = (int)$_POST['score']; // Assuming score comes from JavaScript

    // Insert into database
    $sql = "INSERT INTO scores (player_name, score, game_date) VALUES ('$playerAName', '$score', NOW())";
    if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
}

// Fetch scores for leaderboard
$sql = "SELECT * FROM scores ORDER BY score DESC";
$result = mysqli_query($conn, $sql);
$scores = [];

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $scores[] = $row;
    }
}

mysqli_close($conn);
?>
