<?php

namespace App\Http\Controllers;

use App\Http\Requests\NoteCreateRequest;
use App\Http\Requests\NoteUpdateRequest;
use App\Note;
use App\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $count = Input::get('count', 20);
        $user = auth()->user();
        $notes_page = $user->notes()
            ->orderBy('updated_at', 'desc')->select(['id', 'name', 'created_at', 'updated_at'])
            ->paginate($count);
        return response()->json($notes_page, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param NoteCreateRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(NoteCreateRequest $request)
    {
        $data = request(['name', 'content']);

        $note = auth()->user()->notes()->create([
            'name' => $data['name'],
            'content' => $data['content']
        ]);

        if ($tags = request('tags')) {
            foreach ($tags as $tag) {
                $tag_entity = Tag::whereName($tag)->first();
                if (!$tag_entity) {
                    $tag_entity = Tag::create(['name' => $tag]);
                }
                $note->tags()->attach($tag_entity);
            }
        }

        return response()->json($note, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param Note|\App\Nte $note
     * @return \Illuminate\Http\Response
     */
    public
    function show(Note $note)
    {
        $this->authorize('view', $note);
        return response()->json($note, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param NoteUpdateRequest $request
     * @param  \App\Note $note
     * @return string
     */
    public
    function update(NoteUpdateRequest $request, Note $note)
    {
        $data = request(['name', 'content']);

        $note->name = $data['name'];
        $note->content = $data['content'];
        $note->save();

        $note->tags()->detach();
        if ($tags = request('tags')) {
            foreach ($tags as $tag) {
                $tag_entity = Tag::whereName($tag)->first();
                if (!$tag_entity) {
                    $tag_entity = Tag::create(['name' => $tag]);
                }
                $note->tags()->attach($tag_entity);
            }
        }

        return response()->json($note, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Note $note
     * @return \Illuminate\Http\Response
     */
    public
    function destroy(Note $note)
    {
        $this->authorize('delete', $note);
        $note->tags()->detach();
        $note->delete();
        return response()->json('Deleted', 200);
    }
}
