// LocalStorage Keys
const HOTELS_KEY = 'hotels';
const BOOKINGS_KEY = 'bookings';

// Initialize Sample Data
function initializeData() {
    if (!localStorage.getItem(HOTELS_KEY)) {
        const sampleHotels = [
            {
                id: 1,
                name: 'Sunset Paradise Resort',
                location: 'Miami Beach, Florida',
                price: 150,
                rating: 4.8,
                reviews: 342,
                image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=300&fit=crop',
                description: 'Luxury beachfront resort with stunning ocean views and world-class amenities.',
                amenities: ['Pool', 'Spa', 'WiFi', 'Restaurant', 'Gym'],
                rooms: 250
            },
            {
                id: 2,
                name: 'Mountain View Luxury Hotel',
                location: 'Aspen, Colorado',
                price: 220,
                rating: 4.9,
                reviews: 518,
                image: 'https://images.unsplash.com/photo-1612667491895-90a2b3e3d1d5?w=500&h=300&fit=crop',
                description: 'Alpine elegance meets modern comfort in this mountain sanctuary.',
                amenities: ['Ski Pass', 'Hot Tub', 'Fireplace', 'Restaurant', 'Concierge'],
                rooms: 180
            },
            {
                id: 3,
                name: 'Urban Chic Downtown',
                location: 'New York City, New York',
                price: 280,
                rating: 4.7,
                reviews: 892,
                image: 'https://images.unsplash.com/photo-1598631049957-c86d88200fad?w=500&h=300&fit=crop',
                description: 'Modern urban hotel in the heart of Manhattan with premium city views.',
                amenities: ['Rooftop Bar', 'Gym', 'WiFi', 'Restaurant', 'Spa'],
                rooms: 320
            },
            {
                id: 4,
                name: 'Tropical Paradise Bungalows',
                location: 'Bali, Indonesia',
                price: 95,
                rating: 4.6,
                reviews: 1200,
                image: 'https://images.unsplash.com/photo-1578683519191-a0a0da02b16d?w=500&h=300&fit=crop',
                description: 'Serene tropical retreat with traditional architecture and island charm.',
                amenities: ['Beach', 'Pool', 'Yoga', 'Restaurant', 'Spa'],
                rooms: 120
            },
            {
                id: 5,
                name: 'Historic European Palace',
                location: 'Vienna, Austria',
                price: 240,
                rating: 4.9,
                reviews: 645,
                image: 'https://images.unsplash.com/photo-1590490360182-c51d1bdc41f7?w=500&h=300&fit=crop',
                description: 'Restored 18th-century palace offering imperial luxury and elegance.',
                amenities: ['Concierge', 'Fine Dining', 'Spa', 'Library', 'Garden'],
                rooms: 95
            },
            {
                id: 6,
                name: 'Desert Oasis Luxe',
                location: 'Dubai, UAE',
                price: 310,
                rating: 5.0,
                reviews: 2100,
                image: 'https://images.unsplash.com/photo-1578683519191-a0a0da02b16d?w=500&h=300&fit=crop',
                description: 'Ultra-modern luxury hotel with lavish facilities and desert views.',
                amenities: ['Pool', 'Gym', 'Restaurant', 'Spa', 'Private Beach'],
                rooms: 400
            }
        ];
        localStorage.setItem(HOTELS_KEY, JSON.stringify(sampleHotels));
    }
}

