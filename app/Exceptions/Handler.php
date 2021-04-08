<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\TokenBlacklistedException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class Handler extends ExceptionHandler {
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception) {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception) {
        if ($exception instanceof \Illuminate\Database\Eloquent\ModelNotFoundException) {
            return response()->json(
                [
                    'message' => 'RESOURCE_NOT_FOUND'
                ],
                404
            );
        }
        if ($exception instanceof UnauthorizedHttpException) {
            // detect previous instance
            if ($exception->getPrevious() instanceof TokenExpiredException) {
                return response()->json(
                    [
                        'message' => 'TOKEN_EXPIRED'
                    ],
                    $exception->getStatusCode()
                );
            } else if ($exception->getPrevious() instanceof TokenInvalidException) {
                return response()->json(
                    [
                        'message' => 'TOKEN_INVALID'
                    ],
                    $exception->getStatusCode()
                );
            } else if ($exception->getPrevious() instanceof TokenBlacklistedException) {
                return response()->json(
                    [
                        'message' => 'TOKEN_BLACKLISTED'
                    ],
                    $exception->getStatusCode()
                );
            } else {
                return response()->json(
                    [
                        'message' => "UNAUTHORIZED_REQUEST"
                    ],
                    401
                );
            }
        }

        return parent::render($request, $exception);
    }
}
