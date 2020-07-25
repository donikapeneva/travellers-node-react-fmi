import * as React from 'react';
import * as ReactDOM from "react-dom";
import {ComposableMap, Geographies, Geography, Graticule} from 'react-simple-maps';
import {Component} from "react";

const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
class Map extends Component {

    // return (
    //     <div>
    //         <ComposableMap>
    //             {/*<Geographies geography={geoUrl}>*/}
    //             {/*<Geographies geography={geoUrl}>*/}
    //                 {/*{({ geographies }) =>*/}
    //                 {/*    geographies.map(geo => <Geography key={geo.rsmKey} geography={geo} />)*/}
    //                 {/*}*/}
    //             {/*</Geographies>*/}
    //         </ComposableMap>
    //     </div>
    // )

    render() {
        return (
            <div>
            <ComposableMap
                projection="geoAzimuthalEqualArea"
                projectionConfig={{
                    rotate: [-20.0, -52.0, 0],
                    scale: 700
                }}
            >
                <Graticule stroke="#EAEAEC"/>
                <Geographies geography={geoUrl}>
                    {({geographies}) =>
                        geographies.map(geo => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                fill="#9998A3"
                                stroke="#EAEAEC"
                            />
                        ))
                    }
                </Geographies>
            </ComposableMap>
            </div>
        );
    }

}

export default Map;