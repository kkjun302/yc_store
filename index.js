const app = require('./app'); // app.js에서 내보낸 Express 앱 가져오기
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
