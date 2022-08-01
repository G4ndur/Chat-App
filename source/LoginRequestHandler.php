<?php

class LoginRequestHandler
{
    /** @var ProvidesUsers */
    private $userRepository;


    /**
     * @param ProvidesUsers $user
     */
    public function __construct(ProvidesUsers $user)
    {
        $this->userRepository = $user;
    }

    /**
     * @param Request $request
     * @return Response
     */
    public function handle(Request $request): Response
    {
        $response = new Response();

        $key = $request->getQueryParameter('key');

        if ($key === null) {
            throw new RuntimeException('key must be specified');
        }

        if ($key === '') {
            throw new RuntimeException('key must not be empty');
        }

        $key = strtolower($key);

        if ($request->getMethod() === Request::METHOD_POST) {

            $body = $request->getBody();
            if ($body === '') {
                throw new RuntimeException('body must not be empty');
            }
            $login = json_decode($body, true);
            $loginData = new User;
            $loginData->setEmail($login['email']);
            $loginData->setPassword($login['password']);
            $foundUser = $this->userRepository->findOneByMail($login['email']);
            if ($foundUser->getPassword() != $login['password']) {
                return $response->withBody(json_encode([
                    'success' => false,

                ]));
            }
            else return $response->withBody(json_encode([
                'success' => true,
                'email' => $foundUser->getEmail(),
                'id' => $foundUser->getId(),
                'name' => $foundUser->getName()
            ]));


//            return $response->withBody(json_encode([
//                'success' => true,
//            ]));

        }

        $response->withHeader('Content-Type', 'application/json');
        return $response;
    }
}