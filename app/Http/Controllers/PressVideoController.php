<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class PressVideoController extends Controller
{
    public function index(Request $request): InertiaResponse
    {
        return Inertia::render('PressVideo/Index', [
            'appName' => 'AERIS — Video Converter',
            'supportedFormats' => ['MP4', 'MOV', 'AVI', 'MKV', 'WEBM'],
        ]);
    }

    public function about(Request $request): InertiaResponse
    {
        return Inertia::render('PressVideo/About', [
            'appName' => 'AERIS — Tentang',
        ]);
    }

    public function features(Request $request): InertiaResponse
    {
        return Inertia::render('PressVideo/Features', [
            'appName' => 'AERIS — Fitur',
        ]);
    }

    public function faq(Request $request): InertiaResponse
    {
        return Inertia::render('PressVideo/FAQ', [
            'appName' => 'AERIS — FAQ',
        ]);
    }
}
