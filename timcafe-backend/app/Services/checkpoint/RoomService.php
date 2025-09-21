<?php

namespace App\Services;

use App\Models\Room;

class RoomService
{
    public function all()
    {
        return Room::with('tables')->get();
    }

    public function find(int $id): ?Room
    {
        return Room::with('tables')->find($id);
    }

    public function create(array $data): Room
    {
        return Room::create($data);
    }

    public function update(int $id, array $data): ?Room
    {
        $room = Room::find($id);
        if (!$room) return null;

        $room->update($data);
        return $room;
    }

    public function delete(int $id): bool
    {
        $room = Room::find($id);
        if (!$room) return false;

        return $room->delete();
    }
}
