<?php

namespace App\Services;

use App\Models\Table;

class TableService
{
    public function all()
    {
        return Table::with('room')->get();
    }

    public function find(int $id): ?Table
    {
        return Table::with('room')->find($id);
    }

    public function create(array $data): Table
    {
        return Table::create($data);
    }

    public function update(int $id, array $data): ?Table
    {
        $table = Table::find($id);
        if (!$table) return null;

        $table->update($data);
        return $table;
    }

    public function delete(int $id): bool
    {
        $table = Table::find($id);
        if (!$table) return false;

        return $table->delete();
    }
}
