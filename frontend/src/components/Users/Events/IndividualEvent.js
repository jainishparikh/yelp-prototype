import React, { Component } from 'react'
import Modal from 'react-modal';
import EventRegistrations from './EventRegistrations';

export class IndividualEvent extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            eventID: this.props.eventData._id,
            eventName: this.props.eventData.eventName,
            eventDescription: this.props.eventData.eventDescription,
            eventTime: this.props.eventData.eventTime,
            eventDate: this.props.eventData.eventDate,
            eventLocation: this.props.eventData.eventLocation,
            Hashtags: this.props.eventData.Hashtags,
            restaurantID: this.props.eventData.restaurantID,
            registrationsPopUp: false,
        }
    }

    toggleRegistrationsPopUp = ( e ) => {
        this.setState( {
            registrationsPopUp: !this.state.registrationsPopUp
        } )
    }


    render () {

        return (
            <div>
                <div className="container pt-2 pb-2" >
                    <div className="row" style={ { "padding": "5px", "background": "whitesmoke", "box-shadow": "0px 0px 10px gray" } }>
                        <div className="col-10">
                            <div className="row">

                                <div className="col-8">
                                    <h2>{ this.props.eventData.eventName }</h2>
                                </div>
                                <div className="col-4">
                                    <h6>Time:</h6>
                                    { this.props.eventData.eventTime }
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8" style={ { "color": "blue" } }>
                                    { this.props.eventData.Hashtags }
                                </div>
                                <div className="col-4">
                                    <h6>Date:</h6>
                                    { this.props.eventData.eventDate }
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-8">
                                    { this.props.eventData.eventDescription }
                                </div>
                                <div className="col-4"></div>

                            </div>
                        </div>
                        <div className="col-2">
                            <div className="post-event m-2" >
                                <button className="btn btn-danger" onClick={ this.toggleRegistrationsPopUp }>Register</button>
                            </div>
                            {/* using react-modal for popup to add dish */ }
                            <Modal isOpen={ this.state.registrationsPopUp } style={ {
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
                                <EventRegistrations eventData={ this.props.eventData } closePopUp={ this.toggleRegistrationsPopUp } />
                            </Modal>

                        </div>

                    </div>

                </div>
            </div>
        )
    }
}
export default IndividualEvent