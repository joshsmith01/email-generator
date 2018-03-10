import React, {Component} from 'react';
import './index.css';


class ImageData extends Component {


    //child component update parent component state. -JMS
    render() {
        return (
            <div className="banner-ad" onChange={this.props.handleTheChange}>
                <h2>Image Data</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="grid-container">
                        <input id={'CdnUrl'} type="text" placeholder="URL for CDN" value={this.props.CdnUrl}/>
                        <input id={'PreferredImageSize'} type="text" placeholder="Height x Width of Image" value={this.props.PreferredImageSize}/>
                    </div>
                </form>
            </div>
        );
    }
}

export default ImageData;