document.addEventListener('DOMContentLoaded', () => {
    const checkoutButton = document.getElementById('checkout-button');
    const contactInfoForm = document.getElementById('contact-info-form');

    // Cargar el carrito desde localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Función para agregar un producto al carrito
    function addToCart(product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Producto agregado al carrito');
    }

    // Manejar el evento de clic en el botón "Agregar al Carrito"
    document.querySelectorAll('.btn-agregar').forEach(button => {
        button.addEventListener('click', () => {
            const product = {
                id: button.dataset.id,
                title: button.dataset.title,
                description: button.dataset.description.substring(0,15)+'...',
                image: button.dataset.image,
                quantity: parseInt(button.previousElementSibling.querySelector('input').value)
            };
            addToCart(product);
        });
    });

    // Mostrar el carrito
    document.getElementById('cart-button').addEventListener('click', () => {
        $('#cartModal').modal('show');
        renderCartItems();
    });

    function renderCartItems() {
        const cartItemsContainer = document.getElementById('cart-items');
        // Limpiar el contenedor
        cartItemsContainer.innerHTML = '';
    
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item', 'd-flex', 'align-items-center', 'mb-3');
            itemElement.innerHTML = `
                <div class="item-image mr-3">
                     <img src="${item.image}" alt="${item.title}" class="img-fluid rounded" style="width: 70px; height: auto; padding: 5%;">
                </div>
                <div class="item-details flex-grow-1">
                    <h6 class="mb-1">${item.title}</h6>
                    <p class="mb-0">Descripción: ${item.description}</p>
                    <div class="d-flex align-items-center mt-2">
                        <label for="quantity-${index}" class="mr-2 mb-0">Cantidad:</label>
                        <input type="number" id="quantity-${index}" class="form-control quantity-input" min="1" value="${item.quantity}" data-index="${index}" style="width: auto;">
                    </div>
                </div>
                <button class="btn btn-danger btn-sm ml-3 remove-item-button" data-index="${index}">Eliminar</button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
    
        // Carrito está vacío, mostrar un mensaje
        if (cart.length === 0) {
            const emptyMessage = document.createElement('div');
            emptyMessage.classList.add('alert', 'alert-warning', 'text-center');
            emptyMessage.textContent = 'Tu carrito está vacío.';
            cartItemsContainer.appendChild(emptyMessage);
        }
    
        // event listeners para los botones de eliminar
        document.querySelectorAll('.remove-item-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.getAttribute('data-index');
                removeItemFromCart(index);
            });
        });
    
        // event listeners para los inputs de cantidad
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', (event) => {
                const index = event.target.getAttribute('data-index');
                const newQuantity = parseInt(event.target.value);
                updateCartItemQuantity(index, newQuantity);
            });
        });
    }
    
    // Función para eliminar un producto del carrito
    function removeItemFromCart(index) {
        cart.splice(index, 1);
        renderCartItems();
    }
    
    // Función para actualizar la cantidad de un producto en el carrito
    function updateCartItemQuantity(index, newQuantity) {
        cart[index].quantity = newQuantity;
        renderCartItems();
    }

    // Manejar el evento de clic en el botón "Proceder al Pago"
    checkoutButton.addEventListener('click', () => {
        $('#contact-info-modal').modal('show');
    });

    contactInfoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
    
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        
        // Validar que todos los campos estén llenos
        if (name && phone && address) {
            try {
                const user = { name, phone, address };
                const items = cart.map(item => ({
                    title: item.title,
                    description: item.description,
                    image: item.image,
                    quantity: item.quantity
                }));

                let dat = JSON.stringify({ user, items })
                
                const response = await fetch('/api/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: dat
                });
    
                const data = await response.json();
                if (response.ok) {
                    alert('Orden procesada exitosamente y correo enviado');
                    localStorage.removeItem('cart');
                    window.location.reload();
                } else {
                    alert(`Error: ${data.message}`);
                }
            } catch (error) {
                alert(`Error procesando la orden ${error}`);
            }
        } else {
            alert('Por favor completa todos los campos');
        }
    });
});
