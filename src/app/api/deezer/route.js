export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const artist = searchParams.get('artist');

    if (!artist) {
        return Response.json({ error: 'Artist name required' }, { status: 400 });
    }

    try {
        const deezerResponse = await fetch(
            `https://api.deezer.com/search/artist?q=${encodeURIComponent(artist)}&limit=1`
        );
        
        if (!deezerResponse.ok) {
            throw new Error('Deezer API error');
        }

        const deezerData = await deezerResponse.json();
        
        return Response.json({
            picture_small: deezerData.data?.[0]?.picture_small || null
        });
    } catch (error) {
        console.error('Deezer proxy error:', error);
        return Response.json({ error: 'Failed to fetch from Deezer' }, { status: 500 });
    }
}