<?php

class LoginRequestHandler
{
    /** @var ProvidesUsers */
    private $userRepository;

    /** @var Session */
    private $session;


    /**
     * @param Session $session
     * @param ProvidesUsers $user
     */
    public function __construct(Session $session, ProvidesUsers $user)
    {
        $this->userRepository = $user;
        $this->session = $session;
    }

    /**
     * @param Request $request
     * @return Response
     */
    public function handle(Request $request): Response
    {
        $response = new Response();

        if ($request->getMethod() !== Request::METHOD_POST) {
            $this->session->set('is_logged_in', false);
            return $response;
        }

        $response->withHeader('Content-Type', 'application/json');

        $body = $request->getBody();
        if ($body === '') {
            throw new RuntimeException('body must not be empty');
        }
        $login = json_decode($body, true);

        $foundUser = $this->userRepository->findOneByMail($login['email']);
        if ($foundUser->getPassword() === $login['password']) {
            $this->session->set('is_logged_in', true);
            $this->session->set('user_id', $foundUser->getId());
            $this->session->set('user_name', $foundUser->getName());
            return $response->withBody(json_encode([
                'success' => true,
                'email' => $foundUser->getEmail(),
                'id' => $foundUser->getId(),
                'name' => $foundUser->getName()
            ]));

        }

        $this->session->set('is_logged_in', false);

        return $response->withBody(json_encode([
            'success' => false,
        ]));
    }
}