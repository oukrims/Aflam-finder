import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import '../../stylesheets/components/_search_bar.scss';

export default class SearchBar extends Component {
  constructor() {
    super()
    this.state = {
      searchQuery:''
    }
  }

  search = () => {
    this.props.searchDelg(this.state.searchQuery);
  }

  handleUpdateInput = (object, value) => {
    this.setState({searchQuery: value})
  }

  render() {
    return (
      <div className="search-bar">
        <TextField
          onChange={this.handleUpdateInput}
          floatingLabelText="Search for a Movie"
          style={{width: '50%'}}
        />
        <FlatButton onTouchTap={this.search} label="Search" primary={true} />
      </div>
    );
  }
}
