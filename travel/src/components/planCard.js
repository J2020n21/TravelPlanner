// import * as React from 'react';
// import {Box,
//     Card, CardActions, CardHeader, CardContent, Collapse, Paper,
//     Typography,
//  } from '@mui/material/';

//  export default function planCard(){
//     return(
//     <Box>
//         <Card>
//             <div>hi</div>
//             <CardHeader><Typography>Header</Typography></CardHeader>
//             <CardContent><Typography>Header</Typography></CardContent>
//             <CardActions><Typography>Header</Typography></CardActions>
//         </Card>
//     </Box>
//     );
// }
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function PlanCard() {
  return (
    <Card variant='outlined' sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

// https://www.youtube.com/watch?v=M75MUZ1zVYM
// https://mui.com/material-ui/react-card/#basic-card