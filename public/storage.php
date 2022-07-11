<?php

declare(strict_types=1);

require_once __DIR__ . '/../source/FileSystemStorage.php';
require_once __DIR__ . '/../source/Request.php';
require_once __DIR__ . '/../source/Response.php';
require_once __DIR__ . '/../source/Responder.php';

$request = new Request();
$response = new Response();

$key = $request->getQueryParameter('key');
$serverStorage = new FileSystemStorage(__DIR__ . '/../storage/');

if ($key === null) {
    throw new RuntimeException('key musst be specified');
}

if ($key === '') {
    throw new RuntimeException('key could not be empty');
}

if ($request->getMethod() === Request::METHOD_POST) {

    $body = $request->getBody();
    if ($body === '') {
        throw new RuntimeException('body could not be empty');
    }
    $serverStorage->save($key, $body);

    Responder::respond($response);
}

$response->withHeader('Content-Type', 'application/json');
$response->withBody($serverStorage->fetch($key));
Responder::respond($response);