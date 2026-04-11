// import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import SearchResults from './components/SearchResults';
import Bookmarks from './components/Bookmarks';
import ApiTest from './components/ApiTest';
import { ThemeProvider } from './context/ThemeContext';
import { BookmarkProvider } from './context/BookmarkContext';
import { ModalProvider } from './context/ModalContext';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default class App extends Component {
  pageSize = 12;

  constructor(props) {
    super(props);
    this.state = {
      selectedCountry: 'in'
    };
  }

  handleCountryChange = (countryCode) => {
    this.setState({ selectedCountry: countryCode });
  }

  render() {
    const { selectedCountry } = this.state;

    return (
      <ThemeProvider>
        <ModalProvider>
        <BookmarkProvider>
        <Router>
            <div className="App">
          <Navbar selectedCountry={selectedCountry} onCountryChange={this.handleCountryChange} />
          <Switch>
                <Route exact path="/">
                  <News key="home-all" pageSize={this.pageSize} country={selectedCountry} category="general" aggregateAllCategories={true} />
                </Route>
                <Route exact path="/business">
                  <News key="business" pageSize={this.pageSize} country={selectedCountry} category="business" />
                </Route>
                <Route exact path="/entertainment">
                  <News key="entertainment" pageSize={this.pageSize} country={selectedCountry} category="entertainment" />
                </Route>
                <Route exact path="/general">
                  <News key="general" pageSize={this.pageSize} country={selectedCountry} category="general" />
                </Route>
                <Route exact path="/health">
                  <News key="health" pageSize={this.pageSize} country={selectedCountry} category="health" />
                </Route>
                <Route exact path="/science">
                  <News key="science" pageSize={this.pageSize} country={selectedCountry} category="science" />
                </Route>
                <Route exact path="/sports">
                  <News key="sports" pageSize={this.pageSize} country={selectedCountry} category="sports" />
                </Route>
                <Route exact path="/technology">
                  <News key="technology" pageSize={this.pageSize} country={selectedCountry} category="technology" />
                </Route>
                <Route exact path="/search">
                  <SearchResults />
                </Route>
                <Route exact path="/bookmarks">
                  <Bookmarks />
                </Route>
                <Route exact path="/api-test">
                  <ApiTest />
                </Route>
          </Switch>
            </div>
        </Router>
        </BookmarkProvider>
        </ModalProvider>
      </ThemeProvider>
    )
  }
}