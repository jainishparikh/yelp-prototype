import React, { Component } from 'react';
import axios from 'axios';
import BACKEND_URL from '../../../config/config';
import cookie from 'react-cookies';
import IndividualOrder from './IndividualOrder';
import { Redirect } from 'react-router';
import '../../../css/pagination.css';
import ReactPaginate from 'react-paginate';
import orderFetchAction from '../../../actions/orderFetchAction'
import { connect } from "react-redux";

export class Orders extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            Orders: [],
            orderStatusFilter: "All",
            offset: 0,
            perPage: 5,
            pageCount: 0

        }
    }
    componentDidMount () {
        this.props.orderFetchAction( this.state.perPage )
        // var userID = cookie.load( 'id' )
        // axios.defaults.headers.common[ "authorization" ] = cookie.load( 'token' )
        // axios.defaults.withCredentials = true;
        // axios.get( BACKEND_URL + '/orders/users/' + userID ).then( response => {
        //     if ( response.status === 200 ) {
        //         response.data.map( order => {
        //             this.setState( {
        //                 Orders: [ ...this.state.Orders, order ],
        //                 pageCount: Math.ceil( response.data.length / this.state.perPage )

        //             } )
        //         } )
        //         console.log( "Orders", this.state );

        //     }
        // } ).catch( error => {
        //     console.log( "Error in fetching orders: ", error );
        // } )

    }

    handleradioChange = ( e ) => {
        console.log( e.target.value )
        this.setState( {
            orderStatusFilter: e.target.value
        } )
    }

    handlePageClick = ( e ) => {

        this.setState( {
            offset: this.state.perPage * e.selected,

        } )

    };

    render () {
        let redirectVar = null
        let pageCount = this.props.pageCount
        if ( !( cookie.load( "auth" ) && cookie.load( "type" ) === "users" ) ) {
            redirectVar = <Redirect to="/login" />
        }

        let filteredOrders = this.props.Orders.filter( order => this.state.orderStatusFilter === "All" || order.orderStatus === this.state.orderStatusFilter )
        pageCount = Math.ceil( filteredOrders.length / this.state.perPage )
        let sortedOrders = filteredOrders.sort( ( a, b ) => b.orderDate.localeCompare( a.orderDate ) )
        let displayOrder = sortedOrders.slice( this.state.offset, this.state.offset + this.state.perPage ).map( ( order ) => {

            return (
                <div>
                    <IndividualOrder key={ order._id } orderData={ order } />
                </div>
            )
        } )
        return (
            <div>
                { redirectVar }
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-2 m-2"><h2>&nbsp;&nbsp;&nbsp;&nbsp;Orders:</h2></div>
                    <div className="col-4 m-2">

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

                <div className="row p-2" style={ { "padding-top": "20px" } }>
                    <div className="col-2" style={ { "padding-top": "30px" } }>
                        <ul style={ { "list-style-type": "none" } }>
                            <li> <h4>Filters : </h4></li>
                            <li><input type="radio" name="filter" value="All" onChange={ this.handleradioChange } defaultChecked /> All</li>
                            <li> <input type="radio" name="filter" value="Order Received" onChange={ this.handleradioChange } /> Order Received</li>
                            <li>  <input type="radio" name="filter" value="Preparing" onChange={ this.handleradioChange } /> Preparing</li>
                            <li>  <input type="radio" name="filter" value="On The Way" onChange={ this.handleradioChange } /> On The Way</li>
                            <li>  <input type="radio" name="filter" value="Delivered" onChange={ this.handleradioChange } /> Delivered</li>
                            <li>  <input type="radio" name="filter" value="Pick Up Ready" onChange={ this.handleradioChange } /> Pick Up Ready</li>
                            <li>  <input type="radio" name="filter" value="Picked Up" onChange={ this.handleradioChange } /> Picked Up</li>

                        </ul>
                    </div>
                    <div className="col-10">

                        { displayOrder }
                    </div>

                </div>

            </div >
        )
    }
}
const matchStateToProps = ( state ) => {
    return {
        Orders: state.orderReducer.Orders,
        pageCount: state.orderReducer.pageCount,
    }

}

const matchDispatchToProps = ( dispatch ) => {
    return {
        orderFetchAction: ( data ) => dispatch( orderFetchAction( data ) ),
    }
}

export default connect( matchStateToProps, matchDispatchToProps )( Orders )

