(function(){
    'use strict';

    // add your script here
    var map = L.map('map').setView([30.571344, 104.021279], 12);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 14,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var marker = L.marker([30.571344, 104.021279]).addTo(map);
    marker.bindPopup('My home in China');
    

    var circle = L.circle([30.629578, 104.057908], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(map);
    circle.bindPopup("the district I hang out at a lot with my friends");

    var circle = L.circle([30.656002, 104.080722], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(map);
    circle.bindPopup("my go-to shopping spot");
}());

