# ReactYtPlayer

ReactYtPlayer is a simple YouTube player built with React that allows users to search for YouTube videos using the YouTube API. Users can enter search keywords, view the search results, and play their selected video directly within the application.

## Features

- Search for YouTube videos by keywords.
- View video titles and select a video to play.
- Responsive design that works on different screen sizes.
- Error handling for API requests.

## Getting Started

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/maxtornblom/ReactYtPlayer.git
   cd ReactYtPlayer
   ```

2. **Install the dependencies:**

   ```bash
   npm install
   ```

3. **Set up the environment variable:**

   Obtain your YouTube API key from the [Google Cloud Console](https://console.cloud.google.com/welcome?project=cedar-channel-395321) and place it in the `.env` file:

   ```
   REACT_APP_API_KEY=your_api_key_here
   ```

   Make sure to replace `your_api_key_here` with your actual YouTube API key.

### Running the Application

To start the development server, run:

```bash
npm start
```

This will open the application in your default web browser at [http://localhost:3000](http://localhost:3000).

### Usage

1. Enter a search keyword in the input field.
2. Click the search button or press "Enter" to initiate the search.
3. The search results will be displayed as a list of video titles.
4. Click on a video title to play the selected video in the embedded player.
5. Use the clear button to reset the search and clear the results.

### Contributing

Contributions are welcome! If you have suggestions for improvements or features, feel free to fork the repository and submit a pull request.


### Acknowledgments

- [YouTube Data API](https://developers.google.com/youtube/v3)
- [React](https://reactjs.org/)
