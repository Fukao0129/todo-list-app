<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Symfony\Component\HttpFoundation\Response;

class TodoRequest extends FormRequest
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
        switch ($this->method()) {
            case 'POST':
                return [
                    'title' => ['required', 'string', 'max:10'],
                    'description' => ['nullable', 'string', 'max:255'],
                    'priority' => ['required', 'integer', 'between:1,3'],
                    'reminder_at' => ['nullable', 'date', 'after:now'],
                    'due_date' => ['nullable', 'date', 'after:now'],
                ];
                break;
            case 'PUT':
            case 'PATCH':
                return [
                    'title' => ['required', 'string', 'max:10'],
                    'description' => ['nullable', 'string', 'max:255'],
                    'priority' => ['required', 'integer', 'between:1,3'],
                    'reminder_at' => ['nullable', 'date'],
                    'due_date' => ['nullable', 'date'],
                ];
                break;
            default:
                break;
        }
    }

    public function attributes(): array
    {
        return [
            'title'          => 'Todoのタイトル',
            'description'    => 'Todoの説明',
            'priority'       => '優先度',
            'reminder_at'    => 'リマインダー日時',
            'due_date'       => '期限日',
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
