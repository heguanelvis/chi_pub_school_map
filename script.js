mapboxgl.accessToken = 'pk.eyJ1IjoiaGVndWFuZWx2aXMiLCJhIjoiY2p0cWFnMmR4MGRlOTQ1bXVkNGhqbnYxYiJ9.g43Zo8jIYEj6l-o_3MD3Hg';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 10,
    center: [-87.6298, 41.8351]
});

map.on('load', () => {
    map.addSource('cpsSource', {
        type: 'geojson',
        data: 'https://data.cityofchicago.org/api/views/mntu-576c/rows.geojson'
    });

    map.addLayer({
        "id": "cpsPoints",
        "type": "circle",
        "source": "cpsSource",
        "paint": {
            "circle-radius": 5,
            "circle-color": "#007cbf"
        }
    });

    map.on('click', 'cpsPoints', e => {
        console.log("clicked")
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.school_nm)
            .addTo(map);
    });

    map.on('mouseenter', 'cpsPoints', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'cpsPoints', () => {
        map.getCanvas().style.cursor = '';
    });
});