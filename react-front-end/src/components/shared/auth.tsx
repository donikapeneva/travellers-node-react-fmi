// import {Component} from "react";
// import * as auth0 from "auth0-js";
//
// import {AUTH_CONFIG} from "../../auth0-variables";
// import {AuthProvider} from "../../authContext";
// import * as React from "react";
//
// const auth = new auth0.WebAuth({
//     domain: AUTH_CONFIG.domain,
//     clientID: AUTH_CONFIG.clientId,
//     redirectUri: AUTH_CONFIG.callbackUrl,
//     audience: `https://${AUTH_CONFIG.domain}/userinfo`,
//     responseType: "token id_token"
// });
//
// // type Result = {
// //     sub: string,
// //     email: string,
// //     accessToken: string
// // }
//
// type Result = {
//
// }


// export const Auth = (props: any) => {
//     if(props.user)
// }


// export class Auth extends Component<{}, {}> {
//
//     state = {
//         authenticated: false,
//         user: {
//             role: "visitor"
//         },
//         accessToken: ""
//     };
//
//     initiateLogin = () => {
//         auth.authorize();
//     };
//
//     logout = () => {
//         this.setState({
//             authenticated: false,
//             user: {
//                 role: "visitor"
//             },
//             accessToken: ""
//         });
//     };
//
//     handleAuthentication = () => {
//         auth.parseHash((error, authResult) => {
//             if (error) {
//                 console.log(error);
//                 console.log(`Error ${error.error} Occured`);
//                 return;
//             }
//
//             this.setSession(authResult.idTokenPayload);
//         });
//     };
//
//     setSession(authResult ) {
//         const user = {
//             id: authResult.sub,
//             email: authResult.email,
//             role: authResult[AUTH_CONFIG.roleUrl]
//         };
//         this.setState({
//             authenticated: true,
//             accessToken: authResult.accessToken,
//             user
//         });
//     }
//
//     render() {
//         const authProviderValue = {
//             ...this.state,
//             initiateLogin: this.initiateLogin,
//             handleAuthentication: this.handleAuthentication,
//             logout: this.logout
//         };
//         return (
//             <AuthProvider value={authProviderValue}>
//                 {this.props.children}
//             </AuthProvider>
//         );
//     }
// }
//
// export default Auth;