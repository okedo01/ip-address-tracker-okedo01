const userInput = document.querySelector('form');
const arrow = document.querySelector('.icon-arrow');
const details = document.querySelector('.wrapper');

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

    // update the map
    // Assume addressDetails is already defined and includes location details
    const latitude = addressDetails.location.lat;
    const longitude = addressDetails.location.lng;

    // Set the map view to the new coordinates
    map.setView([latitude, longitude], 13);

    // Check if the marker has already been created
    if (!window.marker) {
        // Initialize the marker and add it to the map
        window.marker = L.marker([latitude, longitude]).addTo(map)
            .bindPopup(`Location: ${addressDetails.location.city}, ${addressDetails.location.region}`)
            .openPopup();
    } else {
        // Update the position of the existing marker
        window.marker.setLatLng([latitude, longitude])
            .bindPopup(`Location: ${addressDetails.location.city}, ${addressDetails.location.region}`)
            .openPopup();
    }

}

const updateAddress = async (address) => {
    const addressDetails = await getData(address);

    return {
        addressDetails: addressDetails
    };
    
}

userInput.addEventListener('submit', event => {
    event.preventDefault();

    // get user input
    const address = userInput.address.value.trim();
    userInput.reset();

    // localStorage
    localStorage.setItem("address", address);
    
    updateAddress(address)
    .then(data => updateUI(data))
    .catch(error => console.log(error));
})

var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS popup.<br> Easily customizable.')
    .openPopup();

// checking if the address is located in localStorage
if(localStorage.getItem("address")) {
    updateAddress(localStorage.getItem("address"))
        .then(data => updateUI(data))
        .catch(error => console.log(error.message));
} else {
    console.log("do not exist");
    
}

