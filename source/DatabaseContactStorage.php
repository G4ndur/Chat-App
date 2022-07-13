<?php

declare(strict_types=1);
require_once __DIR__ . '/../source/StoresContacts.php';
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
 public function save(string $payload): void
 {
     $statement = $this->connection->prepare(
         "INSERT INTO contacts(name)
                    VALUES (:name)");

     $success = $statement->execute(['name' => $payload]);

     if (!$success) {
         throw new RuntimeException('payload could not be saved');
     }
 }

 public function fetch(): string
 {
//     $statement = $this->connection->prepare(
//         "SELECT name
//                    FROM contacts
//                    LIMIT 1");
//
//     $statement->execute();
//
//     $payload = $statement->fetchColumn();
//     if ($payload === false) {
//         return '';
//     }

     return'{}';
 }
}