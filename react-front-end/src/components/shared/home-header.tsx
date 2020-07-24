import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { routingHistory } from '../../history';
import Avatar from '@material-ui/core/Avatar';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
  fixed: {
    position: 'fixed',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

export const openHomePage = () => {
  routingHistory.push('/');
};

export const HomeHeader = (props: IHomeHeaderProps) => {
  const classes = useStyles();

  return (
    <IconButton
      aria-label="Home"
      onClick={openHomePage}
      className={props.fixedPosition ? classes.fixed : undefined}
    >
      <Avatar className={classes.avatar}>
        <HomeIcon />
      </Avatar>
    </IconButton>
  );
};

export interface IHomeHeaderProps {
  fixedPosition?: boolean;
}
