// ───────────────────────── tailwind.config.ts ─────────────────────────
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ---------- Cores puxando das CSS vars ---------- */
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        info: "hsl(var(--info))",
      },

      /* ---------- Breakpoints personalizados ---------- */
      screens: {
        xxs: '320px',
        xs: '400px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },

      /* ---------- Espaçamentos extras ---------- */
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
        72: '18rem',
      },

      /* ---------- Gradientes pré-definidos ---------- */
      backgroundImage: {
        'hero-gradient': 'linear-gradient(90deg, #7f5af0 0%, #5eead4 100%)',
        'glass-dark': 'linear-gradient(120deg, rgba(32,32,32,0.6), rgba(48,48,48,0.6))',
      },

      /* ---------- Z-index customizado ---------- */
      zIndex: {
        1: '1',
        5: '5',
        60: '60',
        99: '99',
        999: '999',
      },

      /* ---------- Utilitários para blur/glass ---------- */
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '16px',
      },

      /* ---------- Raio de borda global ---------- */
      borderRadius: {
        lg: "var(--radius)",            // 1 rem
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      /* ---------- Sombreamento utilitário ---------- */
      boxShadow: {
        soft: "0 4px 12px rgba(0,0,0,.06)",
        deep: "0 8px 24px rgba(0,0,0,.08)",
      },

      /* ---------- Animações do Radix Accordion ---------- */
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },

      /* ---------- Família de fontes ---------- */
      fontFamily: {
        "geist-sans": [
          "var(--font-geist-sans)",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
        "geist-mono": [
          "var(--font-geist-mono)",
          "Fira Mono",
          "Menlo",
          "monospace",
        ],
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    // require("@tailwindcss/aspect-ratio"), // Removido pois a dependência não existe mais
  ],
} satisfies Config;
