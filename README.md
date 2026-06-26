# 🛍️ Premium E-Commerce Store

A fully responsive, premium e-commerce web application built with React, Vite, Tailwind CSS, and Framer Motion. This project showcases a complete online shopping experience with dark/light mode, cart functionality, wishlist, product filtering, and a polished, animated UI.

🌐 **Live Demo:** [ecommerce-demo-saad.vercel.app](https://ecommerce-demo-saad.vercel.app/)

---

## ✨ Features

### 🎨 Design & UI
- Premium, modern, and professional interface
- Dark/Light mode toggle with persistence
- Fully responsive — optimized for mobile, tablet, and desktop
- Smooth Framer Motion animations and transitions
- Glassmorphism effects on navbar and cards

### 🛒 Shopping Experience
- Product catalog with grid layout
- Full-screen search modal with live results
- Category filters and sort options (popularity, price, rating)
- Pagination across product pages

### 🛍️ Cart & Wishlist
- Add to cart with quantity control
- Update quantities, remove items, clear cart
- Order summary with subtotal, shipping, and tax calculation
- Free shipping on orders over $50
- Wishlist to save favorite products

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
- State management via React Context API (Cart, Wishlist, Theme)
- LocalStorage persistence for cart and wishlist
- Mobile-first responsive design
- Toast notifications for user feedback
- Touch ripple feedback on mobile

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [React](https://reactjs.org/) | UI library |
| [Vite](https://vitejs.dev/) | Build tool |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [React Router](https://reactrouter.com/) | Routing |
| [React Hook Form](https://react-hook-form.com/) | Form handling |
| [React Hot Toast](https://react-hot-toast.com/) | Notifications |
| [React Icons](https://react-icons.github.io/react-icons/) | Icons |
| [Axios](https://axios-http.com/) | API calls |

---

## 📁 Project Structure

```
ecommerce-store/
├── public/
│   └── images/
│       └── team/
├── src/
│   ├── api/
│   ├── assets/
│   │   └── styles/
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
│   ├── data/
│   ├── hooks/
│   ├── pages/
│   ├── routes/
│   ├── security/
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm or yarn

### Installation

```bash
git clone https://github.com/almuyed-saad/Ecommerce-Store.git
cd Ecommerce-Store/ecommerce-store
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

### Build for Production

```bash
npm run build
```

Build output will be generated in the `dist/` folder.

---

## 🚢 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your repository
4. Set **Root Directory** to `ecommerce-store`
5. Deploy

**Live Demo:** [ecommerce-demo-saad.vercel.app](https://ecommerce-demo-saad.vercel.app/)

### Netlify
```bash
npm run build
# Drag and drop the dist/ folder into Netlify
```

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
- LinkedIn: [Almuyed Saad](https://www.linkedin.com/in/almuyed-saad/)
- Email: contact.almuyedsaad@gmail.com

---

## 🙏 Acknowledgements

- [FakeStoreAPI](https://fakestoreapi.com/) — Product data
- [Unsplash](https://unsplash.com/) — Images
- [Font Awesome](https://fontawesome.com/) — Icons

---

⭐ If you found this project helpful, consider giving it a star on GitHub!
