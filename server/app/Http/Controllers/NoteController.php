<?php

namespace App\Http\Controllers;

use App\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(auth()->user()->notes()->orderBy('created_at', 'desc')->select(['id', 'name'])->paginate(2), 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function store()
    {
        $data = request(['name', 'content']);
        $v = validator($data, [
            'name' => 'required|string|max:150',
            'content' => 'required|string',
        ]);

        if ($v->fails()) {
            return response()->json($v->errors()->all(), 400);
        }

        $note = auth()->user()->notes()->create([
            'name' => $data['name'],
            'content' => $data['content']
        ]);

        return response()->json($note, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Note $note
     * @return \Illuminate\Http\Response
     */
    public function show(Note $note)
    {
        return $note;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Note $note
     * @return \Illuminate\Http\Response
     */
    public function update(Note $note)
    {
        $data = request(['name', 'content']);

        if ($note->user->id !== auth()->id()) {
            return response()->json('Bad auth', 403);
        }
        $v = validator($data, [
            'name' => 'required|string|max:150',
            'content' => 'required|string',
        ]);

        if ($v->fails()) {
            return response()->json($v->errors()->all(), 400);
        }

        $note->name = $data['name'];
        $note->content = $data['content'];
        $note->save();

        return $note;

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Note $note
     * @return \Illuminate\Http\Response
     */
    public function destroy(Note $note)
    {
        if ($note->user->id !== auth()->id()) {
            return response()->json('Bad auth', 403);
        }
        $note->delete();

        return response()->json('Deleted', 200);
    }
}
