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
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { CopyrightComponent } from '../shared/copyright-component';
import { HomeHeader } from '../shared/home-header';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { tripService } from '../../services/trip-service';
import { imageService } from '../../services/image-service';
import { ExternalsPlugin } from 'webpack';
import { ITrip } from '../../data/i-trip';
import { IImage } from '../../data/i-image';
import { routingHistory } from '../../history';
import { ImageGridList } from '../images/images-component';
import { UploadImageComponent } from '../images/upload-image-component';
import { ICity } from '../../data/i-city';
import {placeService} from "../../services/place-service";
import {IPlace} from "./create-trip-component";
import DateTimeFormat = Intl.DateTimeFormat;

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
    marginBottom: theme.spacing(5),
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

const updateTrip = async (
  tripId: string,
  trip: Partial<ITrip>
): Promise<void> => {
  await tripService.updateTrip(tripId, trip);

  routingHistory.push('/trip',  tripId );
};

export const ModifyTripComponent = (props: IModifyTripComponent) => {


  const classes = useStyles();
  const [trip, setTrip] = React.useState(props.trip as Partial<ITrip>);

  if (!props.trip) {
    return null;
  }

  return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h6" className={classes.textSpace}>
          Your Adventure
        </Typography>
        <form className={classes.form}>
          <TextField
              className={classes.textSpace}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="trip-name"
            label="Trip name"
            name="tripname"
            defaultValue={props.trip.name}
            onChange={(event) => {
              const newName = event.target.value;

              setTrip({...trip, name: newName });
            }}
          />
          <Autocomplete
              className={classes.smallTextSpace}
            id="combo-box-demo"
            options={props.cities}
            value={props.trip.city}
            getOptionLabel={(option) => {
              return option.name;
            }}
            style={{ width: 300 }}

            renderInput={(params) => (
              <TextField {...params} label="City" variant="outlined" />
            )}
            onChange={(event: object, value: any, reason: string) => {
              console.log(value);

              setTrip({...trip, cityId: value.id });
            }}
          />

          <TextField
              className={classes.smallTextSpace}
              id="date"
              label="Date"
              type="date"
              defaultValue= {props.trip.time.split('T')[0]}
              // value={props.trip.time }

              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => {
                const date = event.target.value;

                setTrip({...trip, time: date });
              }}
          />

          <TextareaAutosize
              className={classes.textArea}
            aria-label="empty textarea"
            placeholder="Tip"
            defaultValue={props.trip.tip}
            onChange={(event) => {
              const tip = event.target.value;

              setTrip({...trip, tip: tip });
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={async () => {
              await updateTrip(trip.id!.toString(), trip);
            }}
          >
            Update
          </Button>
        </form>
      </div>
    </Grid>
  );
};

export interface IModifyTripComponent {
  trip: ITrip;
  cities: ICity[];
}
