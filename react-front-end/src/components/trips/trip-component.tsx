import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import {HomeHeader} from '../shared/home-header';
import {imageService} from '../../services/image-service';
import {IImage} from '../../data/i-image';
import {routingHistory} from '../../history';
import {ImageGridList} from '../images/images-component';
import {UploadImageComponent} from '../images/upload-image-component';
import {CreateTripComponent} from '../trips/create-trip-component';
import {ViewTripComponent} from '../trips/view-trip-component';
import {tripService} from '../../services/trip-service';
import {ModifyTripComponent} from '../../components/trips/modify-trip-component';
import {placeService} from '../../services/place-service';
import {ICity} from "../../data/i-city";
import {ICountry} from "../../data/i-country";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    images: {
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light'
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
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
}));


export type IPlace = {
    countries: ICountry[],

}

const initialPlaces: IPlace = {
    countries: [{
        id: undefined,
        name: undefined,
        countryCode: undefined,
        cities: undefined,
    }]
};


export const TripComponent = () => {
    const classes = useStyles();
    const locationHistoryState: any = routingHistory.location.state;

    const tripId =
        locationHistoryState && locationHistoryState.tripId !== undefined
            ? locationHistoryState.tripId
            : undefined;


    const modifyTrip =
        locationHistoryState && locationHistoryState.modify !== undefined
            ? locationHistoryState.modify
            : false;

    const initialImages: IStateImages = {
        images: [],
    };

    const [tripImages, setImages] = React.useState(initialImages);
    const [trip, setTrip] = React.useState(undefined);
    const [places, setPlaces] = React.useState(initialPlaces);


    // component did mount
    React.useEffect(() => {
        async function getTrip() {
            if (!tripId) {
                return;
            }

            const trip = await tripService.getTrip(tripId);
            setTrip(trip);
        }

        getTrip();

        async function getImages() {
            if (!trip) {
                return;
            }

            const images = await imageService.getByTripId(tripId);
            setImages({images});
        }

        getImages();


        async function getPlaces() {
            const countries = await placeService.getAllCountries();
            setPlaces({
                countries: countries,
            });
        }


        getPlaces();

    }, []);

    console.log(trip);
    const currentTripComponent: JSX.Element = trip != undefined ? (
        modifyTrip ? (
            <ModifyTripComponent trip={trip} countries={places.countries}/>
        ) : (
            <ViewTripComponent trip={trip}/>
        )
    ) : (
        <CreateTripComponent countries={places.countries}/>
    );


    const uploadImageHandler = async (imagesData: Iterable<File>) => {
        const newImageId = await imageService.upload(imagesData, trip.id);

        const newImage = await imageService.getById(newImageId);

        setImages({images: [...tripImages.images, newImage]});
    };

    const removeImageHandler = async (imageId: string) => {
        await imageService.delete(imageId);
        const images = tripImages.images.filter((image) => {
            image.id! !== Number(imageId);
        });
        setImages({images: images});
    };

    const imagesComponent: JSX.Element =
        tripImages.images.length > 0 ? (
            <Grid item xs={false} sm={4} md={7} className={classes.images}>
                <ImageGridList
                    images={tripImages.images}
                    onRemoveImage={removeImageHandler}
                ></ImageGridList>
            </Grid>
        ) : (
            <Grid item xs={false} sm={4} md={7} className={classes.image}/>
        );

    return (
        <div>
            <HomeHeader fixedPosition={true}/>
            <Grid container component="main" className={classes.root}>
                <CssBaseline/>
                {imagesComponent}
                {currentTripComponent}
                {tripId && <UploadImageComponent onUpload={uploadImageHandler}/>}
            </Grid>
        </div>
    );
};

export interface IStateImages {
    images: IImage[];
}

