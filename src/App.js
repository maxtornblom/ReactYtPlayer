import React, { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";
import { FaTimes } from "react-icons/fa";
import _ from "lodash";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [videoResults, setVideoResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedVideoId, setSelectedVideoId] = useState(""); 
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const API_KEY = process.env.REACT_APP_API_KEY;
  const listRef = useRef(null);

  const handleSearch = useCallback(async () => {
    if (searchTerm === "") return;

    setLoading(true);
    setErrorMessage(""); // Clear any previous error messages
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=${searchTerm}&key=${API_KEY}`
      );

      if (response.status === 403) {
        setVideoResults([]);
        setSelectedVideoId("");
        throw new Error("API request failed: Invalid API key or quota exceeded.");
      }

      const data = await response.json();
      if (data.items && Array.isArray(data.items)) {
        const videos = data.items.map((item) => ({
          title: item.snippet.title,
          videoId: item.id.videoId,
        }));
        setVideoResults(videos);
        setSelectedIndex(-1);
        setSelectedVideoId("");
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
      setErrorMessage(error.message); // Set the error message in the state
    } finally {
      setLoading(false);
    }
  }, [searchTerm, API_KEY]);

  useEffect(() => {
    const debouncedSearch = _.debounce(handleSearch, 300);

    if (searchTerm) {
      debouncedSearch();
    }

    return () => {
      debouncedSearch.cancel(); // Cleanup the debounced function on unmount
    };
  }, [searchTerm, handleSearch]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) => {
        const newIndex = Math.min(prevIndex + 1, videoResults.length - 1);
        scrollToSelected(newIndex);
        return newIndex;
      });
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) => {
        const newIndex = Math.max(prevIndex - 1, 0);
        scrollToSelected(newIndex);
        return newIndex;
      });
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && selectedIndex < videoResults.length) {
        setSelectedVideoId(videoResults[selectedIndex].videoId);
        setVideoResults([]);
      }
    }
  };

  const scrollToSelected = (index) => {
    if (listRef.current) {
      const listElement = listRef.current;
      const itemElement = document.querySelector(`.video-item-${index}`);
      if (itemElement) {
        listElement.scrollTop = itemElement.offsetTop - listElement.offsetTop;
      }
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setVideoResults([]);
    setSelectedIndex(-1);
    setSelectedVideoId("");
    setErrorMessage(""); // Clear error message when clearing search
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>YT Player</h1>
        <div className="input-container">
          <input
            type="text"
            aria-label="Search for YouTube videos"
            placeholder="Enter search keyword"
            className="input-field"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button aria-label="Clear search" onClick={handleClearSearch}>
            <FaTimes />
          </button>
        </div>
        {selectedVideoId && (
          <div className="video-player">
            <iframe
              width="800"
              height="500"
              src={`https://www.youtube.com/embed/${selectedVideoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
        {loading && <p className="loading">Loading...</p>}
        {errorMessage && (
          <p className="error-message">{errorMessage}</p> // Display error message if it exists
        )}
        {videoResults.length > 0 && !selectedVideoId && (
          <div className="video-list-container" ref={listRef}>
            <ul className="video-list">
              {videoResults.map((video, index) => (
                <li
                  key={video.videoId}
                  className={`video-item video-item-${index} ${
                    selectedIndex === index ? "selected" : ""
                  }`}
                >
                  <button
                    onClick={() => {
                      setSelectedVideoId(video.videoId);
                      setVideoResults([]);
                    }}
                    className="video-item-button"
                  >
                    {video.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
