// src/app/api/get_image/route.ts
import { NextResponse } from 'next/server';

const unsplashApiKey = process.env.UNSPLASH_ACCESS_KEY;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
      return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    if (!unsplashApiKey) {
      return NextResponse.json({ error: 'Unsplash API key not configured' }, { status: 500 });
    }

    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&client_id=${unsplashApiKey}&orientation=landscape&content_filter=high`,
      {
        headers: {
          'Accept-Version': 'v1',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch image from Unsplash');
    }

    const data = await response.json();
    
    return NextResponse.json({
      imageUrl: data.urls.regular,
      thumbnailUrl: data.urls.small,
      altText: data.alt_description || query,
      photographer: data.user.name,
      photographerUrl: data.user.links.html
    });

  } catch (error) {
    console.error('Error fetching image:', error);
    return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 });
  }
}