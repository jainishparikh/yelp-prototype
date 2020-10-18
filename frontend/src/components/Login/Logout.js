import React, { Component } from 'react'
import { Redirect } from 'react-router'
import cookie from "react-cookies";


export class Logout extends Component {
    render () {
        var cookies = null
        var redirectVar = null
        if ( cookie.load( "auth" ) ) {
            cookies = cookie.loadAll();

            Object.keys( cookies ).forEach( ( key ) => {
                cookie.remove( key, { path: '/' } )
            } )
            window.location.assign( '/' );
        }
        return (
            <div>
                { redirectVar }
            </div>
        )
    }
}



export default Logout 
