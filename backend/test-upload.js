const express = require('express');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const app = express();

app.post('/test', upload.single('video'), (req, res) => {
  console.log('req.file:', req.file ? 'EXISTS' : 'UNDEFINED');
  console.log('req.body:', JSON.stringify(req.body));
  if (req.file) console.log('buffer length:', req.file.buffer.length);
  res.json({ ok: true });
});

const server = app.listen(0, () => {
  const port = server.address().port;
  const boundary = '----FormBoundary7MA4YWxkTrZu0gW';
  const lines = [
    '--' + boundary,
    'Content-Disposition: form-data; name="name"',
    '',
    'Test Food',
    '--' + boundary,
    'Content-Disposition: form-data; name="description"',
    '',
    'A test dish',
    '--' + boundary,
    'Content-Disposition: form-data; name="video"; filename="test.mp4"',
    'Content-Type: video/mp4',
    '',
    'fakevideodata',
    '--' + boundary + '--'
  ];
  const body = lines.join('\r\n');

  const http = require('http');
  const req = http.request({ method: 'POST', port, path: '/test', headers: {
    'Content-Type': 'multipart/form-data; boundary=' + boundary,
    'Content-Length': Buffer.byteLength(body)
  }}, (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
      console.log('Response:', data);
      server.close();
      process.exit(0);
    });
  });
  req.write(body);
  req.end();
});