// Show Section
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));

    // Show selected section
    document.getElementById(sectionId).classList.add('active');

    // Load data when showing specific sections
    if (sectionId === 'hotels') {
        displayHotels();
    } else if (sectionId === 'bookings') {
        displayBookings();
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Display Hotels
function displayHotels(hotelsToDisplay = null) {
    const hotelsGrid = document.getElementById('hotelsGrid');
    const hotels = hotelsToDisplay || JSON.parse(localStorage.getItem(HOTELS_KEY));

    if (!hotels || hotels.length === 0) {
        hotelsGrid.innerHTML = '<div class="empty-state"><h3>No hotels found</h3><p>Try adjusting your filters</p></div>';
        return;
    }

    hotelsGrid.innerHTML = hotels.map(hotel => `
        <div class="hotel-card">
            <img src="${hotel.image}" alt="${hotel.name}" class="hotel-image" onerror="this.src='https://via.placeholder.com/500x300?text=${hotel.name}'">
            <div class="hotel-info">
                <h3 class="hotel-name">${hotel.name}</h3>
                <p class="hotel-location">📍 ${hotel.location}</p>
                <p class="hotel-rating">
                    <span class="stars">${'⭐'.repeat(Math.floor(hotel.rating))}</span> 
                    ${hotel.rating} (${hotel.reviews} reviews)
                </p>
                <p class="hotel-description">${hotel.description}</p>
                <div class="hotel-amenities">
                    ${hotel.amenities.map(amenity => `<span class="amenity">${amenity}</span>`).join('')}
                </div>
                <p class="hotel-price">
                    $${hotel.price}<small>/night</small>
                </p>
                <button class="btn btn-primary btn-book" onclick="openBookingModal(${hotel.id}, '${hotel.name}', ${hotel.price})">
                    Book Now
                </button>
            </div>
        </div>
    `).join('');
}

// Open Booking Modal
function openBookingModal(hotelId, hotelName, hotelPrice) {
    document.getElementById('hotelId').value = hotelId;
    document.getElementById('hotelName').value = hotelName;
    document.getElementById('hotelPrice').value = hotelPrice;
    
    // Set minimum dates
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('checkInDate').min = today;
    document.getElementById('checkOutDate').min = today;
    
    // Reset form
    document.getElementById('bookingForm').reset();
    
    // Show modal
    document.getElementById('bookingModal').classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Close Booking Modal
function closeBookingModal() {
    document.getElementById('bookingModal').classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Calculate and Update Total Price
document.addEventListener('DOMContentLoaded', () => {
    const checkInInput = document.getElementById('checkInDate');
    const checkOutInput = document.getElementById('checkOutDate');
    const guestsInput = document.getElementById('guests');
    const priceInput = document.getElementById('hotelPrice');

    const updatePrice = () => {
        const checkIn = new Date(checkInInput.value);
        const checkOut = new Date(checkOutInput.value);
        const price = parseFloat(priceInput.value) || 0;

        if (checkIn && checkOut && checkIn < checkOut) {
            const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
            const total = price * nights;
            document.getElementById('totalPrice').textContent = `$${total.toFixed(2)}`;
        }
    };

    if (checkInInput) checkInInput.addEventListener('change', updatePrice);
    if (checkOutInput) checkOutInput.addEventListener('change', updatePrice);
    if (priceInput) priceInput.addEventListener('change', updatePrice);
});

// Submit Booking
function submitBooking(event) {
    event.preventDefault();

    const hotelId = document.getElementById('hotelId').value;
    const hotelName = document.getElementById('hotelName').value;
    const hotelPrice = parseFloat(document.getElementById('hotelPrice').value);
    const checkInDate = document.getElementById('checkInDate').value;
    const checkOutDate = document.getElementById('checkOutDate').value;
    const guests = document.getElementById('guests').value;
    const roomType = document.getElementById('roomType').value;

    // Validation
    if (!checkInDate || !checkOutDate || !guests || !roomType) {
        alert('Please fill in all fields');
        return;
    }

    if (new Date(checkInDate) >= new Date(checkOutDate)) {
        alert('Check-out date must be after check-in date');
        return;
    }

    // Calculate total price
    const nights = Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24));
    const totalPrice = hotelPrice * nights;

    // Create booking object
    const booking = {
        id: Date.now(),
        hotelId,
        hotelName,
        hotelPrice,
        checkInDate,
        checkOutDate,
        guests,
        roomType,
        totalPrice,
        nights,
        bookingDate: new Date().toISOString(),
        status: 'Confirmed'
    };

    // Save to localStorage
    let bookings = JSON.parse(localStorage.getItem(BOOKINGS_KEY)) || [];
    bookings.push(booking);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));

    // Show success message
    alert(`✅ Booking confirmed! Total: $${totalPrice.toFixed(2)} for ${nights} nights`);

    // Close modal and refresh
    closeBookingModal();
    displayBookings();
    showSection('bookings');
}

