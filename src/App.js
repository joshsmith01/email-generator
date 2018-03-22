import React, {Component} from 'react';
import logo from './dice_logo.svg';
import './App.css';
import Footer from './Footer';
import Analytics from "./Analytics";
import EmailMetaData from "./EmailMetaData";
import BannerAd from "./BannerAd";
import ImageData from "./ImageData";
import $ from 'jquery';
import 'foundation-sites';
import Article from "./Article";

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
        this.removeClick = this.removeClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAnalyticsChange = this.handleAnalyticsChange.bind(this);
    }

    createUI() {

        return this.state.articles.map((el, i) =>
            <Article key={i} index={i} handleChange={this.handleChange} removeClick={this.removeClick} valueState={this.state.articles}/>
        )
    }

    handleChange(event, i) {
        const id = event.target.id;
        const value = event.target.value;
        let articles = [...this.state.articles];
        // Get the new value that is currently in the form.
        let newVal = {[id]: value};
        // Take a copy of the articles object in the current state
        let articlesCopy = articles[i];
        console.log(articlesCopy);
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
        this.setState(prevState => ({articles: [...prevState.articles, {
            title:'',
            copy: '',
            imageUrl: '',
            articleUrl: '',
        }]}))
    }

    removeClick(i) {
        // console.log(this.state.articles);
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


    componentDidMount() {

        $(document).foundation();

    }

    render() {
        return (
            <div className="App grid-x">
                <header className="App-header small-12 cell">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to Dice Adviser Email Generator</h1>
                </header>
                <section className="small-12 cell grid-padding-x">
                    <ul className="tabs" data-tabs id="example-tabs">
                        <li className="tabs-title"><a href="#panel1" aria-selected="true">Analytics</a></li>
                        <li className="tabs-title"><a data-tabs-target="panel2" href="#panel2">Banner Ad</a></li>
                        <li className="tabs-title"><a data-tabs-target="panel3" href="#panel3">Image Data</a></li>
                        <li className="tabs-title is-active"><a data-tabs-target="panel4" href="#panel4">Email Information</a>
                        </li>
                    </ul>
                    <div className="tabs-content" data-tabs-content="example-tabs">
                        <div className="tabs-panel" id="panel1">
                            <Analytics {...this.state.meta} handleTheChange={this.handleAnalyticsChange}/>
                        </div>
                        <div className="tabs-panel" id="panel2">
                            <BannerAd {...this.state.meta} handleTheChange={this.handleAnalyticsChange}/>
                        </div>
                        <div className="tabs-panel" id="panel3">
                            <ImageData {...this.state.meta} handleTheChange={this.handleAnalyticsChange}/>
                        </div>
                        <div className="tabs-panel is-active" id="panel4">
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
                        </div>
                    </div>
                </section>
                <Footer/>
            </div>
        );
    }
}

export default App;
