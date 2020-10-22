import React, { Component } from 'react'
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import axios from 'axios';
import BACKEND_URL from '../../../config/config';
import IndividualReview from './IndividualReview';
import restaurantGetReviewsAction from '../../../actions/restaurantGetReviewsAction'
import { connect } from "react-redux";



export class Reviews extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            Reviews: []
        }
    }
    componentDidMount () {
        this.props.restaurantGetReviewsAction().then( response => {

        } )
        // var type = cookie.load( 'type' )
        // var id = cookie.load( 'id' )
        // axios.defaults.headers.common[ "authorization" ] = cookie.load( 'token' )
        // axios.defaults.withCredentials = true;
        // axios.get( BACKEND_URL + '/reviews/getreviews/' + type + '/' + id ).then( response => {
        //     response.data.map( ( review ) => {
        //         this.setState( {
        //             Reviews: [ ...this.state.Reviews, review ]
        //         } )

        //     } )
        //     console.log( this.state )

        // } ).catch( error => {
        //     console.log( "Error in fetching reviews: ", error );
        // } )
    }
    render () {
        var redirectVar = null;
        if ( !( cookie.load( "auth" ) && cookie.load( "type" ) === "restaurants" ) ) {
            redirectVar = <Redirect to="/login" />
        }
        let details = this.props.Reviews.map( ( review ) => {
            return (
                <IndividualReview reviewData={ review } />
            )
        } )
        return (
            <div>
                { redirectVar }
                <div className="container-fluid m-1" style={ { height: "100vh" } }>
                    <div className="row">
                        <div className='col-5'></div>
                        <div className='col-7'><h5>Reviews by Customers </h5></div>

                    </div>
                    <div className="row mt-10" >
                        <div className='col-1'></div>
                        <div className='col-10'>{ details }</div>
                        <div className='col-1'></div>

                    </div>
                </div>

            </div>
        )
    }
}


const matchStateToProps = ( state ) => {
    return {
        Reviews: state.restaurantreviewsReducer.Reviews,

    }

}

const matchDispatchToProps = ( dispatch ) => {
    return {
        restaurantGetReviewsAction: () => dispatch( restaurantGetReviewsAction() ),
    }
}

export default connect( matchStateToProps, matchDispatchToProps )( Reviews )
