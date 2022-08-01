<?php
require_once __DIR__ . '/../source/ProvidesUsers.php';


class UserRepository implements ProvidesUsers
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

    public function findOne(int $id): ?User
    {
        return null;
    }

    public function findOneByMail(string $email): ?User
    {
        $user = new User();

        $statement = $this->connection->prepare('SELECT * FROM contacts WHERE
                           email = :email');
        $statement->execute([
            'email' => $email
        ]);
        $statement->setFetchMode(PDO::FETCH_ASSOC);
        $result = $statement->fetchAll();
        foreach ($result as $record) {
            $user->setEmail($record['email']);
            $user->setId($record['id']);
            $user->setName($record['name']);
            $user->setPassword($record['password']);
        }
        return $user;
    }

    public function persist(User $user): void
    {
        $statement = $this->connection->prepare('INSERT IGNORE INTO contacts( name, email, password) 
            VALUES ( :name, :email, :password)');

        $statement->execute([
            'name' => $user->getName(),
            'email' => $user->getEmail(),
            'password' => $user->getPassword()

        ]);
    }
//    /**
//     * @param string $email
//     * @return void
//     */
//        public function fetch(string $email){
//            $statement = $this->connection->prepare(
//                "SELECT * FROM contacts WHERE email IS $email");
//           return $statement->fetch();
//        }
}
