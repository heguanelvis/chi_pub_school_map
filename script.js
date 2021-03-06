mapboxgl.accessToken = 'pk.eyJ1IjoiaGVndWFuZWx2aXMiLCJhIjoiY2p0cWFnMmR4MGRlOTQ1bXVkNGhqbnYxYiJ9.g43Zo8jIYEj6l-o_3MD3Hg';

swal("Welcome to CPS Map!", "You can view all Chicago Public Schools at different locations, their school information and profiles.");

let map = new mapboxgl.Map({
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
            "circle-opacity": ["case",
                ["boolean", ["feature-state", "hover"], false],
                1,
                0.6
            ],
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

    map.on("mousemove", "cpsPoints", e => {
        map.setPaintProperty("cpsPoints", 'circle-color', ["case", ["==", ["get", "longName"],
            e.features[0].properties.longName], "#732002", "#d97d0d"]);
    });

    map.on('mouseenter', 'cpsPoints', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'cpsPoints', () => {
        map.getCanvas().style.cursor = '';
        map.setPaintProperty("cpsPoints", 'circle-color', "#d97d0d");
    });

    map.addControl(new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    }));

    map.addControl(new mapboxgl.FullscreenControl());

    map.addControl(new mapboxgl.NavigationControl());

    document.querySelector(".fa-home").addEventListener('click', () => {
        map.flyTo({
            zoom: 10,
            center: [-87.6298, 41.8351]
        });
    });
});