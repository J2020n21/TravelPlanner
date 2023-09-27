import React from 'react';
import {Box,Button,ButtonGroup, Container, FormControl, Typography, InputLabel, Input
,FormHelperText,TextField,
}
from '@material-ui/core';

export default function RouteForm() {
  return (

    <Container className='route-form-container'>
<FormControl>

  <TextField id="outlined-basic" label="Start" variant="outlined" />
  

  <TextField id="outlined-basic" label="Destination" variant="outlined" />

</FormControl>

    <ButtonGroup><Button>calaulate</Button></ButtonGroup>
    
    </Container>

  )
}
