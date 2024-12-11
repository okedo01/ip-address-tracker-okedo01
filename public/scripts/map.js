const userInput = document.querySelector('form');
const arrow = document.querySelector('.icon-arrow');
const details = document.querySelector('.wrapper');
const tracker = new Tracker();

const isDomain = (input) => {
    const domainPattern = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return domainPattern.test(input);
};

const updateUI = (data) => {
    const addressDetails = data.addressDetails;

    // update the details
    details.innerHTML = `
        <div class="ip">
            <p>IP Address</p>
            <span class="text">${addressDetails.ip}</span>
        </div>

        <div class="location px-7 border-l-2 border-gray-300">
            <p>Location</p>
            <span class="text">${addressDetails.location.city}, ${addressDetails.location.region}</span>
        </div>

        <div class="timezone px-7 border-l-2 border-gray-300">
            <p>Timezone</p>
            <span class="text">UTC${addressDetails.location.timezone} <!-- add offset value dynamically using the API --></span>
        </div>

        <div class="isp px-7 border-l-2 border-gray-300">
            <p>ISP</p>
            <span class="text">${addressDetails.isp}</span>
        </div>
    `;

    const latitude = addressDetails.location.lat;
    const longitude = addressDetails.location.lng;

    map.setView([latitude, longitude], 13);

    if (!window.marker) {
        window.marker = L.marker([latitude, longitude]).addTo(map)
            .bindPopup(`Location: ${addressDetails.location.city}, ${addressDetails.location.region}`)
            .openPopup();
    } else {
        window.marker.setLatLng([latitude, longitude])
            .bindPopup(`Location: ${addressDetails.location.city}, ${addressDetails.location.region}`)
            .openPopup();
    }
}

userInput.addEventListener('submit', event => {
    event.preventDefault();

    // get user input
    const input = userInput.address.value.trim();
    userInput.reset();

    // localStorage
    localStorage.setItem("address", input);
    
    tracker.updateAddress(input, isDomain(input))
    .then(data => updateUI(data))
    .catch(error => alert(error.message));
})

var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS popup.<br> Easily customizable.')
    .openPopup();


// Use browser geolocation if available
const useBrowserLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                map.setView([latitude, longitude], 15);
                if (!window.marker) {
                    window.marker = L.marker([latitude, longitude]).addTo(map)
                        .bindPopup('Your current location')
                        .openPopup();
                } else {
                    window.marker.setLatLng([latitude, longitude])
                        .bindPopup('Your current location')
                        .openPopup();
                }
            },
            (error) => {
                console.error(`Geolocation Error: ${error.message}`);
            }
        );
    } else {
        console.warn('Geolocation is not supported by this browser.');
    }
};

// checking if the address is located in localStorage
if(localStorage.getItem("address")) {
    tracker.updateAddress(localStorage.getItem("address")), isDomain(localStorage.getItem("address"))
        .then(data => updateUI(data))
        .catch(error => console.log(error.message));
} else {
    useBrowserLocation();
}

