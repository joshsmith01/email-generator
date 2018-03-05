import React, { Component } from 'react';
import logo from './dice_logo.svg';
import './App.css';
import Footer from './Footer';
// import AddArticleForm from './AddArticleForm';

// Use this. It's better. -JMS
// https://stackoverflow.com/questions/42316604/how-to-implement-a-dynamic-form-with-controlled-components-in-react-js

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    createUI() {

        return this.state.articles.map((el, i) =>
            <div key={i}>
                <input id={'title'  } ref={(input) => this.title = input} data-parentid={i} type="text"  onChange={this.handleChange.bind(this, i)} placeholder="Title"/>
                <input id={'subtitle' } ref={(input) => this.subtitle = input} data-parentid={i} type="text"  onChange={this.handleChange.bind(this, i)} placeholder="Subtitle"/>
                <input id={'description' } ref={(input) => this.description = input} data-parentid={i} type="text"  onChange={this.handleChange.bind(this, i)} placeholder="Description"/>
                <input id={'image' } ref={(input) => this.image = input} data-parentid={i} type="text"  onChange={this.handleChange.bind(this, i)} placeholder="Image"/>
                <input className='button alert' type='button' value='Remove Article' onClick={this.removeClick.bind(this, i)}/>
            </div>
        )
    }

    handleChange(i, event) {
        const id = event.target.id;
        const value = event.target.value;
        let articles = [...this.state.articles];
        // Get the new value that is currently in the form.
        let newVal = {[id]: value};
        // Take a copy of the articles object in the current state
        let articlesCopy = articles[i];


        // Spread the the new value into the old value.
        articles[i] = {...articlesCopy, ...newVal};
        // Set the state again
        this.setState({articles});
    }

    addClick() {
        this.setState(prevState => ({articles: [...prevState.articles, '']}))
    }

    removeClick(i) {
        let articles = [...this.state.articles];
        articles.splice(i, 1);
        this.setState({articles});
    }

    handleSubmit(event) {
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
  addArticle(article, index) {
    // update state
    const articles = { ...this.state.articles };
    // add in new article
      // Only React used the index. I want this back in an array. -JMS
    articles[`article${index}`] = article;
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
            <form onSubmit={this.handleSubmit}>
                <div className="grid-container">
                {this.createUI()}
                <input className='button success' type='button' value='Add Article' onClick={this.addClick.bind(this)}/>
                <br/>
                <input className='button' type="submit" value="Submit Form"/>
                </div>
            </form>
        </section>
        <Footer />
      </div>
    );
  }
}

export default App;
