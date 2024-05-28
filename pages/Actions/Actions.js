import React from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 240,
  height: 200,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Actions = ({ onActionClick }) => {
  const handleClick = (actionName) => {
    // Call the onActionClick function passed from Dashboard
    onActionClick(actionName);
  };

  return (
    <React.Fragment>
      <Stack direction="row" spacing={2}>
        <DemoPaper variant="elevation" onClick={() => handleClick('1')}>
          <Avatar alt="Plank" src="../assets/actions/plank.jpg" sx={{ width: 120, height: 120 }} />
          Plank
        </DemoPaper>
        <DemoPaper variant="elevation" onClick={() => handleClick('2')}>
          <Avatar alt="Pushup" src="../assets/actions/Pushups-.webp" sx={{ width: 120, height: 120 }} />
          Pushup
        </DemoPaper>
      </Stack>
    </React.Fragment>
  );
};

export default Actions;
