import React, { Component } from 'react'
import cookie from "react-cookies";
import axios from 'axios';
import BACKEND_URL from '../../../config/config';
import IndividualOrder from "./IndividualOrder";
import { Redirect } from 'react-router';
import '../../../css/pagination.css';
import ReactPaginate from 'react-paginate';
import restaurantGetOrdersAction from '../../../actions/restaurantGetOrdersAction'
import { connect } from "react-redux";

export class Orders extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            Orders: [],
            orderStatusFilter: "All",
            reload: false,
            offset: 0,
            perPage: 5,
            pageCount: 0
        }
    }

    componentDidMount () {
        this.props.restaurantGetOrdersAction( this.state.perPage )
        // var restaurantID = cookie.load( 'id' );
        // axios.defaults.headers.common[ "authorization" ] = cookie.load( 'token' )
        // axios.defaults.withCredentials = true;
        // axios.get( BACKEND_URL + '/orders/restaurants/' + restaurantID ).then( response => {

        //     this.setState( {
        //         Orders: response.data,
        //         pageCount: Math.ceil( response.data.length / this.state.perPage )
        //     } )
        //     console.log( this.state )
        // } ).catch( error => {
        //     console.log( "Error fetching orders for restaurant", error );
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

    reload = () => {
        window.location.reload()
    }
    render () {
        let redirectVar = null
        let pageCount = this.props.pageCount
        if ( !( cookie.load( "auth" ) && cookie.load( "type" ) === "restaurants" ) ) {
            redirectVar = <Redirect to="/login" />
        }
        console.log( "this.props.Orders", this.props.Orders )
        let filteredOrders = this.props.Orders.filter( order => this.state.orderStatusFilter === "All" || order.orderStatus === this.state.orderStatusFilter )
        pageCount = Math.ceil( filteredOrders.length / this.state.perPage )
        let displayOrders = filteredOrders.slice( this.state.offset, this.state.offset + this.state.perPage ).map( order => {
            return ( <IndividualOrder reload={ this.reload } key={ order._id } orderData={ order } /> )
        } )
        return (
            <div>
                { redirectVar }
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-2 m-2"><h2>Orders</h2></div>
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
                <div className="row">
                    <div className="col-2">
                        <ul style={ { "list-style-type": "none" } }>
                            <li> <h4>Filters : </h4></li>
                            <li><input type="radio" name="filter" value="All" onChange={ this.handleradioChange } defaultChecked /> All</li>
                            <li> <input type="radio" name="filter" value="Order Received" onChange={ this.handleradioChange } /> New Orders</li>
                            <li>  <input type="radio" name="filter" value="Preparing" onChange={ this.handleradioChange } /> Preparing</li>
                            <li>  <input type="radio" name="filter" value="On The Way" onChange={ this.handleradioChange } /> On The Way</li>
                            <li>  <input type="radio" name="filter" value="Delivered" onChange={ this.handleradioChange } /> Delivered</li>
                            <li>  <input type="radio" name="filter" value="Pick Up Ready" onChange={ this.handleradioChange } /> Pick Up Ready</li>
                            <li>  <input type="radio" name="filter" value="Picked Up" onChange={ this.handleradioChange } /> Picked Up</li>
                            <li>  <input type="radio" name="filter" value="Cancel" onChange={ this.handleradioChange } /> Cancelled</li>


                        </ul>
                    </div>
                    <div className="col-8">{ displayOrders }</div>
                    <div className="col-2"></div>
                </div>
            </div>
        )
    }
}

const matchStateToProps = ( state ) => {
    return {
        Orders: state.restaurantordersReducer.Orders,
        pageCount: state.restaurantordersReducer.pageCount,
    }

}

const matchDispatchToProps = ( dispatch ) => {
    return {
        restaurantGetOrdersAction: ( perPage ) => dispatch( restaurantGetOrdersAction( perPage ) ),
    }
}

export default connect( matchStateToProps, matchDispatchToProps )( Orders )

