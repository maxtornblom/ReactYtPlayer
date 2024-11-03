# ReactYtPlayer

ReactYtPlayer is a simple YouTube player built with React that allows users to search for YouTube videos using the YouTube API. 
Users can enter search keywords, view the search results, and play their selected video directly within the application.

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

   Obtain your YouTube API key from the [Google Cloud Console](https://console.cloud.google.com) and place it in the `.env` file:

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


### Contributing

Contributions are welcome! If you have suggestions for improvements or features, feel free to fork the repository and submit a pull request.


### Acknowledgments

- [YouTube Data API](https://developers.google.com/youtube/v3)
- [React](https://reactjs.org/)
