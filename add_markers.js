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
            var streetViewPanoramaInfoWindow = new google.maps.InfoWindow({
                content: contentString,
                position: latLng, // refer to step #2
                disableAutoPan: true // optional but helpful
            });
            marker.addListener('click', function () {
                var streetViewPanorama = map.getStreetView();

                // when streetview was engaged
                if (streetViewPanorama.getVisible() == true) {
                    streetViewPanoramaInfoWindow.open(streetViewPanorama); // refer to step #3
                }
                // when normal aerial view was engaged
                else {
                    infowindow.open(map, marker); // refer to step #3
                }
            });
        }
    }) 
})

// Chicago
$.get("https://data.cityofchicago.org/resource/we8h-apcf.json", (data) => {
    console.log(data)

    data.forEach(e => {

        let title_str = (e.artwork_title === undefined ? "" : ('<h1 id="firstHeading" class="firstHeading">' + e.artwork_title + '</h1>'));
        let medium_str = (e.media === undefined ? "" : ('<p><b> Media: </b>' + e.media + '</p>'));
        let artist_credit = (e.artist_credit === undefined ? "" : ('<p><b> Artist: </b>' + e.artist_credit + '</p>'))
        let desc_str = (e.description_of_artwork === undefined ? "" : ('<p>' + e.description_of_artwork + '</p>' ));
        let addl = (e.artwork_title === "Rush More" ? ('<p> By the way, this mural was made possible by Kevin, who I know, which is pretty cool. He\'s pretty cool too. </p>' ) : "")
        var contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            title_str +
            '<div id="bodyContent">' +
            artist_credit +
            medium_str +
            desc_str +
            addl + 
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
            var streetViewPanoramaInfoWindow = new google.maps.InfoWindow({
                content: contentString,
                position: latLng, // refer to step #2
                disableAutoPan: true // optional but helpful
            });
            marker.addListener('click', function () {
                var streetViewPanorama = map.getStreetView();

                // when streetview was engaged
                if (streetViewPanorama.getVisible() == true) {
                    streetViewPanoramaInfoWindow.open(streetViewPanorama); // refer to step #3
                }
                // when normal aerial view was engaged
                else {
                    infowindow.open(map, marker); // refer to step #3
                }
            });
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
            var streetViewPanoramaInfoWindow = new google.maps.InfoWindow({
                content: contentString,
                position: latLng, // refer to step #2
                disableAutoPan: true // optional but helpful
            });
            marker.addListener('click', function () {
                var streetViewPanorama = map.getStreetView();

                // when streetview was engaged
                if (streetViewPanorama.getVisible() == true) {
                    streetViewPanoramaInfoWindow.open(streetViewPanorama); // refer to step #3
                }
                // when normal aerial view was engaged
                else {
                    infowindow.open(map, marker); // refer to step #3
                }
            });
        }
    })
});

// Norfolk VA
$.get("https://data.norfolk.gov/resource/k8ry-iqjg.json", (data) => {
    console.log(data)
    data.forEach(e => {
        let title_str = (e.artwork_name === undefined ? "" : ('<h1 id="firstHeading" class="firstHeading">' + e.artwork_name + '</h1>'));
        let artist_str = (e.artist === undefined ? "" : ('<p><b> Artist: </b>' + e.artist + '</p>'));
        let type_str = (e.category === undefined ? "" : ('<p><b> Type: </b>' + e.category + '</p>'));
        let material_str = (e.media === undefined ? "" : ('<p><b> Material: </b>' + e.media + '</p>'));
        var contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            title_str +
            '<div id="bodyContent">' +
            artist_str +
            type_str +
            material_str +
            '</div>' +
            '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        if (e.geocoded_column !== undefined) {
            var latLng = new google.maps.LatLng(e.geocoded_column.coordinates[1], e.geocoded_column.coordinates[0])
            var marker = new google.maps.Marker({
                position: latLng,
                map: map,
            })
            var streetViewPanoramaInfoWindow = new google.maps.InfoWindow({
                content: contentString,
                position: latLng, // refer to step #2
                disableAutoPan: true // optional but helpful
            });
            marker.addListener('click', function () {
                var streetViewPanorama = map.getStreetView();

                // when streetview was engaged
                if (streetViewPanorama.getVisible() == true) {
                    streetViewPanoramaInfoWindow.open(streetViewPanorama); // refer to step #3
                }
                // when normal aerial view was engaged
                else {
                    infowindow.open(map, marker); // refer to step #3
                }
            });
        }
    })
});

