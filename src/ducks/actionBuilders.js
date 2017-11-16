const axios = require('axios');

module.exports = {
  getTrip(url, id) {
    return axios.get(`${url}trip/${id}`).then(res=>{
      return res.data
    });
  }
};
