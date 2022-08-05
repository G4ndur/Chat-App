<?php

declare(strict_types=1);

require_once __DIR__ . '/../source/FileSystemStorage.php';
require_once __DIR__ . '/../source/Request.php';
require_once __DIR__ . '/../source/Response.php';
require_once __DIR__ . '/../source/Responder.php';
require_once __DIR__ . '/../source/StorageRequestHandler.php';
require_once __DIR__ . '/../source/FileSystemContactStorage.php';
require_once __DIR__ . '/../source/FileSystemMessageStorage.php';
require_once __DIR__ . '/../source/DatabaseContactStorage.php';
require_once __DIR__ . '/../source/DatabaseMessageStorage.php';
require_once __DIR__ . '/../source/Session.php';

$path = __DIR__.'/../storage';
$connection = new PDO('mysql:dbname=chat-app;host=localhost;port=3306', 'root', 'root');
$session = new Session();
$session->start();

$requestHandler = new StorageRequestHandler(
  new DatabaseContactStorage($connection),
  new DatabaseMessageStorage($connection,$session),
  $session
);

Responder::respond($requestHandler->handle(new Request()));