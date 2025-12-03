<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\StatusService;
use App\Http\Requests\StatusRequest;

class StatusController extends Controller
{

    // 依存性注入
    public function __construct(private StatusService $statusService)
    {
        $statusService = $this->statusService;
    }

    /**
     * 全件取得
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    function index(Request $request)
    {
        list($result, $status) = $this->statusService->index($request);
        return response()->json($result, $status);
    }

    /**
     * 追加
     *
     * @param StatusRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    function store(StatusRequest $request)
    {
        list($result, $status) = $this->statusService->store($request->all());
        return response()->json($result, $status);
    }

    /**
     * 更新
     *
     * @param int $status_id
     * @param StatusRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    function update($status_id, StatusRequest $request)
    {
        list($result, $status) = $this->statusService->update($status_id, $request->all());
        return response()->json($result, $status);
    }

    /**
     * 削除
     *
     * @param int $status_id
     * @return \Illuminate\Http\JsonResponse
     */
    function delete($status_id)
    {
        list($result, $status) = $this->statusService->delete($status_id);
        return response()->json($result, $status);
    }
}
