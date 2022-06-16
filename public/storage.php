<?php

declare(strict_types=1);

require_once __DIR__ . '/../source/Storage.php';
$serverStorage = new Storage(__DIR__ . '/../storage/');

if (!isset($_GET['key'])) {
    throw new RuntimeException('key musst be specified');
}

if ($_GET['key'] === '') {
    throw new RuntimeException('key could not be empty');
}

//$filename = __DIR__ . '/../storage/' . strtolower($_GET['key']) . '.res';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $payload = (string)file_get_contents('php://input');

    if ($payload === '') {
        throw new RuntimeException('body could not be empty');
    }

    //file_put_contents($filename, $body);


    $serverStorage->save($_GET['key'],$payload);

    exit(0);
}
header('Content-Type: application/json');
echo $serverStorage->fetch($_GET['key']);