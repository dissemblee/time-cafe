<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\TableController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\FoodItemController;
use App\Http\Controllers\BoardGameController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\RoomLayoutItemController;
use App\Http\Controllers\RootController;
use App\Http\Controllers\TemporaryRegistrationLinkController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user()->load(['client', 'staff']);
});

Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth:sanctum');

Route::get('/food-items', [FoodItemController::class, 'index']);
Route::get('/board-games', [BoardGameController::class, 'index']);
Route::get('/rooms', [RoomController::class, 'index']);
Route::get('/rooms/{id}', [RoomController::class, 'show']);
Route::get('/tables', [TableController::class, 'index']);
Route::get('/tables/{id}', [TableController::class, 'show']);
Route::get('/room-layout-items', [RoomLayoutItemController::class, 'index']);
Route::get('/room-layout-items/{id}', [RoomLayoutItemController::class, 'index']);

Route::get('/registration-links/validate/{token}', [TemporaryRegistrationLinkController::class, 'validateLink']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/registration-links/generate', [TemporaryRegistrationLinkController::class, 'generate']);
    Route::apiResource('/registration-links', TemporaryRegistrationLinkController::class)->except(['index', 'show']);
    Route::get('/registration-links/{id}', [TemporaryRegistrationLinkController::class, 'show']);

    Route::post('/food-items', [FoodItemController::class, 'store']);
    Route::put('/food-items/{id}', [FoodItemController::class, 'update']);
    Route::delete('/food-items/{id}', [FoodItemController::class, 'destroy']);
    Route::get('/food-items/{id}', [FoodItemController::class, 'show']);

    Route::post('/board-games', [BoardGameController::class, 'store']);
    Route::put('/board-games/{id}', [BoardGameController::class, 'update']);
    Route::delete('/board-games/{id}', [BoardGameController::class, 'destroy']);
    Route::get('/board-games/{id}', [BoardGameController::class, 'show']);

    Route::post('/rooms', [RoomController::class, 'store']);
    Route::put('/rooms/{id}', [RoomController::class, 'update']);
    Route::delete('/rooms/{id}', [RoomController::class, 'destroy']);

    Route::post('/tables', [TableController::class, 'store']);
    Route::put('/tables/{id}', [TableController::class, 'update']);
    Route::delete('/tables/{id}', [TableController::class, 'destroy']);

    Route::post('/room-layout-items', [RoomLayoutItemController::class, 'store']);
    Route::put('/room-layout-items/{id}', [RoomLayoutItemController::class, 'update']);
    Route::delete('/room-layout-items/{id}', [RoomLayoutItemController::class, 'destroy']);

    Route::post('bookings/{booking}/cancel', [BookingController::class, 'cancel'])->name('bookings.cancel');
    Route::get('bookings/my-bookings', [BookingController::class, 'myBookings']);
    Route::apiResource('bookings', BookingController::class);

    Route::post('payments/create-session', [TransactionController::class, 'createPaymentSession']);
    Route::apiResource('transactions', TransactionController::class);

    Route::apiResource('users', UserController::class);
    Route::apiResource('clients', ClientController::class);
    Route::apiResource('staffs', StaffController::class);
    Route::apiResource('roots', RootController::class);
});

Route::post('/fake-gateway/confirm/{id}', [TransactionController::class, 'paymentCallback']);
