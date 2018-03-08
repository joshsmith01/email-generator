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
            copy: this.copy.value,
            articleUrl: this.articleUrl.value,
            imageUrl: this.imageUrl.value,
        };
        console.log(article);
        this.props.addArticle(article, index);
    }

    addArticleForm() {
        const item = this.state.articles;
        const title = '';
        const copy = '';
        const articleUrl = '';
        const imageUrl = '';
        item.push({title, copy, articleUrl, imageUrl});
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
                            <input ref={(input) => this.title = input} type="text" placeholder="Headline"/>
                            <input ref={(input) => this.copy = input} type="text" placeholder="Copy"/>
                            <input ref={(input) => this.articleUrl = input} type="text" placeholder="Article URL"/>
                            <input ref={(input) => this.imageUrl = input} type="text" placeholder="Image URL"/>
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