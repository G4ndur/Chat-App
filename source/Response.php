<?php

class Response
{
    /** @var array */
    private $headers = [];

    /** @var string */
    private $body = '';

    /**
     * @param string $name
     * @param string $value
     * @return Response
     */
    public function withHeader(string $name, string $value): Response
    {
        $this->headers[] = ['name' => $name, 'value' => $value];

        return $this;
    }

    /**
     * @return $this
     */
    public function withBody(string $body): Response
    {
        $this->body = $body;

        return $this;
    }

    /**
     * @return string
     */
    public function getBody(): string
    {
        return $this->body;
    }
    
    /**
     * @return void
     */
    public function flush(): void
    {
        foreach ($this->headers as $header) {
            header($header['name'] . ': ' . $header['value']);
        }
    }
}