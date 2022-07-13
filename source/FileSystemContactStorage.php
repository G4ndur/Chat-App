<?php

declare(strict_types=1);
require_once __DIR__ . '/../source/FileSystemStorage.php';
require_once __DIR__ . '/../source/StoresContacts.php';

final class FileSystemContactStorage implements StoresContacts
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
        $this->filesystemStorage->save('contacts', $payload);
    }

    /**
     * @inheritDoc
     */
    public function fetch(): string
    {
        return $this->filesystemStorage->fetch('contacts');
    }
}