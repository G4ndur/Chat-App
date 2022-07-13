<?php

declare(strict_types=1);

require_once __DIR__ . '/../source/FileSystemStorage.php';
require_once __DIR__ . '/../source/Request.php';
require_once __DIR__ . '/../source/Response.php';
require_once __DIR__ . '/../source/Responder.php';
require_once __DIR__ . '/../source/StorageRequestHandler.php';
require_once __DIR__ . '/../source/FileSystemContactStorage.php';
require_once __DIR__ . '/../source/FileSystemMessageStorage.php';



$path = __DIR__.'/../storage';

$requestHandler = new StorageRequestHandler(
  new FileSystemContactStorage($path),
  new FileSystemMessageStorage($path)
);

Responder::respond($requestHandler->handle(new Request()));