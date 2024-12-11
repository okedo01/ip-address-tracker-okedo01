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
        <div class="ip mb-2 px-7 text-center lg:text-start">
            <p class="uppercase">IP Address</p>
            <span class="text">${addressDetails.ip}</span>
        </div>

        <div class="location mb-3 px-7 lg:h-[70px] lg:border-l-2 text-center lg:text-start">
            <p class="uppercase">Location</p>
            <span class="text">${addressDetails.location.country}, ${addressDetails.location.region}</span>
        </div>

        <div class="timezone px-7 lg:h-[70px] lg:border-l-2 text-center lg:text-start">
            <p class="uppercase">Timezone</p>
            <span class="text">UTC${addressDetails.location.timezone}</span>
        </div>

        <div class="isp px-7 lg:h-[70px] lg:border-l-2 text-center lg:text-start">
            <p class="uppercase">isp</p>
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

arrow.addEventListener('click', () => {
    userInput.dispatchEvent(new Event('submit')); 
});

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

// checking if the address is located in localStorage
if(localStorage.getItem("address")) {
    tracker.updateAddress(localStorage.getItem("address")), isDomain(localStorage.getItem("address"))
        .then(data => updateUI(data))
        .catch(error => console.log(error.message));
} else {
    console.log("cio unyama");
}

