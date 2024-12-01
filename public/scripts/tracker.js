const key = 'at_oyHjF4hdLZrDnKJd0MZBnYA6hfpuA&ipAddress=8.8.8.8';

const getData = async (address) => {

    const response = await fetch('https://geo.ipify.org/api/v2/country,city?apiKey=at_oyHjF4hdLZrDnKJd0MZBnYA6hfpuA&ipAddress=8.8.8.8');

    if(!response.ok) {
        throw new Error (`server error ${response.status}`);
    }

    const data = await response.json();

    return data;

}


