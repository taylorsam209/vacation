import React, { Component } from 'react';
import './Listing.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Menu from "../Menu/Menu";
import { Card, CardText, CardMedia, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { getRestaurant, addRestaurant, clearRestaurant, getReviews, clearReviews } from '../../ducks/restaurant';

class Listing extends Component {

  insertAddress(e) {
    if (e.location.display_address[2]) {
      return e.location.display_address[0] + ' ' + e.location.display_address[1] + ' ' + e.location.display_address[2];
    }
    else return e.location.display_address[0] + ' ' + e.location.display_address[1];
  }

  render() {
    return (
      <div className="Listing">
        <Menu />
        <h1>Restaurants</h1>
        <div className='content-container'>
          {this.props.listing.map((e, i, arr) => {
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
                      this.props.clearRestaurant(),
                        this.props.clearReviews()
                    }
                    this.props.getRestaurant(e.id),
                      this.props.getReviews(e.id)
                  }} style={{ textDecoration: "none" }} to={`/restaurant/${e.id}`}>
                    <h2 className='details-button' > More Details </h2>
                  </Link>
                </CardText>
                <RaisedButton label='Add Event' primary={true} style={{ marginBottom: '10px' }} />
              </Card>
            )
          })}
        </div>
        {/* <div className="add-listing-button" onClick={() => { this.props.addRestaurant(day_id, e.id) }}>Save</div> needs Day_ID to be passed into add Rest function   */}
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log(state)
  return {
    listing: state.restaurant.listing,
    currentRestaurant: state.restaurant.currentRestaurant
  }
}

export default connect(mapStateToProps, { getRestaurant, addRestaurant, clearRestaurant, getReviews, clearReviews })(Listing);
