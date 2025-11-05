<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

abstract class BaseService
{
    protected string $modelClass;

    public function all(array $params = [])
    {
        $perPage = $params['per_page'] ?? 10;
        return $this->modelClass::paginate($perPage);
    }

    public function find(int $id): ?Model
    {
        return $this->modelClass::find($id);
    }

    public function create(array $data): Model
    {
        $this->validate($data);
        return $this->modelClass::create($data);
    }

    public function update(int $id, array $data): ?Model
    {
        $model = $this->find($id);
        if (!$model) {
            return null;
        }

        $this->validate($data, $id);
        $model->update($data);

        return $model;
    }

    public function delete(int $id): bool
    {
        $model = $this->find($id);
        if (!$model) {
            return false;
        }

        return $model->delete();
    }

    protected function validate(array $data, int $id = null)
    {
        $rules = $this->rules($id);
        $validator = Validator::make($data, $rules);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }

    abstract protected function rules(int $id = null): array;
}
