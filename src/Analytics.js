import React, {Component} from 'react';
import './index.css';


class Analytics extends Component {


    //child component update parent component state. -JMS
    render() {
        return (
            <div className="analytics" onChange={this.props.handleTheChange}>
                <h2>Analytics</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="grid-container">
                        <input id={'trackingCode'} type="text" placeholder="Tracking Code"/>
                        <input id={'SsbTrackingCode'} type="text" placeholder="SSB Tracking Code"/>
                        <input className='button' type="submit" value="Submit Form"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default Analytics;