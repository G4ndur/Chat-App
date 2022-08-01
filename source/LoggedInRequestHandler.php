<?php

class LoggedInRequestHandler

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
        $payload = [];
        $response = new Response();
        $payload['success'] = $this->session->get('is_logged_in');
        $payload['id'] = $this->session->get('user_id');
        $payload['name'] = $this->session->get('user_name');
        return $response->withBody(json_encode($payload));
    }
}