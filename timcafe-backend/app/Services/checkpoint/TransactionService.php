<?php

namespace App\Services;

use App\Models\Transaction;

class TransactionService
{
    public function all()
    {
        return Transaction::with(['client', 'table'])->get();
    }

    public function find(int $id): ?Transaction
    {
        return Transaction::with(['client', 'table'])->find($id);
    }

    public function create(array $data): Transaction
    {
        return Transaction::create($data);
    }

    public function update(int $id, array $data): ?Transaction
    {
        $transaction = Transaction::find($id);
        if (!$transaction) return null;

        $transaction->update($data);
        return $transaction;
    }

    public function delete(int $id): bool
    {
        $transaction = Transaction::find($id);
        if (!$transaction) return false;

        return $transaction->delete();
    }
}
