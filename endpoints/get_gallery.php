<?php
include_once 'dbconfig.php';

$progress = null;

if (isset($_GET['post_parent'])) {
    $sql = "
    SELECT wp_posts.post_title, wp_posts.post_content
    FROM wp_posts  
    WHERE post_parent = '" . $_GET['post_parent'] . "' AND post_content != '' ORDER BY wp_posts.ID DESC LIMIT 1; 
    ";
    $query = mysqli_query($conn, $sql);
    $number_rows = mysqli_num_rows($query);
    if ($number_rows > 0) {
        $row = mysqli_fetch_row($query);
        $progress = [
            "title" => utf8_encode($row[0]),
            "content" => $row[1]
        ];
    }
}

echo json_encode([
    "progress" => $progress,
], JSON_UNESCAPED_UNICODE);
