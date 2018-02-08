import React, {Component} from 'react';
import './index.css';

class AddArticleForm extends Component {
    constructor() {
        super();
        this.state = {
            articles: []
        }
    }

    createArticle (event, index) {
        event.preventDefault();
        const article = {
            title: this.title.value,
            subtitle: this.subtitle.value,
            description: this.description.value,
            image: this.image.value,
        };
        console.log(article);
        this.props.addArticle(article, index);
    }

    addArticleForm() {
        const item = this.state.articles;
        const title = '';
        const subtitle = '';
        const description = '';
        const image = '';
        item.push({title, subtitle, description, image});
        this.setState({articles: item});
    }

    submitFullForm(event, res) {
        event.preventDefault();
        fetch('http://localhost:5000/article', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'firstParam': 'yourValue',
                'secondParam': 'yourOtherValue',
            })
        }).then(console.log('hi from submitFullForm'))
    }

    render () {
        return (
            <div className="grid-container">
                <button className="button alert" onClick={this.addArticleForm.bind(this)}>Add Article</button>
                <form method="post" onSubmit={e => this.submitFullForm(e)}>
                {this.state.articles.map((item, index) => {
                    return (
                        <div className="v" key={index} >
                            <input ref={(input) => this.title = input} type="text" placeholder="Title"/>
                            <input ref={(input) => this.subtitle = input} type="text" placeholder="Subtitle"/>
                            <input ref={(input) => this.description = input} type="text" placeholder="Description"/>
                            <input ref={(input) => this.image = input} type="text" placeholder="Image"/>
                            <button className="button" type="" onClick={(e) => this.createArticle(e, index)}>Save Form</button>
                        </div>
                    )
                })}
                <button className="button" type="submit">Submit Entire Form</button>
                </form>
            </div>
        )
    }
}
export default AddArticleForm;