// app.js

// Initialize map
var map = L.map('map').setView([0, 0], 2);

// Add default OSM layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Add satellite imagery layer (use your preferred tile provider)
var satelliteLayer = L.tileLayer('https://example.com/{z}/{x}/{y}.jpg', {
    attribution: 'Satellite Imagery'
});

// Add layer control
var baseMaps = {
    "OSM Map": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
    "Satellite Imagery": satelliteLayer
};

L.control.layers(baseMaps).addTo(map);

// Add GeoJSON layer
var geojsonLayer = L.geoJSON().addTo(map);

// Enable file input for GeoJSON upload
var fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = '.geojson';

fileInput.addEventListener('change', function (e) {
    var file = e.target.files[0];

    if (file) {
        var reader = new FileReader();

        reader.onload = function (event) {
            var geojson = JSON.parse(event.target.result);
            geojsonLayer.clearLayers();
            geojsonLayer.addData(geojson);
        };

        reader.readAsText(file);
    }
});

// Add GeoJSON upload button to the map
//fileInput.style.position = 'absolute';
//fileInput.style.zIndex = 1000;
//fileInput.style.margin = '50px';

document.getElementById('map').appendChild(fileInput);

// Add search control
var searchControl = L.control.geocoder('YOUR_API_KEY').addTo(map);

// Add Leaflet.draw toolbar
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

var drawControl = new L.Control.Draw({
    edit: {
        featureGroup: drawnItems
    }
});

map.addControl(drawControl);

map.on('draw:created', function (e) {
    var layer = e.layer;
    drawnItems.addLayer(layer);
});
