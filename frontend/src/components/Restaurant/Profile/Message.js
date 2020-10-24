import React, { Component } from 'react'
import Modal from 'react-modal';
import restaurantMessageAction from '../../../actions/restaurantMessageAction'
import { connect } from "react-redux";


export class Messages extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            messagesPopUp: false,
            reply: "",
        }
    }

    handleReplyChange = ( e ) => {
        this.setState( {
            reply: e.target.value
        } )
    }

    handleReply = () => {
        var data = {
            restaurantID: this.props.messages.restaurantID,
            userID: this.props.messages.userID,
            userName: this.props.messages.userName,
            restaurantName: this.props.messages.restaurantName,
            messageString: this.state.reply,
        }
        this.props.restaurantMessageAction( data )
    }

    toggleMessagesPopUp = ( e ) => {
        this.setState( {
            messagesPopUp: !this.state.messagesPopUp

        } )
    }

    render () {
        let displayConversation = null
        console.log( "convos", this.props.messages.conversations )
        if ( this.props.messages.conversations !== undefined ) {
            displayConversation = this.props.messages.conversations.map( conversation => {


                return (
                    <div className="col-10 p-2">
                        <h5>{ conversation.name }</h5>
                        {conversation.message }
                    </div>

                )
            } )
        }

        return (
            <div>
                <div className="row pt-4">

                    <div className="col-12">  <div className="view-messages" >
                        <button className="btn btn-danger btn-block" onClick={ this.toggleMessagesPopUp }>Message  &rarr; </button>
                    </div>
                        {/* using react-modal for popup to add dish */ }
                        <Modal isOpen={ this.state.messagesPopUp } style={ {
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
                            <div className="row">
                                <button className="btn btn-danger" onClick={ this.toggleMessagesPopUp }>Close </button>
                            </div>
                            <div className="row">
                                { displayConversation }
                            </div>
                            <div className="row">
                                <input type="textbox" placeholder="Reply here..." style={ { "width": "400px" } } onChange={ this.handleReplyChange } />
                                <button className="btn btn-danger" onClick={ this.handleReply }>Reply </button>

                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        )
    }
}

const matchStateToProps = ( state ) => {
    return {
        user: state.getUserProfileReducer.userData,

    }

}

const matchDispatchToProps = ( dispatch ) => {
    return {
        restaurantMessageAction: ( data ) => dispatch( restaurantMessageAction( data ) ),
    }
}

export default connect( matchStateToProps, matchDispatchToProps )( Messages )

