const ab = require('./actionBuilders');

const url = 'http://localhost:3010/api/';

describe('Test getTrip(url, trip_id):', ()=>{
  /* Test Author: Scott */
  test('Check if getTrip returns a trip object.', ()=>{
    expect.assertions(1); // Expects one expect from the promise
    const tripKeys = [ // An array of keys that trip objects always have
      "trip_id",
      "user_id",
      "date",
      "trip_name",
      "trip_code",
      "trip_location",
      "trip_details"
    ];
    let flag = false; // flag is used to indicate a failure (false means no failures)
    return ab.getTrip(url, 1).then(res=>{
      const keys = Object.keys(res); // Gets an array of property (or key) names
      keys.forEach(key=>{ // Loop through each property
        /* Set flag to false if a key from the returned object
        doesn't exist in tripKeys */
        if(!tripKeys.includes(key)){
          flag = true;
        }
      })
      expect(flag).toEqual(false); // fails if the flag is true
    });
  });
});

describe('Test getAllTrips(url, user_id)', ()=>{
  /* Test Author: Scott */
  test('Check if getAllTrips returns an array.', ()=>{
    expect.assertions(1);
    return ab.getAllTrips(url, 1).then(res=>{
      expect(Array.isArray(res)).toEqual(true);
    });
  });
});