// LA
$.get("https://data.lacounty.gov/resource/5hc5-td4w.json", (data) => {
    console.log(data)
    data.forEach(e => {
        let address = e.location_street_address;
        let city = e.location_street_city;
        let title_str = (e.title === undefined ? "" : ('<h1 id="firstHeading" class="firstHeading">' + e.title + '</h1>'));
        let artist_str = (e.artist_name === undefined ? "" : ('<p><b> Artist: </b>' + e.artist_name + '</p>'));
        let type_str = (e.object_type === undefined ? "" : ('<p><b> Type: </b>' + e.object_type + '</p>'));
        let material_str = (e.media_support === undefined ? "" : ('<p><b> Material: </b>' + e.media_support + '</p>'));
        let desc_str = (e.artwork_description === undefined ? "" : ('<p>' + e.artwork_description + '</p>'));
        var contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            title_str +
            '<div id="bodyContent">' +
            desc_str +
            artist_str +
            type_str +
            material_str +
            '</div>' +
            '</div>';
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        $.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}+${city},CA&key=AIzaSyDas_wKrazAnJ0-vIaOrxrIJvSRsWdYBro`, (l) => {
            var marker = new google.maps.Marker({
                position: l.results[0].geometry.location,
                map: map,
            })
            var streetViewPanoramaInfoWindow = new google.maps.InfoWindow({
                content: contentString,
                position: l.results[0].geometry.location, // refer to step #2
                disableAutoPan: true // optional but helpful
            });
            marker.addListener('click', function () {
                var streetViewPanorama = map.getStreetView();

                // when streetview was engaged
                if (streetViewPanorama.getVisible() == true) {
                    streetViewPanoramaInfoWindow.open(streetViewPanorama); // refer to step #3
                }
                // when normal aerial view was engaged
                else {
                    infowindow.open(map, marker); // refer to step #3
                }
            });
        })
    })
})

$.get("https://www.nycgovparks.org/bigapps/DPR_PublicArt_001.json", (data) => {
    data = JSON.parse(data);
    data.forEach(e => {
        let title_str = (e.name === undefined ? "" : ('<h1 id="firstHeading" class="firstHeading">' + e.name + '</h1>'));
        let desc = (e.description === undefined ? "" : '<div> ' + e.description + '</div>');
        let artist_str = (e.artist === undefined ? "" : ('<p><b> Artist: </b>' + e.artist + '</p>'));
        var contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            title_str +
            '<div id="bodyContent">' +
            desc +
            artist_str +
            '</div>' +
            '</div>';
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        if (e.lat !== undefined) {
            var latLng = new google.maps.LatLng(e.lat, e.lng);
            var marker = new google.maps.Marker({
                position: latLng,
                map: map,
            })
            var streetViewPanoramaInfoWindow = new google.maps.InfoWindow({
                content: contentString,
                position: latLng, // refer to step #2
                disableAutoPan: true // optional but helpful
            });
            marker.addListener('click', function () {
                var streetViewPanorama = map.getStreetView();

                // when streetview was engaged
                if (streetViewPanorama.getVisible() == true) {
                    streetViewPanoramaInfoWindow.open(streetViewPanorama); // refer to step #3
                }
                // when normal aerial view was engaged
                else {
                    infowindow.open(map, marker); // refer to step #3
                }
            });
        }
    })
})
