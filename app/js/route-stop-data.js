const getRoutesDetails = (routesByType) => routesByType.then(routes => routes.data.map(data => {
    return {
        longName: data.attributes.long_name, 
        id: data.id
    }
}));

const getStopsDetials = (routes) => {
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

// TODO: Make this not an O(n) version somehow
// TODO: Split this up into smaller chunks that can be tested individually.
// This answers the problem but there has to be a better way to achieve this.
const getStopsThatConnectRoutes = (allStops) => {
    const stopsThatConnectRoutes = {};
    // Merge all stops into one big lsit
    const mergedStops = [].concat.apply([], allStops);
    
    // Map over stops and filter for only duplicate stops - duplicates means stops exist on multiple routes
    const duplicateStops = mergedStops.map((stop, index) => {
        return mergedStops.find((currentStop, currentIndex) => {
            if (index !== currentIndex && currentStop.id === stop.id) {
                return stop;
            }
        });
    }).filter(x => x);

    // Build up a list of duplicte stops and their associated routes
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

module.exports = { getRoutesDetails, getStopsDetials };