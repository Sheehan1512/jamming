import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  
  constructor(props) {
    
    super(props);
    
    this.state = {
      searchResults: [],
      playlistName: 'SheEo',
      playlistTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

  }

  addTrack(track) {
    const plTracks = this.state.playlistTracks;
    if (plTracks.some(playlistTrack => playlistTrack.id === track.id)) {
      return;
    }
    plTracks.push(track);
    this.setState({playlistTracks: plTracks});
  }

  removeTrack(track) {
    const plTracks = this.state.playlistTracks;
    const newTracks = plTracks.filter(playlistTrack => playlistTrack.id !== track.id);

    this.setState({playlistTracks: newTracks});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName,trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

  search(term) {
    Spotify.search(term).then(spotifySearchResults => {
      this.setState({searchResults: spotifySearchResults})
    })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            
            <SearchResults searchResults={this.state.searchResults} 
                           onAdd={this.addTrack} />

            <Playlist playlistName={this.state.playlistName}
                      playlistTracks={this.state.playlistTracks} 
                      onRemove={this.removeTrack}
                      onNameChange={this.updatePlaylistName}
                      onSave={this.savePlaylist} />
                      

          </div>
        </div>
      </div>
    ) 
  }
}

export default App;
