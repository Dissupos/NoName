<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    protected $fillable = ['name', 'content'];
    protected $hidden = ['user', 'pivot'];
    protected $appends = ['tags'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

    public function getTagsAttribute()
    {
        return $this->tags()->pluck('name');
    }
}
