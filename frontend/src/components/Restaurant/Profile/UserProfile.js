import React, { Component } from 'react'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'
import cookie from 'react-cookies';
import axios from 'axios';
import profile_picture from '../../../images/profile.png';
import BACKEND_URL from '../../../config/config';
import GetReviews from '../Reviews/GetReviews';
import userProfileGetAction from '../../../actions/userProfileGetAction';
import userFollowAction from '../../../actions/userFollowActions';
import { connect } from "react-redux";

export class UserProfile extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            userID: "",
            name: "",
            nickName: "",
            email: "",
            contactNumber: "",
            dateOfBirth: "",
            city: "",
            state: "",
            country: "",
            headline: "",
            yelpingSince: "",
            thingsILove: "",
            blogLink: "",
            profileImagePath: profile_picture,
            following: false
        }

    }

    componentDidMount () {
        this.props.userProfileGetAction( this.props.match.params.userEmail )
        // let restaurantID = cookie.load( 'id' )
        // let email = this.props.match.params.userEmail
        // axios.defaults.headers.common[ "authorization" ] = cookie.load( 'token' )
        // axios.defaults.withCredentials = true;
        // axios.get( BACKEND_URL + '/users/about/' + email ).then( ( response ) => {
        //     if ( response.status === 200 ) {
        //         console.log( "got data" )
        //         let imagePath = BACKEND_URL + "/images/profilepics/" + response.data.profilePicture
        //         if ( response.data.profilePicture === null ) {
        //             console.log( "inside imagepath null" )
        //             imagePath = profile_picture
        //         }
        //         let length = response.data.followedBy.length
        //         for ( let i = 0; i < length; i++ ) {
        //             if ( response.data.followedBy[ i ] === restaurantID ) {
        //                 this.setState( {
        //                     following: true
        //                 } )
        //                 break;
        //             }
        //         }
        //         this.setState( {
        //             userID: response.data._id,
        //             name: response.data.name,
        //             nickName: response.data.nickName,
        //             email: response.data.email,
        //             contactNumber: response.data.contactNumber,
        //             dateOfBirth: response.data.dateOfBirth,
        //             city: response.data.city,
        //             state: response.data.state,
        //             country: response.data.country,
        //             headline: response.data.headline,
        //             yelpingSince: response.data.yelpingSince,
        //             thingsILove: response.data.thingsILove,
        //             blogLink: response.data.blogLink,
        //             profileImagePath: imagePath
        //         } )
        //     }
        //     console.log( this.state );

        // } ).catch( ( err ) => {
        //     console.log( " error getting user data" )
        //     this.setState( {
        //         error: true
        //     } )

        // } );
    }

    goBackTo = ( e ) => {
        window.history.go( -1 );
    }

    followUser = () => {
        this.props.userFollowAction( this.props.user._id )
        // console.log( "in follow user" )
        // axios.defaults.headers.common[ "authorization" ] = cookie.load( 'token' )
        // axios.defaults.withCredentials = true;
        // let data = {
        //     restaurantID: cookie.load( 'id' ),
        //     userID: this.state.userID
        // }
        // axios.post( BACKEND_URL + '/users/follow/', data ).then( response => {
        //     if ( response.status === 200 ) {
        //         this.setState( {
        //             following: true
        //         } )
        //     }
        // } ).catch( error => {
        //     console.log( "Error in following: ", error );
        // } )
    }

    render () {
        var redirectVar = null;
        if ( !( cookie.load( "auth" ) && cookie.load( "type" ) === "restaurants" ) ) {
            redirectVar = <Redirect to="/login" />
        }
        var displayFollow = null;
        if ( this.props.following ) {
            displayFollow = <button className="btn btn-danger">Already Following</button>
        } else {
            displayFollow = <button className="btn btn-danger" onClick={ this.followUser }>Follow</button>
        }


        let displayReviews = <div className="col-8" style={ { "padding": "0 15px", "border-left": "1px solid #e6e6e6" } }>
            <GetReviews userID={ this.props.match.params.userID } />

        </div>
        return (
            <div>
                { redirectVar }
                <div className="container-fluid">
                    <div className="container-fluid" style={ { height: "100vh" } }>
                        <div className="row m-1">
                            {/* <Link className="btn btn-primary" to="/restaurants/events">Back to Events</Link> */ }
                            <button className="btn btn-danger" onClick={ this.goBackTo }>Back</button>
                        </div>
                        <div className="row mt-3 mb-3" style={ { height: "30%" } }>
                            {/* profile picture */ }
                            <div className="col-2">
                                <img src={ this.props.profileImagePath } width="102%" height="100%" alt="" />
                            </div>
                            {/* profile display */ }
                            <div className="col-8" style={ { "box-shadow": "0px 0px 10px gray", background: "whitesmoke" } }>
                                <div className="row pt-4" >
                                    <div className="col-8">
                                        <table>
                                            <tbody>
                                                <tr></tr>
                                                <tr>
                                                    <td><h2>{ this.props.user.name }</h2></td>
                                                </tr>
                                                <tr>
                                                    <td><h5>{ this.props.user.city }, { this.props.user.state }</h5></td>
                                                </tr>
                                                <tr>&nbsp;</tr>
                                                <tr>&nbsp;</tr>
                                                <tr>
                                                    <td>{ this.props.user.headline }</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="col-4" style={ { "padding": "0 15px", "border-left": "1px solid #e6e6e6" } }>

                                        <table>
                                            <tbody>
                                                <th>Yelping Since:</th>
                                                <tr>{ this.props.user.yelpingSince }</tr>
                                                <th>Things I Love:</th>
                                                <tr>{ this.props.user.thingsILove }&nbsp;</tr>
                                                <th>Blog Link:</th>
                                                <tr>{ this.props.user.blogLink }&nbsp;</tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>


                        </div>
                        <div className="row">
                            <div className="col-2">
                                { displayFollow }
                            </div>
                            { displayReviews }
                        </div>


                    </div>


                </div >
            </div >
        )
    }
}


const matchStateToProps = ( state ) => {
    return {
        user: state.userProfileReducer.userData,
        following: state.userProfileReducer.following,
        profileImagePath: state.userProfileReducer.profileImagePath,

    }

}

const matchDispatchToProps = ( dispatch ) => {
    return {
        userProfileGetAction: ( email ) => dispatch( userProfileGetAction( email ) ),
        userFollowAction: ( userID ) => dispatch( userFollowAction( userID ) ),
    }
}

export default connect( matchStateToProps, matchDispatchToProps )( UserProfile )

