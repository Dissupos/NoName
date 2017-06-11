<?php

namespace App\Http\Controllers;

use App\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function index(Tag $tag)
    {
        return $tag->notes->where('user_id', auth()->id());
    }

    public function top()
    {
        return Tag::withCount('notes')
            ->has('notes')
            ->orderBy('notes_count', 'desc')
            ->take(10)
            ->pluck('name');
    }
}
