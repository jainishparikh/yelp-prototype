import React, { Component } from 'react'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'
import cookie from 'react-cookies';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import BACKEND_URL from '../../../config/config';
import '../../../css/pagination.css';
import profile_picture from '../../../images/profile.png'


export class YelpUsers extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            Users: [],
            searchInput: "",
            offset: 0,
            perPage: 5,
            pageCount: 0,
            filterBy: "following",
            filterValue: "All",
        }
    }

    componentDidMount () {
        axios.defaults.headers.common[ "authorization" ] = cookie.load( 'token' )
        axios.defaults.withCredentials = true;

        axios.get( BACKEND_URL + '/users/all' ).then( ( response ) => {
            if ( response.status === 200 ) {
                this.setState( {
                    Users: response.data,
                    pageCount: Math.ceil( response.data.length / this.state.perPage )
                } )
                console.log( this.state )

            }

        } ).catch( ( err ) => {
            console.log( " error getting users", err )
            this.setState( {
                error: true
            } )

        } );
    }

    handlePageClick = ( e ) => {

        this.setState( {
            offset: this.state.perPage * e.selected,

        } )

    };

    handleSearch = ( e ) => {
        console.log( e.target.name, e.target.value )
        this.setState( {
            [ e.target.name ]: e.target.value
        } )
    }

    displayPicture = ( picture ) => {
        if ( picture ) {
            var dishImagePath = BACKEND_URL + "/images/profilepics/" + picture
        } else {
            var dishImagePath = profile_picture
        }

        return (

            <img src={ dishImagePath } width="200px" height="200px" alt="" />

        )
    }

    handleFilterChange = ( e ) => {
        this.setState( {
            filterBy: e.target.value
        } )
    }

    handleradioChange = ( e ) => {
        this.setState( {
            filterValue: e.target.value
        } )
    }

    render () {
        let redirectVar = null
        let pageCount = this.state.pageCount
        if ( !( cookie.load( "auth" ) && cookie.load( "type" ) === "users" ) ) {
            redirectVar = <Redirect to="/login" />
        }

        //display filters
        let displayFilteres = null;
        if ( this.state.filterBy === "location" ) {
            displayFilteres =
                <ul style={ { "list-style-type": "none", "padding": "0px" } }>
                    <li> Filters :  <select defaultValue="following" onChange={ this.handleFilterChange } name="status" id="order">
                        <option value="following">Following</option>
                        <option value="location">Location</option>
                    </select>

                    </li>

                    <li><input type="radio" name="filter" value="All" onChange={ this.handleradioChange } /> All</li>
                    <li> <input type="radio" name="filter" value="San Jose" onChange={ this.handleradioChange } /> San Jose</li>
                    <li>  <input type="radio" name="filter" value="San Fransisco" onChange={ this.handleradioChange } /> San Fransisco</li>

                </ul>

        } else if ( this.state.filterBy === "following" ) {
            displayFilteres =
                <ul style={ { "list-style-type": "none", "padding": "0px" } }>
                    <li> Filters : <select defaultValue="following" onChange={ this.handleFilterChange } name="status" id="order">
                        <option value="following">Following</option>
                        <option value="location">Location</option></select>

                    </li>
                    <li><input type="radio" name="filter" value="All" onChange={ this.handleradioChange } /> All</li>
                    <li> <input type="radio" name="filter" value="Following" onChange={ this.handleradioChange } /> Following</li>
                    <li>  <input type="radio" name="filter" value="Not Following" onChange={ this.handleradioChange } /> Not Following</li>

                </ul>

        }

        //search users
        let searchedUsers = this.state.Users.filter( ( user ) => user.name.toLowerCase().includes( this.state.searchInput.toLowerCase() ) || user.nickName.toLowerCase().includes( this.state.searchInput.toLowerCase() ) )
        pageCount = Math.ceil( searchedUsers.length / this.state.perPage )

        //filtered users
        let filteredOrders = searchedUsers.filter( user => {
            if ( this.state.filterValue === "All" ) {
                return true
            } else {

            }

        } )
        //display users
        let displayUsers = searchedUsers.slice( this.state.offset, this.state.offset + this.state.perPage ).map( user => {
            return (
                <div className="row  m-2" style={ { "width": "100%", "height": "200px", "background": "whitesmoke", "box-shadow": "0px 0px 10px gray" } }>
                    <div className="col-4" style={ { "padding": "0px" } }>
                        { this.displayPicture( user.profilePicture ) }
                    </div>
                    <div className='col-6' style={ { "padding": "10px" } }>

                        <ul style={ { "list-style-type": "none", "padding": "10px" } }>
                            <li><h2>{ user.name }</h2></li>
                            <li>{ user.yelpingSince }</li>
                            <li>{ user.city }, { user.state }, { user.country }</li>


                        </ul>

                    </div>

                    <div className="col-2" style={ { "padding": "5px" } }>
                        <div className="row">
                            <Link className="btn btn-primary" to={ `/restaurants/userprofiles/${ user.email }/${ user._id }` } >
                                View Profile
                    </Link>
                        </div>
                    </div>

                </div>
            )

        } )






        return (
            <div>
                <div className="container-fluid">
                    <div className="row mt-2">
                        <div className="col-2 m-2"></div>
                        <div className="col-1"><h2>Yelpers</h2></div>
                        <div className="col-6 m-2">
                            <input type="text" style={ { "width": "700px", "height": "30px", "border": "1px solid gray", "box-shadow": "0px 0px 10px gray" } } name="searchInput" onChange={ this.handleSearch } placeholder="     Search Users"></input>
                        </div>


                    </div>
                    <div className="row">
                        <div className="col-5"></div>
                        <div className="col-5">
                            <ReactPaginate
                                previousLabel={ "prev" }
                                nextLabel={ "next" }
                                breakLabel={ "..." }
                                breakClassName={ "break-me" }
                                pageCount={ pageCount }
                                marginPagesDisplayed={ 2 }
                                pageRangeDisplayed={ 5 }
                                onPageChange={ this.handlePageClick }
                                containerClassName={ "pagination" }
                                subContainerClassName={ "pages pagination" }
                                activeClassName={ "active" } />


                        </div>
                    </div>
                    <div className="row m-2">
                        <div className="col-2">
                            { displayFilteres }
                        </div>
                        <div className="col-9">
                            { displayUsers }
                        </div>

                    </div>


                </div>
            </div>
        )
    }
}

export default YelpUsers
