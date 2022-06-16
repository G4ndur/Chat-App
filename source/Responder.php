<?php

final class Responder
{
    /**
     * @param Response $response
     * @return void
     */
    public static function respond(Response $response):void
    {
        $response->flush();

        echo $response->getBody();
        exit(0);
    }
}