<?php

declare(strict_types=1);
require_once __DIR__ . '/../source/Request.php';
require_once __DIR__ . '/../source/Response.php';
require_once __DIR__ . '/../source/Responder.php';
require_once __DIR__ . '/../source/RegisterRequestHandler.php';
require_once __DIR__ . '/../source/UserRepository.php';
require_once __DIR__ . '/../source/User.php';
$connection = new PDO('mysql:dbname=chat-app;host=localhost;port=3306', 'root', 'root');
$requestHandler = new RegisterRequestHandler(
    new UserRepository($connection)

);

Responder::respond($requestHandler->handle(new Request()));