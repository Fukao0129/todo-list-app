<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository
{
    /**
     * 更新
     *
     * @param int $user_id
     * @param array $data
     * @return \App\Models\User
     */
    public function update($user_id, array $data)
    {
        $user = User::find($user_id);
        $user->update($data);
        return $user;
    }
}
