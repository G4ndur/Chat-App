<?php

declare(strict_types=1);

final class Request
{
    public const METHOD_POST = 'POST';

    /**
     * @return string|null
     */
    public function getMethod(): ?string
    {
        return $_SERVER['REQUEST_METHOD'] ?? null;
    }

    /**
     * @param string $key
     * @param string|null $default
     * @return string|null
     */
    public function getQueryParameter(string $key, ?string $default = null): ?string
    {
        return $_GET[$key] ?? $default;
    }

    /**
     * @return string
     */
    public function getBody(): string
    {
        return (string)file_get_contents('php://input');
    }
}