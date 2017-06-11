<?php

namespace App\Policies;

use App\User;
use App\Note;
use Illuminate\Auth\Access\HandlesAuthorization;

class NotePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the note.
     *
     * @param  \App\User $user
     * @param  \App\Note $note
     * @return mixed
     */
    public function view(User $user, Note $note)
    {
        return $user->id === $note->user_id;
    }

    /**
     * Determine whether the user can update the note.
     *
     * @param  \App\User $user
     * @param  \App\Note $note
     * @return mixed
     */
    public function update(User $user, Note $note)
    {
        return $user->id === $note->user_id;
    }

    /**
     * Determine whether the user can delete the note.
     *
     * @param  \App\User $user
     * @param  \App\Note $note
     * @return mixed
     */
    public function delete(User $user, Note $note)
    {
        return $user->id === $note->user_id;
    }
}