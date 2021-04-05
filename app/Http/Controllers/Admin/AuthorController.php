<?php

namespace App\Http\Controllers\Admin;

use App\Models\Author;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class AuthorController extends Controller {

    public function index() {
        $authors = Author::all();
        return response()->json($authors);
    }


    public function store(Request $request) {
        $validator = Validator::make($request->all(), [ 
            'fname' => 'required',
            'fname' => 'required'
        ]);
      
        if ($validator->fails()) {
          return response()->json(['message' => 'Fields validation failed',
           'errors'=> $validator->errors()], 400);
        }

        $author = Author::create([
            'first_names' => $request->fname,
            'last_name' => $request->lname,
        ]);

        return response()->json([
            'message' => 'An author has been created',
            'author' => $author
        ]);
    }

    public function show($id) {
        $author = Author::where('id', $id)->with('books')->firstOrFail();
        return response()->json($author);
    }


    public function update(Request $request, $id) {
        $author = Author::where('id', $id)->firstOrFail();
        if ($request->fname) {
            $author->first_names = $request->fname;
        }

        if ($request->lname) {
            $author->last_name = $request->lname;
        }

        $author->save();

        return response()->json([
            'message' => 'An author has been updated',
            'author' => $author
        ]);
    }


    public function delete($id) {
        $author = Author::where('id', $id)->firstOrFail();
        $numberOfBooks = $author->books()->count();

        if ($numberOfBooks) {
            return response()->json(['message' => 'You can not delete an author with assigned books. Detach or delete them first'], 409);
        }

        $author->delete();
        return response()->json([
            'message' => 'An author has been deleted'
        ]);
    }
}
