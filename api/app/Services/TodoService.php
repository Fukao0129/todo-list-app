<?php

namespace App\Services;

use App\Repositories\TodoRepository;
use App\Jobs\SendReminderMailJob;
use App\Models\User;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;

class TodoService
{
    // 依存性注入
    public function __construct(
        private TodoRepository $todoRepository
    ) {}

    /**
     * 全件取得
     *
     * @param \App\Models\User $user
     * @param mixed $request
     * @return array
     */
    public function index(User $user, $request)
    {
        return [$this->todoRepository->index($user, $request), Response::HTTP_OK];
    }

    /**
     * 詳細取得
     *
     * @param \App\Models\User $user
     * @param int $todo_id
     * @return array
     */
    public function show(User $user, $todo_id)
    {
        return [$this->todoRepository->show($user, $todo_id), Response::HTTP_OK];
    }

    /**
     * 更新
     *
     * @param \App\Models\User $user
     * @param int $todo_id
     * @param array $data
     * @return array
     */
    public function update(User $user, $todo_id, array $data)
    {
        DB::beginTransaction();
        try {
            $res = $this->todoRepository->update($user, $todo_id, $data);
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
     * @param \App\Models\User $user
     * @param array $data
     * @return array
     */
    public function store(User $user, array $data)
    {
        DB::beginTransaction();
        try {
            $res = $this->todoRepository->store($user, $data);
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
     * @param int $todo_id
     * @return array
     */
    public function delete(User $user, $todo_id)
    {
        DB::beginTransaction();
        try {
            $this->todoRepository->delete($user, $todo_id);
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
     * @param \App\Models\User $user
     * @param array $todo_ids
     * @return array
     */
    public function bulkDelete(User $user, array $todo_ids)
    {
        DB::beginTransaction();
        try {
            foreach ($todo_ids as $todo_id) {
                $this->todoRepository->delete($user, $todo_id);
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
     * @param \App\Models\User $user
     * @return array
     */
    public function trashAllCompleted(User $user)
    {
        DB::beginTransaction();
        try {
            $this->todoRepository->trashAllCompleted($user);
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
     * リマインドメール送信
     *
     * @return void
     */
    public function sendReminders()
    {
        $todos = $this->todoRepository->getRemindableTodos();

        foreach ($todos as $todo) {
            SendReminderMailJob::dispatch($todo);
        }
    }
}
