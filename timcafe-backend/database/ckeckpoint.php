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

// Auth
Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth:sanctum');

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/registration-links/generate', [TemporaryRegistrationLinkController::class, 'generate']);
    Route::apiResource('/registration-links', TemporaryRegistrationLinkController::class);
});

Route::get('/registration-links/validate/{token}', [TemporaryRegistrationLinkController::class, 'validateLink']);

// Users
Route::apiResource('users', UserController::class);

// Clients
Route::apiResource('clients', ClientController::class);

// Bookings
Route::middleware(['auth:sanctum'])->post('bookings/{booking}/cancel', [BookingController::class, 'cancel'])
    ->name('bookings.cancel');

Route::middleware('auth:sanctum')->get('bookings/my-bookings', [BookingController::class, 'myBookings']);

Route::apiResource('bookings', BookingController::class);

// Rooms
Route::apiResource('rooms', RoomController::class);

// Tables
Route::apiResource('tables', TableController::class);

// Transactions
Route::post('payments/create-session', [TransactionController::class, 'createPaymentSession'])
     ->middleware('auth:sanctum');

Route::post('/fake-gateway/confirm/{id}', [TransactionController::class, 'paymentCallback']);

Route::apiResource('transactions', TransactionController::class);

// Food items
Route::apiResource('food-items', FoodItemController::class);

// Board games
Route::apiResource('board-games', BoardGameController::class);

// Staff
Route::apiResource('staffs', StaffController::class);

// Room Layout Items
Route::apiResource('room-layout-items', RoomLayoutItemController::class);

// Roots
Route::apiResource('roots', RootController::class);
