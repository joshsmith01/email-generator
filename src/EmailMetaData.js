import React, {Component} from 'react';
import './index.css';


class EmailMetaData extends Component {


    //child component update parent component state. -JMS
    render() {
        return (
            <div className="email-meta-data" onChange={this.props.handleTheChange}>
                <h2>Email Information</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="grid-container">
                        <input id={'publicationDate'} type="text" placeholder="Publication Date"/>
                        <input id={'subjectLine'} type="text" placeholder="Email Subject"/>
                        <br/>
                    </div>
                </form>
            </div>
        );
    }
}

export default EmailMetaData;