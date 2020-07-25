import {Autocomplete} from "@material-ui/lab";
import {ICity} from "../../data/i-city";
import {TextField} from "@material-ui/core";
import {ICountry} from "../../data/i-country";
import * as React from "react";
import {useState} from "react";



export const Search = (props: ICountry[]) => {
    const [search, setSearch] = useState(undefined);
    return (
        <div>
            {/*<Autocomplete*/}
            {/*    className={classes.searchBar}*/}
            {/*    freeSolo*/}
            {/*    id="free-solo-2-demo"*/}
            {/*    disableClearable*/}
            {/*    options={places.cities.map((city: ICity) => city.name)}*/}
            {/*    renderInput={(params) => (*/}
            {/*        <TextField*/}
            {/*            {...params}*/}
            {/*            label="Search city"*/}
            {/*            margin="normal"*/}
            {/*            variant="outlined"*/}
            {/*            InputProps={{ ...params.InputProps, type: 'search' }}*/}
            {/*        />*/}
            {/*    )}*/}
            {/*/>*/}
            <Autocomplete
                // className={classes.searchBar}
                freeSolo
                id="search-countries"
                disableClearable
                options={props.map((country: ICountry) => country.name)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search countries"
                        margin="normal"
                        variant="outlined"
                        InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                )}
                onChange={(event: object, value: any, reason: string) => {
                    console.log(value);
                    setSearch({ countryId: value.id });
                }}
            />
        </div>
    )
}


export interface ISearchComponentProps {

    filterByUserId: string;
    filterByCityId: string;
    filterByCountryId: string;

    dateFrom: string;
    dateTo: string;
}