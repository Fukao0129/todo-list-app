<?php

namespace App\Repositories;

use Symfony\Component\HttpFoundation\Response;
use App\Models\Todo;
use Illuminate\Support\Facades\Auth;

class TodoRepository
{
    /**
     * 全件取得
     *
     * @param mixed $request
     * @return array
     */
    public function index($request)
    {
        $result = Todo::select([
            "id",
            "title",
            "description",
            "user_id",
            "status_id",
            "due_date",
            "priority",
            "is_trashed",
            "completed_at",
            "reminder_at",
        ])
            // ソート処理 
            ->when(isset($request["direction"]), function ($query) use ($request) {
                return $query->orderBy($request["sort"], $request["direction"]);
            })
            // 検索処理
            ->when(!empty($request["q"]) && strlen($request["q"]) > 0, function ($query) use ($request) {
                return $query->where("title", 'like',  '%' . $request["q"] . '%')
                    ->orWhere("description", 'like',  '%' . $request["q"] . '%');
            })
            // ステータス絞り込み処理
            ->when(isset($request["status_id"]), function ($query) use ($request) {
                return $query->where("status_id", $request["status_id"]);
            })
            // 今日のTodo絞り込み処理
            ->when(!empty($request["is_today"]), function ($query) {
                return $query->whereDate("due_date", today());
            })
            // ゴミ箱絞り込み処理
            ->when(isset($request["is_trashed"]), function ($query) use ($request) {
                return $query->where('is_trashed', $request['is_trashed']);
            })
            // ユーザ絞り込み処理
            ->where("user_id", Auth::id())
            ->with('status', function ($query) {
                $query->select([
                    'id',
                    'name'
                ]);
            })
            ->get();
        return [$result, Response::HTTP_OK];
    }

    /**
     * 詳細取得
     *
     * @param int $todo_id
     * @return array
     */
    public function show($todo_id)
    {
        $result = Todo::select([
            "id",
            "title",
            "description",
            "user_id",
            "status_id",
            "due_date",
            "priority",
            "completed_at",
            "reminder_at",
        ])->with('status', function ($query) {
            $query->select([
                'id',
                'name'
            ]);
        })->find($todo_id);
        return [$result, Response::HTTP_OK];
    }

    /**
     * 更新
     *
     * @param int $todo_id
     * @param array $data
     * @return \App\Models\Todo
     */
    public function update($todo_id, array $data)
    {
        $todo = Todo::find($todo_id);
        $todo->fill($data);
        $todo->save();
        return $todo->load('status:id,name');
    }

    /**
     * 追加
     *
     * @param array $data
     * @return \App\Models\Todo
     */
    public function store(array $data)
    {
        $data['user_id'] = Auth::id();
        Todo::create($data);
        return Todo::latest()->with('status', function ($query) {
            $query->select([
                'id',
                'name'
            ]);
        })->first();
    }

    /**
     * 削除
     *
     * @param int $todo_id
     * @return bool|null
     */
    public function delete($todo_id)
    {
        $todo = Todo::find($todo_id);
        return $todo->delete();
    }

    /**
     * 完了済のTODOをすべてゴミ箱に移す
     *
     * @return int
     */
    public function trashAllCompleted()
    {
        return Todo::where('user_id', Auth::id())
            ->where('status_id', Todo::STATUS_COMPLETED)
            ->update(['is_trashed' => 1]);
    }
}
