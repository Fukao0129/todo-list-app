<?php

namespace App\Services;

use App\Repositories\StatusRepository;
use App\Repositories\TodoRepository;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;

class StatusService
{
    // 依存性注入
    public function __construct(
        private StatusRepository $statusRepository,
        private TodoRepository $todoRepository
    ) {
        $this->statusRepository = $statusRepository;
        $this->todoRepository = $todoRepository;
    }

    /**
     * 全件取得
     *
     * @param mixed $request
     * @return array
     */
    public function index($request)
    {
        return $this->statusRepository->index($request);
    }

    /**
     * 追加
     *
     * @param array $data
     * @return array
     */
    public function store(array $data)
    {
        DB::beginTransaction();
        try {
            $this->statusRepository->store($data);
            $res = true;
            $status = Response::HTTP_OK;
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            $res = ['error' => $e->getMessage()];
            $status = Response::HTTP_INTERNAL_SERVER_ERROR;
        }
        return [$res, $status];
    }

    /**
     * 更新
     *
     * @param int $status_id
     * @param array $data
     * @return array
     */
    public function update($status_id, array $data)
    {
        DB::beginTransaction();
        try {
            $res = $this->statusRepository->update($status_id, $data);
            // $res = true;
            $status = Response::HTTP_OK;
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            $res = ['error' => $e->getMessage()];
            $status = Response::HTTP_INTERNAL_SERVER_ERROR;
        }
        return [$res, $status];
    }

    /**
     * 削除
     *
     * @param int $status_id
     * @return array
     */
    public function delete($status_id)
    {
        DB::beginTransaction();
        try {
            $res = $this->statusRepository->delete($status_id);

            // 削除対象のステータスIDを持つTodoのステータスを未着手に変更
            $untaggedTodos = $this->todoRepository->index(['status_id' => $status_id]);
            foreach ($untaggedTodos[0] as $todo) {
                $this->todoRepository->update($todo->id, ['status_id' => 1]);
            }

           //  $res = true;
            $status = Response::HTTP_OK;
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            $res = ['error' => $e->getMessage()];
            $status = Response::HTTP_INTERNAL_SERVER_ERROR;
        }
        return [$res, $status];
    }
}
