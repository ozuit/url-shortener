import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import QRCode from 'react-qr-code';
import { useCopyToClipboard } from 'usehooks-ts';
import { shortenUrlApi } from '../../api/shortenUrlApi';
import ToastMessage, { ToastProps } from '../../component/Toast';
import './App.css';

function App() {
  const [, copy] = useCopyToClipboard();
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [alert, setAlert] = useState<ToastProps>({
    visible: false,
    severity: 'success',
    message: '',
  });

  const handleShortenUrl = async () => {
    try {
      const shortedUrl = await shortenUrlApi(longUrl);
      setShortUrl(shortedUrl);
      setAlert({ visible: true, message: 'Shorten URL successful!' });
    } catch (error: any) {
      setAlert({ visible: true, severity: 'error', message: error?.message });
    }
  };

  const handleClear = () => {
    setShortUrl('');
    setLongUrl('');
  };

  const handleCopyShortUrl = () => {
    copy(shortUrl);
    setAlert({ visible: true, message: 'Copy successful!' });
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
            <Button variant="contained" onClick={handleCopyShortUrl}>
              Copy
            </Button>
          </div>
        )}
        {shortUrl && <QRCode style={{ margin: '0 auto' }} value={shortUrl} />}
      </div>
      <ToastMessage {...alert} onClose={() => setAlert({ visible: false })} />
    </main>
  );
}

export default App;
