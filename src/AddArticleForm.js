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


    render () {
        return (
            <div className="grid-container">
                <button className="button alert" onClick={this.addArticleForm.bind(this)}>Add Article</button>
                {this.state.articles.map((item, index) => {
                    return (
                        <form className="v" key={index} onSubmit={(e) => this.createArticle(e, index)}>
                            <input ref={(input) => this.title = input} type="text" placeholder="Title"/>
                            <input ref={(input) => this.subtitle = input} type="text" placeholder="Subtitle"/>
                            <input ref={(input) => this.description = input} type="text" placeholder="Description"/>
                            <input ref={(input) => this.image = input} type="text" placeholder="Image"/>
                            <button className="button" type="submit">Save Form</button>
                        </form>
                    )
                })}
            </div>
        )
    }
}
export default AddArticleForm;