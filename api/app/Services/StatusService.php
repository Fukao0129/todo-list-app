<?php

namespace App\Services;

use App\Repositories\StatusRepository;
use App\Repositories\TodoRepository;
use App\Models\User;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;

class StatusService
{
    // 依存性注入
    public function __construct(
        private StatusRepository $statusRepository,
        private TodoRepository $todoRepository
    ) {}

    /**
     * 全件取得
     *
     * @param \App\Models\User $user
     * @return array
     */
    public function index(User $user)
    {
        return [$this->statusRepository->index($user), Response::HTTP_OK];
    }

    /**
     * 追加
     *
     * @param \App\Models\User $user
     * @param array $data
     * @return array
     */
    public function store(User $user, array $data)
    {
        DB::beginTransaction();
        try {
            $res = $this->statusRepository->store($user, $data);
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
     * @param \App\Models\User $user
     * @param int $status_id
     * @param array $data
     * @return array
     */
    public function update(User $user, $status_id, array $data)
    {
        DB::beginTransaction();
        try {
            $res = $this->statusRepository->update($user, $status_id, $data);
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
     * @param \App\Models\User $user
     * @param int $status_id
     * @return array
     */
    public function delete(User $user, $status_id)
    {
        DB::beginTransaction();
        try {
            $res = $this->statusRepository->delete($user, $status_id);

            // 削除対象のステータスIDを持つTodoのステータスを未着手に変更
            $untaggedTodos = $this->todoRepository->index($user, ['status_id' => $status_id]);
            foreach ($untaggedTodos as $todo) {
                $this->todoRepository->update($user, $todo->id, ['status_id' => 1]);
            }
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
