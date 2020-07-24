import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles((theme) => ({
    fixed: {
        position: 'fixed',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
        position: "fixed",
        right: 20,
        top: window.innerHeight - 100
    },
}));


export const CreateTripButton = (props: ICreateTripButtonProps) => {
    const classes = useStyles();

    return (
        <IconButton
            aria-label="Add Trip"
            onClick={props.onClick}
            className={classes.fixed}
        >
            <Avatar className={classes.avatar}>
                <AddCircleIcon/>
            </Avatar>
        </IconButton>
    );
};

export interface ICreateTripButtonProps {
    onClick: () => void;
}
