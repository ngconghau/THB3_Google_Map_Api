function initMap() {

    const buuDien = { lat: 10.78005814285056, lng: 106.69991822581564 };
    const vanMieu = { lat: 21.027570230561004, lng: 105.83517853942371 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 20,
        center: buuDien,
    });

    function drawingCricle(a) {
        const Cricle = new google.maps.Circle({
            strokeColor: "#FF0000",
            map: map,
            editable: false,
            center: a,
            radius: 13,
        });
    }
    drawingCricle(buuDien);
    drawingCricle(vanMieu);
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