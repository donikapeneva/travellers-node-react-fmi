import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {CopyrightComponent} from '../shared/copyright-component';
import {HomeHeader} from '../shared/home-header';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import {tripService} from '../../services/trip-service';
import {imageService} from '../../services/image-service';
import {ExternalsPlugin} from 'webpack';
import {ITrip} from '../../data/i-trip';
import {IImage} from '../../data/i-image';
import {routingHistory} from '../../history';
import {ImageGridList} from '../images/images-component';
import {UploadImageComponent} from '../images/upload-image-component';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import {ModifyTripButton} from '../trips/modify-trip-button';

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
        textAlign: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    textSpace: {
        marginBottom: theme.spacing(5),
    },
    smallTextSpace: {
        margin: theme.spacing(2),
    },
    rowOrder: {
        flexDirection: 'row',
    }
}));

export const ViewTripComponent = (props: IViewTripComponent) => {
    const classes = useStyles();

    if (!props.trip) {
        routingHistory.push('/trips');
    }


    return (
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LocationCityIcon/>
                </Avatar>
                <Typography component="h1" variant="h6" className={classes.textSpace}>
                    Your Adventure
                </Typography>
                <Typography component="h1" variant="h4" className={classes.textSpace}>
                    {props.trip.name}
                </Typography>
                <Paper  elevation={1}>
                    <Typography component="h3" variant="h6" className={classes.smallTextSpace}>
                        {props.trip.city}
                        {/*{", "}{props.trip.countryName}*/}
                    </Typography>
                    <Typography component="h3" variant="h6" className={classes.smallTextSpace}>
                        {props.trip.time}
                    </Typography>

                </Paper>

                {/*<Paper elevation={1}>*/}
                    <Typography component="h3" variant="h6" className={classes.smallTextSpace}>
                        {props.trip.tip}
                    </Typography>
                {/*</Paper>*/}
            </div>

            <ModifyTripButton
                onClick={() => {
                    routingHistory.push('/trip', {tripId: props.trip._id, modify: true});
                }}
            />
        </Grid>
    );
};

export interface IViewTripComponent {
    trip: ITrip;
}
