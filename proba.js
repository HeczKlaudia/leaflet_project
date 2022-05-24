var mymap = L.map("mapid").setView([38.47939, -99.49219], 5);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(mymap);

var popup = L.popup();

function onMapClick(e) {
  document.getElementById("lat-lng").value = e.latlng.toString();

  popup
    .setLatLng(e.latlng)
    .setContent("Copy and Paste into the Form \n" + e.latlng.toString())
    .openOn(mymap);
}
document.getElementById("your-input-id").value = e.latlng.toString();

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
  iconUrl:
    "https://raw.githubusercontent.com/shacheeswadia/leaflet-map/main/beach-icon-chair.svg",
  iconSize: [40, 40],
});

const marker1 = L.marker([-37.69945, 176.27942] /* , {icon: basicBeachIcon} */)
  .bindPopup("Whitehaven Beach, Whitsunday Island")
  .addTo(map);
const marker2 = L.marker([-27.64331, 153.30514] /* , {icon: basicBeachIcon} */)
  .bindPopup("Turquoise Bay Exmouth, Australia")
  .addTo(map);
const marker3 = L.marker([-33.95633, 122.15027] /* , {icon: basicBeachIcon} */)
  .bindPopup("Cape Le Grand National Park Esperance, Australia")
  .addTo(map);
const marker4 = L.marker([-34.96239, 117.39122] /* , {icon: basicBeachIcon} */)
  .bindPopup("Greens Pool Denmark, Australia")
  .addTo(map);
const marker5 = L.marker([-17.96121, 122.21482] /* , {icon: basicBeachIcon} */)
  .bindPopup("Cable Beach Broome, Australia")
  .addTo(map);
const marker6 = L.marker([-16.50596, 151.75152] /* , {icon: basicBeachIcon} */)
  .bindPopup("Matira Beach, Society Islands")
  .addTo(map);
const marker7 = L.marker([-22.5944, 167.48444] /* , {icon: basicBeachIcon} */)
  .bindPopup("Piscine Naturelle Ile Des Pins, New Caledonia")
  .addTo(map);
const marker8 = L.marker([-37.977, 177.057] /* , {icon: basicBeachIcon} */)
  .bindPopup("Ohope Beach Whakatane, New Zealand")
  .addTo(map);
const marker9 = L.marker([-41.0376, 173.017] /* , {icon: basicBeachIcon} */)
  .bindPopup("Kaiteriteri Beach, New Zealand")
  .addTo(map);
const marker10 = L.marker([-37.6703, 176.212] /* , {icon: basicBeachIcon} */)
  .bindPopup("Mt Maunganui Main Beach, New Zealand")
  .addTo(map);

/* L.mapquest.key = 'dvd9kRGGQ258rP6npiIkZNSGyIQC7F3A';
var baseLayer = L.mapquest.tileLayer('dark');
          
L.mapquest.geocoding().geocode(['New York, NY'], showMap);

function showMap(err, data) {
  var map = createMap();
  map.addControl(L.mapquest.control());
  addLayerControl(map);
}


function addLayerControl(map) {
  L.control.layers({
    'Map': L.mapquest.tileLayer('map'),
    'Satellite': L.mapquest.tileLayer('satellite'),
    'Hybrid': L.mapquest.tileLayer('hybrid'),
    'Light': L.mapquest.tileLayer('light'),
    'Dark': baseLayer
  }, {}, { position: 'topleft'}).addTo(map);
} */

/* SEARCHBOX */

/* var searchbox =  new L.Control.Search({
  callData: googleGeocoding,
  filterJSON: filterJSONCall,
  wrapper: 'findbox',
  markerLocation: true,
  autoType: false,
  autoCollapse: true,
  minLength: 5,
  zoom: 10,
  initial: true,
  collapsed: false,
  tipAutoSubmit: false,
  autoResize: false,
  text: 'Enter an Address'
});

searchbox.on('search_locationfound', function(e) {
var locLat = e.latlng.lat;
var locLng = e.latlng.lng;
console.log(locLat+', '+locLng);
}); */

/* <link
rel="stylesheet"
href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
crossorigin=""
/>
<link
rel="stylesheet"
href="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css"
/> */

/* new marker + drag */

/* var myMarker = L.marker([startlat, startlon], {
  title: "Coordinates",
  alt: "Coordinates",
  draggable: true,
})
   .addTo(map) */

/* DRAG MARKER */
/* 
  .on("dragend", function () {
    var lat = myMarker.getLatLng().lat.toFixed(8);
    var lon = myMarker.getLatLng().lng.toFixed(8);
    var czoom = map.getZoom();
    if (czoom < 18) {
      nzoom = czoom + 2;
    }
    if (nzoom > 18) {
      nzoom = 18;
    }
    if (czoom != 18) {
      map.setView([lat, lon], nzoom);
    } else {
      map.setView([lat, lon]);
    }
  });
    
    document.getElementById("latitude").value = lat;
    document.getElementById("longitude").value = lon; 
    myMarker.bindPopup("Lat " + lat + "<br />Lon " + lon).openPopup();
    */

/* POLYGON SEARCH */

/*  var geocoder = L.Control.geocoder({
  defaultMarkGeocode: false
})
  .on('markgeocode', function(e) {
    var bbox = e.geocode.bbox;
    var poly = L.polygon([
      bbox.getSouthEast(),
      bbox.getNorthEast(),
      bbox.getNorthWest(),
      bbox.getSouthWest()
    ]).addTo(map);
    map.fitBounds(poly.getBounds());
  })
  .addTo(map); */

  /* TÉRKÉPRE KATTINTÁS */

/* var popup = L.popup();

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map);

  //  document.getElementById('country').value = e.latlng.toString();
}

map.on("click", onMapClick); */