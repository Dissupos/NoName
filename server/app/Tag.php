<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $fillable = ['name'];

    public function notes()
    {
        return $this->belongsToMany(Note::class);
    }

    public function getRouteKeyName()
    {
        return 'name';
    }
}
