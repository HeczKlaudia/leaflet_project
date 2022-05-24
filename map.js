const apiKey =
  "AAPKd21ba7fecd194bbfb91e51c6855193f3LlRpi0VvNb9swWuoq8yHhj_z-kTsFXCIJh3vPw1mSwPT9dUbx36dFE5vk4qEnuDu";

const basemapEnum = "ArcGIS:Navigation";

/* ALAP TÉRKÉP */

var startlat = 47.497913;
var startlon = 19.040236;

let map = L.map("map", {
  center: [startlat, startlon],
  zoom: 13,
  scrollWheelZoom: false,
});

document.getElementById("latitude").value = startlat;
document.getElementById("longitude").value = startlon;

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

/* KERESŐ */

let searchDest = L.Control.geocoder().addTo(map);

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

basemaps.StreetView.addTo(map);

/* REVERSE GEOCODE */

/* L.esri.Vector.vectorBasemapLayer(basemapEnum, {
  apiKey: apiKey,
}).addTo(map);
 */
const layerGroup = L.layerGroup().addTo(map);

map.on("click", function (e) {
  L.esri.Geocoding.reverseGeocode({
    apikey: apiKey,
  })
    .latlng(e.latlng)
    .run(function (error, result) {
      if (error) {
        return;
      }

      const lngLatString = `${
        Math.round(result.latlng.lng * 100000) / 100000
      }, ${Math.round(result.latlng.lat * 100000) / 100000}`;

      layerGroup.clearLayers();
      marker = L.marker(result.latlng)
        .addTo(layerGroup)
        .bindPopup(`<b>${lngLatString}</b><p>${result.address.Match_addr}</p>`)
        .openPopup();
    });
});

/* DRAG MARKER */

var myMarker = L.marker([startlat, startlon], {
  title: "Coordinates",
  alt: "Coordinates",
  draggable: true,
})
  .addTo(map)
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
    document.getElementById("latitude").value = lat;
    document.getElementById("longitude").value = lon;
    myMarker.bindPopup("Lat " + lat + "<br />Lon " + lon).openPopup();
  });

function chooseAddr(lat1, lng1) {
  myMarker.closePopup();
  map.setView([lat1, lng1], 18);
  myMarker.setLatLng([lat1, lng1]);
  lat = lat1.toFixed(8);
  lon = lng1.toFixed(8);
  document.getElementById("latitude").value = lat;
  document.getElementById("longitude").value = lon;
  myMarker.bindPopup("Lat " + lat + "<br />Lon " + lon).openPopup();
}

function myFunction(arr) {
  var out = "<br />";
  var i;

  if (arr.length > 0) {
    for (i = 0; i < arr.length; i++) {
      out +=
        "<div class='address' title='Show Location and Coordinates' onclick='chooseAddr(" +
        arr[i].lat +
        ", " +
        arr[i].lon +
        ");return false;'>" +
        arr[i].display_name +
        "</div>";
    }
    document.getElementById("results").innerHTML = out;
  } else {
    document.getElementById("results").innerHTML = "Sorry, no results...";
  }
}

function addr_search() {
  var inp = document.getElementById("addr");
  var xmlhttp = new XMLHttpRequest();
  var url =
    "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" +
    inp.value;
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var myArr = JSON.parse(this.responseText);
      myFunction(myArr);
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

/* ŰRLAP */

function submitForm(event) {
  event.preventDefault();
  console.log("submitted");

  start = document.getElementById("latitude").value;
  end = document.getElementById("longitude").value;
}

const form = document.getElementById("form");

form.addEventListener("submit", submitForm);

/* TÉRKÉPRE KATTINTÁS */

var popup = L.popup();

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map);

  //  document.getElementById('country').value = e.latlng.toString();
}

map.on("click", onMapClick);