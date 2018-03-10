import React, {Component} from 'react';
import logo from './dice_logo.svg';
import './App.css';
import Footer from './Footer';
import Analytics from "./Analytics";
import EmailMetaData from "./EmailMetaData";
import BannerAd from "./BannerAd";
import ImageData from "./ImageData";
// import AddArticleForm from './AddArticleForm';

// Use this. It's better. -JMS
// https://stackoverflow.com/questions/42316604/how-to-implement-a-dynamic-form-with-controlled-components-in-react-js

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            meta: {
                BannerAdDestUrl: "https://www.dice.com/utilities/marketvalue/?CMPID=EM_RE_PD_JS_AV_DA_CYHI_",
                BannerAdImageUrl: "http://marketing.dice.com/images/DICEHACKheader_600X100.gif",
                CdnUrl: "https://2e8ram2s1li74atce18qz5y1-wpengine.netdna-ssl.com/",
                PreferredImageSize: "189x116",
                SsbTrackingCode: "CMPID=EM_RE_UP_JS_AD_DA_SSB",
                TrackingCode: "CMPID=EM_RE_UP_JS_AD_DA_CP_&utm_source=Responsys&utm_medium=Email&utm_content=&utm_campaign=Advisory_DiceAdvisor",
                publicationDate: "",
                subjectLine: "",
            },
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAnalyticsChange = this.handleAnalyticsChange.bind(this);
    }

    createUI() {

        return this.state.articles.map((el, i) =>
            <div key={i}>
                <input id={'title'} ref={(input) => this.title = input} data-parentid={i} type="text"
                       onChange={this.handleChange.bind(this, i)} placeholder="Title"/>
                <input id={'copy'} ref={(input) => this.copy = input} data-parentid={i} type="text"
                       onChange={this.handleChange.bind(this, i)} placeholder="Copy"/>
                <input id={'articleUrl'} ref={(input) => this.articleUrl = input} data-parentid={i} type="text"
                       onChange={this.handleChange.bind(this, i)} placeholder="Article URL"/>
                <input id={'imageUrl'} ref={(input) => this.imageUrl = input} data-parentid={i} type="text"
                       onChange={this.handleChange.bind(this, i)} placeholder="Image URL"/>
                <input className='button alert' type='button' value='Remove Article'
                       onClick={this.removeClick.bind(this, i)}/>
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

    handleAnalyticsChange(event) {
        const id = event.target.id;
        const value = event.target.value;
        let meta = this.state.meta;
        // Get the new value that is currently in the form.
        let newVal = {[id]: value};

        // Set the state again
        this.setState({meta: {...meta, ...newVal}});
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
        fetch('http://localhost:5000/article', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state)
        })
    }

    addArticle(article, index) {
        // update state
        const articles = {...this.state.articles};
        // add in new article
        articles[`article${index}`] = article;
        // set state
        this.setState({articles});
    }

    submitFullForm(event, res) {
        fetch('http://localhost:5000/article', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state)
        })
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
                    <Analytics {...this.state.meta} handleTheChange={this.handleAnalyticsChange}/>
                    <BannerAd {...this.state.meta} handleTheChange={this.handleAnalyticsChange}/>
                    <ImageData {...this.state.meta} handleTheChange={this.handleAnalyticsChange}/>
                    <EmailMetaData {...this.state.meta} handleTheChange={this.handleAnalyticsChange}/>
                    <form onSubmit={this.handleSubmit}>
                        <div className="grid-container">
                            {this.createUI()}
                            <input className='button success' type='button' value='Add Article'
                                   onClick={this.addClick.bind(this)}/>
                            <br/>
                            <input className='button' type="submit" value="Submit Form"/>
                        </div>
                    </form>
                </section>
                <Footer/>
            </div>
        );
    }
}

export default App;
