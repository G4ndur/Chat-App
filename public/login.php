<?php

declare(strict_types=1);

require_once __DIR__ . '/../source/Session.php';
require_once __DIR__ . '/../source/Request.php';
require_once __DIR__ . '/../source/Response.php';
require_once __DIR__ . '/../source/Responder.php';
require_once __DIR__ . '/../source/LoginRequestHandler.php';
require_once __DIR__ . '/../source/UserRepository.php';
require_once __DIR__ . '/../source/User.php';
$connection = new PDO('mysql:dbname=chat-app;host=localhost;port=3306', 'root', 'root');


$session = new Session();
$session->start();

$requestHandler = new LoginRequestHandler(
    $session,
    new UserRepository($connection)
);

Responder::respond($requestHandler->handle(new Request()));