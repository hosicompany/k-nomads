# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

K-NOMADS is a Next.js application for digital nomads in Korea, providing city information, coworking spaces, and community features. The platform is bilingual (Korean/English) and focuses on helping digital nomads find and navigate Korean cities.

## Key Commands

### Development
```bash
cd k-nomads
npm run dev          # Start development server with Turbopack
npm run build        # Build for production with Turbopack
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Tech Stack

- **Framework**: Next.js 15.5.4 (App Router)
- **React**: 19.1.0
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS v4 with PostCSS
- **State Management**: Zustand with persist middleware
- **Backend**: Supabase (authentication & database)
- **Animations**: Framer Motion
- **Build Tool**: Turbopack
- **Linting**: ESLint with Next.js config

## Architecture

### Directory Structure
```
k-nomads/
├── app/                        # Next.js App Router pages
│   ├── cities/[slug]/          # Dynamic city detail pages
│   ├── events/[id]/            # Dynamic event detail pages
│   ├── community/              # Community section with event filtering
│   ├── compare/                # City comparison page
│   ├── guide/                  # Guide pages
│   ├── login/                  # Authentication
│   ├── register/
│   ├── sitemap.ts              # Dynamic sitemap generation
│   ├── robots.ts               # robots.txt configuration
│   └── layout.tsx              # Root layout with Header/Footer
├── components/
│   ├── accessibility/          # SkipLink for WCAG compliance
│   ├── animations/             # Framer Motion wrappers
│   ├── city/                   # City-specific components
│   ├── compare/                # CompareBar, comparison UI
│   ├── events/                 # Event cards, filters, registration
│   ├── filters/                # Search and filter components
│   ├── home/                   # Homepage sections
│   ├── layout/                 # Header, Footer, MobileMenu
│   ├── reviews/                # Review form, list, star rating
│   └── ui/                     # Reusable UI components (Button, ScrollToTop)
├── hooks/
│   ├── useFilterParams.ts      # City filter URL state management
│   ├── useEventFilterParams.ts # Event filter URL state management
│   └── useKeyboardShortcuts.ts # Keyboard shortcut handler
├── lib/
│   ├── data.ts                 # Mock data (cities, events, users, reviews)
│   ├── filters.ts              # Filter logic for cities and events
│   ├── animations.ts           # Framer Motion animation configs
│   └── supabase/               # Supabase client/server/middleware setup
├── store/                      # Zustand stores with localStorage persistence
│   ├── useFavoritesStore.ts    # Favorite cities
│   ├── useCompareStore.ts      # City comparison (max 3)
│   ├── useRecentStore.ts       # Recently viewed cities (max 10)
│   ├── useReviewStore.ts       # User reviews
│   ├── useCommentStore.ts      # Review comments
│   └── useBookmarkStore.ts     # Event bookmarks
├── types/
│   ├── index.ts                # Core types (City, Review, Event, User, Comment)
│   └── filters.ts              # Filter types (FilterState, EventFilterState)
└── middleware.ts               # Supabase session management
```

### State Management Pattern

**Zustand Stores** - All stores use the `persist` middleware for localStorage persistence:
- `useFavoritesStore`: Toggle favorite cities
- `useCompareStore`: Add/remove cities for comparison (max 3, with `isFull()` check)
- `useRecentStore`: Auto-track visited cities (max 10, FIFO queue)
- `useReviewStore`: User-submitted reviews with helpful voting
- `useCommentStore`: Comments on reviews
- `useBookmarkStore`: Bookmark events

Example pattern:
```typescript
export const useExampleStore = create<State>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => ({ items: [...state.items, item] })),
      // ... other actions
    }),
    { name: 'k-nomads-example' }
  )
);
```

### Filter Architecture

**URL-based Filter State** - Filters are stored in URL query parameters for shareability:
- `useFilterParams()`: Manages city filters (search, cost, speed, weather, sort)
- `useEventFilterParams()`: Manages event filters (search, type, cityId, dateFilter)
- Filter functions in `lib/filters.ts`: `applyFilters()`, `applyEventFilters()`

### Data Model

TypeScript interfaces in `types/index.ts`:
- **City**: Core city data with ratings breakdown, cost of living range, internet speed, weather
- **Event**: Community events with location, type (meetup/workshop/networking), capacity
- **Review**: User reviews with star rating, title, content, images, helpful votes
- **Comment**: Review comments with parentId for nested replies (max depth 2)
- **User**: User profiles with stats (reviewCount, eventCount)

Mock data in `lib/data.ts`:
- `cities[]`: 5 cities (Jeju, Busan, Gangneung, Gyeongju, Jeonju)
- `events[]`: 5 events with organizer info
- `users[]`: 5 sample users
- `reviews[]`: 4 sample reviews
- `comments[]`: 4 sample comments

### Authentication & Database

- Supabase integration with client (`lib/supabase/client.ts`) and server (`lib/supabase/server.ts`) utilities
- Session management handled by Next.js middleware (`middleware.ts`)
- Middleware configured to exclude static assets and images

### Accessibility (WCAG 2.1 AA)

- **Skip Link**: Press Tab on any page to reveal "본문으로 바로가기" link
- **Keyboard Navigation**:
  - Tab/Shift+Tab to navigate
  - `/` key to focus search input
  - Esc to close modals
- **ARIA**: Semantic HTML with proper roles (banner, navigation, main, contentinfo)
- **Focus Styles**: 2px blue outline on focus-visible, 3px in high-contrast mode
- **Screen Reader**: sr-only class for visually hidden content

### Performance & SEO

- **Image Optimization**: AVIF/WebP formats, remote patterns configured
- **Metadata**: Dynamic generateMetadata for all city and event pages
- **Static Generation**: generateStaticParams for cities and events
- **Sitemap**: Dynamic sitemap at `/sitemap.xml` with all routes
- **Robots.txt**: Generated at `/robots.txt`
- **Font Optimization**: Geist fonts with display: swap

## Development Notes

- **App Router**: Uses Next.js 15 App Router (not Pages Router)
- **Turbopack**: Enabled for dev and build (--turbopack flag)
- **TypeScript**: Strict mode enabled, worktree folders excluded in tsconfig.json
- **ESLint**: Extends next/core-web-vitals and next/typescript
- **Suspense**: Search params usage wrapped in Suspense boundaries
- **Server vs Client**:
  - City/Event detail pages are Server Components
  - Client components handle interactivity (favorites, filters, forms)
  - Pattern: Create `*Client.tsx` wrappers for server pages needing client features

## Important Patterns

### Server/Client Component Separation
```typescript
// app/cities/[slug]/page.tsx (Server Component)
export default async function CityDetailPage({ params }) {
  const { slug } = await params;
  const city = cities.find((c) => c.slug === slug);

  return (
    <>
      {/* Static content rendered server-side */}
      <CityDetailClient city={city} /> {/* Client wrapper for interactivity */}
    </>
  );
}

