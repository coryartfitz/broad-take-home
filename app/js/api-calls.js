const fetch = require('cross-fetch');

// TODO Use async await for these fetch requests 

/* 
* I used the server side filtered api due to it reducing complexity in my code 
* and the filtering is likely to be faster this way.
*/
const fetchSubwayRoutes = () => {
	return fetchResponse('https://api-v3.mbta.com/routes?filter[type]=0,1');
}

const fetchStopsByRoute = (routes) => {
    return routes.map(route => {
        return fetchResponse(`https://api-v3.mbta.com/stops?filter[route]=${route.id}&include=route`);
    });
}

const fetchResponse = (url) => {
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => {
            console.warn('Error fetching response', error);
        });
}

module.exports = { fetchSubwayRoutes, fetchStopsByRoute };
