import * as React from 'react';
import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { blue, common } from '@mui/material/colors';
import { getOffers } from "../util/RequestUtil";


function createData(id, town, minDays, maxDays, car, user, cost) {
  return { id, town, minDays, maxDays, car, user, cost };
}

export default function Offers() {
    const [rows, setStateValues] = useState([]);

    function UpdateOffers() {
      // axios.get(`http://localhost:8080/offer/`).then(res => {
      getOffers().then(res => {
        let newRows = [];
        res.data.forEach(offer => {
            newRows.push(createData(offer.id, offer.town, offer.minDays, offer.maxDays, offer.car, offer.user, offer.dayCost));
        });
        setStateValues(newRows); // update state to force render
      });
    }

    useEffect(() => {
      UpdateOffers();
      const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
        UpdateOffers();
      }, 5000)

      return () => clearInterval(intervalId); //This is important
    }, []);
    return (
      <Container>
        <Typography variant="h3" component="div" sx={{mt: 4, background: blue[700], color: common.white}}>
            Offers
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {rows.map((row) => {
            const offerLink = `/offer/${row.id}`;
            return (
            <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={row.id}>
                    <Card sx={{ }}>
                    <CardContent>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {row.town}
                      </Typography>
                      <Typography variant="h4" component="div">
                        {row.car.model}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {row.minDays} - {row.maxDays} days
                      </Typography>
                      <Typography variant="body1">
                        {row.cost} lv/day
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" component={Link} to={offerLink}>Rent Now</Button>
                    </CardActions>
                  </Card>
            </Grid>
          )}
          )}
        </Grid>
      </Container>
    );
}
