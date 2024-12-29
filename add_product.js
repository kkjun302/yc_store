/*const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./public/data/yangcheong_store.db', (err) => {
  if (err) {
    return console.error('Database connection failed:', err.message);
  }
  console.log('Connected to the SQLite database.');
});

const products = [
  ['야미야미 바나나우유', '../images/snacks/pro1.jpg', 1200],
  ['초코 아이콘', '../images/snacks/pro2.jpg', 2000],
  ['잼있는 딸기쿠키', '../images/snacks/pro3.jpg', 1200],
  ['초코웨하스', '../images/snacks/pro4.jpg', 2000],
  ['감귤청량바', '../images/snacks/pro5.jpg', 900],
  ['딸기 웨하스', '../images/snacks/pro6.jpg', 2000],
  ['우리밀 코코아 와플', '../images/snacks/pro7.jpg', 500],
  ['초코가득바', '../images/snacks/pro8.jpg', 1000],
  ['이프로 캔', '../images/snacks/pro9.jpg', 1000],
  ['아이시스', '../images/snacks/pro10.jpg', 500],
  ['떡볶이맛 스낵', '../images/snacks/pro11.jpg', 2000],
  ['사르르 콘스낵', '../images/snacks/pro12.jpg', 1500],
  ['망고주스', '../images/snacks/pro13.jpg', 500],
  ['우리밀 라면땅', '../images/snacks/pro14.jpg', 1500],
  ['우리밀 참께스틱', '../images/snacks/pro15.jpg', 1500],
  ['골목대장 짱군', '../images/snacks/pro16.jpg', 2100],
  ['포도한모금', '../images/snacks/pro17.jpg', 600],
  ['고르곤졸라치즈팝', '../images/snacks/pro18.jpg', 1000],
  ['감귤 한모금', '../images/snacks/pro19.jpg', 800],
  ['계란과자', '../images/snacks/pro20.jpg', 700],
  ['허니바나나', '../images/snacks/pro21.jpg', 1000],
  ['해피 파인애플 주스', '../images/snacks/pro22.jpg', 500],
  ['초코 크림파이', '../images/snacks/pro23.jpg', 700],
  ['쁘띠 초코쿠키', '../images/snacks/pro24.jpg', 700],
  ['초코 소라빵', '../images/snacks/pro25.jpg', 1600],
  ['젤리스틱 감귤', '../images/snacks/pro27.jpg', 500],
  ['초코 퍼지쿠키', '../images/snacks/pro28.jpg', 2000],
  ['잼있는 사과쿠키', '../images/snacks/pro29.jpg', 1200],
  ['잘익은 옥수수 이야기', '../images/snacks/pro30.jpg', 1600],
  ['워터젤리 복숭아', '../images/snacks/pro31.jpg', 2500],
  ['우리양파칩', '../images/snacks/pro32.jpg', 1000],
  ['우리밀 와플', '../images/snacks/pro33.jpg', 500],
  ['우리곡 초코링', '../images/snacks/pro34.jpg', 1100],
  ['요거트 샌드웨이퍼', '../images/snacks/pro35.jpg', 600],
  ['오곡야채 크래커', '../images/snacks/pro36.jpg', 1300],
  ['샤인머스켓 한모금', '../images/snacks/pro37.jpg', 600],
  ['사과 한모금', '../images/snacks/pro38.jpg', 500],
  ['마시는 프로틴', '../images/snacks/pro39.jpg', 1200],
  ['마시는 초콜릿', '../images/snacks/pro40.jpg', 800],
  ['우리밀 라면땅 양념치킨맛', '../images/snacks/pro41.jpg', 1500],
  ['딸기 우유', '../images/snacks/pro42.jpg', 1200],
  ['딸기샌드웨이퍼', '../images/snacks/pro43.jpg', 600],
  ['달콤한 눈꽃핀 옥수수', '../images/snacks/pro44.jpg', 2000],
];

db.serialize(() => {
  products.forEach((product) => {
    db.run(
      'INSERT INTO products (name, image, price) VALUES (?, ?, ?)',
      product,
      function (err) {
        if (err) {
          return console.error('Error inserting product:', err.message);
        }
        console.log(`Product '${product[0]}' added with ID ${this.lastID}`);
      }
    );
  });
});

db.close((err) => {
  if (err) {*/
    return console.error('Error closing the database:', err.message);
  }
  console.log('Database connection closed.');
});
