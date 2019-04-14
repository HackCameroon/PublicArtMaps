var map;

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 36.1627, lng: -86.7816 },
        zoom: 13
    });
    infoWindow = new google.maps.InfoWindow;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            map.setCenter(pos);
            var marker = new google.maps.Marker({
                position: pos,
                map: map,
                icon: {
                    url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                }
            })
            var infowindow = new google.maps.InfoWindow({
                content: "Your Location"
            });
            marker.addListener('click', () => infowindow.open(map, marker))
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

// Nashville
$.get("https://data.nashville.gov/resource/xakp-ess3.json", (data) => {
    console.log(data)

    data.forEach(e => {

        let title_str = (e.title === undefined ? "" : ('<h1 id="firstHeading" class="firstHeading">' + e.title + '</h1>'));
        let type_str = (e.type === undefined ? "" : ('<p><b> Type: </b>' + e.type + '</p>'));
        let medium_str = (e.medium === undefined ? "" : ('<p><b> Medium: </b>' + e.medium + '</p>'));
        let desc_str = (e.description === undefined ? "" : ('<p>' + e.description + '</p>' ));
        var contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            title_str +
            '<div id="bodyContent">' +
            type_str +
            medium_str +
            desc_str +
            '</div>' +
            '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        if (e.mapped_location !== undefined) { 
            var latLng = new google.maps.LatLng(e.mapped_location.coordinates[1], e.mapped_location.coordinates[0])
            var marker = new google.maps.Marker({
                position: latLng,
                map: map,
            })
            marker.addListener('click', () => infowindow.open(map,marker))
        }
    }) 
})

// Austin!
$.get("https://data.austintexas.gov/resource/x98i-tia5.json", (data) => {
    console.log(data)
    data.forEach(e => {
        let title_str = (e.artwork_title === undefined ? "" : ('<h1 id="firstHeading" class="firstHeading">' + e.artwork_title + '</h1>'));
        let artist_str = (e.artist === undefined ? "" : ('<p><b> Artist: </b>' + e.artist + '</p>'));
        let material_str = (e.material === undefined ? "" : ('<p><b> Material: </b>' + e.material + '</p>'));
        var contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            title_str +
            '<div id="bodyContent">' +
            artist_str +
            material_str +
            '</div>' +
            '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        if (e.location !== undefined) {
            var latLng = new google.maps.LatLng(e.location.coordinates[1], e.location.coordinates[0])
            var marker = new google.maps.Marker({
                position: latLng,
                map: map,
            })
            marker.addListener('click', () => infowindow.open(map, marker))
        }
    })
})

