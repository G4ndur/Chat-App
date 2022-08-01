<?php

class LogoutRequestHandler

{
    /** @var Session */
    private $session;

    /**
     * @param Session $session
     */
    public function __construct(Session $session)
    {
        $this->session = $session;
    }


    public function handle(Request $request): Response
    {
        $response = new Response();
        $this->session->start();
        $this->session->set('is_logged_in', false);
        $this->session->set('user_id', '');
        $this->session->set('user_name', '');
        return  $response->withHeader('Content-Type', 'application/json');
    }
}
