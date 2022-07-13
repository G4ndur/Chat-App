<?php

interface StoresMessages
{
    /**
     * @param string $payload
     * @return void
     */
    public function save(string $payload): void;

    /**
     * @return string
     */
    public function fetch(): string;
}