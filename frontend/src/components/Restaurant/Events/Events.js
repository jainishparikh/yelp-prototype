import React, { Component } from 'react'
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import axios from 'axios';
import IndividualEvent from './IndividualEvent';
import BACKEND_URL from '../../../config/config';
import Modal from 'react-modal';
import PostEvent from './PostEvent';
import '../../../css/pagination.css';
import ReactPaginate from 'react-paginate';
import restaurantGetEventsAction from '../../../actions/restaurantGetEventsAction'
import { connect } from "react-redux";

export class Events extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            Events: [],
            postEventPopUp: false,
            offset: 0,
            perPage: 5,
            pageCount: 0
        }
    }

    componentDidMount () {
        this.props.restaurantGetEventsAction( this.state.perPage ).then( response => {

        } )
        // var restaurantID = cookie.load( 'id' )
        // axios.defaults.headers.common[ "authorization" ] = cookie.load( 'token' )
        // axios.defaults.withCredentials = true;
        // return axios.get( BACKEND_URL + '/events/restaurants/' + restaurantID ).then( response => {
        //     this.setState( {
        //         Events: response.data,
        //         pageCount: Math.ceil( response.data.length / this.state.perPage )
        //     } )
        //     // console.log( this.state )

        // } ).catch( error => {
        //     console.log( "Error in fetching restaurant events: ", error );
        // } )
    }

    togglepostEventPopUp = ( e ) => {
        this.setState( {
            postEventPopUp: !this.state.postEventPopUp
        } )
    }

    handlePageClick = ( e ) => {

        this.setState( {
            offset: this.state.perPage * e.selected,

        } )

    };

    render () {
        var redirectVar = null;
        if ( !( cookie.load( "auth" ) && cookie.load( "type" ) === "restaurants" ) ) {
            redirectVar = <Redirect to="/login" />
        }
        console.log( "this.props.Events", this.props.Events )
        let details = this.props.Events.slice( this.state.offset, this.state.offset + this.state.perPage ).map( ( event, index ) => {
            return (
                <IndividualEvent key={ index } eventData={ event } />
            )
        } )
        return (
            <div>
                { redirectVar }
                <div className="container-fluid m-1" style={ { height: "100vh" } }>
                    <div className="row mt-10" >
                        <div className='col-2'>
                            <div className="row mt-2" style={ { height: "240px" } }> <h2> Events Posted by You </h2></div>
                            <div className="row mt-2" style={ { height: "520px" } }>
                                <div className="post-event m-2" >
                                    <button className="btn btn-danger" onClick={ this.togglepostEventPopUp }>Post Event</button>
                                </div>
                                {/* using react-modal for popup to add dish */ }
                                <Modal isOpen={ this.state.postEventPopUp } style={ {
                                    overlay: {
                                        position: 'fixed',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundColor: 'rgba(255, 255, 255, 0.25)'
                                    },
                                    content: {
                                        position: 'relative',
                                        top: '20%',
                                        left: '20%',
                                        right: '20%',
                                        bottom: '20%',
                                        border: '2px solid #ccc',
                                        background: '#fff',
                                        overflow: 'auto',
                                        WebkitOverflowScrolling: 'touch',
                                        borderRadius: '4px',
                                        outline: 'none',
                                        padding: '20px'
                                    }
                                } } >
                                    <PostEvent closePopUp={ this.togglepostEventPopUp } />
                                </Modal>

                            </div>
                        </div>
                        <div className='col-10' style={ { height: "20%" } }>
                            <div className="row">
                                <div className="col-4"></div>
                                <div className="col-6">

                                    <ReactPaginate
                                        previousLabel={ "prev" }
                                        nextLabel={ "next" }
                                        breakLabel={ "..." }
                                        breakClassName={ "break-me" }
                                        pageCount={ this.props.pageCount }
                                        marginPagesDisplayed={ 2 }
                                        pageRangeDisplayed={ 5 }
                                        onPageChange={ this.handlePageClick }
                                        containerClassName={ "pagination" }
                                        subContainerClassName={ "pages pagination" }
                                        activeClassName={ "active" } />
                                </div>

                            </div>
                            <div className="row" style={ { "width": "100%" } }>
                                { details }
                            </div>


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
        pageCount: state.restauranteventsReducer.pageCount,
    }

}

const matchDispatchToProps = ( dispatch ) => {
    return {
        restaurantGetEventsAction: ( perPage ) => dispatch( restaurantGetEventsAction( perPage ) ),
    }
}

export default connect( matchStateToProps, matchDispatchToProps )( Events )

