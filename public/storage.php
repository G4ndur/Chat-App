<?php

declare(strict_types=1);

if (!isset($_GET['key'])) {
    throw new RuntimeException('key musst be specified');
}

if ($_GET['key'] === '') {
    throw new RuntimeException('key could not be empty');
}

$filename = __DIR__ . '/../storage/' . strtolower($_GET['key']) . '.res';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $body = (string)file_get_contents('php://input');

    if ($body === '') {
        throw new RuntimeException('body could not be empty');
    }

    file_put_contents($filename, $body);

    exit(0);
}

header('Content-Type: application/json');
echo file_get_contents($filename);