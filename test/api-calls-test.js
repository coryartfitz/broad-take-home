const should = require('should');
const { fetchSubwayRoutes, fetchStopsByRoute } = require('../app/js/api-calls.js');

/* 
* TODO: Mock the api responses for both tests with when/then so we do not have to rely on real api calls/data 
* to test these fetch methods. 
* This will also let us test the failure cases.
*/
describe('#fetchSubwayRoutes()', () => {
    it('it returns a response and contains an object containing a "data" object', () => {
        return fetchSubwayRoutes().then(response => {
            response.should.be.an.instanceOf(Object).and.have.property('data');
        });
    });
});

describe('#fetchStopsByRoute()', () => {
    it('it returns a response and contains an array', () => {
        const routeList = [
            {
                id: 'Red'
            },
            {
                id: 'Orange'
            },
            {
                id: 'Green-B'
            }
        ];

        return Promise.all(fetchStopsByRoute(routeList)).then(response => {
            response.should.be.an.instanceOf(Array);
        });
    });
});