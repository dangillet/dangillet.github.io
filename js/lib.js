function initMap() {
    const praktijk = { lat: 50.994991, lng: 4.495187 };
    const imelda = { lat: 51.017376, lng: 4.560212 };
    const map = new google.maps.Map(document.getElementById('map'), {
        center: praktijk,
        zoom: 14
    });
    const locations = {'praktijk': praktijk, 'imelda': imelda};
    const praktijk_marker = new google.maps.Marker(
        { position: praktijk, map: map, title: "Privé Praktijk", label: "Privé Praktijk"}
    );


    $('section .card').click(function() {
        const $this = this
        const here = $(this).data('location');
        map.panTo(locations[here]);

        $('section .card').each(function() {
            this === $this ? $(this).addClass("border-info") : $(this).removeClass("border-info");
        });
    });
}