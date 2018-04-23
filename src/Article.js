import React, {Component} from 'react';
import axios from 'axios'
import './index.css';


class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {addClass: false}
    }

    toggle(event) {
        this.setState({addClass: !this.state.addClass});
        axios.head(event.target.value)
            .then(response => {
                if (response.status === 200) {
                    console.log('Got a 200! 😀');
                } else {
                    console.log('Did not get a 200. 😥');
                }
            });


    }
    //child component update parent component state. -JMS
    render() {
        let boxClass = ["boxHappy"];
        if (this.state.addClass) {
            boxClass.push('green');
        }
        let i = this.props.index;
        return (

            <div className="article">
                <input id={'title'} ref={(input) => this.title = input} data-parentid={i} type="text"
                       onChange={(e) => this.props.handleChange(e, i) } placeholder="Title" value={this.props.valueState[i].title}/>
                <input id={'copy'} ref={(input) => this.copy = input} data-parentid={i} type="text"
                       onChange={(e) => this.props.handleChange(e, i) } placeholder="Copy"
                       value={this.props.valueState[i].copy}/>
                <input id={'articleUrl'} className={boxClass.join(' ')} ref={(input) => this.articleUrl = input} data-parentid={i} type="url"
                       onChange={(e) => this.props.handleChange(e, i) } onBlur={this.toggle.bind(this)} placeholder="Article URL"
                       value={this.props.valueState[i].articleUrl}/>
                <input id={'imageUrl'} className={boxClass.join(' ')} ref={(input) => this.imageUrl = input} data-parentid={i} type="url"
                       onChange={(e) => this.props.handleChange(e, i) } onBlur={this.toggle.bind(this)} placeholder="Image URL"
                       value={this.props.valueState[i].imageUrl}/>
                <input className='button alert' data-parentid={i} type='button' value='Remove Article'
                       onClick={(i) => this.props.removeClick(i) }/>
            </div>
        );
    }
}

export default Article;