(function() {
        // --- Application State and Data Persistence ---

        // Load food data from the global scope (assuming it's loaded by another script/data.js)
        let foodItems = window.foodItems || [];
        let foodCategories = window.foodCategories || [];

        // Load data from localStorage (Data Persistence)
        let cart = JSON.parse(localStorage.getItem('sharedCart')) || [];
        let reservations = JSON.parse(localStorage.getItem('sharedReservations')) || [];

        // Default to the second category ('Main Dishes') if categories exist
        let currentCategory = foodCategories.length > 1 ? foodCategories[1] : null;
        let currentSearchTerm = '';

        // --- Utility Functions ---

        /**
         * @description Persists cart and reservation data to localStorage.
         */
        const syncSharedData = () => {
            localStorage.setItem('sharedCart', JSON.stringify(cart));
            localStorage.setItem('sharedReservations', JSON.stringify(reservations));
        };

        const formatCurrency = (amount) => {
            const numberAmount = parseFloat(amount);
            if (isNaN(numberAmount)) return '$0.00';
            return numberAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        };

        const getElement = (id) => document.getElementById(id);


        // Mock Firestore/Backend Functions
        const updateFirestoreCart = async(newCart) => {
            console.log("Mock: Sending cart update to Firestore.", newCart);
            // In a real app, this would use the Firebase SDK to write to a database
            return true;
        };

        const saveReservation = async(data) => {
            console.log("Mock: Submitting reservation to backend.", data);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
            const resId = `RES-${Math.floor(Math.random() * 10000)}`;
            const newReservation = {...data, id: resId, status: 'Confirmed' };
            reservations.push(newReservation);
            renderReservationList(); // Re-render the list immediately
            syncSharedData(); // Save reservations to localStorage
            return { success: true, message: `Reservation confirmed! ID: ${resId}` };
        };

        /**
         * @description Removes a reservation by its ID and syncs data.
         * @param {string} resId - The unique ID of the reservation to clear.
         */
        const clearReservation = (resId) => {
            const initialLength = reservations.length;

            // Filter out the reservation with the matching ID
            reservations = reservations.filter(res => res.id !== resId);

            if (reservations.length < initialLength) {
                console.log(`Reservation ${resId} cleared/removed.`);
                syncSharedData();
                renderReservationList();
            } else {
                console.warn(`Reservation ${resId} not found.`);
            }
        };


        // --- Cart Management Functions ---

        const updateCartCountDisplay = () => {
            const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
            const cartCountElement = getElement('cart-count-badge');
            const checkoutBtn = getElement('checkout-btn');

            if (cartCountElement) {
                cartCountElement.textContent = totalCount;
                cartCountElement.classList.toggle('hidden', totalCount === 0);
            }

            if (checkoutBtn) {
                checkoutBtn.disabled = totalCount === 0;
                // Use opacity for visual feedback when disabled
                checkoutBtn.classList.toggle('opacity-50', totalCount === 0);
            }

            renderCart();
            syncSharedData(); // Save cart data after every update
        };

        const addToCart = async(item, quantity, options) => {
            const optionsString = options.sort().join('|');
            const cartItemId = `${item.id}-${optionsString}`;

            const existingItemIndex = cart.findIndex(c => c.cartId === cartItemId);

            if (existingItemIndex > -1) {
                cart[existingItemIndex].quantity += quantity;
            } else {
                cart.push({
                    ...item,
                    cartId: cartItemId,
                    quantity: quantity,
                    options: options
                });
            }

            closeProductModal();
            openCartDrawer(); // Open drawer on add
            updateCartCountDisplay();
            await updateFirestoreCart(cart);
        };

        const updateCartQuantity = async(cartId, newQuantity) => {
            const itemIndex = cart.findIndex(c => c.cartId === cartId);
            if (itemIndex > -1) {
                if (newQuantity <= 0) {
                    cart.splice(itemIndex, 1); // Remove item
                } else {
                    cart[itemIndex].quantity = newQuantity;
                }
            }
            updateCartCountDisplay();
            await updateFirestoreCart(cart);
        };

        const removeFromCart = async(cartId) => {
            cart = cart.filter(item => item.cartId !== cartId);
            updateCartCountDisplay();
            await updateFirestoreCart(cart);
        };

        // --- Rendering Functions ---

        const renderPopularDishes = () => {
            const container = document.getElementById('popular-dishes-container');
            if (!container) return;

            const popularItems = foodItems
                .filter(item => item.isPopular)
                .slice(0, 8); // Limit to 8 popular items

            container.innerHTML = popularItems.map(item => `
            <div class="flex-shrink-0 w-64 bg-white border border-gray-100 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition" onclick="window.appFunctions.openProductModal('${item.id}')">
                <img src="${item.image}" alt="${item.name}" class="h-32 w-full object-cover rounded-t-xl">
                <div class="p-3">
                    <p class="font-semibold text-gray-800">${item.name}</p>
                    <p class="text-sm text-green-600 font-bold mt-1">${formatCurrency(item.price)}</p>
                </div>
            </div>
        `).join('');
        };

        const renderMenuTabs = () => {
            const container = getElement('menu-tabs-container');
            if (!container) return;

            const tabsHtml = foodCategories.map(cat => {
                const isActive = currentCategory === cat && !currentSearchTerm;
                const activeClasses = isActive ? 'bg-green-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100';
                return `
                <button 
                    class="py-2 px-4 rounded-full font-medium text-sm transition ${activeClasses}"
                    onclick="window.appFunctions.switchCategory('${cat}')"
                >
                    ${cat}
                </button>
            `;
            }).join('');

            container.innerHTML = tabsHtml;
        };

        const renderMenuItems = () => {
            const container = getElement('menu-items-container');
            if (!container) return;

            let filteredItems = foodItems;

            // 1. Filter by Search Term
            if (currentSearchTerm) {
                filteredItems = filteredItems.filter(item =>
                    item.name.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
                    item.description.toLowerCase().includes(currentSearchTerm.toLowerCase())
                );
            }

            // 2. Filter by Category (only if no active search or category is 'All')
            else if (currentCategory && currentCategory !== 'All') {
                filteredItems = filteredItems.filter(item => item.category === currentCategory || item.type === currentCategory);
            }

            if (filteredItems.length === 0) {
                container.innerHTML = `
                <div class="col-span-full text-center py-10">
                    <i class="fa-solid fa-face-frown w-10 h-10 text-gray-400 mx-auto mb-3"></i>
                    <p class="text-gray-600 font-semibold">No items found.</p>
                    <p class="text-sm text-gray-500">Try a different search term or category.</p>
                </div>
            `;
                return;
            }

            container.innerHTML = filteredItems.map(item => `
            <div class="bg-white border border-gray-100 rounded-xl shadow-md overflow-hidden flex flex-col cursor-pointer hover:shadow-lg transition" onclick="window.appFunctions.openProductModal('${item.id}')">
                <img src="${item.image}" alt="${item.name}" class="w-full h-40 object-cover">
                <div class="p-4 flex flex-col flex-grow">
                    <h3 class="font-bold text-gray-900 text-lg mb-1">${item.name}</h3>
                    <p class="text-gray-500 text-sm flex-grow mb-3">${item.description}</p>
                    <div class="flex justify-between items-center mt-auto">
                        <span class="font-bold text-green-600 text-xl">${formatCurrency(item.price)}</span>
                        <button class="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition" onclick="event.stopPropagation(); window.appFunctions.openProductModal('${item.id}')">
                            <i class="fa-solid fa-plus w-4 h-4"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        };

        const renderCart = () => {
            const listContainer = getElement('cart-list-container');
            const summaryContainer = getElement('cart-summary');
            const checkoutBtn = getElement('checkout-btn');
            const emptyMessage = getElement('cart-empty-message');
            const checkoutFormContainer = getElement('checkout-form-container');

            if (!listContainer || !summaryContainer || !checkoutBtn || !emptyMessage || !checkoutFormContainer) return;

            if (cart.length === 0) {
                listContainer.innerHTML = '';
                summaryContainer.classList.add('hidden');
                checkoutBtn.classList.add('hidden');
                emptyMessage.classList.remove('hidden');
                checkoutFormContainer.classList.add('hidden'); // Ensure checkout form is hidden
                return;
            }

            emptyMessage.classList.add('hidden');
            summaryContainer.classList.remove('hidden');
            checkoutBtn.classList.remove('hidden');

            let subtotal = 0;

            listContainer.innerHTML = cart.map(item => {
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;
                const optionsDisplay = item.options && item.options.length > 0 ? `<p class="text-xs text-gray-500">Option: ${item.options.join(', ')}</p>` : '';

                return `
                <div class="flex justify-between items-center py-3 border-b border-gray-100">
                    <div class="flex items-center">
                        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg mr-3">
                        <div>
                            <p class="font-medium text-gray-800">${item.name}</p>
                            ${optionsDisplay}
                            <p class="text-sm text-green-600">${formatCurrency(item.price)}</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2">
                        <div class="flex items-center border border-gray-300 rounded-lg">
                            <button class="p-1 text-gray-600 hover:text-gray-800" onclick="window.appFunctions.updateCartQuantity('${item.cartId}', ${item.quantity - 1})">
                                <i class="fa-solid fa-minus w-4 h-4"></i>
                            </button>
                            <input type="number" value="${item.quantity}" min="1" class="w-8 text-center text-sm font-medium border-0 focus:ring-0" 
                                onchange="window.appFunctions.updateCartQuantity('${item.cartId}', parseInt(this.value))" />
                            <button class="p-1 text-gray-600 hover:text-gray-800" onclick="window.appFunctions.updateCartQuantity('${item.cartId}', ${item.quantity + 1})">
                                <i class="fa-solid fa-plus w-4 h-4"></i>
                            </button>
                        </div>
                        <button class="text-red-500 hover:text-red-700" onclick="window.appFunctions.removeFromCart('${item.cartId}')">
                            <i class="fa-solid fa-trash-can w-4 h-4"></i>
                        </button>
                    </div>
                </div>
            `;
            }).join('');

            const taxRate = 0.08;
            const tax = subtotal * taxRate;
            const total = subtotal + tax;

            // Update the checkout total amount display
            const checkoutTotalElement = getElement('checkout-total-amount');
            if (checkoutTotalElement) {
                checkoutTotalElement.textContent = formatCurrency(total);
            }

            summaryContainer.innerHTML = `
            <div class="space-y-1 text-gray-600">
                <div class="flex justify-between">
                    <span>Subtotal:</span>
                    <span class="font-medium">${formatCurrency(subtotal)}</span>
                </div>
                <div class="flex justify-between">
                    <span>Tax (8%):</span>
                    <span class="font-medium">${formatCurrency(tax)}</span>
                </div>
                <div class="flex justify-between pt-2 border-t border-gray-200 text-lg text-gray-900 font-bold">
                    <span>Total:</span>
                    <span>${formatCurrency(total)}</span>
                </div>
            </div>
        `;
        };

        const renderProductModal = (item) => {
                const modalContent = getElement('product-modal-content');
                if (!modalContent) return;

                // Mock unique options based on item type for demonstration
                const baseOptions = ["Regular", "Spicy", "Extra Cheese", "Vegan Substitute"];
                let uniqueOptions = baseOptions.filter(opt => opt !== item.type);
                if (item.type && !uniqueOptions.includes(item.type)) {
                    uniqueOptions.unshift(item.type);
                }

                modalContent.innerHTML = `
            <button class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10" onclick="window.appFunctions.closeProductModal()">
                <i class="fa-solid fa-xmark w-6 h-6"></i>
            </button>
            
            <div class="p-6 md:p-8">
                <img src="${item.image}" alt="${item.name}" class="w-full h-48 object-cover rounded-xl mb-4 shadow-md">
                
                <h2 class="text-2xl font-bold text-gray-900">${item.name}</h2>
                <p class="text-gray-600 mt-1 mb-4">${item.description}</p>
                <div class="text-3xl font-extrabold text-green-600 mb-6">${formatCurrency(item.price)}</div>

                <form id="add-to-cart-form">
                    <div class="grid grid-cols-3 gap-4 mb-6">
                        <div class="col-span-1 flex flex-col items-center p-3 border rounded-xl bg-gray-50">
                            <i class="fa-solid fa-hashtag w-6 h-6 text-gray-500 mb-1"></i>
                            <input type="number" id="modal-quantity" name="quantity" value="1" min="1" class="w-12 text-center text-sm font-medium border-0 bg-transparent p-0 focus:ring-0">
                            <span class="text-xs text-gray-500">Quantity</span>
                        </div>
                        
                        <div class="col-span-2 flex flex-col items-center p-3 border rounded-xl bg-gray-50">
                            <i class="fa-solid fa-leaf w-6 h-6 text-green-500 mb-1"></i>
                            <span class="text-sm font-medium">${item.type}</span>
                            <span class="text-xs text-gray-500">Food Type</span>
                        </div>
                    </div>

                    <div class="mb-6">
                        <label for="modal-options" class="block text-sm font-medium text-gray-700 mb-2">Custom Options (Choose one)</label>
                        <select id="modal-options" name="options" class="w-full p-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500 appearance-none">
                            <option value="" disabled selected>Select an option</option>
                            ${uniqueOptions.map(opt => `<option value="${opt}" ${opt === item.type ? 'selected' : ''}>${opt}</option>`).join('')}
                        </select>
                    </div>

                    <button type="submit" class="w-full bg-red-600 text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:bg-red-700 transition">
                        Add <span>1</span> to Cart - ${formatCurrency(item.price * 1)}
                    </button>
                </form>
            </div>
        `;

        // Attach event listener for form submission and quantity change
        const form = getElement('add-to-cart-form');
        const quantityInput = getElement('modal-quantity');
        const addToCartBtn = form.querySelector('button[type="submit"]');

        const updateButtonText = () => {
            const quantity = parseInt(quantityInput.value) || 1;
            const totalPrice = item.price * quantity;
            addToCartBtn.innerHTML = `Add <span>${quantity}</span> to Cart - ${formatCurrency(totalPrice)}`;
        };

        if (quantityInput) {
            quantityInput.addEventListener('change', updateButtonText);
            quantityInput.addEventListener('input', updateButtonText);
        }
        updateButtonText(); // Initial update

        form.onsubmit = (e) => {
            e.preventDefault();
            const quantity = parseInt(getElement('modal-quantity').value);
            const options = [getElement('modal-options').value].filter(v => v);
            window.appFunctions.addToCart(item, quantity, options);
        };
    };

    const renderReservationList = (resList) => {
        const container = getElement('reservation-list-container');
        if (!container) return;
        
        const resData = resList || reservations;

        if (resData.length === 0) {
            container.innerHTML = '<p class="text-gray-500 text-center">You have no active reservations.</p>';
            return;
        }

        container.innerHTML = resData.map(res => {
            const dateObj = new Date(res.date + ' ' + res.time);
            const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            const formattedTime = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

            return `
            <div 
                class="bg-white border rounded-xl p-4 shadow-sm flex justify-between items-center cursor-pointer hover:bg-red-50 transition" 
                onclick="window.appFunctions.clearReservation('${res.id}')"
            >
                <div>
                    <p class="font-bold text-lg">${res.name}</p>
                    <p class="text-sm text-gray-600">${formattedDate} at ${formattedTime} for ${res.guests}</p>
                    <p class="text-xs text-gray-500 mt-1">ID: ${res.id}</p>
                </div>
                <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    ${res.status || 'Confirmed'}
                </span>
            </div>
        `}).join('');
    };

    // --- UI Interaction Functions ---

    const openProductModal = (id) => {
        const item = foodItems.find(f => f.id === id);
        if (!item) return;

        renderProductModal(item);
        getElement('product-modal').classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    };

    const closeProductModal = () => {
        getElement('product-modal').classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    };

    const openCartDrawer = () => {
        const cartDrawer = getElement('cart-drawer');
        if (cartDrawer) {
            cartDrawer.classList.remove('translate-x-full');
            cartDrawer.classList.remove('hidden'); // Ensure it's not hidden
            document.body.classList.add('overflow-hidden'); // Lock body scroll
        }
        renderCart(); 
    };

    const closeCartDrawer = () => {
        const cartDrawer = getElement('cart-drawer');
        if (cartDrawer) {
            cartDrawer.classList.add('translate-x-full');
            // Use setTimeout to ensure the transition runs before hiding completely
            setTimeout(() => {
                cartDrawer.classList.add('hidden');
                document.body.classList.remove('overflow-hidden'); // Unlock body scroll
            }, 300); 
        }
        cancelCheckout();
    };

    const openCheckoutForm = () => {
        getElement('cart-summary').classList.add('hidden');
        getElement('checkout-btn').classList.add('hidden');
        getElement('checkout-form-container').classList.remove('hidden');
        
        // Update the checkout total amount just before opening the form
        const totalElement = getElement('cart-summary').querySelector('.font-bold:last-child > span:last-child');
        const totalText = totalElement?.textContent || formatCurrency(0);
        getElement('checkout-total-amount').textContent = totalText;
    };

    const cancelCheckout = () => {
        getElement('cart-summary').classList.remove('hidden');
        getElement('checkout-btn').classList.remove('hidden');
        getElement('checkout-form-container').classList.add('hidden');
        getElement('checkout-message').classList.add('hidden');
    };

    const processCheckout = async (e) => {
        e.preventDefault();
        const messageBox = getElement('checkout-message');
        const checkoutForm = getElement('checkout-form');
        
        messageBox.classList.remove('hidden', 'bg-red-100', 'text-red-700', 'bg-green-100', 'text-green-700', 'bg-blue-100', 'text-blue-700');
        messageBox.classList.add('bg-blue-100', 'text-blue-700');
        messageBox.textContent = 'Processing order... (Mock Payment)';

        // Mock processing delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Clear cart locally and in Firestore
        cart = [];
        await updateFirestoreCart(cart);

        messageBox.classList.remove('bg-blue-100', 'text-blue-700');
        messageBox.classList.add('bg-green-100', 'text-green-700');
        messageBox.textContent = 'Order Placed Successfully! Cart has been cleared.';
        
        checkoutForm.reset(); // Clear user input fields

        // Hide form and close drawer after a delay
        setTimeout(() => {
            cancelCheckout();
            closeCartDrawer();
            messageBox.classList.add('hidden');
        }, 3000);
        
        updateCartCountDisplay(); // Update display to show 0
    };

    const openReservationModal = () => {
        getElement('reservation-modal').classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
        // Clear status message from the complex form
        const complexMessageBox = getElement('reservation-message');
        if(complexMessageBox) complexMessageBox.classList.add('hidden'); 
        // Clear status message from the simple form
        const simpleMessageBox = getElement('reservation-success-message');
        if(simpleMessageBox) simpleMessageBox.classList.add('hidden'); 
    };

    const closeReservationModal = () => {
        getElement('reservation-modal').classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    };

    /**
     * Handles the complex reservation form submission.
     */
    const submitReservation = async (e) => {
        e.preventDefault();
        const form = e.target;
        const messageBox = getElement('reservation-message');
        
        messageBox.classList.remove('hidden', 'bg-red-100', 'text-red-700', 'bg-green-100', 'text-green-700', 'bg-blue-100', 'text-blue-700');
        messageBox.classList.add('bg-blue-100', 'text-blue-700');
        messageBox.textContent = 'Submitting reservation...';

        const reservationData = {
            name: form['res-name'].value,
            email: form['res-email'].value,
            phone: form['res-phone'].value,
            date: form['res-date'].value,
            time: form['res-time'].value,
            guests: form['res-guests'].value,
            requests: form['res-requests'].value,
        };

        const result = await saveReservation(reservationData);

        if (result.success) {
            messageBox.classList.remove('bg-blue-100', 'text-blue-700');
            messageBox.classList.add('bg-green-100', 'text-green-700');
            messageBox.textContent = result.message;
            form.reset(); // Clear form on success

            // Automatically close reservation modal and open list after 3 seconds
            setTimeout(() => {
                closeReservationModal();
                openReservationListModal();
            }, 3000);
        } else {
            messageBox.classList.remove('bg-blue-100', 'text-blue-700');
            messageBox.classList.add('bg-red-100', 'text-red-700');
            messageBox.textContent = `Reservation failed: ${result.message}`;
        }
    };
    
    /**
     * Handles the simple reservation form submission.
     */
    const handleReservationSubmit = async (e) => {
        e.preventDefault(); 
        const form = getElement('reservation-form-simple'); // Assuming this ID for the main menu form
        const messageBox = getElement('reservation-success-message');

        if (!form || !messageBox) return;

        // Collect data from the simple form (using common ID suffixes)
        const reservationData = {
            name: getElement('res-name-simple').value,
            email: getElement('res-email-simple').value,
            date: getElement('reservation-date-simple').value,
            time: getElement('reservation-time-simple').value,
            guests: getElement('res-guests-simple').value,
            phone: '', // Placeholder
            requests: '' // Placeholder
        };

        messageBox.classList.remove('hidden', 'bg-red-100', 'text-red-700', 'bg-green-100', 'text-green-700', 'bg-blue-100', 'text-blue-700');
        messageBox.classList.add('bg-blue-100', 'text-blue-700');
        messageBox.textContent = 'Submitting reservation...';
        
        const result = await saveReservation(reservationData);

        if (result.success) {
            messageBox.classList.remove('bg-blue-100', 'text-blue-700');
            messageBox.classList.add('bg-green-100', 'text-green-700');
            messageBox.textContent = result.message;
            
            form.reset(); 

            // Hide the success message after a few seconds
            setTimeout(() => {
                messageBox.classList.add('hidden');
            }, 3000); 
        } else {
            messageBox.classList.remove('bg-blue-100', 'text-blue-700');
            messageBox.classList.add('bg-red-100', 'text-red-700');
            messageBox.textContent = `Reservation failed: ${result.message}`;
        }
    };

    const openReservationListModal = () => {
        // Ensure the list is rendered with the latest data before opening
        renderReservationList();
        getElement('reservation-list-modal').classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    };

    const closeReservationListModal = () => {
        getElement('reservation-list-modal').classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    };

    // --- Scroll Logic for Popular Dishes ---

    const initPopularScroll = () => {
        const container = getElement('popular-dishes-container');
        const scrollLeftBtn = getElement('scroll-left-btn');
        const scrollRightBtn = getElement('scroll-right-btn');
        const scrollDistance = 300; // Scroll 300px at a time

        if (scrollLeftBtn && container) {
            scrollLeftBtn.onclick = () => {
                container.scrollBy({
                    left: -scrollDistance,
                    behavior: 'smooth'
                });
            };
        }

        if (scrollRightBtn && container) {
            scrollRightBtn.onclick = () => {
                container.scrollBy({
                    left: scrollDistance,
                    behavior: 'smooth'
                });
            };
        }
    };

    // --- Search Functionality ---
    const searchProducts = (term) => {
        currentSearchTerm = term.trim();
        
        // If searching, we clear the category tab highlight
        if (currentSearchTerm) {
            currentCategory = null; 
        } else if (!currentCategory) {
            // If search is cleared and no category was selected, default back to Main Dishes
            currentCategory = foodCategories.length > 1 ? foodCategories[1] : null; 
        }

        renderMenuTabs();
        renderMenuItems();
    };
    
    // Placeholder listeners (if needed for Firebase)
    const initCartListener = () => console.log("Cart listener initialized (mocked).");
    const initReservationListener = () => console.log("Reservation listener initialized (mocked).");


    // --- Initialization ---

    const initApp = () => {
        // Initial content rendering
        renderPopularDishes();
        renderMenuTabs();
        renderMenuItems();
        updateCartCountDisplay(); // Set initial cart count

        // Attach main event listeners
        const cartBtn = getElement('cart-btn');
        if (cartBtn) cartBtn.onclick = openCartDrawer;
        
        const checkoutForm = getElement('checkout-form');
        if (checkoutForm) checkoutForm.onsubmit = processCheckout;
        
        // Complex Reservation Form
        const reservationForm = getElement('reservation-form');
        if (reservationForm) reservationForm.onsubmit = submitReservation;
        
        // Simple Reservation Form (from previous request)
        const simpleReservationForm = getElement('reservation-form-simple');
        if (simpleReservationForm) simpleReservationForm.onsubmit = handleReservationSubmit;

        // Search Input Listener
        const searchInput = getElement('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => searchProducts(e.target.value));
        }

        // Initialize popular scroll
        initPopularScroll();

        // CRITICAL: Ensure cart drawer has initial hidden state for transitions
        const cartDrawer = getElement('cart-drawer');
        if (cartDrawer) {
            // These classes are critical for the drawer to start hidden and enable transition
            cartDrawer.classList.add('transition-transform', 'duration-300', 'ease-in-out', 'translate-x-full');
            cartDrawer.classList.add('hidden'); 
        }

        // Expose core functions globally
        window.appFunctions = {
            openProductModal,
            closeProductModal,
            openCartDrawer,
            closeCartDrawer,
            addToCart: (item, quantity, options) => addToCart(item, quantity, options),
            updateCartQuantity,
            removeFromCart,
            openCheckoutForm,
            cancelCheckout,
            openReservationModal,
            closeReservationModal,
            openReservationListModal,
            closeReservationListModal, 
            clearReservation, // <-- Function to remove booking
            searchProducts: searchProducts, 
            switchCategory: (cat) => { 
                // Clear search term when switching categories
                currentSearchTerm = '';
                const searchInput = getElement('search-input');
                if (searchInput) searchInput.value = '';

                currentCategory = cat;
                renderMenuTabs();
                renderMenuItems();
            },
            initListeners: () => {
                initCartListener();
                initReservationListener();
            }
        };
    };
    

    // Initialize the app when the window loads
    window.addEventListener('load', () => {
        initApp();
        
        // Check for an external Firebase initialization function
        if (window.initFirebase) {
            window.initFirebase();
        } else {
            console.warn("window.initFirebase() function not found. Assuming mock data is used.");
        }
    });
})();