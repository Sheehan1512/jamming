const clientId = 'a25381f2a4af492b9fab455866f96793';
const redirectURI = 'http://localhost:3000'

let accessToken;

const Spotify = {
    
    getAccessToken() {
        
        if (accessToken) {
            return accessToken;
        }

        // check for access token match
        const matchedAccessToken = window.location.href.match(/access_token=([^&]*)/);
        const matchedExpiresIn = window.location.href.match(/expires_in=([^&]*)/);

        if ( matchedAccessToken && matchedExpiresIn ) {
            accessToken = matchedAccessToken[1];
            const expiresIn = Number(matchedExpiresIn[1]);
            // This clears the parameters. Allows us to grab a new access token when it expires
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = accessUrl;
        }
        
    },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            return response.json;
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album,
                uri: track
            }));
        })
    }

}

export default Spotify;