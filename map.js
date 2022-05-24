const apiKey =
  "AAPKd21ba7fecd194bbfb91e51c6855193f3LlRpi0VvNb9swWuoq8yHhj_z-kTsFXCIJh3vPw1mSwPT9dUbx36dFE5vk4qEnuDu";

const basemapEnum = "ArcGIS:Navigation";

var newMarker;

/* BASIC MAP */

var startlat = 47.497913;
var startlon = 19.040236;

let map = L.map("map", {
  center: [startlat, startlon],
  zoom: 13,
  scrollWheelZoom: false,
});

/* POPUP AND ADDRESS */

function addPopup(marker) {
  let addressLat = marker.getLatLng().lat;
  let addressLng = marker.getLatLng().lng;
  // OSM Nomitatim documentation: http://wiki.openstreetmap.org/wiki/Nominatim
  var jsonQuery =
    "http://nominatim.openstreetmap.org/reverse?format=json&lat=" +
    addressLat +
    "&lon=" +
    addressLng +
    "&zoom=18&addressdetails=1";

  $.getJSON(jsonQuery).done(function (result_data) {
    //   console.log(result_data);

    var road;

    if (result_data.address.road) {
      road = result_data.address.road;
    } else if (result_data.address.pedestrian) {
      road = result_data.address.pedestrian;
    } else {
      road = "No definition";
    }

    var popup_text =
      "<b>Latlng:</b> " +
      addressLat +
      ", " +
      addressLng +
      "</br><b>Address:</b> " +
      road +
      ", " +
      result_data.address.house_number +
      "</br><b>District:</b> " +
      result_data.address.city_district +
      "</br><b>City:</b> " +
      result_data.address.city +
      "</br><b>Zip code:</b> " +
      result_data.address.postcode;

    document.getElementById("latitude").value = addressLat;
    document.getElementById("longitude").value = addressLng;

/* ez majd a submit gombra */

    let dest = $(".uticelokArticle");

    dest.append(
      "<p>" +
        result_data.address.city +
        ", " +
        result_data.address.country +
        "</p>"
    );
    dest.append(
      "<p>" +
        result_data.address.state +
        ", " +
        result_data.address.county +
        "</p>"
    );

    console.log(result_data.address.city + ", " + result_data.address.country); // város + ország
    console.log(result_data.address.state + ", " + result_data.address.county); // állam + megye

    marker.bindPopup(popup_text).openPopup();
  });
}

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

/* MAP CLICK */

map.on("click", function (e) {
  // removes old marker
  if (newMarker) {
    map.removeLayer(newMarker);
  }

  /* DRAG MARKER */

  newMarker = L.marker([e.latlng.lat, e.latlng.lng], { draggable: true })
    .addTo(map)
    .on("dragend", function (event) {
      // add popup information on dragged marker
      addPopup(newMarker);
    });
  document.getElementById("latitude").value = e.latlng.lat;
  document.getElementById("longitude").value = e.latlng.lng;
  addPopup(newMarker);
});

/* REVERSE GEOCODE */

/* L.esri.Vector.vectorBasemapLayer(basemapEnum, {
  apiKey: apiKey,
}).addTo(map);
 */
/* const layerGroup = L.layerGroup().addTo(map); */

/* map.on("click", function (e) {
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

      document.getElementById("latitude").value = result.latlng.lng;
      document.getElementById("longitude").value = result.latlng.lat;
    });
}); */

/* KERESŐ */

let searchDest = L.Control.geocoder().addTo(map);
/* document.getElementById("latitude").value = ;
document.getElementById("longitude").value = ; */

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

/* CÍM */

var myMarker = L.marker([startlat, startlon], {
  title: "Coordinates",
  alt: "Coordinates",
  draggable: true,
}).addTo(map); // alap marker mutatása (Budapest) + cím keresés utáni mutatása

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
