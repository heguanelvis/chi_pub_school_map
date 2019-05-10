mapboxgl.accessToken = 'pk.eyJ1IjoiaGVndWFuZWx2aXMiLCJhIjoiY2p0cWFnMmR4MGRlOTQ1bXVkNGhqbnYxYiJ9.g43Zo8jIYEj6l-o_3MD3Hg';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    zoom: 10,
    center: [-87.6298, 41.8351]
});

map.on('load', () => {
    map.addSource('cpsSource', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/heguanelvis/chi_pub_school_map/master/cps.geojson'
    });

    map.addLayer({
        "id": "cpsPoints",
        "type": "circle",
        "source": "cpsSource",
        "paint": {
            "circle-radius": 6,
            "circle-color": "#d97d0d",
            "circle-opacity": 0.6,
            "circle-stroke-color": "#ffffff",
            "circle-stroke-width": 0.5
        }
    });

    map.on('click', 'cpsPoints', e => {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(formatName(e.features[0].properties.short_name))
            .addTo(map);
    });

    map.on('mouseenter', 'cpsPoints', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'cpsPoints', () => {
        map.getCanvas().style.cursor = '';
    });

    map.addControl(new mapboxgl.FullscreenControl());
});

function formatName(capName) {
    capName = capName.toLowerCase();
    nameArr = capName.split(" ");
    capArr = [];

    nameArr.forEach(word => {
        capArr.push(word.charAt(0).toUpperCase() + word.slice(1));
    });

    return capArr.join(" ");
}