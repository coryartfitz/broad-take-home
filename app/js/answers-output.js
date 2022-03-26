const { fetchSubwayRoutes, fetchStopsByRoute } = require('./api-calls.js'); 
const { getRoutesDetails, getStopsDetails } = require('./route-stop-data.js');

// This code's only real purpose is to console log the answers.
// It was moved here due to the test code console getting muddied by the logs
getRoutesDetails(fetchSubwayRoutes()).then(routeDetails => {
    // Question One Answer:
    console.log('\nQuestion One: List all "subway" routes by their "long names"\n\n');
    routeDetails.forEach(details => console.log(details.longName));

    // Use question number one's response to build up a map of promises, each containing all stops per route.
    Promise.all(fetchStopsByRoute(routeDetails)).then(stopsPerRoute => {
        const stopsDetials = getStopsDetails(stopsPerRoute);

        // Question Two Answers:
        console.log('\nQuestion Two: Display the name of the "subway" routes with the most/least stops and list all stops that connect two or more subway routes\n\n');
        console.log(`Part 1: The "subway" route with most stops: ${stopsDetials.mostStopsName} with ${stopsDetials.mostStopsCount} stops`);
        console.log(`\nPart 2: The "subway" route with least stops: ${stopsDetials.leastStopsName} with ${stopsDetials.leastStopsCount} stops`);
        console.log('\nPart 3: List of all stops that connect two or more "subway" routes along with the relevant route names:');

        Object.entries(stopsDetials.stopsThatConnectRoutes).forEach(stop => {
            const details = stop[1];
            console.log(`${details.stopName}: ${details.routes}` );
        });
    });
});