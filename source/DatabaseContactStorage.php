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
     $contacts = json_decode($payload,true);
    $users = $contacts['users']?? [];
     foreach ($users as $contact)
     {
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
     */
 public function fetch(): string
 {
     $emparray = array();
     $sequence = 0;
     $record = array();
  $statement = $this->connection->prepare(
         "SELECT *
                    FROM contacts");

     $statement->execute();

     while ($res = $statement->fetch(PDO::FETCH_ASSOC)){
         $sequence = $sequence + 1;
         $record['sequence'] = $sequence;
         $emparray[] = $res;

     }
     $record['users'] = $emparray;
$users = (json_encode($record));

     if ($users === false) {
         return '';
     }

     return $users;
 }
}