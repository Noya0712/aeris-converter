<?php

use App\Http\Controllers\PressVideoController;
use Illuminate\Support\Facades\Route;

Route::middleware('throttle:60,1')->group(function () {
    Route::get('/', [PressVideoController::class, 'index'])->name('press-video.index');
    Route::get('/tentang', [PressVideoController::class, 'about'])->name('press-video.about');
    Route::get('/fitur', [PressVideoController::class, 'features'])->name('press-video.features');
    Route::get('/faq', [PressVideoController::class, 'faq'])->name('press-video.faq');
    Route::get('/press-video', [PressVideoController::class, 'index'])->name('press-video.converter');
});