// Display Bookings
function displayBookings() {
    const bookingsList = document.getElementById('bookingsList');
    const bookings = JSON.parse(localStorage.getItem(BOOKINGS_KEY)) || [];

    if (bookings.length === 0) {
        bookingsList.innerHTML = `
            <div class="empty-state">
                <h3>No bookings yet</h3>
                <p>Start your journey by booking a hotel</p>
                <button class="btn btn-primary" onclick="showSection('hotels')">Browse Hotels</button>
            </div>
        `;
        return;
    }

    bookingsList.innerHTML = bookings.map(booking => `
        <div class="booking-card">
            <div class="booking-header">
                <h3 class="booking-hotel-name">${booking.hotelName}</h3>
                <span class="booking-status">${booking.status}</span>
            </div>
            <div class="booking-details">
                <div class="booking-detail">
                    <label>Check-in</label>
                    <p>${new Date(booking.checkInDate).toLocaleDateString()}</p>
                </div>
                <div class="booking-detail">
                    <label>Check-out</label>
                    <p>${new Date(booking.checkOutDate).toLocaleDateString()}</p>
                </div>
                <div class="booking-detail">
                    <label>Guests</label>
                    <p>${booking.guests} ${booking.guests > 1 ? 'guests' : 'guest'}</p>
                </div>
                <div class="booking-detail">
                    <label>Room Type</label>
                    <p>${booking.roomType}</p>
                </div>
                <div class="booking-detail">
                    <label>Duration</label>
                    <p>${booking.nights} night${booking.nights > 1 ? 's' : ''}</p>
                </div>
                <div class="booking-detail">
                    <label>Total Price</label>
                    <p style="color: var(--secondary-color); font-weight: 700;">$${booking.totalPrice.toFixed(2)}</p>
                </div>
            </div>
            <div class="booking-actions">
                <button class="btn btn-secondary" onclick="editBooking(${booking.id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteBooking(${booking.id})">Cancel</button>
            </div>
        </div>
    `).join('');
}

// Edit Booking
function editBooking(bookingId) {
    const bookings = JSON.parse(localStorage.getItem(BOOKINGS_KEY)) || [];
    const booking = bookings.find(b => b.id === bookingId);

    if (booking) {
        document.getElementById('hotelId').value = booking.hotelId;
        document.getElementById('hotelName').value = booking.hotelName;
        document.getElementById('hotelPrice').value = booking.hotelPrice;
        document.getElementById('checkInDate').value = booking.checkInDate;
        document.getElementById('checkOutDate').value = booking.checkOutDate;
        document.getElementById('guests').value = booking.guests;
        document.getElementById('roomType').value = booking.roomType;

        // Remove old booking
        deleteBooking(bookingId);

        // Open modal
        document.getElementById('bookingModal').classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

// Delete Booking
function deleteBooking(bookingId) {
    if (confirm('Are you sure you want to cancel this booking?')) {
        let bookings = JSON.parse(localStorage.getItem(BOOKINGS_KEY)) || [];
        bookings = bookings.filter(b => b.id !== bookingId);
        localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
        displayBookings();
        alert('✅ Booking cancelled successfully');
    }
}

// Filter Hotels
function filterHotels() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const maxPrice = parseFloat(document.getElementById('priceFilter').value);
    const minRating = parseFloat(document.getElementById('ratingFilter').value);

    const allHotels = JSON.parse(localStorage.getItem(HOTELS_KEY));

    const filtered = allHotels.filter(hotel => {
        const matchesSearch = hotel.name.toLowerCase().includes(searchTerm) ||
                            hotel.location.toLowerCase().includes(searchTerm);
        const matchesPrice = hotel.price <= maxPrice;
        const matchesRating = hotel.rating >= minRating;

        return matchesSearch && matchesPrice && matchesRating;
    });

    displayHotels(filtered);
}

// Reset Filters
function resetFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('priceFilter').value = 500;
    document.getElementById('priceValue').textContent = '$500';
    document.getElementById('ratingFilter').value = '0';
    displayHotels();
}

// Update price value display
document.addEventListener('DOMContentLoaded', () => {
    const priceFilter = document.getElementById('priceFilter');
    if (priceFilter) {
        priceFilter.addEventListener('input', () => {
            document.getElementById('priceValue').textContent = '$' + priceFilter.value;
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('bookingModal');
        if (event.target === modal) {
            closeBookingModal();
        }
    });

    // Initialize app
    initializeData();
});