function initMap() {

    const buuDien = new google.maps.LatLng(10.78005814285056, 106.69991822581564);
    const vanMieu = new google.maps.LatLng(21.027570230561004, 105.83517853942371);
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: buuDien,
    });

    var arrayPoint = [
        new google.maps.geometry.spherical.computeOffset(buuDien, 13000, 0),
        new google.maps.geometry.spherical.computeOffset(buuDien, 13000, 120),
        new google.maps.geometry.spherical.computeOffset(buuDien, 13000, -120),
        new google.maps.geometry.spherical.computeOffset(buuDien, 13000 * 2, 0),
        new google.maps.geometry.spherical.computeOffset(buuDien, 13000 * 2, 120),
        new google.maps.geometry.spherical.computeOffset(buuDien, 13000 * 2, -120),
        new google.maps.geometry.spherical.computeOffset(vanMieu, 13000, 0),
        new google.maps.geometry.spherical.computeOffset(vanMieu, 13000, 120),
        new google.maps.geometry.spherical.computeOffset(vanMieu, 13000, -120),
        new google.maps.geometry.spherical.computeOffset(vanMieu, 13000 * 2, 0),
        new google.maps.geometry.spherical.computeOffset(vanMieu, 13000 * 2, 120),
        new google.maps.geometry.spherical.computeOffset(vanMieu, 13000 * 2, -120),
    ]


    //begin drawing 


    //function drawing Cricle 
    function drawingCricle(a) {
        const Cricle = new google.maps.Circle({
            strokeColor: "#FF0000",
            map: map,
            editable: false,
            center: a,
            radius: 13000,
        });
    }
    drawingCricle(buuDien);
    drawingCricle(vanMieu);

    //function drawing Triangle
    function drawingTriangle(a, b, c) {
        const triangle = new google.maps.Polygon({
            paths: [a, b, c],
            strokeColor: "yellow",
            strokeOpacity: 1,
            strokeWeight: 2,
        });
        triangle.setMap(map);
    }

    drawingTriangle(arrayPoint[0], arrayPoint[1], arrayPoint[2]);
    drawingTriangle(arrayPoint[3], arrayPoint[4], arrayPoint[5]);
    drawingTriangle(arrayPoint[6], arrayPoint[7], arrayPoint[8]);
    drawingTriangle(arrayPoint[9], arrayPoint[10], arrayPoint[11]);

    //end drawing

    //add marker

    const markerBuuDien = new google.maps.Marker({
        position: buuDien,
        map: map,
    });

    const markerVanMieu = new google.maps.Marker({
        position: vanMieu,
        map: map,
    });

    //end add marker

    //begin add infoWindow

    const strBuuDien =
        '<div id = "content">' +
        '<div id="site-notice>' +
        '<h1>UTC2 Information</h1>' +
        "</div>" +
        '<div id="body-content">' +
        '<p><b>Bưu Điện Trung Tâm Thành Phố HCM</b></p>' +
        '<p>Số 125 Hai Bà Trưng, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh, VietNam</p>' +
        "</div>" +
        "</ div>"
    const infoBuuDienWindow = new google.maps.InfoWindow({ content: strBuuDien, });
    markerBuuDien.addListener("click", () => { infoBuuDienWindow.open(map, markerBuuDien) });

    const strVanMieu =
        '<div id = "content">' +
        '<div id="site-notice>' +
        '<h1>My Information</h1>' +
        "</div>" +
        '<div id="body-content">' +
        '<p><b>Văn Miếu Quốc Tử Giám HN</b></p>' +
        '<p>61 Quốc Tử Giám, Văn Miếu, Đống Đa, Hà Nội, Vietnam</p>' +
        "</div>" +
        "</ div>"
    const infoVanMieuWindow = new google.maps.InfoWindow({ content: strVanMieu, });
    markerVanMieu.addListener("click", () => { infoVanMieuWindow.open(map, markerVanMieu) });

    //end add infoWindow

    //begin add direction Service

    var directionService = new google.maps.DirectionsService();
    directionService.route(
        {
            origin: buuDien,
            destination: vanMieu,
            travelMode: "DRIVING",
        },
        (response, status) => {
            if (status == "OK") {
                var directionRenderer = new google.maps.DirectionsRenderer({
                    directions: response,
                    map: map,
                });
                console.log(response);
            }
        }
    );
    //end add direction Service
}