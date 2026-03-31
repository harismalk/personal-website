'use client';

import { useEffect, useState } from 'react';

function LastFm() {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const lastFmResponse = await fetch('/api/lastfm');
                const lastFmData = await lastFmResponse.json();
                const lastFmArtists = lastFmData?.topartists?.artist?.slice(0, 20) || [];

                const enhancedArtists = await Promise.all(
                    lastFmArtists.map(async (artist) => {
                        try {
                            const deezerProxyResponse = await fetch(
                                `/api/deezer?artist=${encodeURIComponent(artist.name)}`
                            );
                            const deezerData = await deezerProxyResponse.json();

                            return {
                                ...artist,
                                imageUrl: deezerData.picture_small || '/default-artist.png'
                            };
                        } catch (e) {
                            console.error(`Deezer error for ${artist.name}:`, e);
                            return {
                                ...artist,
                                imageUrl: '/default-artist.png'
                            };
                        }
                    })
                );

                setArtists(enhancedArtists);
            } catch (error) {
                console.error('Fetch error:', error);
                setError('Failed to load artist data');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return <p className="font-body font-light">Loading music data...</p>;
    }

    if (error) {
        return <p className="font-body font-light">{error}</p>;
    }

    return (
        <div className="mb-4">
            <h3 className="text-2xl font-body font-extrabold text-primary dark:text-darkSecondary mb-4 tracking-tighter dark:neon-glow">Top Artists This Week</h3>
            {artists.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                    {artists.map((artist, index) => (
                        <div key={`${artist.name}-${index}`} className="relative inline-block">
                            {/* Shadow Layer */}
                            <div className="absolute top-[4px] left-[4px] z-0">
                                <div className="p-2 pr-4 flex items-center whitespace-nowrap bg-primary dark:bg-darkSecondary rounded-full">
                                    <div className="w-6 h-6 mr-2 flex items-center justify-center">
                                        <img
                                            src={artist.imageUrl}
                                            alt={artist.name}
                                            className="w-5 h-5 object-cover rounded-full border border-[var(--primary)] dark:border-darkPrimary"
                                            onError={(e) => {
                                                e.target.src = '/default-artist.png';
                                            }}
                                        />

                                    </div>
                                    <span className="font-body font-medium text-[var(--primary)] text-base">
                                        {artist.name}
                                    </span>
                                </div>
                            </div>

                            {/* Main Card Layer */}
                            <div className="relative z-10 transition-all bg-background dark:bg-darkBackground2 p-2 pr-4 flex items-center whitespace-nowrap border border-primary dark:border-darkBackground2 md:hover:-translate-y-0.5 md:hover:-translate-x-0.5 rounded-full">
                                <div className="w-6 h-6 mr-2 flex items-center justify-center">
                                    <img
                                        src={artist.imageUrl}
                                        alt={artist.name}
                                        className="w-5 h-5 object-cover rounded-full border border-primary dark:border-0"
                                        onError={(e) => {
                                            e.target.src = '/default-artist.png';
                                        }}
                                    />

                                </div>
                                <span className="font-body font-medium text-[var(--primary)] text-base">
                                    {artist.name}
                                </span>
                            </div>
                        </div>
                    ))}

                </div>
            ) : (
                <p className="font-body font-light">Couldn't load music data at the moment.</p>
            )}
        </div>
    );
}

export default LastFm;