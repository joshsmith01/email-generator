import React, { Component } from 'react';
import './index.css';

const sendData = data => {
  const myHeaders = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  });

  const headerOptions = {
    method: 'POST',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default',
    body: JSON.stringify(data),
  };

  fetch('http://localhost:5000/article', headerOptions)
    .then(res => {
      return res.json();
    })
    .then(data => console.log('here is my data: ', data))
    .catch(e => console.error(e));
};

class AddArticleForm extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
    };
  }

  createArticle(event, index) {
    event.preventDefault();
    const article = {
      title: this.title.value,
      subtitle: this.subtitle.value,
      description: this.description.value,
      image: this.image.value,
    };

    //this.props.addArticle(article, index);
    sendData(article);
  }

  addArticleForm() {
    const item = this.state.articles;
    const title = '';
    const subtitle = '';
    const description = '';
    const image = '';
    item.push({ title, subtitle, description, image });
    this.setState({ articles: item });
  }

  render() {
    return (
      <div className="grid-container">
        <button
          className="button alert"
          onClick={this.addArticleForm.bind(this)}
        >
          Add Article
        </button>
        {this.state.articles.map((item, index) => {
          return (
            <form
              className="v"
              key={index}
              onSubmit={e => this.createArticle(e, index)}
            >
              <input
                ref={input => (this.title = input)}
                type="text"
                placeholder="Title"
              />
              <input
                ref={input => (this.subtitle = input)}
                type="text"
                placeholder="Subtitle"
              />
              <input
                ref={input => (this.description = input)}
                type="text"
                placeholder="Description"
              />
              <input
                ref={input => (this.image = input)}
                type="text"
                placeholder="Image"
              />
              <button className="button" type="submit">
                Save Form
              </button>
            </form>
          );
        })}
      </div>
    );
  }
}
export default AddArticleForm;
