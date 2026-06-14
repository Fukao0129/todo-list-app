<?php

namespace App\Repositories;

use App\Models\Status;
use App\Models\User;

class StatusRepository
{
    /**
     * 全件取得
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function index(User $user)
    {
        $result = Status::select([
            "id",
            "name",
            "order",
            "is_updatable",
            "user_id",
        ])->orderBy('order', 'asc')
            ->where(function ($query) use ($user) {
                $query->where("user_id", $user->id)
                    ->orWhere("is_updatable", 0);
            })
            ->get();
        return $result;
    }

    /**
     * 追加
     *
     * @param \App\Models\User $user
     * @param array $data
     * @return \App\Models\Status
     */
    public function store(User $user, array $data)
    {
        $data['order'] = Status::withTrashed()->max('order') + 1;
        return $user->statuses()->create($data);
    }

    /**
     * 更新
     *
     * @param \App\Models\User $user
     * @param int $status_id
     * @param array $data
     * @return \App\Models\Status
     */
    public function update(User $user, $status_id, array $data)
    {
        $status = Status::where("user_id", $user->id)->find($status_id);
        $status->update($data);
        return $status;
    }

    /**
     * 削除
     *
     * @param \App\Models\User $user
     * @param int $status_id
     * @return \App\Models\Status
     */
    public function delete(User $user, $status_id)
    {
        $status = Status::where("user_id", $user->id)->find($status_id);
        $status->delete();
        return $status;
    }
}
