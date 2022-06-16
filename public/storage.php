<?php

declare(strict_types=1);

require_once __DIR__ . '/../source/Storage.php';
require_once __DIR__ . '/../source/Request.php';


$request = new Request();
$serverStorage = new Storage(__DIR__ . '/../storage/');
$key = $request->getQueryParameter('key');

if ($key === null) {
    throw new RuntimeException('key musst be specified');
}

if ($key === '') {
    throw new RuntimeException('key could not be empty');
}

if ($request->getMethod() === Request::METHOD_POST) {
    $payload = (string)file_get_contents('php://input');

    if ($payload === '') {
        throw new RuntimeException('body could not be empty');
    }

    $serverStorage->save($_GET['key'], $payload);

    exit(0);
}

header('Content-Type: application/json');
echo $serverStorage->fetch($_GET['key']);