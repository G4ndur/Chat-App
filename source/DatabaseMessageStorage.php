<?php
declare(strict_types=1);
require_once __DIR__ . '/../source/StoresMessages.php';

class DatabaseMessageStorage implements StoresMessages
{
    /**
     * @var PDO
     */
    private $connection;
    /**
     * @var Session
     */
    private $session;

    /**
     * @param PDO $connection
     * @param Session $session
     */
    public function __construct(PDO $connection, Session  $session)
    {
        $this->session = $session;
        $this->connection = $connection;
    }

    /**
     * @param string $payload
     * @return void
     */
    public function save(string $payload): void
    {
        $record = json_decode($payload, true);
        $messages = $record['messages'] ?? [];
        foreach ($messages as $message) {
            $statement = $this->connection->prepare('INSERT IGNORE INTO messages(
                            content,
                            sent_at,
                            sender_id,
                            receiver_id) 
    VALUES (:content, :sent_at, :sender_id, :receiver_id)');
            $statement->execute([
                'content' => $message['content'],
                'sent_at' => $message['sentAt'],
                'sender_id' => $message['senderId'],
                'receiver_id' => $message['receiverId']
            ]);
        }
    }

    /**
     * @return string
     * @throws JsonException
     */
    public function fetch(): string
    {
        $payload = ['messages' => []];

        $statement = $this->connection->prepare(
            "SELECT content, sent_at, sender_id, receiver_id FROM messages WHERE receiver_id = :active_user 
AND sender_id = :current_user");
        $statement->execute([
            'active_user' => $this->session->get('activeUser'),
            'current_user' => $this->session->get('currentUser')
        ]);
        $statement->setFetchMode(PDO::FETCH_ASSOC);

        foreach ($statement as $record) {
            $payload['messages'][] = [
                'content' => $record['content'],
                'sentAt' => $record['sent_at'],
                'senderId' => (int)$record['sender_id'],
                'receiverId' => (int)$record['receiver_id']
            ];
        }
        return (string)json_encode($payload, JSON_THROW_ON_ERROR);
    }


}