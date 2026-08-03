# 🌸 Pooja Handmade Art — E-Commerce Assessment Submission

> **Web Development Intern Assessment Submission** for Kanishka Pandey & Team @ Pooja Handmade Art.  
> 📖 **Full Technical Submission & Change Rationale**: See [SUBMISSION_README.md](./SUBMISSION_README.md) for architectural details, feature breakdowns, and evaluation criteria alignment.

---

## 🚀 Quick Start (Local Setup)

First, install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to test all implemented features live.

### Verify Production Build
```bash
npm run build
```
*(Verified: 0 TypeScript/Next.js errors across 20/20 static and dynamic routes).*

---

## 🛠️ Key Improvements Implemented

1. **Advanced Product Filtering & Sorting (Task 1)**: Category, Price Brackets, Color Swatches, In-Stock Toggle, Active Filter Chips bar with individual dismissal, and 2-way URL search query parameter synchronization.
2. **Instant Search Modal with Keyboard Navigation (Task 2)**: Global search modal triggered via `/` key, WAI-ARIA `ArrowUp`/`ArrowDown`/`Enter`/`Esc` keyboard focus, search query text highlighting, and `localStorage` recent search history.
3. **Shimmer Skeleton Loading States (Task 5)**: Custom shimmer placeholders (`ProductCardSkeleton` & `FilterSidebarSkeleton`) preventing Cumulative Layout Shift (CLS) during state transitions.
4. **Product UI Card Redesign (Task 8)**: Equal-height grid mechanics (`h-full flex flex-col justify-between`), high-contrast badge text (`#3d2b1f`), and quick Add-to-Cart hover overlays.
5. **Official Brand Vector SVG Icons & Layout Polish (Task 9)**: Replaced emoji placeholders with official vector SVG logos for Instagram, Facebook, and YouTube across Footer, Contact Page, Instagram Section, and About Page; aligned Hero section layout and Contact form cards.

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
