<?php

declare(strict_types=1);

/*
  1. getMethod():string
  2. getQuery():array
 */


class Request


{
    function getMethod(): string
    {
        return $_SERVER['REQUEST_METHOD'];
    }

    function getQuery(): array
    {
        return $_GET['key'];
    }
}