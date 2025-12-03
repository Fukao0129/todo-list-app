<?php

namespace App\Services;

use App\Repositories\TodoRepository;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;

class TodoService
{
    // 依存性注入
    public function __construct(
        private TodoRepository $todoRepository
    ) {
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
        return $this->todoRepository->index($request);
    }

    /**
     * 詳細取得
     *
     * @param int $todo_id
     * @return array
     */
    public function show($todo_id)
    {
        return $this->todoRepository->show($todo_id);
    }

    /**
     * 更新
     *
     * @param int $todo_id
     * @param array $data
     * @return array
     */
    public function update($todo_id, array $data)
    {
        DB::beginTransaction();
        try {
             $res = $this->todoRepository->update($todo_id, $data);
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
     * 追加
     *
     * @param array $data
     * @return array
     */
    public function store(array $data)
    {
        DB::beginTransaction();
        try {
             $res = $this->todoRepository->store($data);
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
     * @param int $todo_id
     * @return array
     */
    public function delete($todo_id)
    {
        DB::beginTransaction();
        try {
            $this->todoRepository->delete($todo_id);
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
     * 一括削除
     *
     * @param array $todo_ids
     * @return array
     */
    public function bulkDelete(array $todo_ids)
    {
        DB::beginTransaction();
        try {
            foreach ($todo_ids as $todo_id) {
                $this->todoRepository->delete($todo_id);
            }
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
     * 完了済のTODOをすべてゴミ箱に移す
     *
     * @return array
     */
    public function trashAllCompleted()
    {
        DB::beginTransaction();
        try {
            $this->todoRepository->trashAllCompleted();
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
}
