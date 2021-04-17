<?php

namespace App\Http\Controllers;

use App\Models\Category;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CategoryController extends Controller {

    public function index() {
        $categories = Category::all();
        return response()->json($categories);
    }


    public function store(Request $request) {
        $request->validate([
            'name' => 'required'
        ]);

        $exisitingCategory = Category::where('name', $request->name)->get()->first();

        if ($exisitingCategory) {
            return response()->json(['message' => 'The category already exists'], 409);
        }
        $category = Category::create(['name' => $request->name]);

        return response()->json([
            'message' => 'A category has been created',
            'category' => $category
        ]);
    }


    public function show($id) {
        $category = Category::where('id', $id)->firstOrFail();
        return response()->json($category);
    }


    public function update(Request $request, $id) {
        $request->validate([
            'name' => 'required'
        ]);

        $category = Category::where('id', $id)->firstOrFail();
        $category->update($request->all());

        return response()->json([
            'message' => 'An category has been updated',
            'category' => $category
        ]);
    }


    public function delete($id) {
        $category = Category::where('id', $id)->firstOrFail();
        $category->delete();
        return response()->json([
            'message' => 'An category has been deleted'
        ]);
    }
}
