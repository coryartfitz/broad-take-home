const { fetchSubwayRoutes, fetchStopsByRoute } = require('./api-calls.js'); 
const { getRoutesDetails, getStopsDetails } = require('./route-stop-data.js');

/* 
* This code's only real purpose is to console log or display the answers.
* It was moved here due to the test console logs getting muddied by the these logs.
*/
getRoutesDetails(fetchSubwayRoutes()).then(routeDetails => {
    const answerOneTitle = document.getElementById('answer-one-title');
    const answerOneList = document.getElementById('answer-one-list');

    const answerTwoTitle = document.getElementById('answer-two-title');
    const answerTwoPartOneText = document.getElementById('answer-two-part-one-text');
    const answerTwoPartTwoText = document.getElementById('answer-two-part-two-text');
    const answerTwoPartThreeText = document.getElementById('answer-two-part-three-text');
    const answerTwoPartThreeList = document.getElementById('answer-two-part-three-list');

    // Question One Answer:
    console.log('\nQuestion One: List all "subway" routes by their "long names"\n\n');
    answerOneTitle.innerHTML = 'Question One: List all "subway" routes by their "long names"';

    routeDetails.forEach(details => {
        console.log(details.longName);

        const li = document.createElement('li');
        
        li.appendChild(document.createTextNode(details.longName));
        answerOneList.appendChild(li);
    });

    // Use question number one's response to build up a map of promises, each containing all stops per route.
    Promise.all(fetchStopsByRoute(routeDetails)).then(stopsPerRoute => {
        const stopsDetials = getStopsDetails(stopsPerRoute);
        const answerTwoTitleText = 'Question Two: Display the name of the "subway" routes with the most/least stops and list all stops that connect two or more subway routes'
        const partOneAnswerText = `Part 1: The "subway" route with most stops: ${stopsDetials.mostStopsName} with ${stopsDetials.mostStopsCount} stops`;
        const partTwoAnswerText = `Part 2: The "subway" route with least stops: ${stopsDetials.leastStopsName} with ${stopsDetials.leastStopsCount} stops`;
        const partThreeAnswerText = 'Part 3: List of all stops that connect two or more "subway" routes along with the relevant route names:';

        // Question Two Answers:
        console.log(`\n${answerTwoTitleText}\n\n`);
        answerTwoTitle.innerHTML = answerTwoTitleText;

        console.log(partOneAnswerText);
        answerTwoPartOneText.innerHTML = partOneAnswerText;

        console.log(`\n${partTwoAnswerText}`);
        answerTwoPartTwoText.innerHTML = partTwoAnswerText;

        console.log(`\n${partThreeAnswerText}`);
        answerTwoPartThreeText.innerHTML = partThreeAnswerText;

        Object.entries(stopsDetials.stopsThatConnectRoutes).forEach(stop => {
            const details = stop[1];
            const li = document.createElement('li');
            const answerThreeListItemText = `${details.stopName}: ${details.routes}`;

            console.log(answerThreeListItemText);

            li.appendChild(document.createTextNode(answerThreeListItemText));
            answerTwoPartThreeList.appendChild(li);
        });
    });
});