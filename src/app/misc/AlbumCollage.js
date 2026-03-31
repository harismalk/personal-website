'use client';

import { useEffect, useState } from 'react';

export default function AlbumCollage() {
    const [albums, setAlbums] = useState([]);
    const [activeAlbum, setActiveAlbum] = useState(null);

    useEffect(() => {
        fetch('/data/albums.json')
            .then(response => response.json())
            .then(data => setAlbums(data))
            .catch(error => console.error('Error loading albums data:', error));
    }, []);

    const handleAlbumClick = (index) => {
        if (activeAlbum === index) {
            setActiveAlbum(null);
        } else {
            setActiveAlbum(index);
        }
    };

    const handleClickOutside = () => {
        setActiveAlbum(null);
    };

    if (albums.length === 0) {
        return <div className="font-body">Loading albums...</div>;
    }

    return (
        <div onClick={handleClickOutside}>
            <h3 className="text-2xl font-body font-bold text-primary dark:text-darkSecondary mb-4 tracking-tighter dark:neon-glow">Favourite Albums</h3>
            <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2">
                {albums.map((album, index) => (
                    <div 
                        key={index} 
                        className={`relative group ${activeAlbum === index ? 'z-20' : 'z-0'}`}
                    >
                        <div
                            className="aspect-square"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleAlbumClick(index);
                            }}
                        >
                            <img
                                src={album.image}
                                alt={`${album.artist} - ${album.title}`}
                                className="w-full h-full object-cover transition-all border border-primary dark:border-darkBackground rounded-xl"
                            />
                        </div>

                        <div className={`absolute sm:flex flex-col -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-background dark:bg-darkBackground2 p-2 sm:opacity-0 sm:group-hover:opacity-100 transition-all z-10 text-xs border border-primary dark:border-darkBackground2 whitespace-nowrap w-auto min-w-[100px] lg:min-w-[120px] max-w-[300px] pointer-events-none rounded-xl dark:shadow-[0_0_15px_rgba(0,0,0,0.1)]
                            ${activeAlbum === index ? 'flex opacity-100' : 'hidden opacity-0'}`}
                        >
                            <p className="font-bold dark:text-darkSecondary text-base font-body text-center text-wrap leading-tight tracking-tighter dark:neon-glow" title={album.title}>{album.title}</p>
                            <p className="font-light font-body text-center text-wrap" title={album.artist}>{album.artist}</p>
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-primary dark:border-t-darkBackground2"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}