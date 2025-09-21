<?php

namespace App\Services;

use App\Models\Client;

class ClientService
{
    public function all(array $filters = [])
    {
        $query = Client::query();

        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (isset($filters['name'])) {
            $query->where('name', 'like', "%{$filters['name']}%");
        }

        return $query->get();
    }

    public function find(int $id): ?Client
    {
        return Client::find($id);
    }

    public function create(array $data): Client
    {
        return Client::create($data);
    }

    public function update(int $id, array $data): ?Client
    {
        $client = Client::find($id);
        if (!$client) return null;

        $client->update($data);
        return $client;
    }

    public function delete(int $id): bool
    {
        $client = Client::find($id);
        if (!$client) return false;

        return $client->delete();
    }
}
