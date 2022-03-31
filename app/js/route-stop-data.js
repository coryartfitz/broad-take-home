const getRoutesDetails = (routesByType) => routesByType.then(routes => routes.data.map(data => {
    return {
        longName: data.attributes.long_name, 
        id: data.id
    }
}));

// TODO:This can be getMostLeastStops and be getStopsThatConnectRoutes abstracted out
const getStopsDetails = (routes) => {
    const details = {
        mostStopsCount: 0,
        mostStopsName: '',
        leastStopsCount: 0,
        leastStopsName: ''
    };

    // TODO: Remove this once getStopsThatConnectRoutes is abstracted out of this method
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

        // TODO: Remove this once getStopsThatConnectRoutes is abstracted out of this method
        allStops.push(route.data);
    });

    // TODO: Remove this once getStopsThatConnectRoutes is abstracted out of this method
    details.stopsThatConnectRoutes = getStopsThatConnectRoutes(allStops);

    return details;
}

// TODO: Split this up into smaller chunks that can be tested individually.
// TODO:Ppass in full routes array and flatMap it to get list of all stops
const getStopsThatConnectRoutes = (allStops) => {
    const connectsMultipleRoutes = {};

    // Maybe the stops api will let you get a list of all stops filtered for "subway" routes only
    // If it is does we could use this api call for question one but then would have had to sort it by route 
    
    // This flattens the allStops array so all stops are in a single list
    // TODO: Use a flat map here to make this more readable
    const mergedStops = [].concat.apply([], allStops);
    
    // Return a list of only the duplicate stops - duplicates mean stops exist on multiple routes
    // TODO: Make this a seperate method and add tests
    const duplicateStops = mergedStops.map((stop, index) => {
        return mergedStops.find((currentStop, currentIndex) => {
            if (index !== currentIndex && currentStop.id === stop.id) {
                return stop;
            }
        });
    }).filter(stop => stop);

    // Build up stopsThatConnectRoutes with relevant stops and the relevant route names
    // TODO make this its own method and add tests
    duplicateStops.forEach(stop => {
        const stopId = stop.id;
        const routeName = stop.relationships.route.data.id;

        if (!connectsMultipleRoutes.hasOwnProperty(stopId)) {
            connectsMultipleRoutes[stopId] = {
                stopName: stop.attributes.name,
                routes: [routeName]
            }
        } else if (!connectsMultipleRoutes[stopId].routes.includes(routeName)) {
            connectsMultipleRoutes[stopId].routes.push(routeName);
        }
    });

    return connectsMultipleRoutes;  
}

module.exports = { getRoutesDetails, getStopsDetails };
