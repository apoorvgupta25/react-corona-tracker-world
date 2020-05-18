import React from 'react'
import CountUp from 'react-countup';    //counting animation
import cn from 'classnames'             //applying multiple styles on one grid/card
import { Card, CardContent, Typography, Grid} from '@material-ui/core';     //cards

import styles from './Cards.module.css'

//functional component (callback wala)
//we are destructuring the data(props) first and then the destructure the confirmed(these are not props)
//confirmed is undefined beacuse the first time data is not fetched, 2nd time data is fetched therefore we use if statement
//xs, ms are for mobile screen sizes and in mobile we take all 12 grids and for laptop we take 3
const Cards = ({data: {confirmed, recovered, deaths, lastUpdate}}) => {
    // console.log(props);

    if(!confirmed){
        return 'Loading...'
    }

    return (
        <div className={styles.container}>
            <Grid container spacing={3} justify="center">

                <Grid item component={Card} className={cn(styles.card, styles.infected)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Infected</Typography>
                        <Typography variant="h5">
                            <CountUp start={0} end={confirmed.value} duration={1.0} separator=","/>
                        </Typography>
                        <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2">Number of Active Cases of Covid 19</Typography>
                    </CardContent>
                </Grid>

                <Grid item component={Card} className={cn(styles.card, styles.active)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Active</Typography>
                        <Typography variant="h5"><CountUp start={0} end={confirmed.value-(recovered.value+deaths.value)} duration={1.0} separator=","/></Typography>
                        <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2">Number of Recoveries from Covid 19</Typography>
                    </CardContent>
                </Grid>

                <Grid item component={Card} className={cn(styles.card, styles.recovered)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                        <Typography variant="h5"><CountUp start={0} end={recovered.value} duration={1.0} separator=","/></Typography>
                        <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2">Number of Recoveries from Covid 19</Typography>
                    </CardContent>
                </Grid>

                <Grid item component={Card} className={cn(styles.card, styles.deaths)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                        <Typography variant="h5"><CountUp start={0} end={deaths.value} duration={1.0} separator=","/></Typography>
                        <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2">Number of deaths caused by covid 19</Typography>
                    </CardContent>
                </Grid>

            </Grid>
        </div>
    );
}

export default Cards;
