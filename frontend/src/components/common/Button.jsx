import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-heading font-medium tracking-tight rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer';

  const variants = {
    primary:
      'bg-orange hover:bg-orange-hover text-white shadow-md shadow-orange/20 hover:shadow-lg hover:shadow-orange/30 active:scale-[0.98] focus:ring-orange',
    secondary:
      'bg-ivory dark:bg-charcoal-card text-charcoal dark:text-ivory border border-sand/40 dark:border-charcoal-border hover:bg-ivory-dark dark:hover:bg-charcoal-muted focus:ring-sand active:scale-[0.98]',
    outline:
      'bg-transparent border border-orange text-orange hover:bg-orange/10 focus:ring-orange active:scale-[0.98]',
    ghost:
      'bg-transparent hover:bg-black/5 dark:hover:bg-white/5 text-charcoal dark:text-ivory focus:ring-sand',
    danger:
      'bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-500/20 active:scale-[0.98] focus:ring-red-500'
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5',
    xl: 'text-lg px-8 py-3.5 gap-3'
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
        </>
      )}
    </button>
  );
}
