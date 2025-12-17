// Supabase configuration
export const SUPABASE = {
  URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
};

// Application configuration
export const AppConfig = {
  site_name: 'GridBlock',
  title: 'GridBlock - Notion + Baserow + Teable',
  description: 'High-performance database with Notion-like block editing',
  locale: 'en-US',
};

// API configuration
export const APIConfig = {
  base_url: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 10000,
};