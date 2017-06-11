<?php

namespace App\Http\Controllers\Auth;

use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Route;

class SessionsController extends AuthController
{
    /**
     * Return current User
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return auth()->user();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param LoginRequest|Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(LoginRequest $request)
    {
        $data = request(['email', 'name', 'password']);

        //Configure passport/oauth
        $this->createLoginRequest($data);
        return Route::dispatch($this->getPassportProxy());
    }
}
