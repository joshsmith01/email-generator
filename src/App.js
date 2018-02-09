import React, { Component } from 'react';
import logo from './dice_logo.svg';
import './App.css';
import Footer from './Footer';
import AddArticleForm from './AddArticleForm';

class App extends Component {
  constructor() {
    super();
    this.addArticle = this.addArticle.bind(this);
    this.state = {
      articles: {},
    };
  }

  addArticle(article, index) {
    // update state
    const articles = { ...this.state.articles };
    // add in new article
      // Only React used the index. I want this back in an array. -JMS
    articles[`article-${index}`] = article;
    // set state
    this.setState({ articles });
  }

    submitFullForm(event, res) {
    // See what the state is in the console just before fetching -JMS
        console.log(this.state);
        fetch('http://localhost:5000/article', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state)
        }).then(console.log('hi from submitFullForm'))
    }

  render() {
    return (
      <div className="App grid-x">
        <header className="App-header small-12 cell">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Dice Adviser Email Generator</h1>
        </header>
        <section className="small-12 cell grid-padding-x">
          <h2>AddArticleForm</h2>
          <AddArticleForm addArticle={this.addArticle} />
            <button className="button" type="submit" onClick={() => this.submitFullForm()}>Submit Entire Form</button>
        </section>
        <Footer />
      </div>
    );
  }
}

export default App;
