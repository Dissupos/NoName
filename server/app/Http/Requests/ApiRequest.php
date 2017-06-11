<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Class ApiRequest
 * @package App\Http\Requests
 */
class ApiRequest extends FormRequest
{
    public function wantsJson()
    {
        return true;
    }

    protected function validationData()
    {
        return $this->json()->all();
    }


}