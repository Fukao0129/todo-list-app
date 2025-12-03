<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\TodoRequest;
use App\Services\TodoService;

class TodoController extends Controller
{

    // 依存性注入
    public function __construct(private TodoService $todoService)
    {
        $todoService = $this->todoService;
    }

    /**
     * 全件取得
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    function index(Request $request)
    {
        list($result, $status) = $this->todoService->index($request);
        return response()->json($result, $status);
    }

    /**
     * 詳細取得
     *
     * @param int $todo_id
     * @return \Illuminate\Http\JsonResponse
     */
    function show($todo_id)
    {
        list($result, $status) = $this->todoService->show($todo_id);
        return response()->json($result, $status);
    }

    /**
     * 更新
     *
     * @param TodoRequest $request
     * @param int $todo_id
     * @return \Illuminate\Http\JsonResponse
     */
    function update(TodoRequest $request, $todo_id)
    {
        list($result, $status) = $this->todoService->update($todo_id, $request->all());
        return response()->json($result, $status);
    }

    /**
     * 追加
     *
     * @param TodoRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    function store(TodoRequest $request)
    {
        list($result, $status) = $this->todoService->store($request->all());
        return response()->json($result, $status);
    }

    /**
     * 削除
     *
     * @param int $todo_id
     * @return \Illuminate\Http\JsonResponse
     */
    function delete($todo_id)
    {
        list($result, $status) = $this->todoService->delete($todo_id);
        return response()->json($result, $status);
    }

    /**
     * 一括削除
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    function bulkDelete(Request $request)
    {
        $todo_ids = $request->input('todo_ids');
        list($result, $status) = $this->todoService->bulkDelete($todo_ids);
        return response()->json($result, $status);
    }

    /**
     * 完了済のTODOをすべてゴミ箱に移す
     *
     * @return \Illuminate\Http\JsonResponse
     */
    function trashAllCompleted()
    {
        list($result, $status) = $this->todoService->trashAllCompleted();
        return response()->json($result, $status);
    }
}
