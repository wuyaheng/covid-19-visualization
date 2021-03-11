import React from 'react';
import { Card, CardContent, Grid } from '@material-ui/core';
import CountUp from 'react-countup';
import styles from './Cards.module.css';
import cx from 'classnames'

const Cards = ({newdata: { confirmed, recovered, deaths }}) => {
    if (!confirmed || !recovered || !deaths){
        return 'Loading...';
    }
    return (
        <div className = {styles.container}>
            <Grid container justify="space-between">
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.confirmed)}>
                    <CardContent>
                        <p className="text-muted">Confirmed</p>
                        <p><CountUp
                        start={0}
                        end={confirmed.value}
                        duration={1.5}
                        separator=","/> </p> 
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>
                    <CardContent>
                        <p className="text-muted">Recovered</p>
                        <p><CountUp
                        start={0}
                        end={recovered.value}
                        duration={1.5}
                        separator=","/> </p>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>
                    <CardContent>
                        <p className="text-muted">Deaths</p>
                        <p><CountUp
                        start={0}
                        end={deaths.value}
                        duration={1.5}
                        separator=","/> </p>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}
export default Cards;