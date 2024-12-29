fetch('/api/products')
  .then((response) => response.json())
  .then((data) => {
    const productGrid = document.querySelector('.product-grid');
    data.forEach((product) => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product');
      productDiv.innerHTML = `
        <img src="${product.image}" alt="Product Image" />
        <h2>${product.name}</h2>
        <p><strong>Price:</strong> &#8361 ${product.price}</p>
        <button class="like-button" data-product-id="${product.id}">♡ 좋아요</button>
        <p>좋아요 수: <span class="like-count">${product.likes}</span></p>
      `;
      productGrid.appendChild(productDiv);

      const likeButton = productDiv.querySelector('.like-button');
      likeButton.addEventListener('click', () => {
        const likes = product.likes + 1;
        updateLikes(product.id, likes, likeButton);
      });
    });
  })
  .catch((error) => console.error('Error loading products:', error));

// 좋아요 상태 업데이트
function updateLikes(productId, likes, button) {
  fetch('/api/like', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      liked_products: {
        [productId]: likes,
      },
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      button.disabled = true; // 버튼 비활성화
      const likeCount = button.closest('.product').querySelector('.like-count');
      likeCount.textContent = likes; // 좋아요 수 업데이트
    })
    .catch((error) => console.error('Error updating likes:', error));
}

// 한 페이지에 표시할 상품 수
const itemsPerPage = 9;

// 현재 페이지
let currentPage = 1;

// 전체 상품 데이터 저장 변수
let productData = [];

// SQLite 기반 API에서 상품 데이터 불러오기
fetch('/api/products')
  .then(response => response.json())
  .then(data => {
    productData = data; // 상품 데이터를 전역 변수에 저장
    displayProducts(currentPage); // 첫 페이지 표시
    createPagination(); // 페이지네이션 생성
  })
  .catch(error => console.error('Error loading products:', error));

// 상품 표시 함수
function displayProducts(page) {
  const productGrid = document.querySelector('.product-grid');
  productGrid.innerHTML = ""; // 기존 상품 제거

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const productsToDisplay = productData.slice(startIndex, endIndex);

  productsToDisplay.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
      <img src="${product.image}" alt="Product Image" />
      <h2>${product.name}</h2>
      <p><strong>Price:</strong> &#8361 
      product.price} </p>
    `;
    productGrid.appendChild(productDiv);
  });
}

// 페이지네이션 생성 함수
function createPagination() {
  const paginationContainer = document.createElement('div');
  paginationContainer.classList.add('pagination');
  const container = document.querySelector('#products');
  container.appendChild(paginationContainer);

  const totalPages = Math.ceil(productData.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.textContent = i;

    if (i === currentPage) {
      button.classList.add('active'); // 현재 페이지 강조
    }

    button.addEventListener('click', () => {
      currentPage = i;
      displayProducts(currentPage); // 상품 갱신
      document.querySelectorAll('.pagination button').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active'); // 클릭된 버튼 강조
    });

    paginationContainer.appendChild(button);
  }
}

// 검색 기능
document.querySelector('.search-box').addEventListener('submit', function (e) {
  e.preventDefault();

  const searchInput = document.querySelector('#search-input').value.trim().toLowerCase();

  const filteredProducts = productData.filter(product =>
    product.name.toLowerCase().includes(searchInput)
  );

  displayFilteredProducts(filteredProducts);
});

function displayFilteredProducts(filteredProducts) {
  const productGrid = document.querySelector('.product-grid');
  productGrid.innerHTML = "";

  filteredProducts.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
      <img src="${product.image}" alt="Product Image" />
      <h2>${product.name}</h2>
      <p><strong>Price:</strong> &#8361 ${product.price} </p>
    `;
    productGrid.appendChild(productDiv);
  });

  // 검색 결과에는 페이지네이션 제거
  const paginationContainer = document.querySelector('.pagination');
  if (paginationContainer) {
    paginationContainer.remove();
  }
}
