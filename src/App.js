import React, {Component} from 'react';
import logo from './dice_logo.svg';
import './App.css';
import Footer from "./Footer";
import AddArticleForm from "./AddArticleForm";
// import fs from 'fs';





class App extends Component {
    constructor() {
        super();
        this.addArticle = this.addArticle.bind(this);
        this.state = {
            articles: {},
        };
        // destination.txt will be created or overwritten by default.
        // fs.copyFile('myfile.js', 'tmp/myfile.js', (err) => {
        //     if (err) throw err;
        //     console.log('source.txt was copied to tmp/myfile.js');
        // });
    }


    addArticle(article, index) {
        // update state
        const articles = {...this.state.articles};
        // add in new article
        articles[`article-${index}`] = article;
        // set state
        this.setState({articles})
    }

    render() {
        return (
            <div className="App grid-x">
                <header className="App-header small-12 cell">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to Dice Adviser Email Generator</h1>
                </header>
                <section className="small-12 cell grid-padding-x">
                    <h2>AddArticleForm</h2>
                    <AddArticleForm addArticle={this.addArticle} />
                </section>
                <Footer/>
            </div>
        );
    }
}

export default App;
