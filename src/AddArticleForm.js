import React, {Component} from 'react';
import './index.css';

class AddArticleForm extends Component {
    constructor() {
        super();
        // TODO: Try to get rid of the need to set state on this component. Only use the App state. There will be ordering of the array and other items to contend with. Plus, I'm submitting the state of the application not of the one component. -JMS
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

                </form>
            </div>
        )
    }
}
export default AddArticleForm;