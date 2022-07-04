<?php

require_once __DIR__ . '/../source/DBStorage.php';

$dbConnection = new PDO('mysql:dbname=notice-app;host=localhost;port=3306', 'root', 'root');
var_dump($dbConnection);

$dbStorage = new DBStorage($dbConnection);

$dbStorage->save('notices', json_encode([
    [
        'title' => 'test'
    ],
    [
        'title' => 'test 2'
    ]
]));

print_r($dbStorage->fetch('notices'));