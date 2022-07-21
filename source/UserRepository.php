<?php
require_once __DIR__ . '/../source/ProvidesUsers.php';


class UserRepository  implements ProvidesUsers
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

    public function findOne(int $id):User
    {
return User;
    }

    public function findOneByMail(string $email):User
    {
return User;
    }

    public function persist(User  $user):void
    {

    }


    public function save(string $payload): void
    {
        $user = json_decode($payload, true);
        print_r($user);
            $statement = $this->connection->prepare('INSERT INTO contacts( name, email, password) 
            VALUES ( :name, :email, :password)
            ON DUPLICATE KEY UPDATE id=id');

            $statement->execute([
                'name' => $user['name'],
                'email' => $user['email'],
                'password' => $user['password']

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
