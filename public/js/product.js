fetch('../data/product.json')
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
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