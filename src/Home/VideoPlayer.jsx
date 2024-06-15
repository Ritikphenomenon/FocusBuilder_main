import { useState } from "react";
import ReactPlayer from "react-player";

function VideoPlayer() {
  const [youtubeVideo, setYoutubeVideo] = useState("");
  const [youtubeURL, setYoutubeURL] = useState(
    ""
  );
  const [youtubeError, setYoutubeError] = useState("");
  const [playerKey, setPlayerKey] = useState(0); // Key to force re-render

  const handleYoutubeChange = (e) => {
    setYoutubeVideo(e.target.value);
  };

  const handleYoutubeSubmit = (e) => {
    e.preventDefault();
    const youtubeRegex =
      /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
    if (youtubeRegex.test(youtubeVideo)) {
      setYoutubeURL(youtubeVideo);
      setYoutubeError("");
      // Increment playerKey to force ReactPlayer re-render
      setPlayerKey((prevKey) => prevKey + 1);
    } else {
      setYoutubeError("Invalid URL. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleYoutubeSubmit}>
        <input
          type="text"
          className="border border-gray-300 rounded-md px-4 py-2 w-56"
          placeholder="Enter YouTube URL"
          onChange={handleYoutubeChange}
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded w-56"
        >
          Upload
        </button>
      </form>

      {youtubeError && (
        <div className="text-red-500 mt-2">{youtubeError}</div>
      )}

      <div className="w-xs max-w-xs">
        <ReactPlayer
          key={playerKey} // Key to force re-render
          url={youtubeURL}
          controls
          width="450px"
          height="320px"
        />
      </div>
    </div>
  );
}

export default VideoPlayer;
