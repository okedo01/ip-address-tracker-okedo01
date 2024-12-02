API_KEY= 'at_oyHjF4hdLZrDnKJd0MZBnYA6hfpuA';

const getData = async (address) => {

    const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${address}`);

    if(!response.ok) {
        throw new Error (`server error ${response.status}`);
    }

    const data = await response.json();

    // return {
    //     ip: data.ip,
    //     isp: data.isp,
    //     location: {
    //         region: data.region,
    //         timezone: data.timezone,
    //     },

    return data;

}
