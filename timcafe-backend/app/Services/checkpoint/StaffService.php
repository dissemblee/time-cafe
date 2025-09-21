<?php

namespace App\Services;

use App\Models\Staff;

class StaffService
{
    public function all()
    {
        return Staff::all();
    }

    public function find(int $id): ?Staff
    {
        return Staff::find($id);
    }

    public function create(array $data): Staff
    {
        return Staff::create($data);
    }

    public function update(int $id, array $data): ?Staff
    {
        $staff = Staff::find($id);
        if (!$staff) return null;

        $staff->update($data);
        return $staff;
    }

    public function delete(int $id): bool
    {
        $staff = Staff::find($id);
        if (!$staff) return false;

        return $staff->delete();
    }
}
