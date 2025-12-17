# GridBlock

GridBlock is a high-performance database application that combines the high-performance database feel of Baserow, the sleek, developer-centric aesthetic of Teable, and the free-flow content capability of Notion.

## Features

- High-performance database capabilities
- Sleek, developer-centric dark mode UI
- Free-flow content editing similar to Notion
- Responsive grid interface

## Design Philosophy (The "Teable" Look)

Teable and modern dark-mode apps rely on a specific aesthetic:

- **Backgrounds**: Not just black, but layered shades of distinct grays (Zinc/Slate in Tailwind).
- **Borders**: Subtle, 1px borders everywhere (`border-white/10`) to define structure without heavy shadows.
- **Accents**: Neon/Electric colors (Purple, Lime, or Blue) for active states.
- **Typography**: Monospace fonts for data (JetBrains Mono) and Sans for UI (Inter).

## Tech Stack (The "Baserow" Speed)

To keep it lightweight but powerful:

- **Framework**: Next.js 14+ (App Router) - Fast, server-side rendering.
- **Styling**: Tailwind CSS - Minimal overhead.
- **UI Components**: Shadcn/UI - It copies code into your project rather than a heavy library.
- **Database/State**: TanStack Query (React Query) + Supabase (PostgreSQL).
- **The "Notion" Block Engine**: Tiptap (Headless editor) or Novel (Pre-configured Notion-style editor).
- **The "Grid" Engine**: TanStack Table (Headless UI for the database view).

## Roadmap

1. **Phase 1**: Basic grid and block editor setup
2. **Phase 2**: Database integration with Supabase
3. **Phase 3**: Advanced styling and theming options
4. **Phase 4**: Collaboration features
5. **Phase 5**: Extensions and plugins

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/gridblock.git
   cd gridblock
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   
   Then fill in your Supabase credentials and other required environment variables.

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
├── app/                  # Next.js app router pages
│   ├── api/             # API routes
│   ├── blocks/          # Block editor components
│   └── globals.css      # Global styles
├── components/          # Reusable UI components
├── lib/                 # Utility functions and services
├── public/              # Static assets
└── README.md
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)