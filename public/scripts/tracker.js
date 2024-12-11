class Tracker {
    constructor() {
        this.API_KEY = 'at_oyHjF4hdLZrDnKJd0MZBnYA6hfpuA';
    }

    async updateAddress(address) {
        const addressDetails = await this.getData(address);

        return {
            addressDetails: addressDetails
        };
    }

    async getData(address) {
        const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${this.API_KEY}&ipAddress=${address}`);

        if(!response.ok) {
            throw new Error (`server error ${response.status}`);
        }

        const data = await response.json();

        return data;
    }
}
