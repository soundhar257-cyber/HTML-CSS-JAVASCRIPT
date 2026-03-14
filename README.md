# 🏨 HotelHub - Interactive Hotel Booking Application

A modern, interactive hotel booking web application built with HTML, CSS, and JavaScript. No backend or database required - all data is stored locally using browser LocalStorage.

## ✨ Features

### 🏨 Hotel Management
- Browse luxury hotels with detailed information
- View high-quality hotel images
- Check amenities, ratings, and reviews
- Search hotels by name or location
- Filter by price range and minimum rating

### 📅 Booking System
- Easy-to-use booking form
- Select check-in and check-out dates
- Choose number of guests and room type
- Real-time price calculation
- Automatic duration calculation

### 💾 Booking Management
- View all your bookings
- Edit existing bookings
- Cancel bookings
- Track booking status
- Persistent storage using LocalStorage

### 🎨 User Interface
- Bright, modern design with vibrant colors
- Smooth animations and transitions
- Responsive design for all devices
- Interactive cards with hover effects
- Professional gradient backgrounds

## 🚀 Getting Started

### Requirements
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No server or database setup needed

### Installation

1. Clone or download the project files:
   ```
   git clone https://github.com/soundhar257-cyber/hotel-booking-app.git
   ```

2. Navigate to the project directory:
   ```
   cd hotel-booking-app
   ```

3. Open `index.html` in your web browser

## 📁 Project Structure

```
hotel-booking-app/
├── index.html      # Main HTML file with structure
├── styles.css      # Styling and responsive design
├── script.js       # JavaScript functionality
└── README.md       # Documentation
```

## 🎯 How to Use

### Browsing Hotels
1. Click "Browse Hotels" in the navigation bar
2. View all available hotels in the grid
3. Use search to find hotels by name or location
4. Filter by price range or rating
5. Click "Apply Filters" to update results

### Making a Booking
1. Click "Book Now" on any hotel card
2. Select your check-in date
3. Select your check-out date
4. Enter number of guests
5. Choose a room type
6. Review the total price
7. Click "Complete Booking"

### Managing Your Bookings
1. Click "My Bookings" in the navigation
2. View all your confirmed bookings
3. Click "Edit" to modify a booking
4. Click "Cancel" to remove a booking

## 💾 Data Storage

All data is stored in the browser's LocalStorage:

### Hotels Data Structure
```javascript
{
  id: 1,
  name: "Hotel Name",
  location: "City, Country",
  price: 150,
  rating: 4.8,
  reviews: 342,
  image: "image-url",
  description: "Hotel description",
  amenities: ["WiFi", "Pool", "Spa"],
  rooms: 250
}
```

### Bookings Data Structure
```javascript
{
  id: 1647382841000,
  hotelId: 1,
  hotelName: "Hotel Name",
  hotelPrice: 150,
  checkInDate: "2026-03-15",
  checkOutDate: "2026-03-17",
  guests: 2,
  roomType: "Double Room",
  totalPrice: 300,
  nights: 2,
  bookingDate: "2026-03-14T10:30:00.000Z",
  status: "Confirmed"
}
```

## 🎨 Color Scheme

- **Primary**: Cyan (#00d4ff) - Vibrant and modern
- **Secondary**: Orange (#ff6b35) - Warm and inviting
- **Accent**: Green (#04a777) - Fresh and calming
- **Background**: Light Blue (#f0f9ff) - Clean and spacious

## 🌐 Responsive Design

The application is fully responsive and works on:
- 📱 Mobile devices (320px and above)
- 📱 Tablets (768px and above)
- 💻 Desktops (1024px and above)

## 🔧 Customization

### Add More Hotels
Edit the `initializeData()` function in `script.js` and add hotel objects to the `sampleHotels` array.

### Change Colors
Modify the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #00d4ff;
    --secondary-color: #ff6b35;
    --accent-color: #04a777;
    /* ... more colors ... */
}
```

### Modify Hotel Images
Replace image URLs in the hotel objects with your own image links.

## 🚀 Features to Add

- User authentication and profiles
- Email confirmation notifications
- Payment integration
- Backend database
- Admin panel for managing hotels
- Customer reviews and ratings system
- Wishlist functionality
- Multiple currency support

## 📄 License

This project is open source and available for personal and commercial use.

## 👨‍💻 Author

Created by soundhar257-cyber

---

**Enjoy booking your dream hotel! 🌍✈️🏨**