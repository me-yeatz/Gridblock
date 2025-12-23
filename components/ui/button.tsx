'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props
  }, ref) => {
    const baseStyles = `
      inline-flex items-center justify-center gap-2
      font-medium transition-all duration-300
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent
      disabled:opacity-50 disabled:cursor-not-allowed
      rounded-xl
      backdrop-blur-xl
    `;

    const variants = {
      primary: `
        glass text-white
        accent-border
        glow-strong
        hover:glass-strong hover:accent-border
        focus:ring-[#7A4854]/50
        hover:scale-105
        active:scale-100
      `,
      secondary: `
        glass-light accent-text
        accent-border
        glow-rose
        hover:glass hover:glow hover:text-white
        hover:accent-border
        focus:ring-[#EDC5BB]/30
        hover:scale-105
        active:scale-100
      `,
      ghost: `
        bg-transparent text-gray-300
        border border-transparent
        hover:text-white hover:glass-light
        focus:ring-[#385F8C]/20
      `,
      danger: `
        glass text-red-300
        border border-red-500/50
        shadow-[0_0_20px_rgba(239,68,68,0.3)]
        hover:bg-red-500/20 hover:text-red-200
        hover:border-red-400/70
        focus:ring-red-500/50
        hover:scale-105
        active:scale-100
      `,
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : leftIcon ? (
          leftIcon
        ) : null}
        {children}
        {rightIcon && !isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps };
