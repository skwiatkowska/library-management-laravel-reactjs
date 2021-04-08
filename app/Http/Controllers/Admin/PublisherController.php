<?php

namespace App\Http\Controllers\Admin;

use App\Models\Publisher;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PublisherController extends Controller {

    public function index() {
        $publishers = Publisher::all();
        return response()->json($publishers);
    }

    public function store(Request $request) {
        $exisitingPublisher = Publisher::where('name', $request->name)->get()->first();
        if ($exisitingPublisher) {
            return response()->json(['message' => 'The publisher already exists'], 409);
        }

        $publisher = Publisher::create(['name' => $request->name]);
        return response()->json([
            'message' => 'A publisher has been created',
            'publisher' => $publisher
        ]);
    }

    public function show($id) {
        $publisher = Publisher::where('id', $id)->with('books')->firstOrFail();
        return response()->json($publisher);
    }

    public function update(Request $request, $id) {
        $request->validate([
            'name' => 'required'
        ]);

        $publisher = Publisher::where('id', '=', $id)->firstOrFail();

        $existingPublisher = Publisher::where('name', $request->name)->get();
        if ($existingPublisher->count() > 0) {
            return response()->json(['message' => 'The publisher already exists'], 409);
        }

        $publisher->update($request->all());

        return response()->json([
            'message' => 'A publisher has been updated',
            'publisher' => $publisher
        ]);
    }


    public function delete($id) {
        $publisher = Publisher::where('id', $id)->firstOrFail();
        $numberOfBooks = $publisher->books()->count();
        if ($numberOfBooks) {
            return response()->json(['message' => 'You cannot delete a publisher with assigned books. Detach or delete them first'], 409);
        }
        $publisher->delete();
        return response()->json([
            'message' => 'A publisher has been deleted'
        ]);
    }
}
