import React, {Component} from 'react';
import './index.css';


class Analytics extends Component {


    //child component update parent component state. -JMS
    render() {
        return (
            <div className="banner-ad" onChange={this.props.handleTheChange}>
                <h2>Banner Ad</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="grid-container">
                        <input id={'BannerAdImageUrl'} type="text" placeholder="Image URL (600x100)"  defaultValue={this.props.BannerAdImageUrl}/>
                        <input id={'BannerAdDestUrl'} type="text" placeholder="Banner Ad Destination URL"  defaultValue={this.props.BannerAdDestUrl}/>
                    </div>
                </form>
            </div>
        );
    }
}

export default Analytics;