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

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  uploadButtonContainer: {
    position: 'fixed',
    bottom: 0,
  },
  uploadButtonInput: {
    visibility: 'collapse',
    position: 'absolute',
  },
}));

export const UploadImageComponent = (props: IImageUploadProps) => {
  const classes = useStyles();

  return (
    <div className={classes.uploadButtonContainer}>
      <input
        className={classes.uploadButtonInput}
        accept="image/*"
        id="icon-button-file"
        type="file"
        onChange={async (event: any) => props.onUpload(event.target.files)}
      />
      <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <Avatar className={classes.avatar}>
            <PhotoCamera />
          </Avatar>
        </IconButton>
      </label>
    </div>
  );
};

export interface IImageUploadProps {
  onUpload: (files: Iterable<File>) => void;
}
