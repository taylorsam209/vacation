const ab = require('./frontEndABs.js');

const url = 'http://localhost:3010/api/';

describe('Test getTrip(url, trip_id):', () => {
  /* Test Author: Scott */
  test('Check if getTrip returns a trip object.', () => {
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
    return ab.getTrip(url, 1).then(res => {
      const keys = Object.keys(res); // Gets an array of property (or key) names
      keys.forEach(key => { // Loop through each property
        /* Set flag to false if a key from the returned object
        doesn't exist in tripKeys */
        if (!tripKeys.includes(key)) {
          flag = true;
        }
      })
      expect(flag).toEqual(false); // fails if the flag is true
    });
  });
});

describe('Test getAllTrips(url, user_id):', () => {
  /* Test Author: Scott */
  test('Check if getAllTrips returns an array.', () => {
    expect.assertions(1);
    return ab.getAllTrips(url, 1).then(res => {
      expect(Array.isArray(res)).toEqual(true);
    });
  });
});

describe('Test addTrip(url, obj):', () => {
  /* Test Author: Scott */
  test('Check if addTrip returns an array.', () => {
    expect.assertions(1);
    const obj = {
      user_id: 1
    };
    return ab.addTrip(url, obj).then(res => {
      expect(Array.isArray(res)).toEqual(true);
    });
  });
  /* Test Author: Scott */
  test('Check if addTrip adds the new trip object to the array.', () => {
    expect.assertions(1);
    const obj = {
      user_id: 1,
      date: '12/31/2999',
      trip_name: 'Test Object',
      trip_code: 'test1',
      trip_location: 'DevMountain'
    };
    return ab.addTrip(url, obj).then(res => {
      let match = res.filter(trip => {
        return trip.date === obj.date && trip.trip_name === obj.trip_name;
      });
      expect(match.length > 0).toEqual(true);
    });
  });
});

// describe('Test deleteTrip(url, trip_id):', ()=>{
//   /* Test Author: Scott */
//   test('Check if deleteTrip deletes a trip with the matching trip_id', ()=>{
//     expect.assertions(1);
//     let flag = false;
//     let newTripId = 0;
//     return ab.addTrip(url, {user_id: 1}).then(res=>{
//       newTripId = res[res.length-1].trip_id;
//       const intialLength = res.length;
//       return ab.deleteTrip(url, newTripId).then(res=>{
//         res.forEach(trip=>{
//           if(trip.trip_id === newTripId){
//             flag = true;
//           }
//         });
//         expect(flag).toEqual(false);
//       });
//     });
//   });
// });

describe('Test to getAllDays(url, trip_id):', () => {
  // Test Author: Jared
  test('Check if getAllDays returns an array', () => {
    expect.assertions(1);
    let flag = false;

    return ab.getAllDays(url, 1).then(res => {
      expect(Array.isArray(res)).toEqual(true);
    })
  })
})

describe('Test editDay(url, obj):', () => {
  //Test Author: Jared
  test('Check that the day edited is returned', () => {
    expect.assertions(1);
    let newVal = { "date": "03/29/2099", "day_id": 2 }

    return ab.editDay(url, newVal).then(res => {
      expect(res[0].day_id).toEqual(2)
    })
  })
})

describe('Test addDay(url, obj):', () => {
  // Test Author: Jared
  test('Check if addDay returns an array', () => {
    expect.assertions(1);
    let flag = false;
    let newVal = { "trip_id": 1, "date": "02/14/2088" }

    return ab.addDay(url, newVal).then(res => {
      expect(Array.isArray(res)).toEqual(true);
    })
  })
})

describe('Test getDay(url, day_id)', () => {
  // Test Author: Jared
  test('Check that day of day_id = 2 is returned', () => {
    expect.assertions(1);

    return ab.getDay(url, 2).then(res => {
      expect(res.day_id).toEqual(2)
    })
  })
})

describe('Test getNotifications(url, trip_id)', () => {
  // Test Author: Jared
  test('Check if getNotifications returns an array', () => {
    expect.assertions(1);
    let flag = false;

    return ab.getNotifications(url, 1).then(res => {
      expect(Array.isArray(res)).toEqual(true);
    })
  })
})