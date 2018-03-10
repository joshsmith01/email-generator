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
                        <input id={'TrackingCode'} type="text" placeholder="Tracking Code" value={this.props.TrackingCode}/>
                        <input id={'SsbTrackingCode'} type="text" placeholder="SSB Tracking Code"
                               value={this.props.SsbTrackingCode}/>
                    </div>
                </form>
            </div>
        );
    }
}

export default Analytics;