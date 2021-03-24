<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Auth\Authenticatable as AuthenticableTrait;

use Vinelab\NeoEloquent\Eloquent\Model as NeoEloquent;

class Admin extends NeoEloquent implements Authenticatable {
    use Notifiable, AuthenticableTrait;
    // protected $guard = 'admin';

    protected $label = 'Admin';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'email', 
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
        'created_at',
        'updated_at'
    ];
}
