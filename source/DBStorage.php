<?php
declare(strict_types = 1);
class DBStorage
{

    /** @var string */
    private $DB;

    /**
     * @param string $DB
     */
    public function __construct(string $DB)
    {
        $this->DB = $DB;
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