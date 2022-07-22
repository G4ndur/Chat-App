<?php

class RegisterRequestHandler
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

            if ($key === 'registration') {
                $registration = json_decode($body,true);
                $user = new User();
                $user->setEmail($registration['email']);
                $user->setName($registration['name']);
                $user->setPassword($registration['password']);
                $this->userRepository->persist($user);
            }

            return $response->withBody(json_encode([
                'success' => true,
            ]));
        }

        $response->withHeader('Content-Type', 'application/json');
        return $response;
    }
}