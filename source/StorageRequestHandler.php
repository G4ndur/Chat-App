<?php

class StorageRequestHandler
{
    /** @var StoresContacts */
    private $contactStorage;

    /** @var StoresMessages */
    private $messageStorage;

    /** @var Session */
    private $session;

    /**
     * @param StoresContacts $contactStorage
     * @param StoresMessages $messageStorage
     * @param Session $session
     */
    public function __construct(StoresContacts $contactStorage, StoresMessages $messageStorage, Session  $session)
    {
        $this->contactStorage = $contactStorage;
        $this->messageStorage = $messageStorage;
        $this->session = $session;
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

            if ($key === 'contacts') {
                $this->contactStorage->save($body);
            }

            if ($key === 'messages') {
                $this->messageStorage->save($body);
            }
            if ($key === 'id') {
 $userIds = json_decode($body);
 $this->session->set('activeUser', $userIds['active']);
 $this->session->set('currentUser', $userIds['current']);
            }

            return $response;
        }

        $response->withHeader('Content-Type', 'application/json');

        if ($key === 'contacts') {
            $response->withBody($this->contactStorage->fetch());
        }

        if ($key === 'messages') {
            $response->withBody($this->messageStorage->fetch());
        }

        return $response;
    }
}