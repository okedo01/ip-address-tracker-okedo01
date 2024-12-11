// Validate IP address or domain name
const isValidInput = (input) => {
    const ipPattern = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.((25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.){2}(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;
    const domainPattern = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return ipPattern.test(input) || domainPattern.test(input);
};

class Tracker {
    constructor() {
        this.API_KEY = 'at_oyHjF4hdLZrDnKJd0MZBnYA6hfpuA';
    }

    async updateAddress(input, isDomain) {
        if (!isValidInput(input)) {
            throw new Error('Invalid input. Please enter a valid IP address or domain.');
        }

        const url = isDomain
            ? `https://geo.ipify.org/api/v2/country,city?apiKey=${this.API_KEY}&domain=${input}`
            : `https://geo.ipify.org/api/v2/country,city?apiKey=${this.API_KEY}&ipAddress=${input}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch location data. Status: ${response.status}`);
        }
        const data = await response.json();
        return { addressDetails: data };
    }
}
