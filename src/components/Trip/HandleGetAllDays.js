import React from 'react';
import { connect } from 'react-redux';
import { updateEventsList, updateCurrentDay } from '../../ducks/frontEnd';
import { updateSavedRestaurants, updateSavedRestaurantsData } from '../../ducks/restaurant'
import _ from 'lodash';
import { Card, CardTitle } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import ActionCancel from 'material-ui/svg-icons/navigation/cancel';
import { Link } from "react-router-dom";
import Info from 'material-ui/svg-icons/action/info';
import RaisedButton from 'material-ui/RaisedButton';

function sortByDate(daysList) {
  let modifiedDatesDaysList = daysList.map(day => {
    let modifiedDate = day.date.split('/');
    let year = modifiedDate.pop();
    modifiedDate.unshift(year);
    day.date = modifiedDate.join('/');
    return day;
  });
  let orderedDays = _.sortBy(modifiedDatesDaysList, ['date', 'day_name', 'trip_id', 'day_id']);
  return orderedDays.map(day => {
    let modifiedDate = day.date.split('/');
    let year = modifiedDate.shift();
    modifiedDate.push(year);
    day.date = modifiedDate.join('/');
    return day;
  });
}

function HandleGetAllDays(props) {

  const { updateCurrentDay, updateEventsList, daysList, updateSavedRestaurants, updateSavedRestaurantsData } = props;
  const styles = {

    largeIcon: {
      width: 60,
      height: 60,
    },

  };

  const sortedDays = sortByDate(daysList);

  const renderedDays = sortedDays.map((e, i, arr) => {
    return (
      <Card className='day-box' key={i}>
        <CardTitle
          title={e.day_name || `Day ${i + 1}`}
          subtitle={e.date}
        />

        <Link to={`/day/${e.day_id}`} className='logo-font'>
        <RaisedButton
          label="View"
          primary={true}
          style={{marginBottom: '5px'}}
          onClick={()=>{ updateCurrentDay(e.day_id), updateEventsList(e.day_id), updateSavedRestaurants(e.day_id), updateSavedRestaurantsData(e.day_id), props.handleEventAdaptation(e.day_id) }}
        />
        </Link>
        { props.currentTrip && props.user_id == props.currentTrip.user_id &&
        <RaisedButton
          label='Delete'
          secondary={true}
          style={{marginBottom: '5px'}}
          onClick={()=>props.handleDayDelete(e)}
        />
        }
        <br />
      </Card>
    )
  })

  return (
    <div>
      {renderedDays}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    currentTrip: state.frontEnd.currentTrip,
    user_id: state.frontEnd.user_id,
    daysList: state.frontEnd.daysList
  }
}

export default connect(mapStateToProps, { updateCurrentDay, updateEventsList, updateSavedRestaurants, updateSavedRestaurantsData })(HandleGetAllDays);
