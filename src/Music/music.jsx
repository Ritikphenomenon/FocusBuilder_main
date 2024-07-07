import { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faForward, faPauseCircle, faPlayCircle, faSearch } from '@fortawesome/free-solid-svg-icons';

function Music() {
  const [currentMusicDetails, setCurrentMusicDetails] = useState({
    songName: '',
    songArtist: '',
    songSrc: '',
  });

  const [audioProgress, setAudioProgress] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [musicTotalLength, setMusicTotalLength] = useState('00:00');
  const [musicCurrentTime, setMusicCurrentTime] = useState('00:00');
  const [searchQuery, setSearchQuery] = useState('lofi');
  const [searchResults, setSearchResults] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const currentAudio = useRef();

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${btoa('3d06aca1775a4293a15456898035bdfb:628ee7822ee84bbca82c7a05324a6a00')}`, // Replace with your actual Client ID and Client Secret
          },
          body: 'grant_type=client_credentials',
        });
        const data = await response.json();
        setAccessToken(data.access_token);
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    fetchAccessToken();
  }, []);

  useEffect(() => {
    if (accessToken) {
      handleSearch();
    }
  }, [accessToken]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track&limit=50`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      setSearchResults(data.tracks.items);

      if (data.tracks.items.length > 0) {
        const playlist = data.tracks.items.map((track) => ({
          songName: track.name,
          songArtist: track.artists.map((artist) => artist.name).join(', '),
          songSrc: track.preview_url,
        }));
        setCurrentPlaylist(playlist);
        setCurrentTrackIndex(0);
        playTrack(playlist[0], 0);
      }
    } catch (error) {
      console.error('Error searching tracks:', error);
    }
  };

  const playTrack = (track, index) => {
    setCurrentMusicDetails({
      songName: track.songName,
      songArtist: track.songArtist,
      songSrc: track.songSrc,
    });
    setCurrentTrackIndex(index);
    setIsAudioPlaying(true);
    if (currentAudio.current) {
      currentAudio.current.src = track.songSrc;
      currentAudio.current.play();
    }
  };

  const handleAudioPlay = () => {
    if (currentAudio.current.paused) {
      currentAudio.current.play();
      setIsAudioPlaying(true);
    } else {
      currentAudio.current.pause();
      setIsAudioPlaying(false);
    }
  };

  const handleMusicProgressBar = (e) => {
    setAudioProgress(e.target.value);
    currentAudio.current.currentTime = (e.target.value * currentAudio.current.duration) / 100;
  };

  const handleAudioUpdate = () => {
    const minutes = Math.floor(currentAudio.current.duration / 60);
    const seconds = Math.floor(currentAudio.current.duration % 60);
    setMusicTotalLength(`${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`);

    const currentMin = Math.floor(currentAudio.current.currentTime / 60);
    const currentSec = Math.floor(currentAudio.current.currentTime % 60);
    setMusicCurrentTime(`${currentMin < 10 ? `0${currentMin}` : currentMin}:${currentSec < 10 ? `0${currentSec}` : currentSec}`);

    const progress = parseInt((currentAudio.current.currentTime / currentAudio.current.duration) * 100);
    setAudioProgress(isNaN(progress) ? 0 : progress);
  };

  const handleNextSong = () => {
    let nextIndex = currentTrackIndex + 1;
    if (nextIndex >= currentPlaylist.length) {
      nextIndex = 0; // Wrap around to the first song
    }
    playTrack(currentPlaylist[nextIndex], nextIndex);
  };

  const handlePrevSong = () => {
    let prevIndex = currentTrackIndex - 1;
    if (prevIndex < 0) {
      prevIndex = currentPlaylist.length - 1; // Wrap around to the last song
    }
    playTrack(currentPlaylist[prevIndex], prevIndex);
  };

  useEffect(() => {
    if (currentAudio.current) {
      currentAudio.current.addEventListener('ended', handleNextSong);
    }

    return () => {
      if (currentAudio.current) {
        currentAudio.current.removeEventListener('ended', handleNextSong);
      }
    };
  }, [currentTrackIndex, currentPlaylist]);

  return (
    <div className="flex flex-col items-center text-white p-2 backdrop-blur-lg relative"
      style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%)' }}
    >
      <audio
        src={currentMusicDetails.songSrc}
        ref={currentAudio}
        onTimeUpdate={handleAudioUpdate}
        autoPlay
      ></audio>

      <div className="w-[300px] max-w-md p-0 rounded-lg shadow-lg">
        <div className="w-[300px] max-w-md p-0 rounded-lg shadow-lg">
          <div className="flex items-center">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a track..."
                className="p-2 pr-10 w-full text-black bg-white rounded-l-lg"
              />
              <button onClick={handleSearch} className="absolute right-0 top-0 bottom-0 p-2 bg-blue-500 text-white hover:bg-blue-600">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
        </div>

        {currentMusicDetails.songSrc && (
          <>
            <p className="text-center text-sm font-semibold mb-1">{currentMusicDetails.songName}</p>
            <p className="text-center text-sm text-white mb-1">{currentMusicDetails.songArtist}</p>

            <div className="flex justify-between mb-1">
              <p className="text-xs">{musicCurrentTime}</p>
              <p className="text-xs">{musicTotalLength}</p>
            </div>
            <input
              type="range"
              name="musicProgressBar"
              className="w-full mb-4"
              value={audioProgress}
              onChange={handleMusicProgressBar}
            />
            <div className="flex justify-around items-center">
              <button onClick={handlePrevSong} className="text-lg">
                <FontAwesomeIcon icon={faBackward} />
              </button>
              <button onClick={handleAudioPlay} className="text-xl">
                <FontAwesomeIcon icon={isAudioPlaying ? faPauseCircle : faPlayCircle} />
              </button>
              <button onClick={handleNextSong} className="text-lg">
                <FontAwesomeIcon icon={faForward} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Music;
