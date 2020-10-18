import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import cookie from "react-cookies";
import BACKEND_URL from '../../config/config'
import yelp_image from '../../images/yelp-login.png'
import jwt_decode from "jwt-decode";
import loginAction from '../../actions/loginAction';
import { connect } from "react-redux";

export class Login extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            type: '',
            email: '',
            password: '',
            error: false,
            errorMessage: '',
        }
    }


    handlePasswordChange = inp => {
        this.setState( {
            password: inp.target.value
        } )

    }

    handleEmailChange = inp => {
        // console.log( inp.target.name, inp.target.value );
        if ( /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test( inp.target.value ) ) {
            this.setState( {
                error: true,
                errorMessage: "Special characters not allowed",
                [ inp.target.name ]: ""
            } )
        } else {
            this.setState( {
                error: false,
                [ inp.target.name ]: inp.target.value
            } )
        }
    }
    //handle input change
    handleInputChange = inp => {
        // console.log( inp.target.name, inp.target.value );
        if ( /[~`!#$@%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test( inp.target.value ) ) {
            this.setState( {
                error: true,
                errorMessage: "Special characters not allowed",
                [ inp.target.name ]: ""
            } )
        } else {
            this.setState( {
                error: false,
                [ inp.target.name ]: inp.target.value
            } )
        }
    }


    //handle submit
    handleSubmit = sub => {
        sub.preventDefault();
        if ( this.state.type === "" ) {
            this.setState( {
                error: true,
                errorMessage: "Please Select User or Restaurant"
            } )
        } else {
            this.props.loginAction( this.state )
            // var backend_path = '';
            // if ( this.state.type === 'users' ) {
            //     backend_path = '/users/login'
            // } else if ( this.state.type === 'restaurants' ) {
            //     backend_path = '/restaurants/login'
            // }
            // console.log( this.state );
            // console.log( BACKEND_URL + backend_path )
            // axios
            //     .post( BACKEND_URL + backend_path, this.state )
            //     .then( ( response ) => {
            //         if ( response.status === 200 ) {
            //             this.setState( {
            //                 error: false
            //             } )
            //             console.log( "resdat", response.data.split( ' ' )[ 1 ] )
            //             let decoded = jwt_decode( response.data.split( ' ' )[ 1 ] )

            //             console.log( "decoded", decoded )
            //             cookie.save( "auth", true, {
            //                 path: '/',
            //                 httpOnly: false,
            //                 maxAge: 90000
            //             } )
            //             cookie.save( "token", response.data, {
            //                 path: '/',
            //                 httpOnly: false,
            //                 maxAge: 90000
            //             } )
            //             cookie.save( "id", decoded._id, {
            //                 path: '/',
            //                 httpOnly: false,
            //                 maxAge: 90000
            //             } )
            //             cookie.save( "name", decoded.name, {
            //                 path: '/',
            //                 httpOnly: false,
            //                 maxAge: 90000
            //             } )
            //             cookie.save( "email", decoded.email, {
            //                 path: '/',
            //                 httpOnly: false,
            //                 maxAge: 90000
            //             } )
            //             cookie.save( "type", decoded.type, {
            //                 path: '/',
            //                 httpOnly: false,
            //                 maxAge: 90000
            //             } )
            //             if ( this.state.type === 'users' ) {
            //                 window.location.assign( '/users/dashboard' );
            //             } else if ( this.state.type === 'restaurants' ) {
            //                 window.location.assign( '/restaurants/about' );
            //             }
            //         }
            //     } )
            //     .catch( ( err ) => {
            //         this.setState( {
            //             error: true,
            //             errorMessage: "Invalid Credentials"
            //         } )

            //     } );
        }
    };


    render () {

        if ( cookie.load( 'auth' ) && cookie.load( 'type' ) === 'users' ) {
            return <Redirect to='/users/dashboard' />
        }
        else if ( cookie.load( 'auth' ) && cookie.load( 'type' ) === 'restaurants' ) {
            return <Redirect to='/restaurants/about' />
        }
        let renderError = null
        if ( this.props.error ) {
            renderError = <div style={ { 'color': 'red' } }>{ this.props.message }</div>
        }
        return (
            <div>

                <div className="row" style={ { height: "100vh", "padding": "10%" } }>

                    <div className="col-5" style={ { "paddingLeft": "10%" } }>
                        <div className="row" style={ { height: "10%" } }>
                        </div>
                        <div className="row" style={ { height: "90%" } }>

                            <div className="col-12">
                                <h4 style={ { "margin": "10px", 'color': 'red' } }>Login to Yelp</h4>
                                <form onSubmit={ this.handleSubmit } id="Login">
                                    <div className="role" style={ { "margin": "10px" } } onChange={ this.handleInputChange }>
                                        <input type="radio" style={ { "margin": "0 5px" } } id='radio-b1' name="type" value='users'
                                        />
                                        <label><h5>User</h5></label>
                                        <input type="radio" style={ { "margin": "0 5px" } } id='radio-b2' name="type" value='restaurants'
                                        />
                                        <label><h5>Restaurant</h5></label>
                                    </div>

                                    <div className="form-group">
                                        <input type="text" className="form-control" name="email" required
                                            autoFocus placeholder="Enter Email" onChange={ this.handleEmailChange } />

                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" name="password" required
                                            placeholder="Enter Password" onChange={ this.handlePasswordChange } />
                                    </div>
                                    <button type="submit" className="btn btn-danger" onSubmit={ this.handleSubmit }>Login</button>

                                </form>
                                { renderError }
                                <br></br>
                                Don't have an account? { <a style={ { 'color': 'red' } } href="/signup">Sign Up</a> }
                            </div>

                        </div>
                    </div>
                    <div className="col-7">
                        {/* <div className="row" style={ { height: "10%" } }>
                        </div> */}
                        <div className="row">

                            <div className="row" style={ { "padding": "5%" } }>
                                <img src={ yelp_image } style={ { "paddingLeft": "40%" } } width="100%" height="100%" alt="" />
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        )
    }
}
const matchStateToProps = ( state ) => {
    console.log( "inside matchStatetoProps", state )
    return {
        error: state.loginReducer.error,
        message: state.loginReducer.message
    }

}

const matchDispatchToProps = ( dispatch ) => {
    return {
        loginAction: ( data ) => dispatch( loginAction( data ) ),
    }
}

export default connect( matchStateToProps, matchDispatchToProps )( Login )
