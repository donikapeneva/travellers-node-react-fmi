import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {HeaderComponent} from './shared/header';
import {FooterComponent} from './shared/footer';
import {routingHistory} from '../history';
import IconButton from '@material-ui/core/IconButton';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import InfoIcon from '@material-ui/icons/Info';
import ChatIcon from '@material-ui/icons/Chat';
import Map from './map/maps-component';

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
        height: '55vh',
        marginLeft: '17vh',
        marginRight: '12vh',
    },
    paper: {
        margin: theme.spacing(3, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    searchBar: {
        paddingTop: 50,
        paddingLeft: 100,
        paddingRight: 100,
    },
    paper2: {
        margin: theme.spacing(3, 4),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export const openLoginPage = () => {
    routingHistory.push('/login');
};

export const openRegisterPage = () => {
    routingHistory.push('/register');
};

export const openTripsPage = () => {
    routingHistory.push('/trips');
};

export const openAboutPage = () => {
    routingHistory.push('/about');
};


export const Home = (props: any) => {
    const classes = useStyles();

    return (
        <div>
            <HeaderComponent title={'Travellers'}/>
            <Grid container component="main" className={classes.root}>
                <CssBaseline/>

                <Grid item xs={12} sm={12} md={12}>
                    <Paper className={classes.paper2}>
                        <Grid item xs={12} sm={4}>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <Map/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                        </Grid>
                    </Paper>
                </Grid>
                
                <Grid item xs={12} sm={4}>

                    <Paper className={classes.paper}>
                        <IconButton aria-label="Adventure" onClick={openTripsPage}>
                            <Avatar className={classes.avatar}>
                                <LocationCityIcon/>
                            </Avatar>
                        </IconButton>
                        <Typography component="h1" variant="h5">
                            Adventures
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <ChatIcon/>
                        </Avatar>
                        <Typography variant="body1" gutterBottom>
                            “Have a nice trip! And share your tips and pics!”
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Paper className={classes.paper}>
                        <IconButton aria-label="About" onClick={openAboutPage}>
                            <Avatar className={classes.avatar}>
                                <InfoIcon/>
                            </Avatar>
                        </IconButton>
                        <Typography component="h1" variant="h5">
                            About
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
            <FooterComponent title={'Travellers'} description={'Test description'}/>
        </div>
    );
};
