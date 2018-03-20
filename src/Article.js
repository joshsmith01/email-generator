import React, {Component} from 'react';
import './index.css';


class Article extends Component {
    //child component update parent component state. -JMS
    render() {
        let i = this.props.index;
        return (

            <div key={i} >
                <input id={'title'} ref={(input) => this.title = input} data-parentid={i} type="text"
                       onChange={(e) => this.props.handleChange(e, i) } placeholder="Title"/>
                <input id={'copy'} ref={(input) => this.copy = input} data-parentid={i} type="text"
                       onChange={(e) => this.props.handleChange(e, i) } placeholder="Copy"/>
                <input id={'articleUrl'} ref={(input) => this.articleUrl = input} data-parentid={i} type="text"
                       onChange={(e) => this.props.handleChange(e, i) } placeholder="Article URL"/>
                <input id={'imageUrl'} ref={(input) => this.imageUrl = input} data-parentid={i} type="text"
                       onChange={(e) => this.props.handleChange(e, i) } placeholder="Image URL"/>
                <input className='button alert' data-parentid={i} type='button' value='Remove Article'
                       onClick={(i) => this.props.removeClick(i) }/>
            </div>
        );
    }
}

export default Article;