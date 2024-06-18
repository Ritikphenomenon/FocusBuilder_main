import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faForward, faPauseCircle, faPlayCircle } from '@fortawesome/free-solid-svg-icons';


function Music() {

  const [currentMusicDetails, setCurrentMusicDetails] = useState({
    songName: 'Chasing',
    songArtist: 'NEFFEX',
    songSrc: './Assets/songs/Chasing - NEFFEX.mp3', 
  });

  const [audioProgress, setAudioProgress] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [musicIndex, setMusicIndex] = useState(0);
  const [musicTotalLength, setMusicTotalLength] = useState('04 : 38');
  const [musicCurrentTime, setMusicCurrentTime] = useState('00 : 00');

  const currentAudio = useRef();

  const handleMusicProgressBar = (e) => {
    setAudioProgress(e.target.value);
    currentAudio.current.currentTime = (e.target.value * currentAudio.current.duration) / 100;
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


  const musicAPI = [
   
    {
      songName: 'AURORA - Runaway',
      songArtist: 'Aurora Aksnes',
      songSrc: './Assets/songs/AURORA - Runaway (Lyrics).mp3',
     
    },
   
   
    {
      songName: 'Baby doll [ slowed + reverb ]',
      songArtist: 'Kanika Kapoor',
      songSrc: './Assets/songs/Baby doll [ slowed + reverb ] __ meet bros ,Kanika Kapoor __ jr santu.mp3',
    
    },
   
  ];

  const handleNextSong = () => {
    const nextIndex = musicIndex >= musicAPI.length - 1 ? 0 : musicIndex + 1;
    setMusicIndex(nextIndex);
    updateCurrentMusicDetails(nextIndex);
  };

  const handlePrevSong = () => {
    const prevIndex = musicIndex === 0 ? musicAPI.length - 1 : musicIndex - 1;
    setMusicIndex(prevIndex);
    updateCurrentMusicDetails(prevIndex);
  };

  const updateCurrentMusicDetails = (index) => {
    const musicObject = musicAPI[index];
    currentAudio.current.src = musicObject.songSrc;
    currentAudio.current.play();
    setCurrentMusicDetails(musicObject);
    setIsAudioPlaying(true);
  };

  const handleAudioUpdate = () => {
    const minutes = Math.floor(currentAudio.current.duration / 60);
    const seconds = Math.floor(currentAudio.current.duration % 60);
    setMusicTotalLength(`${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`);

    const currentMin = Math.floor(currentAudio.current.currentTime / 60);
    const currentSec = Math.floor(currentAudio.current.currentTime % 60);
    setMusicCurrentTime(`${currentMin < 10 ? `0${currentMin}` : currentMin} : ${currentSec < 10 ? `0${currentSec}` : currentSec}`);

    const progress = parseInt((currentAudio.current.currentTime / currentAudio.current.duration) * 100);
    setAudioProgress(isNaN(progress) ? 0 : progress);
  };

  return (
    <div className="flex flex-col items-center  text-white w-[300px] ml-16" style={{ backgroundColor: 'hsla(0, 0, 0, 0.2)' }}>
      <audio
        src={currentMusicDetails.songSrc}
        ref={currentAudio}
        onEnded={handleNextSong}
        onTimeUpdate={handleAudioUpdate}
      ></audio>
      <div className="w-[300px] max-w-md p-0 rounded-lg shadow-lg">
        
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
      </div>
    </div>
  );
}

export default Music;
