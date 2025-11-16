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

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    $user = $request->user()->load('client');

    return $user;
});

// Auth
Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth:sanctum');


// Users
Route::apiResource('users', UserController::class);

// Clients
Route::apiResource('clients', ClientController::class);

// Bookings
Route::apiResource('bookings', BookingController::class);

// Rooms
Route::apiResource('rooms', RoomController::class);

// Tables
Route::apiResource('tables', TableController::class);

// Transactions
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

// <?php

// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\UserController;
// use App\Http\Controllers\ClientController;
// use App\Http\Controllers\BookingController;
// use App\Http\Controllers\RoomController;
// use App\Http\Controllers\TableController;
// use App\Http\Controllers\TransactionController;
// use App\Http\Controllers\FoodItemController;
// use App\Http\Controllers\BoardGameController;
// use App\Http\Controllers\StaffController;
// use App\Http\Controllers\RoomLayoutItemController;
// use App\Http\Controllers\RootController;

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::get('/board-games', [BoardGameController::class, 'index']);
// Route::get('/board-games/{id}', [BoardGameController::class, 'show']);

// Route::get('/food-items', [FoodItemController::class, 'index']);
// Route::get('/food-items/{id}', [FoodItemController::class, 'show']);

// Route::middleware('auth:sanctum')->group(function () {
//     Route::apiResource('users', UserController::class);
//     Route::apiResource('clients', ClientController::class);
//     Route::apiResource('bookings', BookingController::class);
//     Route::apiResource('rooms', RoomController::class);
//     Route::apiResource('tables', TableController::class);
//     Route::apiResource('transactions', TransactionController::class);
//     Route::apiResource('staff', StaffController::class);
//     Route::apiResource('room-layout-items', RoomLayoutItemController::class);
//     Route::apiResource('roots', RootController::class);

//     Route::post('/board-games', [BoardGameController::class, 'store']);
//     Route::put('/board-games/{id}', [BoardGameController::class, 'update']);
//     Route::delete('/board-games/{id}', [BoardGameController::class, 'destroy']);

//     Route::post('/food-items', [FoodItemController::class, 'store']);
//     Route::put('/food-items/{id}', [FoodItemController::class, 'update']);
//     Route::delete('/food-items/{id}', [FoodItemController::class, 'destroy']);
// });
