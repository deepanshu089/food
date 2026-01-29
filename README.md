
# Crave - Order Management System

A modern, responsive food delivery application built with Next.js 15, Tailwind CSS v4, and Framer Motion.

## Features

- **Menu Display**: Browse a curated list of food items with images and descriptions.
- **Cart Management**: Add items, adjust quantities, and manage your cart state.
- **Order Placement**: Simple checkout process to place your order.
- **Real-time Order Tracking**: Track your order status from "Received" to "Delivered" with simulated real-time updates.
- **Responsive Design**: Mobile-first design that works beautifully on all devices.
- **Modern UI/UX**: Smooth animations and transitions using Framer Motion.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Testing**: [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd assignment
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Testing

Run the test suite with:

```bash
npm test
```

This project uses Vitest for unit and integration testing of API routes and components.

## Architecture

- **`src/app`**: Next.js App Router pages and API routes.
- **`src/components`**: Reusable UI components (Navbar, MenuItemCard, etc.).
- **`src/context`**: React Context for global state management (CartContext).
- **`src/lib`**: Utility functions and shared types.
- **`src/lib/store.ts`**: In-memory data store for the assignment (simulating a database).

## Design Choices

- **In-Memory Store**: For the purpose of this assessment, a simple in-memory array is used to store orders. In a production app, this would be replaced by a database (PostgreSQL/MongoDB).
- **Tailwind v4**: Utilized the latest alpha/beta of Tailwind for zero-config CSS.
- **Client-Side Simulation**: Order status updates are simulated using `setTimeout` in the backend and polled by the frontend.

## License

MIT
