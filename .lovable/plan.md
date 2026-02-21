

# Pharmacy Management Web Application

A modern, full-stack pharmacy management system with a customer-facing website and an admin dashboard, using a **teal & white** professional healthcare theme.

## Phase 1: Foundation & Medicine Catalog

### Database Setup (Lovable Cloud)
- **Medicines table**: name, generic_name, brand, description, usage, dosage, side_effects, warnings, precautions, ingredients, manufacturer, price, quantity, minimum_quantity, expiry_date, category, image_url, prescription_required
- **Categories table**: id, name, icon
- **Users & Authentication**: Supabase Auth with email/password signup and login
- **User roles table**: admin, pharmacist, user roles with secure role-checking function

### Customer Website - Core Pages
1. **Home Page** — Hero section with pharmacy intro, search bar, featured medicines carousel, category cards (Pain Relief, Antibiotics, Vitamins, Allergy, etc.)
2. **Medicine Listing Page** — Grid of medicine cards showing image, name, price, availability badge, category tag, and "View Details" button. Includes filters for category, price range, brand, and availability
3. **Medicine Detail Page** — Full medicine information: name, generic name, brand, description, usage/purpose, dosage instructions, side effects, warnings, precautions, ingredients, manufacturer, price, stock status, expiry date, prescription badge, and medicine image
4. **Search System** — Search by medicine name or disease, with real-time results and category/price/brand filters

### User Authentication
- Signup and Login pages
- User profile page with basic info management
- Protected routes for authenticated features

## Phase 2: Admin Dashboard

### Dashboard Layout
- Sidebar navigation with teal theme
- Collapsible menu with icons

### Dashboard Overview
- Summary cards: Total Medicines, Low Stock Alerts, Expiring Soon, Total Users
- Analytics charts: Stock levels, category distribution, inventory value

### Medicine Management (CRUD)
- Add/Edit medicine form with all fields including image upload
- Delete medicine with confirmation
- Table view with search, sort, and pagination
- Set minimum stock levels and expiry dates

### Inventory & Stock Management
- Current stock tracking with visual indicators (green/yellow/red)
- Low stock alerts when quantity falls below minimum
- Expiring soon notifications (within 30/60/90 days)
- Expired medicine alerts

### User Management
- View all registered users
- Assign/manage roles (admin, pharmacist, user)

## Phase 3: Advanced Features

### Medicine Requirement Calculator
- Patient inputs: age, weight, dosage frequency, duration in days
- System calculates: total tablets needed, total quantity required
- Clean form with instant results display

### Disease-to-Medicine Recommendations
- Disease search (Fever, Allergy, Cold, etc.)
- Mapped recommended medicines for common conditions
- Links to medicine detail pages

### Cart & Order System
- Add to cart functionality for customers
- Cart page with quantity adjustment and total
- Order submission with status tracking
- Prescription upload option for prescription-required medicines

### Admin Order Management
- View all orders with status filters
- Update order status (Pending → Processing → Completed/Cancelled)
- Order details view

## Phase 4: Reports & Polish

### Reports & Analytics (Admin)
- Stock usage report
- Inventory report with export capability
- Sales/orders analytics with charts (using Recharts)

### Final Polish
- Mobile-responsive refinements across all pages
- Form validation on all inputs
- Error handling and loading states
- Toast notifications for actions

## Design Direction
- **Color palette**: Teal primary (#0D9488), white backgrounds, light gray accents
- **Style**: Clean cards, modern tables, professional healthcare feel
- **Typography**: Clear hierarchy with readable fonts
- **Layout**: Responsive grid, sidebar admin navigation, mobile-friendly

