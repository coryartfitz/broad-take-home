const getRoutesDetails = (routesByType) => routesByType.then(routes => routes.data.map(data => {
    return {
        longName: data.attributes.long_name, 
        id: data.id
    }
}));

const getStopsDetails = (routes) => {
    const details = {
        mostStopsCount: 0,
        mostStopsName: '',
        leastStopsCount: 0,
        leastStopsName: ''
    };

    const allStops = [];

    routes.forEach(route => {
        const stopsAmount = route.data.length;
        const routeName = route.data[0].relationships.route.data.id;

        if (stopsAmount > details.mostStopsCount) {
            details.mostStopsCount = stopsAmount;
            details.mostStopsName = routeName;
        }

        if (details.leastStopsCount === 0 || stopsAmount < details.leastStopsCount) {
            details.leastStopsCount = stopsAmount;
            details.leastStopsName = routeName;
        }

        allStops.push(route.data);
    });

    details.stopsThatConnectRoutes = getStopsThatConnectRoutes(allStops);

    return details;
}

// TODO: Split this up into smaller chunks that can be tested individually.
// This answers the problem but there has to be a better way to achieve this.
const getStopsThatConnectRoutes = (allStops) => {
    const stopsThatConnectRoutes = {};
    const mergedStops = [].concat.apply([], allStops);
    
    // Return a list of only the duplicate stops - duplicates mean stops exist on multiple routes
    const duplicateStops = mergedStops.map((stop, index) => {
        return mergedStops.find((currentStop, currentIndex) => {
            if (index !== currentIndex && currentStop.id === stop.id) {
                return stop;
            }
        });
    }).filter(stop => stop);

    // Build up stopsThatConnectRoutes with stops that connect routes along with the relevant route names
    duplicateStops.forEach(stop => {
        const stopId = stop.id;
        const routeName = stop.relationships.route.data.id;

        if (!stopsThatConnectRoutes.hasOwnProperty(stopId)) {
            stopsThatConnectRoutes[stopId] = {
                stopName: stop.attributes.name,
                routes: [routeName]
            }
        } else if (!stopsThatConnectRoutes[stopId].routes.includes(routeName)) {
            stopsThatConnectRoutes[stopId].routes.push(routeName);
        }
    });

    return stopsThatConnectRoutes;  
}

module.exports = { getRoutesDetails, getStopsDetails };