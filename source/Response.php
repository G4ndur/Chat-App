<?php

class Response
{
    public function withHeader(string $name, string $value): Response
    {
        // array

        return $this;
    }

    public function flush(): void
    {
        // for oder foreach
        // header
    }
}