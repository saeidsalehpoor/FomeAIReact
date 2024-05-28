import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';

const API_URL = "http://192.168.1.102:3002";

export default function Results({ actionId, userId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (actionId && userId) {
      axios.get(`${API_URL}/actionResults/actionResult/${actionId}/${userId}`)
        .then((response) => {
          console.log('result data:', response.data);
          setData(response.data.actionResults ? response.data.actionResults[0] : null);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching info:', error);
          setError(error);
          setLoading(false);
        });
    }
  }, [actionId, userId]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  if (!data) {
    return <Typography>No data found</Typography>;
  }

  return (
    <CardContent>
      <Typography variant="h5" component="div" sx={{ mb: 2 }}>
        <span style={{ fontSize: '1.2rem' }}>Number of Success: </span>
        <Typography variant="h6" component="span" sx={{ color: 'green', fontSize: '1.6rem' }}>
          {data.successcnt}
        </Typography>
      </Typography>
      <Typography variant="h5" component="div" sx={{ mb: 2 }}>
        <span style={{ fontSize: '1.2rem' }}>Number of Fails: </span>
        <Typography variant="h6" component="span" sx={{ color: 'red', fontSize: '1.6rem' }}>
          {data.failcnt}
        </Typography>
      </Typography>
      <Typography variant="h5" component="div" sx={{ mb: 2 }}>
        <span style={{ fontSize: '1.2rem' }}>Feedback: </span>
        <Typography variant="h6" component="span" sx={{ fontSize: '1.6rem' }}>
          {data.feedback}
        </Typography>
      </Typography>
    </CardContent>
  );
}
