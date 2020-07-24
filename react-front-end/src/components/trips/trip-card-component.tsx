import * as React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {ITrip} from '../../data/i-trip';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import {red} from '@material-ui/core/colors';
import ShareIcon from '@material-ui/icons/Share';
import {CardHeader} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {routingHistory} from '../../history';
import {tripService} from '../../services/trip-service';
import {imageService} from "../../services/image-service";
import {IImage} from '../../data/i-image';
import {testImage} from "../shared/test-image";
import {IUser} from "../../data/i-user";
import {ICity} from "../../data/i-city";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

const deleteTrip = async (tripId: string) => {
    await tripService.deleteTrip(tripId);

    routingHistory.push('/trips');

};

export const TripCardComponent: React.SFC<ITripCardComponentProps> = (props) => {
    const classes = useStyles();
    const coverImage: IStateImage = {
        image: {
            id: undefined,
            adventureId: undefined,
            title: '',
            sourceBase64: testImage
        }
    };

    const [tripCoverImage, setCoverImage] = React.useState(coverImage);
    // component did mount
    React.useEffect(() => {
        async function getCoverImage() {
            let image = await imageService.getCoverByTripId(props.trip._id)
                .then(image => {
                    if (image != null && image.sourceBase64 != null) {
                        setCoverImage({image});
                    }
                }).catch(() => {});


        }

        getCoverImage();
    }, []);

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        JJ
                    </Avatar>
                }
                title={props.trip.name}
                subheader={`${props.trip.city} ${props.trip.time}`}
            />
            {tripCoverImage && tripCoverImage.image && <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                src={tripCoverImage.image.sourceBase64}
                title={props.trip.city}
            />
            }
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.trip.tip}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon/>
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon/>
                </IconButton>
                <IconButton
                    aria-label="view"
                    onClick={() =>
                        routingHistory.push('/trip', {tripId: props.trip._id})
                    }
                >
                    <VisibilityIcon/>
                </IconButton>
                <IconButton
                    aria-label="delete"
                    onClick={async () => await deleteTrip(props.trip._id)}
                >
                    <DeleteOutlinedIcon/>
                </IconButton>
            </CardActions>
        </Card>
    );
};


export interface IStateImage {
    image: IImage;
}

export interface ITripCardComponentProps {
    trip: ITrip;
}
