<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    protected $fillable = ['name', 'content'];
    protected $hidden = ['user'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
