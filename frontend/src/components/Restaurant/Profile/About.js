import React, { Component } from 'react'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'
import cookie from 'react-cookies';
import Modal from 'react-modal';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import AddDish from '../Dishes/AddDishes';
import IndividualDish from '../Dishes/IndividualDish';
import BACKEND_URL from '../../../config/config';
import profile_picture from '../../../images/restaurant.jpeg';
import '../../../css/pagination.css';
import restaurantGetProfileAction from '../../../actions/restaurantGetProfileAction'
import { connect } from "react-redux";

export class RestaurantAbout extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            restaurantID: "",
            name: "",
            email: "",
            contact: "",
            location: "",
            description: "",
            timing: "",
            dishPopUp: false,
            dishEditPopUp: false,
            profileImagePath: profile_picture,
            dishes: [],
            offset: 0,
            perPage: 5,
            currentPage: 1,
            pageCount: 0
        }

    }

    // static getDerivedStateFromProps ( props, state ) {
    //     if ( state.dishes != props.restaurant.dishes ) {
    //         return {
    //             dishes: props.restaurant.dishes
    //         }
    //     }
    // }

    componentDidMount () {

        this.props.restaurantGetProfileAction().then( response => {
            this.setState( {
                dishes: this.props.restaurant.dishes,
                pageCount: Math.ceil( this.props.restaurant.dishes.length / this.state.perPage )
            } )
        } );
        // let email = cookie.load( "email" )
        // axios.defaults.headers.common[ "authorization" ] = cookie.load( 'token' )
        // axios.defaults.withCredentials = true;

        // axios.get( BACKEND_URL + '/restaurants/about/' + email ).then( ( response ) => {
        //     if ( response.status === 200 ) {
        //         let imagePath = BACKEND_URL + "/images/profilepics/" + response.data.profilePicture
        //         if ( response.data.profilePicture === null || response.data.profilePicture === "" ) {
        //             console.log( "inside imagepath null" )
        //             imagePath = profile_picture
        //         }
        //         this.setState( {
        //             restaurantID: response.data._id,
        //             name: response.data.name,
        //             email: response.data.email,
        //             contact: response.data.contact,
        //             location: response.data.location,
        //             description: response.data.description,
        //             timing: response.data.timing,
        //             profileImagePath: imagePath,
        //             dishes: response.data.dishes,
        //             pageCount: Math.ceil( response.data.dishes.length / this.state.perPage )
        //         } )

        //     }

        // } ).catch( ( err ) => {
        //     console.log( " error getting restaurant data", err )
        //     this.setState( {
        //         error: true
        //     } )

        // } );
    }

    toggleDishPopUp = ( e ) => {
        this.setState( {
            dishPopUp: !this.state.dishPopUp,
            dishes: this.props.restaurant.dishes,
            pageCount: Math.ceil( this.props.restaurant.dishes.length / this.state.perPage )
        } )
    }

    toggleDishEditPopUp = ( e ) => {
        this.setState( {
            dishEditPopUp: !this.state.dishPopUp,
            dishes: this.props.restaurant.dishes,
            pageCount: Math.ceil( this.props.restaurant.dishes.length / this.state.perPage )
        } )
    }

    handlePageClick = ( e ) => {

        this.setState( {
            offset: this.state.perPage * e.selected,
            currentPage: e.selected + 1
        } )

    };


    render () {
        var redirectVar = null;
        if ( !( cookie.load( "auth" ) && cookie.load( "type" ) === "restaurants" ) ) {
            redirectVar = <Redirect to="/login" />
        }
        let displayDishImages = this.state.dishes.map( ( dish ) => {

            var dishImagePath = BACKEND_URL + "/images/dishes/" + dish.dishPicture
            return (
                <img src={ dishImagePath } style={ { "margin": "5px", "box-shadow": "0px 0px 10px gray" } } width="250px" height="95%" alt="" />
            )
        } )
        console.log( "this.props.dishes", this.props.restaurant.dishes )
        console.log( "this.state.dishes", this.state.dishes )

        let details = this.state.dishes.slice( this.state.offset, this.state.offset + this.state.perPage ).map( ( dish ) => {
            return (
                <IndividualDish key={ dish.dishID } dishData={ dish } dishEditPopUp={ this.toggleDishEditPopUp } />
            )
        } )

        return (
            < div >
                { redirectVar }
                {console.log( "in return clg", this.props.restaurant ) }
                <div className="container-fluid m-1" style={ { height: "100vh" } }>
                    <div className="row h-100">
                        <div className="col-3" style={ { "borderRight": "1px solid #e6e6e6", "background": "whitesmoke" } }>
                            <div className="profile-info" style={ { height: "80%" } }>
                                <table style={ { height: "100%" } }>
                                    <tbody>
                                        <div className="restaurant-info" style={ { height: "60%" } }>
                                            <tr> <img src={ this.props.profileImagePath } width="102%" height="100%" alt="" /></tr>
                                            <tr><h2>{ this.props.restaurant.name }</h2></tr>
                                            <tr>{ this.props.restaurant.location }</tr>
                                            <tr>{ this.props.restaurant.description }</tr>
                                        </div>
                                        <div className="rstaurant-contact" style={ { height: "40%" } }>
                                            <tr><h5>Contact Details:</h5></tr>
                                            <tr>{ this.props.restaurant.contact }</tr>
                                            <tr>{ this.props.restaurant.email }</tr>
                                            <tr>{ this.props.restaurant.timing }</tr>
                                        </div>
                                    </tbody>
                                </table>
                            </div>
                            <div className="profile-edit" style={ { height: "20%" } }>
                                <Link className="btn btn-primary" to={ {
                                    pathname: "/restaurants/editprofile", state: {
                                        userData: this.props.restaurant
                                    }
                                } }>Edit Profile</Link>
                            </div>
                        </div>
                        <div className="col-9" style={ { "paddingLeft": "40px" } }>
                            <div className="row">
                                <h3>Here's What We Offer</h3>
                            </div>
                            <div className="row">
                                <div style={ {
                                    "width": "auto",
                                    "overflow": "auto",
                                    "whiteSpace": "nowrap",
                                    "height": "200px"
                                } }>
                                    { displayDishImages }
                                </div>
                            </div>
                            {/* Add dish */ }
                            <div className="row mt-3 mb-3">

                                <div className="col-4 m-2" >
                                    <button className="btn btn-danger" onClick={ this.toggleDishPopUp }>Add Dish</button>
                                </div>
                                {/* using react-modal for popup to add dish */ }
                                <Modal isOpen={ this.state.dishPopUp } style={ {
                                    overlay: {
                                        position: 'fixed',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundColor: 'rgba(255, 255, 255, 0.25)'
                                    },
                                    content: {
                                        top: '50%',
                                        left: '50%',
                                        right: '50%',
                                        bottom: '50%',
                                        marginRight: '-50%',
                                        transform: 'translate(-50%, -50%)',
                                        height: '500px', // <-- This sets the height
                                        overlfow: 'scroll' // <-- This tells the modal to scrol
                                    }
                                } } >
                                    <AddDish call="add" closePopUp={ this.toggleDishPopUp } />
                                </Modal>
                                <div className="col-3 m-2">
                                    <ReactPaginate
                                        previousLabel={ "prev" }
                                        nextLabel={ "next" }
                                        breakLabel={ "..." }
                                        breakClassName={ "break-me" }
                                        pageCount={ this.state.pageCount }
                                        marginPagesDisplayed={ 2 }
                                        pageRangeDisplayed={ 5 }
                                        onPageChange={ this.handlePageClick }
                                        containerClassName={ "pagination" }
                                        subContainerClassName={ "pages pagination" }
                                        activeClassName={ "active" } />
                                </div>

                            </div>
                            {/* Display dishes */ }
                            <div className="row" >

                                <div className="dishes">
                                    { details }
                                </div>
                            </div>

                        </div>

                    </div>
                </div>


            </div >
        )

    }

}


const matchStateToProps = ( state ) => {
    return {
        restaurant: state.restaurantProfileReducer.restaurantData,
        profileImagePath: state.restaurantProfileReducer.profileImagePath,
    }

}

const matchDispatchToProps = ( dispatch ) => {
    return {
        restaurantGetProfileAction: () => dispatch( restaurantGetProfileAction() ),
    }
}

export default connect( matchStateToProps, matchDispatchToProps )( RestaurantAbout )

