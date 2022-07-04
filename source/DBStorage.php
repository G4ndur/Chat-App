<?php
declare(strict_types=1);

class DBStorage
{

    /** @var PDO */
    private $connection;

    /**
     * @param PDO $connection
     */
    public function __construct(PDO $connection)
    {
        $this->connection = $connection;
    }

    /**
     * @param string $key
     * @param string $payload
     * @return void
     */
    public function save(string $key, string $payload): void
    {
        $statement = $this->connection->prepare(
            "INSERT INTO notices(`key`, payload, created_at)
                    VALUES (:key, :payload, NOW())
                    ON DUPLICATE KEY UPDATE
                        payload = VALUES(payload),
                        updated_at = NOW()");

        $success = $statement->execute(['key' => strtolower($key), 'payload' => $payload]);

        if (!$success) {
            throw new RuntimeException('payload could not be saved');
        }
    }

    /**
     * @param string $key
     * @return string
     */
    public function fetch(string $key): string
    {
        $statement = $this->connection->prepare(
            "SELECT payload
                    FROM notices
                    WHERE `key` = :key
                    LIMIT 1");

        $statement->execute(['key' => strtolower($key)]);

        $payload = $statement->fetchColumn();
        if ($payload === false) {
            return '';
        }

        return (string)$payload;
    }
}