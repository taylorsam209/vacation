import React, { Component } from 'react';
import './Listing.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Menu from "../Menu/Menu";
import { Card, CardActions, CardHeader, CardText, CardMedia, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { getRestaurant, addRestaurant, clearRestaurant } from '../../ducks/restaurant';

class Listing extends Component {
  constructor() {
    super()
    this.state = {
      business: [
        {
          "id": "bonsai-sushi-provo",
          "name": "Bonsai Sushi",
          "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/cY_mSADq6S6fO38RTD8ZEA/o.jpg",
          "is_closed": false,
          "url": "https://www.yelp.com/biz/bonsai-sushi-provo?adjust_creative=mcOIcdKeTHdZaThao3KS-Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=mcOIcdKeTHdZaThao3KS-Q",
          "review_count": 18,
          "categories": [
            {
              "alias": "sushi",
              "title": "Sushi Bars"
            }
          ],
          "rating": 4.5,
          "coordinates": {
            "latitude": 40.2427,
            "longitude": -111.66156
          },
          "transactions": [],
          "price": "$$",
          "location": {
            "address1": "672 North Freedom Blvd",
            "address2": null,
            "address3": "",
            "city": "Provo",
            "zip_code": "84601",
            "country": "US",
            "state": "UT",
            "display_address": [
              "672 North Freedom Blvd",
              "Provo, UT 84601"
            ]
          },
          "phone": "+18013730833",
          "display_phone": "(801) 373-0833",
          "distance": 256.672349128
        },
        {
          "id": "sam-hawk-korean-restaurant-provo",
          "name": "Sam Hawk Korean Restaurant",
          "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/83NAJVE9qQhJDzJ5CEyO6w/o.jpg",
          "is_closed": false,
          "url": "https://www.yelp.com/biz/sam-hawk-korean-restaurant-provo?adjust_creative=mcOIcdKeTHdZaThao3KS-Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=mcOIcdKeTHdZaThao3KS-Q",
          "review_count": 123,
          "categories": [
            {
              "alias": "korean",
              "title": "Korean"
            }
          ],
          "rating": 4,
          "coordinates": {
            "latitude": 40.24253,
            "longitude": -111.66156
          },
          "transactions": [],
          "price": "$$",
          "location": {
            "address1": "660 N Freedom Blvd",
            "address2": "",
            "address3": "",
            "city": "Provo",
            "zip_code": "84601",
            "country": "US",
            "state": "UT",
            "display_address": [
              "660 N Freedom Blvd",
              "Provo, UT 84601"
            ]
          },
          "phone": "+18013777766",
          "display_phone": "(801) 377-7766",
          "distance": 266.49872167359996
        },
        {
          "id": "lauras-kitchen-provo-2",
          "name": "Laura's Kitchen",
          "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/GhU7AlRmuZjz07ocxRRw4A/o.jpg",
          "is_closed": false,
          "url": "https://www.yelp.com/biz/lauras-kitchen-provo-2?adjust_creative=mcOIcdKeTHdZaThao3KS-Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=mcOIcdKeTHdZaThao3KS-Q",
          "review_count": 34,
          "categories": [
            {
              "alias": "mexican",
              "title": "Mexican"
            }
          ],
          "rating": 4.5,
          "coordinates": {
            "latitude": 40.2426180305843,
            "longitude": -111.661637350917
          },
          "transactions": [
            "pickup"
          ],
          "price": "$",
          "location": {
            "address1": "664 N Freedom Blvd",
            "address2": "",
            "address3": "",
            "city": "Provo",
            "zip_code": "84601",
            "country": "US",
            "state": "UT",
            "display_address": [
              "664 N Freedom Blvd",
              "Provo, UT 84601"
            ]
          },
          "phone": "+18013770880",
          "display_phone": "(801) 377-0880",
          "distance": 259.0006939598
        },
        {
          "id": "greek-n-go-food-truck-provo-2",
          "name": "Greek N Go Food Truck",
          "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/BbgqFiKsWXk5k1ZvAnSaGw/o.jpg",
          "is_closed": false,
          "url": "https://www.yelp.com/biz/greek-n-go-food-truck-provo-2?adjust_creative=mcOIcdKeTHdZaThao3KS-Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=mcOIcdKeTHdZaThao3KS-Q",
          "review_count": 78,
          "categories": [
            {
              "alias": "foodtrucks",
              "title": "Food Trucks"
            },
            {
              "alias": "greek",
              "title": "Greek"
            }
          ],
          "rating": 4.5,
          "coordinates": {
            "latitude": 40.25428,
            "longitude": -111.65637
          },
          "transactions": [],
          "price": "$",
          "location": {
            "address1": "1523 N Canyon Rd",
            "address2": "",
            "address3": "",
            "city": "Provo",
            "zip_code": "84604",
            "country": "US",
            "state": "UT",
            "display_address": [
              "1523 N Canyon Rd",
              "Provo, UT 84604"
            ]
          },
          "phone": "+12086971188",
          "display_phone": "(208) 697-1188",
          "distance": 1118.630186042
        },
        {
          "id": "zubs-subs-provo",
          "name": "Zubs Subs",
          "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/0RhmobU4N42WMGnzNtkWcQ/o.jpg",
          "is_closed": false,
          "url": "https://www.yelp.com/biz/zubs-subs-provo?adjust_creative=mcOIcdKeTHdZaThao3KS-Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=mcOIcdKeTHdZaThao3KS-Q",
          "review_count": 46,
          "categories": [
            {
              "alias": "pizza",
              "title": "Pizza"
            },
            {
              "alias": "sandwiches",
              "title": "Sandwiches"
            }
          ],
          "rating": 3.5,
          "coordinates": {
            "latitude": 40.2428552,
            "longitude": -111.6621094
          },
          "transactions": [],
          "price": "$",
          "location": {
            "address1": "684 N Freedom Blvd",
            "address2": "",
            "address3": "",
            "city": "Provo",
            "zip_code": "84601",
            "country": "US",
            "state": "UT",
            "display_address": [
              "684 N Freedom Blvd",
              "Provo, UT 84601"
            ]
          },
          "phone": "+18013773994",
          "display_phone": "(801) 377-3994",
          "distance": 241.6865291028
        },
        {
          "id": "polyasian-eats-provo",
          "name": "PolyAsian Eats",
          "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/tUSXyWl6AOXQeG-aDGUuTQ/o.jpg",
          "is_closed": false,
          "url": "https://www.yelp.com/biz/polyasian-eats-provo?adjust_creative=mcOIcdKeTHdZaThao3KS-Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=mcOIcdKeTHdZaThao3KS-Q",
          "review_count": 1,
          "categories": [
            {
              "alias": "foodstands",
              "title": "Food Stands"
            }
          ],
          "rating": 3,
          "coordinates": {
            "latitude": 40.2324786391537,
            "longitude": -111.668127199039
          },
          "transactions": [],
          "location": {
            "address1": "500 West Center St",
            "address2": null,
            "address3": "",
            "city": "Provo",
            "zip_code": "84601",
            "country": "US",
            "state": "UT",
            "display_address": [
              "500 West Center St",
              "Provo, UT 84601"
            ]
          },
          "phone": "+18018369476",
          "display_phone": "(801) 836-9476",
          "distance": 1502.1829490502
        },
        {
          "id": "5-buck-pizza-provo",
          "name": "5 Buck Pizza",
          "image_url": "",
          "is_closed": false,
          "url": "https://www.yelp.com/biz/5-buck-pizza-provo?adjust_creative=mcOIcdKeTHdZaThao3KS-Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=mcOIcdKeTHdZaThao3KS-Q",
          "review_count": 6,
          "categories": [
            {
              "alias": "pizza",
              "title": "Pizza"
            }
          ],
          "rating": 3,
          "coordinates": {
            "latitude": 40.2427382022142,
            "longitude": -111.662071198225
          },
          "transactions": [],
          "price": "$",
          "location": {
            "address1": "672 N Freedom Blvd",
            "address2": "",
            "address3": "",
            "city": "Provo",
            "zip_code": "84601",
            "country": "US",
            "state": "UT",
            "display_address": [
              "672 N Freedom Blvd",
              "Provo, UT 84601"
            ]
          },
          "phone": "+18013771115",
          "display_phone": "(801) 377-1115",
          "distance": 257.48561300359995
        },
        {
          "id": "mcdonalds-provo-7",
          "name": "McDonald's",
          "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/6-G6bNQtxmnUgnJNEv1quA/o.jpg",
          "is_closed": false,
          "url": "https://www.yelp.com/biz/mcdonalds-provo-7?adjust_creative=mcOIcdKeTHdZaThao3KS-Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=mcOIcdKeTHdZaThao3KS-Q",
          "review_count": 3,
          "categories": [
            {
              "alias": "hotdogs",
              "title": "Fast Food"
            },
            {
              "alias": "burgers",
              "title": "Burgers"
            }
          ],
          "rating": 2,
          "coordinates": {
            "latitude": 40.2456169128418,
            "longitude": -111.662406921387
          },
          "transactions": [],
          "location": {
            "address1": "889 N Freedom Blvd",
            "address2": "Ste 201",
            "address3": "",
            "city": "Provo",
            "zip_code": "84604",
            "country": "US",
            "state": "UT",
            "display_address": [
              "889 N Freedom Blvd",
              "Ste 201",
              "Provo, UT 84604"
            ]
          },
          "phone": "+18013737368",
          "display_phone": "(801) 373-7368",
          "distance": 129.7565619546
        },
        {
          "id": "forge-pizzeria-springville",
          "name": "Forge Pizzeria",
          "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/vJNWk-l0e40eT9xfx7gVrQ/o.jpg",
          "is_closed": false,
          "url": "https://www.yelp.com/biz/forge-pizzeria-springville?adjust_creative=mcOIcdKeTHdZaThao3KS-Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=mcOIcdKeTHdZaThao3KS-Q",
          "review_count": 1,
          "categories": [
            {
              "alias": "pizza",
              "title": "Pizza"
            },
            {
              "alias": "foodtrucks",
              "title": "Food Trucks"
            }
          ],
          "rating": 4,
          "coordinates": {
            "latitude": 40.18249,
            "longitude": -111.62136
          },
          "transactions": [],
          "location": {
            "address1": "1133 N 450th W",
            "address2": "",
            "address3": null,
            "city": "Springville",
            "zip_code": "84663",
            "country": "US",
            "state": "UT",
            "display_address": [
              "1133 N 450th W",
              "Springville, UT 84663"
            ]
          },
          "phone": "+18014774169",
          "display_phone": "(801) 477-4169",
          "distance": 7711.964682964
        },
        {
          "id": "daleys-wood-fire-payson",
          "name": "Daley's Wood Fire",
          "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/HnkmAHyBXah8nHMO5tm9_A/o.jpg",
          "is_closed": false,
          "url": "https://www.yelp.com/biz/daleys-wood-fire-payson?adjust_creative=mcOIcdKeTHdZaThao3KS-Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=mcOIcdKeTHdZaThao3KS-Q",
          "review_count": 4,
          "categories": [
            {
              "alias": "foodtrucks",
              "title": "Food Trucks"
            },
            {
              "alias": "bbq",
              "title": "Barbeque"
            }
          ],
          "rating": 4,
          "coordinates": {
            "latitude": 40.05185,
            "longitude": -111.73105
          },
          "transactions": [],
          "price": "$$",
          "location": {
            "address1": "586 N Main",
            "address2": "",
            "address3": "",
            "city": "Payson",
            "zip_code": "84651",
            "country": "US",
            "state": "UT",
            "display_address": [
              "586 N Main",
              "Payson, UT 84651"
            ]
          },
          "phone": "+18013198677",
          "display_phone": "(801) 319-8677",
          "distance": 22257.48763064
        },
        {
          "id": "smokin-star-bbq-eagle-mountain",
          "name": "Smokin' Star BBQ",
          "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/BPgy-da3jtR2AOvorOBFNw/o.jpg",
          "is_closed": false,
          "url": "https://www.yelp.com/biz/smokin-star-bbq-eagle-mountain?adjust_creative=mcOIcdKeTHdZaThao3KS-Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=mcOIcdKeTHdZaThao3KS-Q",
          "review_count": 8,
          "categories": [
            {
              "alias": "foodtrucks",
              "title": "Food Trucks"
            },
            {
              "alias": "bbq",
              "title": "Barbeque"
            }
          ],
          "rating": 5,
          "coordinates": {
            "latitude": 40.3792199,
            "longitude": -111.97759
          },
          "transactions": [],
          "price": "$",
          "location": {
            "address1": "3435 E Stonebridge Ln",
            "address2": "",
            "address3": null,
            "city": "Eagle Mountain",
            "zip_code": "84601",
            "country": "US",
            "state": "UT",
            "display_address": [
              "3435 E Stonebridge Ln",
              "Eagle Mountain, UT 84601"
            ]
          },
          "phone": "+18019955403",
          "display_phone": "(801) 995-5403",
          "distance": 30688.621941819998
        },
        {
          "id": "curry-time-food-truck-sandy",
          "name": "Curry Time Food Truck",
          "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/h3L-XMdooV48ekvOpBb4TQ/o.jpg",
          "is_closed": false,
          "url": "https://www.yelp.com/biz/curry-time-food-truck-sandy?adjust_creative=mcOIcdKeTHdZaThao3KS-Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=mcOIcdKeTHdZaThao3KS-Q",
          "review_count": 3,
          "categories": [
            {
              "alias": "foodtrucks",
              "title": "Food Trucks"
            },
            {
              "alias": "indpak",
              "title": "Indian"
            }
          ],
          "rating": 5,
          "coordinates": {
            "latitude": 40.59422,
            "longitude": -111.89108
          },
          "transactions": [],
          "price": "$",
          "location": {
            "address1": "8660 S State St",
            "address2": "",
            "address3": null,
            "city": "Sandy",
            "zip_code": "84070",
            "country": "US",
            "state": "UT",
            "display_address": [
              "8660 S State St",
              "Sandy, UT 84070"
            ]
          },
          "phone": "+18012327179",
          "display_phone": "(801) 232-7179",
          "distance": 43446.5794968
        },
        {
          "id": "pompeii-pastaz-food-truck-riverton",
          "name": "Pompeii Pastaz Food Truck",
          "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/xnEXOG2McS5mbPyWBcaS1Q/o.jpg",
          "is_closed": false,
          "url": "https://www.yelp.com/biz/pompeii-pastaz-food-truck-riverton?adjust_creative=mcOIcdKeTHdZaThao3KS-Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=mcOIcdKeTHdZaThao3KS-Q",
          "review_count": 1,
          "categories": [
            {
              "alias": "italian",
              "title": "Italian"
            },
            {
              "alias": "foodtrucks",
              "title": "Food Trucks"
            }
          ],
          "rating": 5,
          "coordinates": {
            "latitude": 40.5236909,
            "longitude": -111.9869751
          },
          "transactions": [],
          "location": {
            "address1": "12544 South Pasture Road 4000 W",
            "address2": null,
            "address3": "",
            "city": "Riverton",
            "zip_code": "84096",
            "country": "US",
            "state": "UT",
            "display_address": [
              "12544 South Pasture Road 4000 W",
              "Riverton, UT 84096"
            ]
          },
          "phone": "+18012003174",
          "display_phone": "(801) 200-3174",
          "distance": 41495.25957482
        },
        {
          "id": "special-courses-sandy",
          "name": "Special Courses",
          "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/A0yd5rznTIO3NHKn1TO6Eg/o.jpg",
          "is_closed": false,
          "url": "https://www.yelp.com/biz/special-courses-sandy?adjust_creative=mcOIcdKeTHdZaThao3KS-Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=mcOIcdKeTHdZaThao3KS-Q",
          "review_count": 10,
          "categories": [
            {
              "alias": "foodtrucks",
              "title": "Food Trucks"
            },
            {
              "alias": "burgers",
              "title": "Burgers"
            }
          ],
          "rating": 4,
          "coordinates": {
            "latitude": 40.5628696503143,
            "longitude": -111.894318080057
          },
          "transactions": [],
          "price": "$",
          "location": {
            "address1": "10450 S State St",
            "address2": null,
            "address3": "",
            "city": "Sandy",
            "zip_code": "84070",
            "country": "US",
            "state": "UT",
            "display_address": [
              "10450 S State St",
              "Sandy, UT 84070"
            ]
          },
          "phone": "+18014271624",
          "display_phone": "(801) 427-1624",
          "distance": 40487.8964205
        },
        {
          "id": "casa-de-soul-food-truck-salt-lake-city",
          "name": "Casa De Soul Food Truck",
          "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/tCyGVxZnWVqnoVq7lTjlJQ/o.jpg",
          "is_closed": false,
          "url": "https://www.yelp.com/biz/casa-de-soul-food-truck-salt-lake-city?adjust_creative=mcOIcdKeTHdZaThao3KS-Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=mcOIcdKeTHdZaThao3KS-Q",
          "review_count": 3,
          "categories": [
            {
              "alias": "foodtrucks",
              "title": "Food Trucks"
            },
            {
              "alias": "comfortfood",
              "title": "Comfort Food"
            },
            {
              "alias": "soulfood",
              "title": "Soul Food"
            }
          ],
          "rating": 3.5,
          "coordinates": {
            "latitude": 40.7561531066895,
            "longitude": -111.900016784668
          },
          "transactions": [],
          "price": "$$",
          "location": {
            "address1": "",
            "address2": "",
            "address3": "",
            "city": "Salt Lake City",
            "zip_code": "84101",
            "country": "US",
            "state": "UT",
            "display_address": [
              "Salt Lake City, UT 84101"
            ]
          },
          "phone": "+14153594689",
          "display_phone": "(415) 359-4689",
          "distance": 60308.28967818
        }
      ]
    }
  }

  insertAddress(e) {
    if (e.location.display_address[2]) {
      return e.location.display_address[0] + ' ' + e.location.display_address[1] + ' ' + e.location.display_address[2];
    }
    else return e.location.display_address[0] + ' ' + e.location.display_address[1];
  }

  render() {
    console.log(this.props.listing)

    return (
      <div className="Listing">
        <Menu />
        <h1>Restaurants</h1>
        <div className='right-content-container'>
          {this.state.business.map((e, i, arr) => {
            return (
              <Card key={i} className='listings-container' style={{ margin: '10px' }}>
                <CardMedia
                  overlay={<CardTitle title={e.name} subtitle={e.categories[0].title} />}
                >
                  <img src={e.image_url || 'https://pixy.org/images/placeholder.png'} alt="" />
                </CardMedia>
                <CardText>
                  <p>{this.insertAddress.bind(this)(e)} </p>
                  <p>Price range: {e.price || 'N/A'} </p>
                  <p> Yelp rating: {e.rating} </p>
                  <Link onClick={() => {
                    if (this.props.currentRestaurant.id !== e.id) {
                      this.props.clearRestaurant()
                    }
                    this.props.getRestaurant(e.id)
                  }} style={{ textDecoration: "none" }} to={`/restaurant/${e.id}`}>
                    <h2 className='details-button' > More Details </h2>
                  </Link>
                  {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio. */}
                </CardText>
                <RaisedButton label='Add Event' primary={true} style={{ marginBottom: '10px' }} />
              </Card>
            )
          })}
        </div>


        <div className="right-content-container">
          {this.props.listing.map((e, i, arr) => {
            return (
              <div key={i} className="listings-container">
                <img className="listing-photo" src={e.image_url} alt="none available" />
                <div className="listing-description-container">
                  <Link onClick={() => {
                    if (this.props.currentRestaurant.id !== e.id) {
                      this.props.clearRestaurant()
                    }
                    this.props.getRestaurant(e.id)
                  }} style={{ textDecoration: "none" }} to={`/restaurant/${e.id}`}>
                    <h2 className='restaurant-title' >{e.name}</h2>
                  </Link>
                  <h4>{this.insertAddress.bind(this)(e)} </h4>
                  <h4>Price range: {e.price} </h4>
                  <h4> Yelp rating: {e.rating} </h4>
                </div>
                {/* <div className="add-listing-button" onClick={() => { this.props.addRestaurant(day_id, e.id) }}>Save</div> needs Day_ID to be passed into add Rest function  */}
              </div>
            )
          })}

        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state)
  return {
    listing: state.restaurant.listing,
    user: state.restaurant.user,
    currentRestaurant: state.restaurant.currentRestaurant
  }
}

export default connect(mapStateToProps, { getRestaurant, addRestaurant, clearRestaurant })(Listing);
