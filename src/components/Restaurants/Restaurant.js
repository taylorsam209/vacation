import React, { Component } from 'react';
import './Restaurant.css';
import { connect } from 'react-redux';
import { addRestaurant } from '../../ducks/restaurant';
import { openRestaurantModal } from '../../ducks/frontEnd';
import 'font-awesome/css/font-awesome.min.css';
import Map from "../Map/Map"
import Menu from '../Menu/Menu';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';

class Restaurant extends Component {

  // componentDidMount(){
  //   const ele = document.getElementById('ipl-progress-indicator')
  //   if(ele){
  //     setTimeout(() => {
  //       ele.classList.add('available')
  //       setTimeout(() => {
  //         ele.outerHTML = ''
  //       }, 2000)
  //     }, 1000)
  //   }
  // }

  handleReviews() {
    if (this.props.reviews.reviews) {
      return this.props.reviews.reviews.map((e, i, arr) => {
        console.log(e);
        return (
          <p key={i}>{e.text}</p>
        )
      })
    } else return <p>No reviews</p>
  }

  render() {
    const { id, name, price, rating, url, image_url, display_phone, review_count } = this.props.currentRestaurant;
    const { currentDay } = this.props;
    console.log("whole", this.props.currentRestaurant);

    return (
      <div className="Restaurant">
        <Menu />
        <h1>{name}</h1>
        <Card className='restaurant-container'>
          <CardMedia overlay={<CardTitle title={'Rating: ' + rating} subtitle={'Review Count: ' + review_count} />}>
            <img src={image_url || 'https://pixy.org/images/placeholder.png'} alt='' />
          </CardMedia>
          <div >
            <p>Price range: {price || 'N/A'}</p>
            <p>Phone: {display_phone || 'N/A'}</p>
            <div className="reviews">
              <h4>Review Excerpts:</h4>
              {this.handleReviews.bind(this)()}
            </div>
            <a target="_blank" href={url} style={{ textDecoration: "none" }}>
              <div className='yelp-btn'><i className="fa fa-yelp fa-fw" aria-hidden="true"></i>Yelp Page</div>
            </a>
          </div>
          <Link to={`/day/${currentDay}`} >
            <RaisedButton label='Add Event' primary={true} style={{ margin: '10px 0 10px 0' }} onClick={() => { this.props.addRestaurant(currentDay, id), this.props.openRestaurantModal() }} />
          </Link>
        </Card>
        <Map />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentRestaurant: state.restaurant.currentRestaurant,
    reviews: state.restaurant.reviews,
    currentDay: state.frontEnd.currentDay
  }
}

export default connect(mapStateToProps, { addRestaurant })(Restaurant);
