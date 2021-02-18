// jshint esversion:8


const mymap = L.map('mapid').setView([0, 0], 7);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

var locationIcon = L.icon({
    iconUrl: "images/icon-location.svg",
    iconSize:     [40, 50], // size of the icon
    iconAnchor:   [26.47, 54], // point of the icon which will correspond to marker's location
});


var ip = '';
var domain = '';
const api_key = 'at_DuAEc596vvl8lArKedKWCTVWqVwOb';
const api_url = 'https://geo.ipify.org/api/v1?';
var url = api_url + 'apiKey=' + api_key + '&ipAddress=' + ip + '&domain=' + domain;

async function search(){
    // document.getElementById("demo").style.display = "none"; // Input Alert display reset to none on next click.

    var inputvalue =  document.getElementById('ipAddress').value;

     if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(inputvalue))
      {
        console.log('its an IP address');
        ip = document.getElementById('ipAddress').value;
      } else if(/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(inputvalue)) {
        console.log("its a domain name");
        domain = document.getElementById('ipAddress').value;
      } else {
        alert("insira um endereço IP ou nome de domínio válido!");
        // document.getElementById("demo").style.display = "block";
        // document.getElementById('demo').innerHTML = 'hey! check your input';
        ip = '';
        domain = '';
      }

    url = await api_url + 'apiKey=' + api_key + '&ipAddress=' + ip + '&domain=' + domain;
    console.log(url);

    getData();
}

// Trigger button on clicking enter
var input = document.getElementById("ipAddress");
input.addEventListener("keypress", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("srchbtn").click();
  }
});
// _____________________Enter button close

const marker = L.marker([0, 0], {icon: locationIcon}).addTo(mymap);

async function getData() {
    const response = await fetch(url);
    const data =  await response.json();
    const lat = data.location.lat;
    const lon = data.location.lng;

    console.log(data);

    marker.setLatLng([lat, lon]);
    mymap.setView([lat, lon], 12);

    document.getElementById('box1').textContent = data.ip;
    document.getElementById('box2').textContent = data.location.city + ', ' + data.location.region + ' ' + data.location.country;
    document.getElementById('box3').textContent = 'UTC' + data.location.timezone;
    document.getElementById('box4').textContent = data.isp;
}
getData();

// -------------------------------------------------------------------------------------------

// location&ipAddress captured ----------------------------------------
// var api_Key = "at_DuAEc596vvl8lArKedKWCTVWqVwOb";
// var ipadd = "";
// var domain = "";
// var rlink = "https://geo.ipify.org/api/v1?apiKey=";
// var link= rlink + api_Key + "&ipAddress=" + ipadd + "&domain=" + domain;
// var dataa = "";
// var url = "";
//
// async function search() {
//   inputvalue = document.getElementById('ipAddress').value;
//   if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(inputvalue)) {
//     console.log('its an IP address');
//     console.log( document.getElementById('ipAddress').value);
//     ipadd = document.getElementById('ipAddress').value;
//     url = await rlink + api_Key + '&ipAddress=' + ipadd + '&domain=' + domain;
//     console.log(url);
//   } else if (/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(inputvalue)) {
//     console.log("its a domain name");
//     return  document.getElementById('ipAddress').value;
//   } else {
//     alert("please enter a valid IP address or domain name!");
//     ipadd = '';
//     domain = '';
//   }
  // $.get(url, function info(dataa){
  //   document.getElementById('box1').textContent = dataa.ip;
  //   document.getElementById('box2').textContent = dataa.location.region + ', ' + dataa.location.country + ' ' + dataa.location.postalCode;
  //   document.getElementById('box3').textContent = 'UTC' + dataa.location.timezone;
  //   document.getElementById('box4').textContent = dataa.isp;
  //   var lattitude = dataa.location.lat;
  //   var longitude = dataa.location.lng;
    // map -----------------------------------------------

//     var mymap = L.map('mapid').setView([lattitude, longitude], 13);
//
//
//     L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoicml0ZWVzc3NoaCIsImEiOiJja2w4YWR6eGIyeXF0MnJxbzNnb2phb2p0In0.KzZ7aKqlFEFXoHWSAKwDgQ', {
//       maxZoom: 18,
//       attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
//         'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//       id: 'mapbox/streets-v11',
//       tileSize: 512,
//       zoomOffset: -1
//     }).addTo(mymap);
//
//     L.marker([lattitude, longitude]).addTo(mymap);
//   });
// }
// Trigger button on clicking enter
// var input = document.getElementById("ipAddress");
// input.addEventListener("keypress", function(event) {
//   if (event.keyCode === 13) {
//     event.preventDefault();
//     document.getElementById("srchbtn").click();
//   }
// });
// $.get(link, function info(dataa) {
//   // console.log( typeof dataa ); // string
//   // console.log( dataa ); // HTML content of the jQuery.ajax page
//   document.getElementById('box1').textContent = dataa.ip;
//   document.getElementById('box2').textContent = dataa.location.region + ', ' + dataa.location.country + ' ' + dataa.location.postalCode;
//   document.getElementById('box3').textContent = 'UTC' + dataa.location.timezone;
//   document.getElementById('box4').textContent = dataa.isp;
//   const lattitude = dataa.location.lat;
//   const longitude = dataa.location.lng;
//
//   // map -----------------------------------------------
//   var mymap = L.map('mapid').setView([lattitude, longitude], 13);
//
//   L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoicml0ZWVzc3NoaCIsImEiOiJja2w4YWR6eGIyeXF0MnJxbzNnb2phb2p0In0.KzZ7aKqlFEFXoHWSAKwDgQ', {
//     maxZoom: 18,
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
//       'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     id: 'mapbox/streets-v11',
//     tileSize: 512,
//     zoomOffset: -1
//   }).addTo(mymap);
//
//   L.marker([lattitude, longitude]).addTo(mymap);
//
// });

// async function getdata() {
//   const response = await fetch(link);
//   const data = await response.json();
//   const lattitude = data.location.lat;
//   const longitude = data.location.lng;
//
//   console.log(data);
//
//   // marker.setLatLng([lattitude, longitude]);
//   // mymap.setView([lattitude, longitude], 4);
//
//   document.getElementById('box1').textContent = data.ip;
//   document.getElementById('box2').textContent = data.location.region + ', ' + data.location.country + ' ' + data.location.postalCode;
//   document.getElementById('box3').textContent = 'UTC' + data.location.timezone;
//   document.getElementById('box4').textContent = data.isp;
//
// }

//-----------------------------------------------------------------------------------------------


// getdata();
// _____________________Enter button close





// .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();


// fetch(link)
//   .then(function (response) {
//     dataa = response.json();
//   });
//   console.log(dataa);

// var popup = L.popup()
//     .setLatLng([51.5, -0.09])
//     .setContent("I am a standalone popup.")
//     .openOn(mymap);

// var marker = L.marker([51.5, -0.09]).addTo(mymap);


// mapboxgl.accessToken = 'pk.eyJ1Ijoicml0ZWVzc3NoaCIsImEiOiJja2w4YWR6eGIyeXF0MnJxbzNnb2phb2p0In0.KzZ7aKqlFEFXoHWSAKwDgQ'
