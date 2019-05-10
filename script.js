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
        let content = `<h3 class="popup-school-title">${e.features[0].properties.longName}</h3>`;
        content += `<h4>${e.features[0].properties.phone}</h4>`;
        content += `<h4>${e.features[0].properties.address}</h4>`;
        content += `<h4>${e.features[0].properties.enrollment} students enrolled</h4>`;
        content += `<h4><a class="popup-school-link" href="${e.features[0].properties.schoolProfile}"`
        content += ` target="_blank">Check School Profile</a><h4>`;
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(content)
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