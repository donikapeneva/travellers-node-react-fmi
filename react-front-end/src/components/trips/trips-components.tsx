import * as React from 'react';

import {ITrip} from '../../data/i-trip';
import {tripService} from '../../services/trip-service';
import {TripCardComponent} from './trip-card-component';
import {Grid} from '@material-ui/core/';
import {HomeHeader} from '../shared/home-header';
import {CreateTripButton} from '../trips/create-trip-button';
import {routingHistory} from '../../history';
import {HeaderComponent} from "../shared/header";

export class TripsComponent extends React.Component<{}, ITripsComponentState> {
    public constructor(props: {}) {
        super(props);

        this.state = {
            trips: [],
        };
    }

    public async componentDidMount(): Promise<void> {
        const trips = await tripService.getTrips();
        console.log(trips);
        console.log('>>>>>>>>>>');
        this.setState({trips : trips});
        // this.setState(trips);

        console.log(this.state.trips);
        console.log(this.state);
        console.log(Array.isArray(this.state.trips));
    }


    public render() {
        return (
            <div>
                <HeaderComponent title={'Explore'}/>
                <HomeHeader/>
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    {
                        this.state.trips &&
                        Array.isArray(this.state.trips) &&
                        this.state.trips.map((trip: ITrip, index: number) => {

                            console.log("pleeeeease");
                            console.log(trip);
                            return (

                            <Grid item xs={12} sm={6} md={3} key={index} >
                                <TripCardComponent trip={trip}/>
                            </Grid>
                        )})
                    }
                </Grid>
                <CreateTripButton
                    onClick={() => {
                        routingHistory.push('/trip');
                    }}
                />
            </div>
        );
    }
}

export interface ITripsComponentState {
    trips: ITrip[];
}
