<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Symfony\Component\HttpFoundation\Response;

class PasswordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        // パスワード変更
        if ($this->routeIs('password.change')) {
            return [
                'current_password' => 'required|current_password',
                'new_password' => 'required|string|min:8|confirmed',
            ];
        } elseif ($this->routeIs('password.reset')) {
            // パスワードリセット
            return [
                'token' => 'required',
                'email' => 'required|email',
                'password' => 'required|min:8|confirmed',
                'password_confirmation' => 'required|min:8',
            ];
        }
    }

    public function attributes(): array
    {
        return [
            'new_password' => '新しいパスワード',
            'current_password' => '現在のパスワード',
            'password' => 'パスワード',
            'password_confirmation' => '確認用のパスワード',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $response['errorMessage']  = $validator->errors()->toArray();
        throw new HttpResponseException(
            response()->json($response, Response::HTTP_UNPROCESSABLE_ENTITY)
        );
    }
}
