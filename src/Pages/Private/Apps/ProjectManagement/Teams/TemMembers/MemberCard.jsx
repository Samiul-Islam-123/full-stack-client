import React from 'react';
import { Grid, Card , Typography} from '@mui/material';

function MemberCard(props) {

    const {name, role} = props;

  return (
    <>
        <Card>
            <Grid container>
               

                <Grid item xs = {11} textAlign={'center'}>
                    <Typography variant='h6'>
                        {name}
                    </Typography>
                    <Typography variant='h8'>
                        {role}
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    </>
  )
}

export default MemberCard