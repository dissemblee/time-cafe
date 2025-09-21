<?php

namespace App\Services;

use App\Models\BoardGame;

class BoardGameService
{
    public function all()
    {
        return BoardGame::all();
    }

    public function find(int $id): ?BoardGame
    {
        return BoardGame::find($id);
    }

    public function create(array $data): BoardGame
    {
        return BoardGame::create($data);
    }

    public function update(int $id, array $data): ?BoardGame
    {
        $game = BoardGame::find($id);
        if (!$game) return null;

        $game->update($data);
        return $game;
    }

    public function delete(int $id): bool
    {
        $game = BoardGame::find($id);
        if (!$game) return false;

        return $game->delete();
    }
}
