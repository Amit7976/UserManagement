function Map({ city }: { city: string }) {

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    const src = `https://maps.google.com/maps?width=100%&height=600&hl=en&q=${encodeURIComponent(
        city
    )}&ie=UTF8&t=&z=14&iwloc=B&output=embed`;


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    
    return (
        <>
            <div className="w-full px-4">
                <div className="relative h-96 mt-40 mb-10 w-full max-w-7xl mx-auto rounded-2xl lg:rounded-4xl overflow-hidden bg-gray-300">
                    <iframe
                        className="h-full w-full opacity-100"
                        title="map"
                        src={src}
                        allowFullScreen
                    ></iframe>
                    <div className="hidden dark:block absolute inset-0 bg-black opacity-50 pointer-events-none z-10" />
                </div>
            </div>
        </>
    );
}

export default Map;
