import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import BACKEND_URL from '../../../config/config';
import cookie from 'react-cookies';
import { connect } from "react-redux";


export class EventRegistrations extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            Attendees: [],
            eventID: this.props.eventData.eventID,
        }
    }
    componentDidMount () {
        let length = this.props.Events.length
        for ( let i = 0; i < length; i++ ) {
            if ( this.props.Events[ i ]._id === this.props.eventData.eventID ) {
                this.setState( {
                    Attendees: this.props.Events[ i ].users
                } )
                break;
            }
        }
        // var eventID = this.state.eventID
        // axios.defaults.headers.common[ "authorization" ] = cookie.load( 'token' )
        // axios.defaults.withCredentials = true;
        // axios.get( BACKEND_URL + '/events/attendees/' + eventID ).then( response => {
        //     response.data.map( ( attendee ) => {
        //         this.setState( {
        //             Attendees: [ ...this.state.Attendees, attendee ]
        //         } )

        //     } )
        //     console.log( this.state )

        // } ).catch( error => {
        //     console.log( "Error getting attendees for an event" )
        // } )
    }
    render () {
        let details = this.state.Attendees.map( ( attendee ) => {

            return (
                <tr>
                    <td style={ { "padding": "10px", "border": "1px solid gray" } } >{ attendee.userName }</td>
                    <td style={ { "padding": "10px", "border": "1px solid gray" } }>{ attendee.userEmail }</td>
                    <td style={ { "padding": "10px", "border": "1px solid gray" } }>
                        <Link className="btn btn-primary" to={ `/restaurants/userprofiles/${ attendee.userEmail }/${ attendee.userID }` } >
                            View Profile
                    </Link>
                    </td>
                </tr>
            )
        } )
        return (
            <div>
                <div className="container">
                    <div className="details">
                        <h2>List of Registered People:</h2>
                        <table>
                            <tbody>

                                { details }
                            </tbody>
                        </table>

                    </div>
                    <div className="row mt-5">
                        <div className="col-3">
                            <button className="btn btn-danger" onClick={ this.props.closePopUp }>Back</button>
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}

const matchStateToProps = ( state ) => {
    return {
        Events: state.restauranteventsReducer.Events,

    }

}

// const matchDispatchToProps = ( dispatch ) => {
//     return {
//         restaurantGetEventsAction: ( perPage ) => dispatch( restaurantGetEventsAction( perPage ) ),
//     }
// }

export default connect( matchStateToProps, null )( EventRegistrations )

