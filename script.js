mapboxgl.accessToken = 'pk.eyJ1IjoiaGVndWFuZWx2aXMiLCJhIjoiY2p0cWFnMmR4MGRlOTQ1bXVkNGhqbnYxYiJ9.g43Zo8jIYEj6l-o_3MD3Hg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 10,
    center: [-87.6298, 41.8351]
});

// https://data.cityofchicago.org/api/views/mntu-576c/rows.geojson
map.on('load', () => {
    map.addSource('pointsSource', {
        type: 'geojson',
        data: 'https://data.cityofchicago.org/api/views/mntu-576c/rows.geojson'
    });

    map.addLayer({
        "id": "points",
        "type": "circle",
        "source": "pointsSource",
        "paint": {
            "circle-radius": 3,
            "circle-color": "#007cbf"
        }
    });
});