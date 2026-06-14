<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\TodoRequest;
use App\Services\TodoService;
use App\Http\Resources\TodoResource;

class TodoController extends Controller
{

    // 依存性注入
    public function __construct(private TodoService $todoService) {}

    /**
     * 全件取得
     * @apiResourceCollection App\Http\Resources\TodoResource
     * @apiResourceModel App\Models\Todo
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    function index(Request $request)
    {
        list($result, $status) = $this->todoService->index($request->user(), $request);
        return response()->json(TodoResource::collection($result), $status);
    }

    /**
     * 詳細取得
     *
     * @apiResource App\Http\Resources\TodoResource
     * @apiResourceModel App\Models\Todo
     * @param Request $request
     * @param int $todo_id
     * @authenticated
     * @return \Illuminate\Http\JsonResponse
     */
    function show(Request $request, $todo_id)
    {
        list($result, $status) = $this->todoService->show($request->user(), $todo_id);
        return response()->json(new TodoResource($result), $status);
    }

    /**
     * 更新
     * @apiResource App\Http\Resources\TodoResource
     * @apiResourceModel App\Models\Todo
     * @param TodoRequest $request
     * @param int $todo_id
     * @authenticated
     * @return \Illuminate\Http\JsonResponse
     */
    function update(TodoRequest $request, $todo_id)
    {
        list($result, $status) = $this->todoService->update($request->user(), $todo_id, $request->validated());
        return response()->json(new TodoResource($result), $status);
    }

    /**
     * 追加
     * @apiResource App\Http\Resources\TodoResource
     * @apiResourceModel App\Models\Todo
     * @param TodoRequest $request
     * @authenticated
     * @return \Illuminate\Http\JsonResponse
     */
    function store(TodoRequest $request)
    {
        list($result, $status) = $this->todoService->store($request->user(), $request->validated());
        return response()->json(new TodoResource($result), $status);
    }

    /**
     * 削除
     * @param Request $request
     * @param int $todo_id
     * @authenticated
     * @return \Illuminate\Http\JsonResponse
     */
    function delete(Request $request, $todo_id)
    {
        list($result, $status) = $this->todoService->delete($request->user(), $todo_id);
        return response()->json($result, $status);
    }

    /**
     * 一括削除
     * @param Request $request
     * @authenticated
     * @return \Illuminate\Http\JsonResponse
     */
    function bulkDelete(Request $request)
    {
        $todo_ids = $request->input('todo_ids');
        list($result, $status) = $this->todoService->bulkDelete($request->user(), $todo_ids);
        return response()->json($result, $status);
    }

    /**
     * 完了済のTODOをすべてゴミ箱に移す
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    function trashAllCompleted(Request $request)
    {
        list($result, $status) = $this->todoService->trashAllCompleted($request->user());
        return response()->json($result, $status);
    }
}
