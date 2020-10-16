import React, { Component } from 'react'

export class RegisteredEvents extends Component {
    render () {
        return (
            <div>
                <div className="container  p-2 m-2" style={ { "width": "100%", "background": "whitesmoke", "box-shadow": "0px 0px 10px gray" } } >
                    <div className="row">

                        <div className="col-6">
                            <h4>{ this.props.eventData.eventName }</h4>
                        </div>
                        <div className="col-6">
                            { this.props.eventData.eventTime }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6" style={ { 'color': "blue" } }>
                            { this.props.eventData.Hashtags }
                        </div>
                        <div className="col-6">
                            { this.props.eventData.eventDate }
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-12">
                            { this.props.eventData.eventDescription }
                        </div>

                    </div>

                </div>

            </div>
        )
    }
}

export default RegisteredEvents
