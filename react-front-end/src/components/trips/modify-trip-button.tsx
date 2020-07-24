import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import UpdateIcon from '@material-ui/icons/Update';
import {useState} from "react";
import {routingHistory} from "../../history";

const useStyles = makeStyles((theme) => ({
  fixed: {
    position: 'fixed',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
}));




export const ModifyTripButton = (props: IModifyTripButtonProps) => {
  const classes = useStyles();



  return (
    <IconButton
      aria-label="Home"
      onClick={props.onClick}
      className={classes.fixed}
    >
      <Avatar className={classes.avatar}>
        <UpdateIcon />
      </Avatar>
    </IconButton>
  );
};


export interface IModifyTripButtonProps {
  onClick: () => void;
}
