<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

/**
 * Blog Controller
 * 
 * Handles blog posts for SEO and content marketing
 */
class BlogController extends Controller
{
    /**
     * Get published blog posts
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $posts = BlogPost::published()
                ->when($request->tag, function ($query, $tag) {
                    return $query->whereJsonContains('tags', $tag);
                })
                ->when($request->search, function ($query, $search) {
                    return $query->where(function ($q) use ($search) {
                        $q->where('title', 'like', "%{$search}%")
                          ->orWhere('excerpt', 'like', "%{$search}%")
                          ->orWhere('content', 'like', "%{$search}%");
                    });
                })
                ->orderBy('published_at', 'desc')
                ->paginate(12);

            return response()->json([
                'success' => true,
                'data' => $posts
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve blog posts',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get a single blog post
     */
    public function show(BlogPost $post): JsonResponse
    {
        try {
            if ($post->status !== 'published') {
                return response()->json([
                    'success' => false,
                    'message' => 'Blog post not found'
                ], 404);
            }

            // Increment views
            $post->incrementViews();

            // Get related posts
            $relatedPosts = BlogPost::published()
                ->where('id', '!=', $post->id)
                ->when($post->tags, function ($query) use ($post) {
                    return $query->where(function ($q) use ($post) {
                        foreach ($post->tags as $tag) {
                            $q->orWhereJsonContains('tags', $tag);
                        }
                    });
                })
                ->limit(3)
                ->get();

            return response()->json([
                'success' => true,
                'data' => [
                    'post' => $post,
                    'related_posts' => $relatedPosts
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve blog post',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get recent blog posts
     */
    public function recent(): JsonResponse
    {
        try {
            $posts = BlogPost::recent(6)->get();

            return response()->json([
                'success' => true,
                'data' => $posts
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve recent posts',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get popular blog posts
     */
    public function popular(): JsonResponse
    {
        try {
            $posts = BlogPost::popular(6)->get();

            return response()->json([
                'success' => true,
                'data' => $posts
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve popular posts',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}