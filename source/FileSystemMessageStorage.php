<?php

declare(strict_types=1);
require_once __DIR__ . '/../source/FileSystemStorage.php';
require_once __DIR__ . '/../source/StoresMessages.php';


final class FileSystemMessageStorage implements StoresMessages
{
    private $filesystemStorage;

    /**
     * @param string $path
     */
    public function __construct(string $path)
    {
        $this->filesystemStorage = new FileSystemStorage($path);
    }

    /**
     * @inheritDoc
     */
    public function save(string $payload): void
    {
        $this->filesystemStorage->save('messages', $payload);
    }

    /**
     * @inheritDoc
     */
    public function fetch(): string
    {
        return $this->filesystemStorage->fetch('messages');
    }
}