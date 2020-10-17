import React, { Component } from 'react'
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import axios from 'axios';
import IndividualEvent from './IndividualEvent';
import BACKEND_URL from '../../../config/config';
import Modal from 'react-modal';
import RegisteredEvents from './RegisteredEvents';

export class Events extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            Events: [],
            RegisteredEvents: [],
            searchInput: "",
            sortBy: "Ascending"

        }
    }

    componentDidMount () {
        // getting all events
        axios.defaults.headers.common[ "authorization" ] = cookie.load( 'token' )
        axios.defaults.withCredentials = true;
        axios.get( BACKEND_URL + '/events/' ).then( response => {
            console.log( "got events", response.data )
            response.data.map( ( event ) => {
                this.setState( {
                    Events: [ ...this.state.Events, event ],
                } )

            } )
            console.log( this.state )

        } ).catch( error => {
            console.log( "Error in fetching restaurant events: ", error );
        } )

        //getting registered events
        var id = cookie.load( 'id' )
        axios.defaults.headers.common[ "authorization" ] = cookie.load( 'token' )
        axios.defaults.withCredentials = true;
        axios.get( BACKEND_URL + '/events/users/' + id ).then( response => {
            console.log( "Got registered events" );
            response.data.map( ( event ) => {
                this.setState( {
                    RegisteredEvents: [ ...this.state.RegisteredEvents, event ]
                } )
            } )


        } ).catch( error => {
            console.log( "Error in getting registered events: ", error )
        } )
    }


    handleSearch = ( e ) => {
        console.log( e.target.name, e.target.value )
        this.setState( {
            [ e.target.name ]: e.target.value
        } )
    }

    handleSortBy = ( e ) => {
        this.setState( {
            sortBy: e.target.value
        } )
    }

    render () {
        var redirectVar = null;
        if ( !( cookie.load( "auth" ) && cookie.load( "type" ) === "users" ) ) {
            redirectVar = <Redirect to="/login" />
        }
        let filteredEvents = this.state.Events.filter( ( event ) => {
            return event.eventName.toLowerCase().includes( this.state.searchInput.toLowerCase() )
        } )
        let sortedEvents = filteredEvents.sort( ( a, b ) => {
            let d1 = a.eventDate.split( "-" )
            let date1 = d1[ 0 ] + d1[ 1 ] + d1[ 2 ]
            let d2 = b.eventDate.split( "-" )
            let date2 = d2[ 0 ] + d2[ 1 ] + d2[ 2 ]
            if ( this.state.sortBy === "Ascending" ) {
                return date1 - date2
            } else if ( this.state.sortBy === "Descending" ) {
                return date2 - date1
            }

        } )
        let details = sortedEvents.map( event => {

            return (
                <IndividualEvent eventData={ event } />
            )
        } )

        let registeredEvents = this.state.RegisteredEvents.map( event => {
            return ( <RegisteredEvents eventData={ event } />
            )
        } )

        return (
            <div>
                { redirectVar }
                <div className="container-fluid m-1" style={ { height: "100vh" } }>
                    <div className="row">
                        <div className="col-8">
                            <div className="row m-3">
                                <div className="col-1"></div>
                                <div className="col-4">
                                    <b>Sort </b><select defaultValue="Ascending" onChange={ this.handleSortBy } name="sort" id="event">
                                        <option value="Ascending" >Ascending</option>
                                        <option value="Descending">Decending</option>
                                    </select>

                                </div>
                                <div className="col-3">
                                    <input type="text" style={ { "width": "400px", "height": "30px", "border": "1px solid gray", "box-shadow": "0px 0px 10px gray" } } name="searchInput" onChange={ this.handleSearch } placeholder="Search Event by Name"></input>
                                </div>
                                <div className="col-4"></div>

                            </div>
                            <div className="row m-2" >
                                <div className="col-1"></div>
                                <div className="col-11">
                                    <div className='details'  >{ details }</div>
                                </div>

                            </div>
                        </div>
                        <div className="col-4" style={ { "padding": "0px 15px", "border-left": "1px solid #e6e6e6" } }>
                            <div className="row m-2" style={ { "padding": "15px" } }>
                                <h4>Registered Events</h4>

                            </div>
                            <div className="row" style={ { "padding": "0 15px" } }>
                                { registeredEvents }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Events
