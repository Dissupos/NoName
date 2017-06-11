<?php
/**
 * Created by PhpStorm.
 * User: galep_000
 * Date: 11/06/2017
 * Time: 6:49 PM
 */

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravel\Passport\Client;

/**
 * Class AuthController
 * @package App\Http\Controllers
 */
class AuthController extends Controller
{
    protected function getPassportProxy()
    {
        return Request::create(
            'oauth/token',
            'POST'
        );
    }

    protected function createLoginRequest($data)
    {
        $client = Client::where('password_client', 1)->first();

        request()->request->add([
            'grant_type' => 'password',
            'client_id' => $client->id,
            'client_secret' => $client->secret,
            'username' => $data['email'],
            'password' => $data['password'],
            'scope' => '*',
        ]);
    }
}