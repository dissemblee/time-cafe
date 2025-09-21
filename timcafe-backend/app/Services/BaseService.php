<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

abstract class BaseService
{
    protected string $modelClass;

    /**
     * Получить все записи
     */
    public function all()
    {
        return $this->modelClass::all();
    }

    /**
     * Найти запись по id
     */
    public function find(int $id): ?Model
    {
        return $this->modelClass::find($id);
    }

    /**
     * Создать запись
     */
    public function create(array $data): Model
    {
        $this->validate($data);
        return $this->modelClass::create($data);
    }

    /**
     * Обновить запись
     */
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

    /**
     * Удалить запись
     */
    public function delete(int $id): bool
    {
        $model = $this->find($id);
        if (!$model) {
            return false;
        }

        return $model->delete();
    }

    /**
     * Валидировать данные
     */
    protected function validate(array $data, int $id = null)
    {
        $rules = $this->rules($id);
        $validator = Validator::make($data, $rules);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }

    /**
     * Определить правила валидации в конкретном сервисе
     */
    abstract protected function rules(int $id = null): array;
}
