import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  
  constructor(props) {
    
    super(props);
    
    this.state = {
      searchResults: [
        {
          name: 'Save Your Tears',
          artist: 'Weeknd',
          album: 'Jani na',
          id: 1
        },
        {
          name: 'Sorry',
          artist: 'Justin Bieber',
          album: 'Jani na bhai',
          id: 2
        },
        {
          name: 'Numb',
          artist: 'Linkin Park',
          album: 'Hybrid Theory',
          id: 3
        }
      ],
      playlistName: 'SheEo',
      playlistTracks: [
        {
          name: 'Save Your Tears',
          artist: 'Weeknd',
          album: 'Jani na',
          id: 1
        },
        {
          name: 'Sorry',
          artist: 'Justin Bieber',
          album: 'Jani na bhai',
          id: 2
        }
      ]
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);

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

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            
            <SearchResults searchResults={this.state.searchResults} 
                           onAdd={this.addTrack} />

            <Playlist playlistName={this.state.playlistName}
                      playlistTracks={this.state.playlistTracks} 
                      onRemove={this.removeTrack}
                      onNameChange={this.updatePlaylistName} />
                      

          </div>
        </div>
      </div>
    ) 
  }
}

export default App;
