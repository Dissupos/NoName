<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Note
 *
 * @property int $id
 * @property int $user_id
 * @property string $name
 * @property string $content
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Tag[] $tags
 * @property-read \App\User $user
 * @method static \Illuminate\Database\Query\Builder|\App\Note whereContent($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Note whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Note whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Note whereName($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Note whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Note whereUserId($value)
 * @mixin \Eloquent
 */
class Note extends Model
{
    protected $fillable = ['name', 'content'];
    protected $hidden = ['user', 'pivot', 'user_id'];

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
