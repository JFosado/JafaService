(function () {
    const lat = 20.282989534444873;
    const lng = -97.95844769238957;
    const map = L.map('map').setView([lat, lng], 22);
    var greenIcon = L.icon({
        iconUrl: "img/Grupo 1.jpg",
    
        iconSize:     [55, 55], // size of the icon
    // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    let marker
    const geocoderService = L.esri.Geocoding.geocodeService();
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    marker = new L.marker([lat, lng], {
        draggable: true, //Puedes mover
        autoPan: true,
        icon: greenIcon,
    }).addTo(map);

   
    
    marker.on('moveend', function (e) { //Este es escuchador
        marker = e.target
        const position = marker.getLatLng()
        console.log(`El usuario solto el marcador en las coordenadas:${position.lat}, ${position.lng}`)
        map.panTo(new L.LatLng(position.lat, position.lng))

        //: OBTENER LA INFROMACION DE LA DIRECCION FISICA
        geocoderService.reverse().latlng(position, 13).run(function (error, result) {
            console.log(`La informacion calculada por geocoder al intentar hacer la georeferencia inversa es:${result}`)
            console.log(result)

            marker.bindPopup(result.address.LongLabel)


        })
    })
})();

