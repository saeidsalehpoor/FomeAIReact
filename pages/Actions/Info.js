import React, { useState, useEffect } from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const API_URL = "http://192.168.1.102:3002";

export default function Info({ actionId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (actionId) {
      axios.get(`${API_URL}/actions/action${actionId}`)
        .then((response) => {
          setData(response.data.actions[0]); // Assuming the response data has an "actions" array
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching info:', error);
          setLoading(false);
        });
    }
  }, [actionId]);

  const handleCaptureVideo = () => {
    // Add your logic for capturing video here
  };

  const handleUpdateResults = () => {
    // Add your logic for updating results here
  };

  return (
    <React.Fragment>
      {loading ? (
        <CardContent>
          <Typography variant="h5" component="div">
            Loading...
          </Typography>
        </CardContent>
      ) : (
        <React.Fragment>
          <CardContent>
            <Typography variant="h5" component="div">
              {data?.title}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {data?.desc}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" variant="contained" onClick={handleCaptureVideo}>Capture Video</Button>
            <Button size="small" variant="outlined" onClick={handleUpdateResults}>Update Results</Button>
          </CardActions>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
