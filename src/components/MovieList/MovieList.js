import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import MovieCard from '../MovieCard/MovieCard';
import Chip from 'material-ui/Chip';
import Loader from '../Loader/Loader';
import '../../stylesheets/components/_movie_list.scss';

export default class MovieList extends Component {
  constructor() {
    super();
    this.state = {
      dialogOpen: false,
      selectedMovie:
      {
        poster_path:'',
        adult: '',
        overview: '',
        release_date : '',
        genre_ids: [],
        original_title: '',
        original_language: '',
        title: '',
        backdrop_path: '',
        popularity: '',
        vote_count: '',
        video: '',
        vote_average: ''
      },

      searchQuery: '',
      movies: [],
      genres: [],
      baseUrl: '',
      imageSize: '',
      gotDataMsg: '',
      gotData: false,
      gotConfigMsg: '',
      gotConfig: false,
      gotGenresMsg: '',
      gotGenres: false
    }
  }

  //Triggers on props update
  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.searchQuery !== this.state.searchQuery) {
      if (nextProps.searchQuery === ''){
        this.fetchMovies();
      } else {
        this.searchMovie(nextProps.searchQuery);
      }

      this.setState({ searchQuery: nextProps.searchQuery });
    }
  }

  handleDialogOpen = (item) => {
    this.setState({dialogOpen: true, selectedMovie: item});
  };

  handleDialogClose = () => {
    this.setState({dialogOpen: false, item: ''});
  };

  componentDidMount() {
    this.fetchConfiguration();
    this.fetchMovies();
    this.fetchGenres();
  }

  fetchMovies = () => {
    this.setState({gotData: false});
    fetch('https://api.themoviedb.org/3/discover/movie' +
      '?api_key=b06ec84480566bb7b12604ce86df0471&sort_by=popularity.desc')
      .then(response => {
        if (response.ok) {
          return Promise.resolve(response.json());
        } else {
          return Promise.reject(new Error(response.statusText));
        }
      }).then(json => {
        this.setState({movies: json.results});

        this.setState({gotDataMsg: 'Movie data loaded', gotData: true});
      }).catch(error => {
        this.setState({gotDataMsg: 'Problem loading movie data', gotData: true});
      });
  }

  fetchGenres = () => {
    fetch('https://api.themoviedb.org/3/genre/movie/list?'+
      'api_key=b06ec84480566bb7b12604ce86df0471&language=en-US')
      .then(response => {
        if (response.ok) {
          return Promise.resolve(response.json());
        } else {
          return Promise.reject(new Error(response.statusText));
        }
      }).then(json => {
        this.setState({genres: json.genres});

        this.setState({gotGenresMsg: 'Genre data loaded', gotGenres: true});
      }).catch(error => {
        this.setState({gotGenresMsg: 'Problem loading genre data', gotGenres: true});
      });
  }

  fetchConfiguration = () => {
    fetch('https://api.themoviedb.org/3/configuration' +
      '?api_key=b06ec84480566bb7b12604ce86df0471')
      .then(response => {
        if (response.ok) {
          return Promise.resolve(response.json());
        } else {
          return Promise.reject(new Error(response.statusText));
        }
      }).then(json => {
        this.setState({baseUrl: json.images.base_url});
        this.setState({imageSize: json.images.poster_sizes[3]});

        this.setState({gotDataMsg: 'Configuration data loaded', gotConfig: true});
      }).catch(error => {
        this.setState({gotDataMsg: 'Problem loading configuration data', gotConfig: true});
      });
  }

  searchMovie = (query) => {
    this.setState({gotData: false});
    fetch('https://api.themoviedb.org/3/search/movie?' +
      'api_key=b06ec84480566bb7b12604ce86df0471&page=1&query=' + query)
      .then(response => {
        if (response.ok) {
          return Promise.resolve(response.json());
        } else {
          return Promise.reject(new Error(response.statusText));
        }
      }).then(json => {
        this.setState({movies: json.results});

        this.setState({gotDataMsg: 'Movie data loaded', gotData: true});
      }).catch(error => {
        this.setState({gotDataMsg: 'Problem loading movie data', gotData: true});
      });
  }

  render() {
    if (this.state.gotData && this.state.gotConfig && this.state.gotGenres) {
      let baseImageUrl = this.state.baseUrl + this.state.imageSize;
      return (
        <div className='movie-list'>
          <Dialog
            modal={false}
            open={this.state.dialogOpen}
            onRequestClose={this.handleDialogClose}
          >
            <img className='dialog-img' alt="poster" src={baseImageUrl + this.state.selectedMovie.poster_path} />
            <div className='dialog-content'>
              <h2>{this.state.selectedMovie.title}</h2>
              <div>
                <span>{this.state.selectedMovie.release_date} <i className="fa fa-calendar" aria-hidden="true"></i></span>
                <span style={{paddingLeft: '20px'}}>{this.state.selectedMovie.vote_average} <i className="fa fa-star" aria-hidden="true"></i></span><br />
                <span className='genres-container'>
                  {this.state.selectedMovie.genre_ids.map((item, index) => {
                    //Get the name of the genre
                    let genreName = '';
                    this.state.genres.forEach((element) =>{
                      if (element.id === item) {
                        genreName = element.name;
                      }
                    });
                    return (<Chip style={{margin: '4px'}} key={index}>{genreName} </Chip>);
                  })}
                </span>
              </div><br />
              {this.state.selectedMovie.overview}
            </div>
          </Dialog>

          {this.state.movies.map((item, index) => {
            return <MovieCard onClick={() => {this.handleDialogOpen(item)}} key={index} movieTitle={item.title}
              imageUrl={baseImageUrl + item.poster_path} />
          })}
        </div>
      );
    } else {
      return (<Loader />);
    }
  }
}
