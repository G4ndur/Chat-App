<?php

declare(strict_types=1);

class DatabaseContactStorage implements StoresContacts
{
    /**
     * @var PDO
     */
    private $connection;

    /**
     * @param PDO $connection
     */
    public function __construct(PDO $connection)
    {
        $this->connection = $connection;
    }

    /**
     * @param string $name
     * @return void
     */
 public function save(string $name): void
 {
     $statement = $this->connection->prepare(
         "INSERT INTO contacts(name)
                    VALUES (:name)
                    ON DUPLICATE KEY UPDATE
                        name = VALUES(name)");

     $success = $statement->execute(['name' => $name]);

     if (!$success) {
         throw new RuntimeException('payload could not be saved');
     }
 }

 public function fetch(): string
 {

 }
}