import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import { useLoaderData } from 'react-router';

const Coverage = () => {
    const position = [23.6850, 90.3563]
    const center = useLoaderData()
    const mapref = useRef(null)
    console.log(center);

    const handleSearch = (e) => {
        e.preventDefault()
        const location = e.target.location.value
        const district = center.find(c => c.district.toLowerCase().includes(location.toLowerCase()))
        if (district) {
            const coord = [district.latitude, district.longitude]
            console.log(district, coord);
            mapref.current.flyTo(coord,14)
        }

    }

    return (
        <div className='p-10 rounded-4xl mt-5 space-y-5'>
            <h1 className='text-3xl font-bold'>We are in 64 districts</h1>
            {/* Search */}
            <div>
                <form onSubmit={handleSearch}>
                    <label className="input rounded-full bg-gray-200">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input name='location' type="search" className="grow" placeholder="Search" />

                    </label>
                </form>
            </div>
            {/* Map */}
            <div className='h-[800px] space-y-4 mb-10'>
                <h1 className='font-bold'>We deliver almost all over Bangladesh</h1>
                <MapContainer
                    center={position}
                    zoom={8}
                    scrollWheelZoom={false}
                    className='h-[800px]'
                    ref={mapref}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        center.map((place, index) =>
                            <Marker key={index} position={[place.latitude, place.longitude]}>
                                <Popup>
                                    <strong>{place.district}</strong> <br /> <strong>Service Area:</strong> {place.covered_area.join(', ')}
                                </Popup>
                            </Marker>
                        )
                    }

                </MapContainer>
            </div>
        </div>
    );
};

export default Coverage;