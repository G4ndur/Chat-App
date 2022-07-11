<?php

declare(strict_types=1);

class DatabaseStorage
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
     * @param string $name
     * @param int $ID
     * @return void
     */
    public function saveContacts(string $key, string $name, int $ID): void
    {
        $statement = $this->connection->prepare(
            "INSERT INTO contacts(name, id, 'key')
                    VALUES (:name, :ID, :key)
                    ON DUPLICATE KEY UPDATE
                        name = VALUES(name),
                        id = VALUES(id)");

        $success = $statement->execute(['key' => strtolower($key), 'name' => $name, 'ID' => $ID]);

        if (!$success) {
            throw new RuntimeException('payload could not be saved');
        }
    }

    /**
     * @param string $key
     * @param string $payload
     * @param string $timestamp
     * @return void
     */
    public function saveMessages(string $key, string $payload, string $timestamp): void
    {
        $statement = $this->connection->prepare(
            "INSERT INTO messages(payload, sentat, id)
                    VALUES (:payload, :timestamp, :key)
                    ON DUPLICATE KEY UPDATE
                        payload = VALUES(payload),
                        sentat = VALUES(sentat)");

        $success = $statement->execute(['key' => strtolower($key), 'payload' => $payload, 'timestamp' => $timestamp]);

        if (!$success) {
            throw new RuntimeException('payload could not be saved');
        }

    }

    /**
     * @param string $key
     * @param int $sequence
     * @return void
     */
    public function saveSequence(string $key, int $sequence): void
    {
        $statement = $this->connection->prepare(
            "INSERT INTO sequence(sequence, 'key')
                    VALUES (:sequence, :key)
                    ON DUPLICATE KEY UPDATE
                        sequence = VALUES(sequence)");

        $success = $statement->execute(['key' => strtolower($key), 'sequence' => $sequence]);

        if (!$success) {
            throw new RuntimeException('payload could not be saved');
        }
    }
}