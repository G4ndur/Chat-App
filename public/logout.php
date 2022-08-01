<?php


declare(strict_types=1);

require_once __DIR__ . '/../source/Session.php';
require_once __DIR__ . '/../source/Request.php';
require_once __DIR__ . '/../source/Response.php';
require_once __DIR__ . '/../source/Responder.php';
require_once __DIR__ . '/../source/LogoutRequestHandler.php';
$session = new Session();
$session->start();
$requestHandler = new LogoutRequestHandler($session);

Responder::respond($requestHandler->handle(new Request()));
