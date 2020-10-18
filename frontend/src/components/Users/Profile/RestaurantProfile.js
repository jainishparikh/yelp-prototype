import React, { Component } from 'react'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'
import cookie from 'react-cookies';
import Modal from 'react-modal';
import axios from 'axios';
// import GetDishes from '../Orders/GetDishes';
import IndividualDish from '../Orders/IndividualDish';
import OrderNow from '../Orders/OrderNow';
import BACKEND_URL from '../../../config/config';
import profile_picture from '../../../images/restaurant.jpeg';
import AddReview from '../Reviews/AddReview'
import ReactPaginate from 'react-paginate';
import '../../../css/pagination.css';
import { connect } from "react-redux";



export class RestaurantProfile extends Component {
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
            profileImagePath: profile_picture,
            dishes: [],
            Orders: [],
            reviewPopUp: false,
            orderPopUp: false,
            offset: 0,
            perPage: 2,
            pageCount: 0
        }

    }
    componentDidMount () {
        let email = this.props.match.params.restaurantEmail
        let restaurant = this.props.Restaurants.map( restaurant => {
            let imagePath = BACKEND_URL + "/images/profilepics/" + restaurant.profilePicture
            if ( restaurant.profilePicture === null || restaurant.profilePicture === "" ) {
                console.log( "inside imagepath null" )
                imagePath = profile_picture
            }
            if ( restaurant.email === email )
                this.setState( {
                    restaurantID: restaurant._id,
                    name: restaurant.name,
                    email: restaurant.email,
                    contact: restaurant.contact,
                    location: restaurant.location,
                    description: restaurant.description,
                    timing: restaurant.timing,
                    profileImagePath: imagePath,
                    dishes: restaurant.dishes,
                    pageCount: Math.ceil( restaurant.dishes.length / this.state.perPage )
                } )
        } )
        // axios.defaults.headers.common[ "authorization" ] = cookie.load( 'token' )
        // axios.defaults.withCredentials = true;
        // axios.get( BACKEND_URL + '/restaurants/about/' + email ).then( ( response ) => {
        //     console.log( response )
        //     if ( response.status === 200 ) {
        //         console.log( "got data" )
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
        //     console.log( " error getting restaurant data" )
        //     this.setState( {
        //         error: true
        //     } )

        // } );
    }

    //change state to toggle review popup
    toggleReviewPopUp = ( e ) => {
        this.setState( {
            reviewPopUp: !this.state.reviewPopUp
        } )
    }

    //change statetoggle order now popup
    toggleOrderPopUp = ( e ) => {
        this.setState( {
            orderPopUp: !this.state.orderPopUp
        } )
    }



    //function to get dishes and add to orders from -->GetDishes-->IndividualDish
    addToOrderProfile = ( dish ) => {
        this.setState( {
            Orders: [ ...this.state.Orders, dish ]
        } )

    }

    removeFromOrderProfile = ( dishID ) => {
        let newOrders = this.state.Orders.filter( dish => dish.dishID !== dishID )
        console.log( "new orders", newOrders );
        this.setState( {
            Orders: [ ...newOrders ]
        } )
    }

    handlePageClick = ( e ) => {

        this.setState( {
            offset: this.state.perPage * e.selected,
        } )

    };

    render () {
        var redirectVar = null;
        if ( !( cookie.load( "auth" ) && cookie.load( "type" ) === "users" ) ) {
            redirectVar = <Redirect to="/login" />
        }

        let displayDishImages = this.state.dishes.map( ( dish ) => {
            var dishImagePath = BACKEND_URL + "/images/dishes/" + dish.dishPicture
            return (
                <img src={ dishImagePath } style={ { "margin": "10px", "box-shadow": "0px 0px 10px gray" } } width="250px" height="90%" alt="" />
            )
        } )

        let details = this.state.dishes.slice( this.state.offset, this.state.offset + this.state.perPage ).map( ( dish ) => {
            return (
                <IndividualDish removeFromOrder={ this.removeFromOrderProfile } addToOrder={ this.addToOrderProfile } dishData={ dish } />
            )
        } )

        return (
            < div >
                { redirectVar }
                <div className="container-fluid m-1" style={ { height: "100vh" } }>
                    <div className="row mt-2 mb-2 ml-5">
                        {/* Back to Dashboard */ }
                        <div className="col-3">
                            <Link className="btn btn-danger" to="/users/dashboard"  >
                                Back to Dashboard
                        </Link>
                        </div>
                        {/* Gove a Review */ }
                        <div className="col-7">
                            <div className="add-review" >
                                <button className="btn btn-danger" onClick={ this.toggleReviewPopUp }>Give a Review</button>
                            </div>

                            <Modal isOpen={ this.state.reviewPopUp } >
                                <AddReview reviewData={ this.state } closePopUp={ this.toggleReviewPopUp } />
                            </Modal>
                        </div>
                        {/* Order Now */ }
                        <div className="col-2">
                            <div className="add-review" >
                                <button className="btn btn-danger" onClick={ this.toggleOrderPopUp }>Order Now</button>
                            </div>

                            <Modal isOpen={ this.state.orderPopUp } >
                                <OrderNow orderData={ this.state } closePopUp={ this.toggleOrderPopUp } />
                            </Modal>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3" style={ { "border-right": "1px solid #e6e6e6", "background": "whitesmoke" } }>
                            <ul style={ { "list-style-type": "none" } }>
                                <li><img src={ this.state.profileImagePath } style={ { "border": "1px solid black" } } width="200px" height="90%" alt="" /></li>
                                <li><h2>{ this.state.name }</h2></li>
                                <li>{ this.state.location }</li>
                                <li>{ this.state.description }</li>

                            </ul>

                            <ul style={ { "list-style-type": "none", "padding-top": '80px' } }>
                                <li><h5>Contact Details:</h5></li>
                                <li><b>Mail at:</b> { this.state.email }</li>
                                <li><b>Call at:</b> { this.state.contact }</li>
                                <li><b>We are OPEN:</b> { this.state.timing }</li>

                            </ul>


                        </div>
                        <div className="col-9" style={ { "padding-left": "40px" } }>
                            <div className="row" style={ { "padding-left": "40px" } }>
                                <h3>Here's What We Offer</h3>
                            </div>
                            <div className="row" style={ { "padding-left": "20px" } }>
                                <div style={ {
                                    "width": "auto",
                                    "overflow": "auto",
                                    "white-space": "nowrap",
                                    "height": "200px"
                                } }>
                                    { displayDishImages }
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-4"><h3>Select dishes to order:</h3></div>
                                <div className="col-5 m-2">
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
                            <div className="row">
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
        Restaurants: state.restaurantsReducer.Restaurants,
    }

}

export default connect( matchStateToProps )( RestaurantProfile )

