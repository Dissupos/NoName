<?php

namespace App\Http\Controllers\Auth;

use App\Http\Requests\RegisterRequest;
use App\User;
use Illuminate\Http\Request;
use Route;

class RegistrationController extends AuthController
{
    /**
     * Store a newly created resource in storage.
     *
     * @param RegisterRequest|Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(RegisterRequest $request)
    {
        $data = request(['email', 'name', 'password']);

        User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        //Configure passport/oauth
        $this->createLoginRequest($data);
        return Route::dispatch($this->getPassportProxy());
    }
}
