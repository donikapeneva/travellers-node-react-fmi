import * as React from 'react';
import {useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import {Home} from './home';
import {About} from './about';
import {NotFound} from './not-found';
import {LoginComponent} from './authentication/login';
import {Logout} from './authentication/logout';
import {RegisterComponent} from './authentication/register';
import {User} from './users/user';
import {Users} from './users/users';
import {TripComponent} from './trips/trip-component';
import {TripsComponent} from './trips/trips-components';


export const App = () => {

    const [user, updateUser] = useState(undefined);
    React.useEffect(() => {
        let userche = {
            isLoggedIn: true,
            user: {}
        };
        updateUser(userche)
    }, []);

    return (
        <Switch>
            <Route exact path="/">
                <Home {...user}/>
            </Route>
            <Route path="/about">
                <About info={'Teeeest'}/>
            </Route>
            <Route path="/login">
                <LoginComponent/>
            </Route>
            <Route path="/logout">
                <Logout/>
            </Route>
            <Route path="/register">
                <RegisterComponent/>
            </Route>
            <Route path="/user">
                <User/>
            </Route>
            <Route path="/users">
                <Users/>
            </Route>
            <Route path="/trips">
                <TripsComponent/>
            </Route>
            <Route path="/trip">
                <TripComponent/>
            </Route>
            {/* The Default not found component */}
            <Route>
                <NotFound/>
            </Route>
        </Switch>
    )
};

