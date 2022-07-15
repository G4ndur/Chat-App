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
     * @param string $payload
     * @return void
     */
    public function save(string $payload): void
    {
        $contacts = json_decode($payload, true);
        $users = $contacts['users'] ?? [];
        foreach ($users as $contact) {
            $statement = $this->connection->prepare('INSERT IGNORE INTO contacts(id, name) VALUES (:id, :name)');
            $statement->execute([
                'id' => $contact['id'],
                'name' => $contact['name']
            ]);
        }
//     if (!$success) {
//         throw new RuntimeException('payload could not be saved');
//     }
    }

    /**
     * @return string
     * @throws JsonException
     */
    public function fetch(): string
    {
        $payload = [
            'sequence' => 0,
            'users' => [],
        ];


        $statement = $this->connection->prepare(
            "SELECT id, name, MAX(id) AS sequence
                    FROM contacts
                    GROUP BY id, name");

        $statement->execute();
        $statement->setFetchMode(PDO::FETCH_ASSOC);
        foreach ($statement as $record) {
            $payload['users'][] = [
                'id' => (int)$record['id'],
                'name' => $record['name'],
            ];
            $payload['sequence'] = (int)$record['sequence'];
        }


        return (string)json_encode($payload, JSON_THROW_ON_ERROR);
    }
}