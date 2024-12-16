const axios = require('axios');
const connection = require('../models/dbHandler');

const authFedex = async () => {
  try {
    // Input Data
    const inputPayload = {
      grant_type: 'client_credentials',
      client_id: process.env.FEDEX_API_KEY,
      client_secret: process.env.FEDEX_SECRET_KEY
    }
    // Headers
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const response = await axios.post(`${process.env.FEDEX_BASE_API_URL}/oauth/token`, inputPayload, { headers: headers })
    return response.data
  } catch (error) {
    console.error('Error authenticating with FedEx API:', error);
    throw new Error('Failed to authenticate with FedEx API');
  }
}

class FedexTrackingController {
  static trackFedexShipment = async (req, res) => {
    try {
      // console.log(req.body.trackingNumber);
      const authRes = await authFedex();
      // console.log(authRes.access_token);
      // Input Data
      const inputPayload = {
        includeDetailedScans: true,
        trackingInfo: [
          {
            trackingNumberInfo: {
              trackingNumber: req.body.trackingNumber
            }
          }
        ]
      }
      const headers = {
        'Content-Type': 'application/json',
        'X-locale': 'en_US',
        'Authorization': `Bearer ${authRes.access_token}`
      }
      const response = await axios.post(`${process.env.FEDEX_BASE_API_URL}/track/v1/trackingnumbers`, inputPayload, { headers: headers })

      const trackingDetails = response.data.output.completeTrackResults[0].trackResults[0].scanEvents.map(item => ({
        eventDescription: item.eventDescription,
        city: item.scanLocation.city
      }))
      res.send(trackingDetails)
      // res.send(authRes).status(200);
    } catch (error) {
      console.error('Error tracking FedEx shipment:', error);
      res.status(500).send('Failed to track FedEx shipment');
    }
  }

  static addOrder = async (req, res) => {
    const connectionRes = await connection();
    const rows = await connectionRes.execute(`INSERT INTO Orders VALUES (${req.body.userId}, '${req.body.orderName}', ${req.body.orderPrice}, ${req.body.trackingNumber});`)
    // console.log(req.body);
    console.log(rows[0]);
    res.send(rows[0]);
  }
}


module.exports = FedexTrackingController;