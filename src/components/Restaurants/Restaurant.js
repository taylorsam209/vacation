import React, { Component } from 'react';
import './Restaurant.css';
import { connect } from 'react-redux';
import { addRestaurant } from '../../ducks/restaurant';
import 'font-awesome/css/font-awesome.min.css';
import Map from "../Map/Map"
import Menu from '../Menu/Menu';
import { Card, CardText, CardMedia, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

class Restaurant extends Component {

  handleReviews() {
    if(this.props.reviews.reviews) {
      return(
        <div className='reviews'>
        <p>{this.props.reviews.reviews[0].text}</p>
        <p>{this.props.reviews.reviews[1].text}</p>
        <p>{this.props.reviews.reviews[2].text}</p>
        </div>
      )
    } else
    return <p>reviews</p>;
  }

  // handleReviews() {
  //   if(this.props.reviews.reviews) {
  //     <div className="reviews">
  //     {this.props.reviews.reviews.map((e, i, arr) => {
  //       return (
  //         <p key={i}>{e}</p>
  //       )
  //     })}
  //     </div>
  //   }
  // }
  
 
  render() {
    const { id, name, price, rating, url, image_url, display_phone, review_count} = this.props.currentRestaurant;
    console.log('reviews', this.props.reviews.reviews)
    console.log("whole", this.props.currentRestaurant);

    return (
      <div className="Restaurant">
      <Menu />
      <h1>{name}</h1>

      <Card className='restaurant-description-container'>
        <CardMedia overlay={<CardTitle title={'Rating: '+ rating} subtitle={'Review Count: ' + review_count} />}>
          <img src={image_url || 'https://pixy.org/images/placeholder.png'} alt=''/>
        </CardMedia>
      <div >
          <p>Price range: {price}</p>
          <p>Phone: {display_phone}</p>
          {this.handleReviews.bind(this)()}
          <a target="_blank" href={url} style={{ textDecoration: "none" }}><div className='yelp-btn'><i className="fa fa-yelp fa-fw" aria-hidden="true"></i>
            Yelp Page</div></a>
          {/* <div className="add-restaurant-btn" onClick={() => { this.props.addRestaurant(day_id, id) }}>Save</div> //Must pass in DAY_ID for addRestaurantfunction() */}
        </div>
        <RaisedButton label='Add Event' primary={true} style={{ margin: '10px 0 10px 0' }} />
        </Card>

         {/* <div className="restaurant-description-container">
          <h1>Price range: {price}</h1>
          <h1>Yelp rating based on {review_count} reviews: {rating}</h1>
          <h1>Phone: {display_phone}</h1>
          <a target="_blank" href={url} style={{ textDecoration: "none" }}><div className='yelp-btn'><i className="fa fa-yelp fa-fw" aria-hidden="true"></i>
            Yelp Page!</div></a>
           <div className="add-restaurant-btn" onClick={() => { this.props.addRestaurant(day_id, id) }}>Save</div> //Must pass in DAY_ID for addRestaurantfunction() 
        </div>  */}
        <Map />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentRestaurant: state.restaurant.currentRestaurant,
    user: state.restaurant.user,
    reviews: state.restaurant.reviews
  }
}

export default connect(mapStateToProps, { addRestaurant })(Restaurant);
