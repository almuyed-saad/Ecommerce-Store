# 🛍️ Premium E‑Commerce Store (Full‑Stack)

A fully responsive, premium e‑commerce platform with a React frontend, Node.js + Express backend, and MongoDB Atlas database. The app includes user authentication, a persistent cart & wishlist, product filtering, dark mode, and a polished, animated UI.

🌐 **Live Demo:** [ecommerce-demo-saad.vercel.app](https://ecommerce-demo-saad.vercel.app)
🔗 **Backend API:** [ecommerce-store-6dlf.onrender.com/api](https://ecommerce-store-6dlf.onrender.com/api)

---

## ✨ Features

### 🎨 Design & UI
- Premium, modern, and professional interface
- Dark/Light mode toggle with persistence
- Fully responsive — optimized for mobile, tablet, and desktop
- Smooth Framer Motion animations and transitions
- Glassmorphism effects on navbar and cards

### 👤 User Authentication
- User registration & login with JWT
- Secure password hashing (bcrypt)
- Protected routes (cart, wishlist, checkout, profile)
- Persistent sessions via localStorage

### 🛒 Shopping Experience
- Product catalog with grid layout
- Full‑screen search modal with live results
- Category filters and sort options (popularity, price, rating)
- Pagination across product pages

### 🛍️ Cart & Wishlist (Database‑Backed)
- Add to cart with quantity control
- Update quantities, remove items, clear cart
- Order summary with subtotal, shipping, and tax calculation
- Free shipping on orders over $50
- Wishlist to save favorite products
- All cart & wishlist data stored per user in MongoDB

### 📄 Pages
- **Home** – Hero section, categories, featured products, testimonials
- **Shop** – Full product listing with filters and search
- **Product Details** – Detailed view with related products
- **Cart** – Complete cart management with checkout
- **Wishlist** – Manage saved products
- **About** – Brand story, mission, team, stats
- **Contact** – Contact form with FAQ accordion
- **Checkout** – Shipping form with order summary

### 🔧 Technical
- **Frontend:** React, Vite, Tailwind CSS, Framer Motion, React Router
- **Backend:** Node.js, Express, JWT authentication, bcrypt
- **Database:** MongoDB Atlas (Mongoose ODM)
- State management via React Context API (Cart, Wishlist, Theme, Auth)
- Axios for API calls with interceptors
- Toast notifications for user feedback
- Touch ripple feedback on mobile

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React | UI library |
| | Vite | Build tool |
| | Tailwind CSS | Styling |
| | Framer Motion | Animations |
| | React Router | Routing |
| | React Hook Form | Form handling |
| | React Hot Toast | Notifications |
| | Axios | API calls |
| **Backend** | Node.js | Runtime |
| | Express | Web framework |
| | JWT | Authentication tokens |
| | bcrypt | Password hashing |
| | Mongoose | ODM for MongoDB |
| **Database** | MongoDB Atlas | Cloud database |

---

## 📁 Project Structure

```
ecommerce-store/
├── backend/                         # Backend API
│   ├── config/
│   ├── middleware/
│   │   └── auth.js                  # JWT verification middleware
│   ├── models/
│   │   ├── Cart.js
│   │   ├── Order.js
│   │   ├── Product.js
│   │   ├── User.js
│   │   └── Wishlist.js
│   ├── routes/
│   │   ├── auth.js                  # Login, Register, Profile
│   │   ├── cart.js                  # Cart CRUD
│   │   ├── orders.js
│   │   ├── products.js
│   │   ├── users.js
│   │   └── wishlist.js              # Wishlist CRUD
│   ├── .env
│   ├── package.json
│   └── server.js                    # Entry point
├── public/
│   └── images/
│       └── team/
├── src/                             # Frontend React app
│   ├── api/
│   ├── assets/
│   ├── components/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── common/
│   │   ├── home/
│   │   ├── layout/
│   │   ├── product/
│   │   ├── shop/
│   │   ├── ui/
│   │   └── wishlist/
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── WishlistContext.jsx
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── vercel.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18 or higher
- npm or yarn
- MongoDB Atlas account (free tier works)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/almuyed-saad/Ecommerce-Store.git
cd Ecommerce-Store
```

2. **Install frontend dependencies**
```bash
cd ecommerce-store
npm install
```

3. **Install backend dependencies**
```bash
cd backend
npm install
```

4. **Set up environment variables**

Create a `.env` file in the `backend` folder:
```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret_key
```

5. **Run the backend**
```bash
cd backend
npm run dev
```

6. **Run the frontend** (in a separate terminal)
```bash
cd ecommerce-store
npm run dev
```

Then open **http://localhost:5173** in your browser.

### Build for Production

**Frontend:**
```bash
cd ecommerce-store
npm run build
```

**Backend:** Already ready for deployment (Render / Railway).

---

## 🚢 Deployment

### Frontend — Vercel
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → Add New Project
3. Import your repository
4. Set **Root Directory** to `ecommerce-store`
5. Add environment variable: `VITE_API_URL` = your backend URL
6. Deploy

### Backend — Render
1. Push your code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your repository
4. Set:
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && node server.js`
5. Add environment variables (`MONGO_URI`, `PORT`, `JWT_SECRET`)
6. Deploy

**Live Demo:** [ecommerce-demo-saad.vercel.app](https://ecommerce-demo-saad.vercel.app)
**Backend API:** [ecommerce-store-6dlf.onrender.com/api](https://ecommerce-store-6dlf.onrender.com/api)

---

## 📱 Responsive Breakpoints

| Device | Width | Columns |
|---|---|---|
| Mobile | < 768px | 2 |
| Tablet | 768px – 1024px | 3 |
| Desktop | > 1024px | 4 |

---

## 🎨 Color Palette

| Color | Hex | Usage |
|---|---|---|
| Purple Primary | `#8B5CF6` | Brand color, buttons |
| Purple Hover | `#7C3AED` | Button hover |
| Coral Secondary | `#F43F5E` | Accents, badges |
| Light Background | `#F8FAFC` | Light mode background |
| Dark Background | `#0A0A0A` | Dark mode background |

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👤 Author

**Almuyed Saad**

- GitHub: [@almuyed-saad](https://github.com/almuyed-saad)
- LinkedIn: Almuyed Saad
- Email: contact.almuyedsaad@gmail.com

---

## 🙏 Acknowledgements

- [FakeStoreAPI](https://fakestoreapi.com/) — Product data
- [Unsplash](https://unsplash.com/) — Images
- [Font Awesome](https://fontawesome.com/) — Icons

---

⭐ If you found this project helpful, consider giving it a star on GitHub!
