import React, { Component } from 'react'
import Modal from 'react-modal';
import BACKEND_URL from '../../../config/config'
import cookie from 'react-cookies';

export class IndividualDish extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            dishID: this.props.dishData.dishID,
            dishName: this.props.dishData.dishName,
            dishIngrediants: this.props.dishData.dishIngrediants,
            dishPrice: this.props.dishData.dishPrice,
            dishDescription: this.props.dishData.dishDescription,
            dishCategory: this.props.dishData.dishCategory,
            dishPicture: this.props.dishData.dishPicture,
            dishPopUp: false,
            addedToOrder: false,
        }
    }

    toggleDishPopUp = ( e ) => {
        this.setState( {
            dishPopUp: !this.state.dishPopUp
        } )
    }

    displayPicture = ( name ) => {
        var dishImagePath = BACKEND_URL + "/images/dishes/" + name
        return (

            <img src={ dishImagePath } width="200px" height="195px" alt="" />

        )
    }

    addToOrderIndividualDish = () => {
        this.setState( {
            addedToOrder: true
        } )
        this.props.addToOrder( this.state )
    }

    removeFromOrderIndividualDish = () => {
        this.setState( {
            addedToOrder: false
        } )
        this.props.removeFromOrder( this.state.dishID )
    }

    render () {
        let dishOption = null
        if ( this.state.addedToOrder === false ) {
            dishOption = <div className="add-to-order" style={ { "padding": "5px" } }>
                <button onClick={ this.addToOrderIndividualDish } className="btn btn-danger">Add to Order</button>
            </div>
        } else {
            dishOption = <div className="add-to-order" >
                <button onClick={ this.removeFromOrderIndividualDish } className="btn btn-danger">Remove</button>
            </div>
        }


        return (

		<div>
                <div className="row p-1 m-3" style={ { "width": "100%", "height": "200px", "background": "whitesmoke", "box-shadow": "0px 0px 10px gray" } }>
                    <div className="col-4" style={ { "padding": "0px" } }>
                        { this.displayPicture( this.props.dishData.dishPicture ) }
                    </div>
                    <div className='col-6' style={ { "padding": "5px" } }>
                        <div className='row'><h3>{ this.props.dishData.dishName }</h3></div>
                        <div className='row'><b>Cost: </b>${ this.props.dishData.dishPrice }</div>
                        <div className='row'><b>Category: </b>{ this.props.dishData.dishCategory }</div>
                        <div className='row'><b>Ingrediants: </b>{ this.props.dishData.dishIngrediants }</div>
                        <div className='row'><b>Description: </b>{ this.props.dishData.dishDescription }</div>
                    </div>
                    <div className="col-2">

                        { dishOption }
                    </div>

                </div>


            </div>
		
		
//		<div>
//                <div className="row p-1 m-3" style={ { "width": "100%", "height": "200px", "background": "whitesmoke", "box-shadow": "0px 0px 10px gray" } }>
//                    <div className="col-4" style={ { "padding": "0px" } }>
//                        { this.displayPicture( this.state.dishPicture ) }
 //                   </div>
//                    <div className='col-6' style={ { "padding": "5px" } }>
 //                       <div className='row'><h3>{ this.state.dishName }</h3></div>
  //                      <div className='row'><b>Cost: </b>${ this.state.dishPrice }</div>
   //                     <div className='row'><b>Category: </b>{ this.state.dishCategory }</div>
    //                    <div className='row'><b>Ingrediants: </b>{ this.state.dishIngrediants }</div>
     //                   <div className='row'><b>Description: </b>{ this.state.dishDescription }</div>
   //                 </div>
    //                <div className="col-2">

      //                  { dishOption }
      //              </div>

        //        </div>


          //  </div>
  //
		)
    }
}


export default IndividualDish

