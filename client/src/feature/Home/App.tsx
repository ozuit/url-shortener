import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useCopyToClipboard } from 'usehooks-ts';
import { shortenUrlApi } from '../../api/shortenUrlApi';
import './App.css';

function App() {
  const [, copy] = useCopyToClipboard();
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleShortenUrl = async () => {
    const shortedUrl = await shortenUrlApi(longUrl);
    setShortUrl(shortedUrl);
  };

  const handleClear = () => {
    setShortUrl('');
    setLongUrl('');
  };

  return (
    <main>
      <div className="header-wrapper">
        <h1 className="header-text">URL Shortener</h1>
      </div>
      <div className="content-wrapper">
        <div className="input-wrapper">
          <TextField
            color="info"
            className="input-field"
            label="Enter url here ..."
            variant="outlined"
            onChange={(e) => setLongUrl(e.target.value)}
            value={longUrl}
          />
          <Button variant="contained" onClick={handleShortenUrl}>
            Shorten URL
          </Button>
          <Button variant="contained" onClick={handleClear}>
            Clear
          </Button>
        </div>
        {shortUrl && (
          <div className="output-wrapper">
            <div className="content-row">Your short URL: {shortUrl}</div>
            <div id="new-url" className="content-row"></div>
            <Button variant="contained" onClick={() => copy(shortUrl)}>
              Copy
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
