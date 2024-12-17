fetch('../data/product.json')
    .then(response => response.json())
    .then(data => {
        const productGrid = document.querySelector('.product-grid');
        data.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="Product Image" />
                <h2>${product.name}</h2>
                <p><strong>Price:</strong> &#8361 ${product.price} </p>
            `;
            productGrid.appendChild(productDiv);
        });
    })
    .catch(error => console.error('Error loading products:', error));

// 검색 기능
document.querySelector('.search-box').addEventListener('submit', function (e) {
    e.preventDefault(); 

    const searchInput = document.querySelector('#search-input').value.trim(); 
    const productCards = document.querySelectorAll('.product-grid .product'); 

    productCards.forEach(card => {
        const productName = card.querySelector('h2').textContent; 
        
        if (productName.indexOf(searchInput) !== -1) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none'; 
        }
    });
});
