export async function GET() {
  const letterboxdUser = process.env.NEXT_PUBLIC_LETTERBOXD_USERNAME;
  if (!letterboxdUser) {
    return Response.json({ error: 'Letterboxd is not configured' }, { status: 500 });
  }
  try {
    const response = await fetch(`https://letterboxd.com/${letterboxdUser}/`);
    const html = await response.text();
    
    const filmCountMatch = html.match(/<span class="value">([\d,]+)<\/span><span class="definition[^>]*">Films<\/span>/);
    const yearlyFilmCountMatch = html.match(/<span class="value">([\d,]+)<\/span><span class="definition[^>]*">This year<\/span>/);
    
    const count = filmCountMatch ? filmCountMatch[1].replace(/,/g, '') : '500';
    const yearlyCount = yearlyFilmCountMatch ? yearlyFilmCountMatch[1].replace(/,/g, '') : '60';
    
    return new Response(JSON.stringify({ count, yearlyCount }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching Letterboxd data:', error);
    return new Response(JSON.stringify({ count: '500', yearlyCount: '60' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}