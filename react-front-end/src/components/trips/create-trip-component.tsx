import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {tripService} from '../../services/trip-service';
import {ITrip} from '../../data/i-trip';
import {routingHistory} from '../../history';
import {ICity} from '../../data/i-city';
import {ICountry} from "../../data/i-country";
import {ReactDOM} from "react";
import {render} from "react-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/1600x900/?city)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light'
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    textSpace: {
        margin: theme.spacing(5),
    },
    smallTextSpace: {
        margin: theme.spacing(2),
    },
    textArea: {
        margin: theme.spacing(2),
        width: 500,
        height: 300,
    }
}));

const createTrip = async (trip: Partial<ITrip>): Promise<void> => {

    // routingHistory.push('/trips');
    await tripService.createTrip(trip)
        .then((tripId) => {
            routingHistory.push('/trip', tripId);
        })
        .catch();


};


export type IPlace = {
    countries: ICountry[],
    cities: ICity[],

}

export const CreateTripComponent = (props: ICreateTripComponentProps) => {
    const classes = useStyles();

    const initialTrip: Partial<ITrip> = {
        name: undefined,
        //todo DELETE
        userId: '1',
        city: undefined,
        countryName: undefined,
        time: undefined,
        tip: undefined,
    };


    const [trip, setTrip] = React.useState(initialTrip);
    const [country, setCountry] = React.useState<ICountry>(undefined);
    const [cities, setCities] = React.useState<ICity[]>([]);

    React.useEffect(
        () => {
            if (!!country) {
                setCities(country.cities);
            }
        },
        [country]
    )

    return (
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h6" className={classes.textSpace}>
                    Your Adventure
                </Typography>
                <form className={classes.form}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="trip-name"
                        label="Trip name"
                        name="tripname"
                        onChange={(event) => {
                            const newName = event.target.value;

                            setTrip({...trip, name: newName});
                        }}
                    />
                    {/* TODO use props.cities */}

                    <Autocomplete
                        className={classes.smallTextSpace}
                        id="country"
                        key={"countrySelection"}
                        options={props.countries}
                        getOptionLabel={(option) => {
                            return option.name;
                        }}
                        style={{width: 300}}
                        renderInput={(params) => (
                            <TextField {...params} label="Country" variant="outlined"/>
                        )}
                        onChange={(event: object, value: any, reason: string) => {
                            setCountry(value);
                            setTrip({...trip, countryName: value.name});
                        }}
                    />
                    <Autocomplete
                        className={classes.smallTextSpace}
                        id="citySelection"
                        options={cities}
                        getOptionLabel={(option) => {
                            return option;
                        }}
                        style={{width: 300}}
                        renderInput={(params) => (
                            <TextField {...params} label="City" variant="outlined"/>
                        )}
                        onChange={(event: object, value: any, reason: string) => {
                            setTrip({...trip, city: value});
                        }}
                    />

                    <TextField
                        className={classes.smallTextSpace}
                        id="date"
                        label="Date"
                        type="date"
                        defaultValue="2017-05-24"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(event) => {
                            const date = event.target.value;

                            setTrip({...trip, time: date});
                        }}
                    />

                    <TextareaAutosize
                        className={classes.textArea}
                        aria-label="empty textarea"
                        placeholder="Tip"
                        onChange={(event) => {
                            const tip = event.target.value;

                            setTrip({...trip, tip: tip});
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={async () => {
                            await createTrip(trip);
                        }}
                    >
                        Create
                    </Button>
                </form>
            </div>
        </Grid>
    );
};

export interface ICreateTripComponentProps {
    countries: ICountry[];
}
