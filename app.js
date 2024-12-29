const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// 데이터베이스 초기화
const db = new sqlite3.Database('./yangcheong_store.db', (err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.run(`CREATE TABLE IF NOT EXISTS suggestions (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
              suggestion TEXT NOT NULL
            )`);
            
    
    db.run(`
      CREATE TABLE IF NOT EXISTS replies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        suggestion_id INTEGER NOT NULL,
        reply TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (suggestion_id) REFERENCES suggestions (id) ON DELETE CASCADE
      )`
    );
  }
});




// 미들웨어 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// 메인 페이지 리다이렉트
app.get('/', (req, res) => {
  res.redirect('/html/main.html');
});

// 모든 제안 조회
app.get('/api/suggestions', (req, res) => {
  db.all("SELECT * FROM suggestions", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// 새로운 제안 추가
app.post('/api/suggestions', (req, res) => {
  const { name, suggestion } = req.body;
  db.run(
    "INSERT INTO suggestions (name, suggestion) VALUES (?, ?)",
    [name, suggestion],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.status(201).json({
        message: "Suggestion added successfully",
        id: this.lastID
      });
    }
  );
});


// 특정 제안 삭제
app.delete('/api/suggestions/:id', (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM suggestions WHERE id = ?", id, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: "Suggestion deleted successfully" });
  });
});

// 특정 대댓글 삭제
app.delete('/api/replies/:id', (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM replies WHERE id = ?", id, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    } 
    res.json({ message: "Reply deleted successfully" });
  });
});


// 대댓글 API
app.post('/api/replies', (req, res) => {
  const { suggestion_id, reply } = req.body;

  if (!suggestion_id || !reply) {
      res.status(400).json({ error: "suggestion_id and reply are required." });
      return;
  }

  db.run(
      `INSERT INTO replies (suggestion_id, reply) VALUES (?, ?)`,
      [suggestion_id, reply],
      function (err) {
          if (err) {
              res.status(500).json({ error: err.message });
          } else {
              res.status(201).json({
                  message: "Reply added successfully",
                  id: this.lastID
              });
          }
      }
  );
});


app.get('/api/replies/:suggestion_id', (req, res) => {
  const { suggestion_id } = req.params;

  db.all(
      `SELECT id, reply, created_at FROM replies WHERE suggestion_id = ? ORDER BY created_at ASC`,
      [suggestion_id],
      (err, rows) => {
          if (err) {
              res.status(500).json({ error: err.message });
          } else {
              res.json(rows);
          }
      }
  );
});






// Express 앱 인스턴스를 내보냄
module.exports = app;
