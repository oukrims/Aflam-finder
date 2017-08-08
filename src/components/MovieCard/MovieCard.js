import React, { Component } from 'react';
import {Card, CardMedia} from 'material-ui/Card'
import '../../stylesheets/components/_movie_card.scss';

export default class MovieCard extends Component {
  render() {
    return (
      <Card onTouchTap={this.props.onClick} onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        className='movie-card'>
        <CardMedia>
          <img alt={this.props.movieTitle + ' Poster'} src={this.props.imageUrl} />
        </CardMedia>
      </Card>
    );
  }
}
