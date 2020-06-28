function initMap() {
    docReady(function() {
        const praktijk = { lat: 50.994991, lng: 4.495187 };
        const imelda = { lat: 51.017376, lng: 4.560212 };
        const locations = { 'praktijk': praktijk, 'imelda': imelda };
        const map = new google.maps.Map(document.getElementById('map'), {
            center: praktijk,
            zoom: 14
        });
        const praktijk_marker = new google.maps.Marker(
            { position: praktijk, map: map, title: "Privé Praktijk", label: "Privé Praktijk" }
        );

        $('#locations .card').click(function () {
            const clicked = this
            const location = $(this).data('location');
            map.panTo(locations[location]);

            $('#locations .card').each(function () {
                this === clicked ? $(this).addClass("card-active") : $(this).removeClass("card-active");
            });
        });
    });
}

function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

// Create the script tag, set the appropriate attributes
var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDC5qb4_2EaotSUpCpWyspjOrRQBezmG-0&callback=initMap';
script.defer = true;
script.async = true;

// Attach your callback function to the `window` object
window.initMap = initMap;

// Append the 'script' element to 'head'
document.head.appendChild(script);
