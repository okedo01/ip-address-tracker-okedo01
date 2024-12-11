class Tracker {
    constructor() {
        this.API_KEY = 'at_oyHjF4hdLZrDnKJd0MZBnYA6hfpuA';
    }

    // async updateAddress(input) {
    //     const addressDetails = await this.getData(input);

    //     return {
    //         addressDetails: addressDetails
    //     };
    // }

    async updateAddress(input, isDomain) {
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

    async getData(input) {
        const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${this.API_KEY}&ipAddress=${input}`);

        if(!response.ok) {
            throw new Error (`server error ${response.status}`);
        }

        const data = await response.json();

        return data;
    }
}
