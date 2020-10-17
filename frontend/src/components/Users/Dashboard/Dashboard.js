import React, { Component } from 'react'
import { Redirect } from 'react-router'
import cookie from "react-cookies";
import axios from 'axios';
import BACKEND_URL from '../../../config/config';
import IndividualRestaurant from './IndividualRestaurant';
import Maps from './Map';


export class Dashboard extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            Restaurants: [],
            searchInput: "",
            typeFilter: "All",

        }
    }

    componentDidMount () {
        // getting all restaurants
        axios.defaults.headers.common[ "authorization" ] = cookie.load( 'token' )
        axios.defaults.withCredentials = true;
        axios.get( BACKEND_URL + '/restaurants/all' ).then( responseRestaurants => {

            this.setState( {
                Restaurants: responseRestaurants.data
            } )
            console.log( this.state )



        } ).catch( error => {
            console.log( "Error in fetching restaurants : ", error );
        } )


    }
    handleradioChange = ( e ) => {
        console.log( e.target.value )
        this.setState( {
            typeFilter: e.target.value
        } )
    }

    handleSearch = ( e ) => {
        console.log( e.target.name, e.target.value )
        this.setState( {
            [ e.target.name ]: e.target.value
        } )
    }


    render () {
        if ( !( cookie.load( "auth" ) && cookie.load( "type" ) === "users" ) ) {
            return <Redirect to='/login' />
        }
        let searchedRestaurants = this.state.Restaurants.filter( ( restaurant ) => {
            if ( restaurant.name.toLowerCase().includes( this.state.searchInput.toLowerCase() ) || restaurant.restaurantType.toLowerCase().includes( this.state.searchInput.toLowerCase() ) ) {
                return true
            } else {
                let l = restaurant.dishes.length
                for ( let i = 0; i < l; i++ ) {
                    if ( restaurant.dishes[ i ].dishName.toLowerCase().includes( this.state.searchInput.toLowerCase() ) ) {
                        return true
                    }
                }
                return false

            }

        } )

        let filteredRestaurants = searchedRestaurants.filter( ( restaurant ) => {
            return this.state.typeFilter === "All" || restaurant.restaurantType === null || restaurant.restaurantType === "" || restaurant.restaurantType === this.state.typeFilter
        } )
        let restaurants = filteredRestaurants.map( restaurant => {
            return (
                <IndividualRestaurant restaurantData={ restaurant } />
            )
        } )

        let displayMap = <Maps restaurantData={ filteredRestaurants } />
        return (

            <div>
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-6 m-4">
                        <input type="text" style={ { "width": "700px", "height": "30px", "border": "1px solid gray", "box-shadow": "0px 0px 10px gray" } } name="searchInput" onChange={ this.handleSearch } placeholder="     Search Restaurants"></input>
                    </div>
                    <div className="col-3"></div>

                </div>
                <div className="row mt-2">
                    <div className="col-2" style={ { "padding-top": "20px" } }>
                        <ul style={ { "list-style-type": "none" } }>
                            <li> <h4>Filters : </h4></li>
                            <li><input type="radio" name="filter" value="All" onChange={ this.handleradioChange } /> All</li>
                            <li> <input type="radio" name="filter" value="Delivery" onChange={ this.handleradioChange } /> Delivery</li>
                            <li>  <input type="radio" name="filter" value="Pick Up" onChange={ this.handleradioChange } /> Pick Up</li>

                        </ul></div>
                    <div className="col-7">
                        { restaurants }
                    </div>
                    <div className="col-3" >
                        { displayMap }
                    </div>

                </div>
            </div>
        )
    }
}

export default Dashboard
