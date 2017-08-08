import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import AppBar from 'material-ui/AppBar';
import SearchBar from '../SearchBar/SearchBar';
import MovieList from '../MovieList/MovieList';
import Footer from '../Footer/Footer';
import '../../stylesheets/components/_app.scss';

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      searchQuery:''
    }
  }

  setSearchQuery = (query) => {
    this.setState({searchQuery: query});
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div>
          <AppBar iconElementLeft={<span></span>} title="Movie Finder" />
          <SearchBar searchDelg={this.setSearchQuery} />
          <MovieList searchQuery={this.state.searchQuery} />
          <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}
