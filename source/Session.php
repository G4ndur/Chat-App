<?php

class Session
{
    /**
     * @return void
     */
    public function start(): void
    {
        session_start();
    }

    /**
     * @return void
     */
    public function close(): void
    {
        session_destroy();
    }

    /**
     * @param string $key
     * @param mixed $value
     * @return void
     */
    public function set(string $key, $value): void
    {
        $_SESSION[$key] = $value;
    }

    /**
     * @param string $key
     * @return mixed
     */
    public function get(string $key)
    {
        return $_SESSION[$key];
    }
}