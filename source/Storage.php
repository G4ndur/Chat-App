<?php


declare(strict_types=1);

final class Storage
{
    /** @var string */
    private $storagePath;
    /**
     * @param string $storagePath
     */
    public function __construct(string $storagePath)
    {
        if (!is_dir($storagePath) || !is_writable($storagePath)) {
            throw new InvalidArgumentException('storage path must be a directory and writeable');
        }

        $this->storagePath = $storagePath;
    }

    /**
     * @param string $key
     * @param string $payload
     * @return void
     */
    public function save(string $key, string $payload): void
    {
        $filename = $this->storagePath . strtolower($key) . '.res';

        file_put_contents($filename, $payload);
    }

    /**
     * @param string $key
     * @return string
     */
    public function fetch(string $key): string
    {

        $filename = $this->storagePath . strtolower($key) . '.res';
        return file_get_contents($filename);
    }
}