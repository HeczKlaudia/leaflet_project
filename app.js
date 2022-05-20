/* ALAP TÉRKÉP */

const map = L.map("map", {
  center: [-29.5, 145],
  zoom: 3.5,
  scrollWheelZoom: false
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// jelölők
/* const marker1 = L.marker([-37.69945, 176.27942]).addTo(map);
const marker2 = L.marker([-27.64331, 153.30514]).addTo(map);
const marker3 = L.marker([-33.95633, 122.15027]).addTo(map);
const marker4 = L.marker([-34.96239, 117.39122]).addTo(map);
const marker5 = L.marker([-17.96121, 122.21482]).addTo(map);
const marker6 = L.marker([-16.50596, 151.75152]).addTo(map);
const marker7 = L.marker([-22.5944, 167.48444]).addTo(map);
const marker8 = L.marker([-37.977, 177.057]).addTo(map);
const marker9 = L.marker([-41.0376, 173.017]).addTo(map);
const marker10 = L.marker([-37.6703, 176.212]).addTo(map); */

// jelölők felugró ablakkal és ikonnal
const basicBeachIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/shacheeswadia/leaflet-map/main/beach-icon-chair.svg',
    iconSize: [40, 40],
  });

const marker1 = L.marker([-37.699450, 176.279420]/* , {icon: basicBeachIcon} */)
    .bindPopup('Whitehaven Beach, Whitsunday Island')
    .addTo(map);
const marker2 = L.marker([-27.643310, 153.305140]/* , {icon: basicBeachIcon} */)
    .bindPopup('Turquoise Bay Exmouth, Australia')
    .addTo(map);
const marker3 = L.marker([-33.956330, 122.150270]/* , {icon: basicBeachIcon} */)
    .bindPopup('Cape Le Grand National Park Esperance, Australia')
    .addTo(map);
const marker4 = L.marker([-34.962390, 117.391220]/* , {icon: basicBeachIcon} */)
    .bindPopup('Greens Pool Denmark, Australia')
    .addTo(map);
const marker5 = L.marker([-17.961210, 122.214820]/* , {icon: basicBeachIcon} */)
    .bindPopup('Cable Beach Broome, Australia')
    .addTo(map);
const marker6 = L.marker([-16.505960, 151.751520]/* , {icon: basicBeachIcon} */)
    .bindPopup('Matira Beach, Society Islands')
    .addTo(map);
const marker7 = L.marker([-22.594400, 167.484440]/* , {icon: basicBeachIcon} */)
    .bindPopup('Piscine Naturelle Ile Des Pins, New Caledonia')
    .addTo(map);
const marker8 = L.marker([-37.977000, 177.057000]/* , {icon: basicBeachIcon} */)
    .bindPopup('Ohope Beach Whakatane, New Zealand')
    .addTo(map);
const marker9 = L.marker([-41.037600, 173.017000]/* , {icon: basicBeachIcon} */)
    .bindPopup('Kaiteriteri Beach, New Zealand')
    .addTo(map);
const marker10 = L.marker([-37.670300, 176.212000]/* , {icon: basicBeachIcon} */)
    .bindPopup('Mt Maunganui Main Beach, New Zealand')
    .addTo(map);


/* LAYEREK */

const basemaps = {
  StreetView: L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  ),
  Topography: L.tileLayer.wms("http://ows.mundialis.de/services/service?", {
    layers: "TOPO-WMS",
  }),
  Places: L.tileLayer.wms("http://ows.mundialis.de/services/service?", {
    layers: "OSM-Overlay-WMS",
  }),
}; // layerek

L.control.layers(basemaps).addTo(map); // layer választó menü

basemaps.Topography.addTo(map);