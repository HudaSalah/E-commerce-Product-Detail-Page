# Product Detail Page

E-commerce product page built for the ElegantSoft frontend task.

**Live demo:** https://extraordinary-fox-cad57b.netlify.app/

**Live demo:** https://hudasalah.github.io/E-commerce-Product-Detail-Page/

## Tech stack

React 19, TypeScript, Vite, Tailwind CSS v4, Zustand + Immer, TanStack Query, Vitest + Testing Library.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm test         # unit and component tests
npm run build    # production build
```

Requires Node 20+. No environment variables are needed.

## Project structure

```
src/
  api/         fetch functions
  hooks/       useProduct (TanStack Query)
  store/       cart store (Zustand + Immer + persist)
  lib/         pure helpers: variant matching, pricing, images, formatting
  components/  gallery, product, cart, layout
  pages/       ProductPage
  test/        test setup and fixtures
```

## API integration

- Endpoint: `https://api.easy-orders.net/api/v1/products/slug/clear-theme/Sneakers12?join=reviews`
- The request lives in `src/api/product.ts` and is consumed through the `useProduct` hook.
- TanStack Query caches the product for 5 minutes and retries once on failure. The page has loading and error states with a retry button.

## State management

- Server state (the product) lives in TanStack Query: caching, retry, loading and error states.
- Client state (the cart) lives in a Zustand store with Immer and the persist middleware.
- Only `items` is persisted (`partialize`), so the drawer never reopens after a refresh.
- Count and total are selectors outside the store, so components re-render only when those values change.
- Selection, quantity and gallery index are local component state. The gallery index is lifted to the page so choosing a color updates the main image.

## Components

| Component | Props | Purpose |
|---|---|---|
| `ImageGallery` | `images`, `alt`, `activeIndex`, `onChange` | Main image with zoom, arrows, share and thumbnails |
| `ProductInfo` | `product`, `onImageChange?` | Title, price, description, options, add to cart |
| `VariationSelector` | `variation`, `selected?`, `onSelect`, `isAvailable` | One option group (color or size) |
| `QuantitySelector` | `value`, `onChange`, `min?`, `max?` | Reused on the page and in the cart |
| `PriceTag` | `price`, `salePrice` | Price with optional strikethrough |
| `CartDrawer` / `CartButton` | none (read the store) | Cart panel and header badge |

## Design and data decisions

### 1. Linking selections to variants by name

- **Problem:** Each combination of color and size corresponds to a specific variant (e.g. "brown", "40"). I need to identify which variant the user has selected.
- **Observation:** The API links these using names (e.g. `"color": "brown"`) rather than IDs.
- **Decision:** I store the selection as an object, `{ color: 'brown', size: '40' }`, and search for the variant that matches these names.

### 2. Stock

- **Problem:** The API reports a quantity of zero for all variants.
- **Observation:** `track_stock` is `false`, which means the store does not track inventory.
- **Decision:** A quantity of zero does not mean "out of stock". A product is available unless `track_stock` is `true` and the quantity is zero.

### 3. Pricing

- **Problem:** The product is discounted (from 190 to 160), yet each variant shows a sale price of zero.
- **Decision:** If a variant does not have its own sale price, it inherits the product-level one, so the price stays 160.

### 4. Colors

- **Problem:** The design requires color swatches, but the API provides only a color name and an image, with no color code.
- **Decision:** I created a lookup table that maps color names to color codes. If a color is not in the table, the image is displayed instead.
- **Limitation:** Any new color must be added to the table manually. Ideally, the API should return the color code.

### 5. Images

- **Problem:** The design uses portrait image frames, while the API provides square images.
- **Decision:** I kept the portrait frame from the design and display the full image inside it without cropping. The white background of the image blends into the frame color.

### 6. Differences between the design and the task

- **In the task but not in the design:** stock status and quantity selector. I included them because the task lists them as required features.
- **In the design but not in the API:** sold count, rating and related products. I left them out to avoid displaying dummy data.

### 7. Description

- **Problem:** The description is HTML and contains many empty paragraphs.
- **Decision:** I remove the empty paragraphs and show the first 180 characters as plain text with a "See More" button. Once expanded, the full HTML is displayed.

## Testing

- Store: add, merge, quantity cap, update, remove, total.
- Variant helpers: matching, availability, effective price, default selection.
- Component: adding the selected variant to the cart and showing the discounted price in `ProductInfo`.


## Deployment

The app is a static build with no server or environment variables. Run `npm run build` and deploy the `dist/` folder to any static host. The live demo is hosted on Netlify.

## Not done / next steps

- E2E tests (Playwright) for the full add-to-cart flow.
- Wishlist is UI only and is not persisted.
- Sanitizing the description HTML with DOMPurify.
- Size chart and delivery terms are placeholder links.