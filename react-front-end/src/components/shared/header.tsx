import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { routingHistory } from '../../history';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import InfoIcon from '@material-ui/icons/Info';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import DeleteIcon from '@material-ui/icons/Delete';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export const openLoginPage = () => {
  routingHistory.push('/login');
};

export const openRegisterPage = () => {
  routingHistory.push('/register');
};

export const HeaderComponent = (props: IHeaderProps) => {
  const classes = useStyles();
  const { title } = props;

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h2"
          variant="h5"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={openLoginPage}
          startIcon={<AccountCircleIcon />}
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={openRegisterPage}
          startIcon={<VpnKeyIcon />}
        >
          Register
        </Button>
      </Toolbar>
    </React.Fragment>
  );
};

export interface IHeaderProps {
  title: string;
}
