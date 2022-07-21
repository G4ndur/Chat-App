<?php

class LoginRequestHandler
{
    /** @var ProvidesUsers */
    private $user;


    /**
     * @param ProvidesUsers $user
     */
    public function __construct(ProvidesUsers $user)
    {
        $this->user = $user;
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

            if ($key === '') {
                $this->user->save($body);
            }


            return $response;
        }

        $response->withHeader('Content-Type', 'application/json');
        return $response;
    }
}