<?php

class StorageRequestHandler
{
    /** @var StoresContacts */
    private $contactStorage;

    /** @var StoresMessages */
    private $messageStorage;

    /**
     * @param StoresContacts $contactStorage
     * @param StoresMessages $messageStorage
     */
    public function __construct(StoresContacts $contactStorage, StoresMessages $messageStorage)
    {
        $this->contactStorage = $contactStorage;
        $this->messageStorage = $messageStorage;
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
            throw new RuntimeException('key musst be specified');
        }

        if ($key === '') {
            throw new RuntimeException('key could not be empty');
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