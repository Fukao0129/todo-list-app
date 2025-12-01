<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class StatusRequest extends FormRequest
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
        // ステータス名の重複チェックを、ユーザごとに行う
        $uniqueRule = Rule::unique('statuses', 'name')->where(function ($query) {
            return $query->where('user_id', Auth::id());
        });

        switch ($this->method()) {
            case 'POST':
                return [
                    'name' => ['required', 'string', 'max:10', $uniqueRule],
                ];
                break;
            case 'PUT':
            case 'PATCH':
                return [
                    'name' => ['required', 'string', 'max:10', $uniqueRule],
                ];
                break;
            default:
                break;
        }
    }

    public function attributes(): array
    {
        return [
            'name' => 'ステータス名',
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