// components/city/CityDetailClient.tsx (Client Component)
'use client';
export default function CityDetailClient({ city }) {
  // Client-side features: favorites, share, recent tracking
}
```

### Form Validation Pattern
All forms follow this pattern:
- Controlled inputs with useState
- Client-side validation before submit
- Error messages with role="alert" for screen readers
- Required fields marked with aria-required
- Invalid fields marked with aria-invalid

### Modal Pattern
Modals use Framer Motion's AnimatePresence:
- Fixed overlay with backdrop-blur
- Click outside or Esc to close
- Focus trap (handled by browser's modal behavior)
- Success state shown before auto-close

## Project Status

All 7 phases from SPEC.md are complete:
1. ✅ Core UI/UX improvements and responsive design
2. ✅ Search and filtering functionality
3. ✅ User interactions and animations (Framer Motion)
4. ✅ Performance optimization and SEO
5. ✅ Advanced features (favorites, comparison, recent, share)
6. ✅ Community features (events, reviews, comments)
7. ✅ Accessibility and internationalization foundation

## Path Aliases

Uses `@/*` for imports mapping to project root (configured in `tsconfig.json`)

## Styling Approach

- Tailwind CSS v4 with custom PostCSS plugin (`@tailwindcss/postcss`)
- Custom fonts: Geist Sans and Geist Mono from next/font
- Primary language: Korean (lang="ko" in root layout)
- Focus styles in globals.css for accessibility
- Responsive breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
