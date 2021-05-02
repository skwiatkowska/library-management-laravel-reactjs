<?php

namespace App\Models;

use App\Models\Borrowing;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Auth\Authenticatable as AuthenticableTrait;
use eloquentFilter\QueryFilter\ModelFilters\Filterable;

use Vinelab\NeoEloquent\Eloquent\Model as NeoEloquent;

class User extends NeoEloquent implements Authenticatable, JWTSubject {
    use Notifiable, AuthenticableTrait, Filterable;

    protected $label = 'User';
    private static $whiteListFilter = ['*'];
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'pesel',
        'phone',
        'email',
        'password'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [        
        'password',
        'remember_token'
    ];

    public function borrowings($morph = null) {
        return $this->hyperMorph($morph, Borrowing::class, 'BORROWED', 'ON');
    }

    public function reservations($morph = null) {
        return $this->hyperMorph($morph, Reservation::class, 'RESERVED', 'ON');
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}
