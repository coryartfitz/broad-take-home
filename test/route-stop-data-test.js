const assert = require('assert');
const { getRoutesDetails, getStopsDetials } = require('../app/js/route-stop-data.js');

describe('#displayLongRouteNames()', function () {
    it('should return an array of route name strings', () => {
        const expected = [
            {
                'longName': 'Foo',
                'id': 'foo'
            },
            {
                'longName': 'Bar',
                'id': 'bar'
            },
            {
                'longName': 'FooBar',
                'id': 'foobar'
            }
        ];

        return getRoutesDetails(getMockRoutesApiResponse()).then(response => {
            assert.deepEqual(expected, response);
        });
    });
});

describe('#getStopsDetials()', function () {
    it('should return an object with stops details properties', () => {
        const expected = {
            leastStopsCount: 2,
            leastStopsName: 'RouteTwo',
            mostStopsCount: 3,
            mostStopsName: 'RouteOne',
            stopsThatConnectRoutes: {
                bar: {
                    stopName: 'Bar',
                    routes: ['RouteTwo', 'RouteOne']
                }
            }
        };
    
    
        assert.deepEqual(expected, getStopsDetials((getMockStopsData())));
    });
});

const getMockRoutesApiResponse = () => {
    return new Promise((resolve) => {
        resolve({
            'data': [
                {
                    'attributes': {
                        'long_name': 'Foo'
                    },
                    'id': 'foo'
                },
                {
                    'attributes': {
                        'long_name': 'Bar'
                    },
                    'id': 'bar'
                },
                {
                    'attributes': {
                        'long_name': 'FooBar'
                    },
                    'id': 'foobar'
                }
            ]
        })
    });
}

const getMockStopsData = () => {
    return [
        {
            data: [
                {
                    id: 'foo',
                    attributes: {
                        name: 'foo'
                    },
                    relationships: {
                        route: {
                            data: {
                                id: 'RouteOne'
                            }
                        }
                    },
                },
                {
                    id: 'bar',
                    attributes: {
                        name: 'Bar'
                    },
                    relationships: {
                        route: {
                            data: {
                                id: 'RouteOne'
                            }
                        }
                    }
                },
                {
                    id: 'barbar',
                    attributes: {
                        name: 'BarBar'
                    },
                    relationships: {
                        route: {
                            data: {
                                id: 'RouteOne'
                            }
                        }
                    }
                }
            ]
        },
        {
            data: [
                {
                    id: 'bar',
                    attributes: {
                        name: 'Bar'
                    },
                    relationships: {
                        route: {
                            data: {
                                id: 'RouteTwo'
                            }
                        }
                    },
                },
                {
                    id: 'foofoo',
                    attributes: {
                        name: 'FooFoo'
                    },
                    relationships: {
                        route: {
                            data: {
                                id: 'RouteTwo'
                            }
                        }
                    }
                }
            ]
        }
    ]
}