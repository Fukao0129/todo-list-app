<?php

namespace App\Repositories;

use Symfony\Component\HttpFoundation\Response;
use App\Models\Status;
use Illuminate\Support\Facades\Auth;

class StatusRepository
{
    /**
     * 全件取得
     *
     * @return array
     */
    public function index()
    {
        $result = Status::select([
            "id",
            "name",
            "order",
            "is_updatable",
        ])->orderBy('order', 'asc')
            ->where(function ($query) {
                $query->where("user_id", Auth::id())
                    ->orWhere("is_updatable", 0);
            })
            ->get();
        return [$result, Response::HTTP_OK];
    }

    /**
     * 追加
     *
     * @param array $data
     * @return \App\Models\Status
     */
    public function store(array $data)
    {
        $data['order'] = Status::withTrashed()->max('order') + 1;
        return Status::create($data);
    }

    /**
     * 更新
     *
     * @param int $status_id
     * @param array $data
     * @return \App\Models\Status
     */
    public function update($status_id, array $data)
    {
        $status = Status::find($status_id);
        $status->update($data);
        return $status;
    }

    /**
     * 削除
     *
     * @param int $status_id
     * @return \App\Models\Status
     */
    public function delete($status_id)
    {
        $status = Status::find($status_id);
        $status->delete();
        return $status;
    }
}
