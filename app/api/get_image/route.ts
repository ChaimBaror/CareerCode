// src/app/api/get_image/route.ts
import { NextResponse } from 'next/server';

const unsplashApiKey = process.env.UNSPLASH_ACCESS_KEY;

if (!unsplashApiKey) {
  throw new Error('UNSPLASH_ACCESS_KEY environment variable is not set.');
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
      return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&client_id=${unsplashApiKey}`,
      {
        headers: {
          'Accept-Version': 'v1',
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Unsplash API error:', errorText);
      return NextResponse.json({ error: `Failed to fetch image: ${response.statusText}` }, { status: response.status });
    }

    const data = await response.json();
    const imageUrl = data?.urls?.regular;

    if (!imageUrl) {
      return NextResponse.json({ error: 'No image found for the query' }, { status: 404 });
    }

    return NextResponse.json({ imageUrl });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}