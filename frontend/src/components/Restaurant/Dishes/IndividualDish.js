import React, { Component } from 'react'
import AddDishes from './AddDishes';
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
            dishPopUp: false
        }
    }

    toggleDishPopUp = ( e ) => {
        this.props.dishEditPopUp()
        this.setState( {
            dishPopUp: !this.state.dishPopUp
        } )

    }

    displayPicture = ( name ) => {
        var dishImagePath = BACKEND_URL + "/images/dishes/" + name
        return (

            <img src={ dishImagePath } width="200px" height="180px" alt="" />

        )
    }

    render () {
        let dishOption =
            <div>
                <div className="edit-dish" >
                    <button className="btn btn-danger" onClick={ this.toggleDishPopUp }>Edit Dish</button>
                </div>

                <Modal isOpen={ this.state.dishPopUp } >
                    <AddDishes call="edit" dishData={ this.state } closePopUp={ this.toggleDishPopUp } />
                </Modal>
            </div>


        return (
            <div>
                <div className="row m-4" style={ { "width": "100%", "height": "180px", "background": "whitesmoke", "box-shadow": "0px 0px 10px gray" } }>
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
                    <div className="col-2" style={ { "padding": "5px" } }>

                        { dishOption }
                    </div>

                </div>


            </div>
        )
    }
}


export default IndividualDish

