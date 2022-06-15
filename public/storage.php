<?php

declare(strict_types=1);

$body = (array)json_decode((string)file_get_contents('php://input'));
if (!count($body)) {
    throw new RuntimeException('body could not empty');
}

if (!isset($body['key'], $body['payload'])) {
    throw new RuntimeException('key and payload musst be specified');
}

if ($body['key'] === '' || $body['payload'] === '') {
    throw new RuntimeException('key and payload could not be empty');
}

$filename = __DIR__ . '/../storage/' . strtolower($body['key']) . '.res';

file_put_contents($filename, $body['payload']);