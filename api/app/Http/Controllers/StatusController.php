<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\StatusService;
use App\Http\Requests\StatusRequest;
use App\Http\Resources\StatusResource;


class StatusController extends Controller
{

    // 依存性注入
    public function __construct(private StatusService $statusService) {}

    /**
     * 全件取得
     * @apiResourceCollection App\Http\Resources\StatusResource
     * @apiResourceModel App\Models\Status
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    function index(Request $request)
    {
        list($result, $status) = $this->statusService->index($request->user());
        return response()->json(StatusResource::collection($result), $status);
    }

    /**
     * 追加
     * @apiResource App\Http\Resources\StatusResource
     * @apiResourceModel App\Models\Status
     * @param StatusRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    function store(StatusRequest $request)
    {
        list($result, $status) = $this->statusService->store($request->user(), $request->validated());
        return response()->json(new StatusResource($result), $status);
    }

    /**
     * 更新
     * @apiResource App\Http\Resources\StatusResource
     * @apiResourceModel App\Models\Status
     * @param int $status_id
     * @param StatusRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    function update($status_id, StatusRequest $request)
    {
        list($result, $status) = $this->statusService->update($request->user(), $status_id, $request->validated());
        return response()->json(new StatusResource($result), $status);
    }

    /**
     * 削除
     * @param Request $request
     * @param int $status_id
     * @return \Illuminate\Http\JsonResponse
     */
    function delete(Request $request, $status_id)
    {
        list($result, $status) = $this->statusService->delete($request->user(), $status_id);
        return response()->json($result, $status);
    }
}
