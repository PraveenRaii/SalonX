import React from 'react';

export function Badge({ children, variant = 'default', size = 'sm', className = '' }) {
  const variants = {
    default: 'bg-sand/20 dark:bg-charcoal-border text-charcoal dark:text-ivory border border-sand/30 dark:border-charcoal-border',
    orange: 'bg-orange/15 text-orange border border-orange/30',
    success: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30',
    warning: 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30',
    dark: 'bg-charcoal text-ivory border border-charcoal-border dark:bg-ivory dark:text-charcoal'
  };

  const sizes = {
    xs: 'text-[10px] px-2 py-0.5 font-medium',
    sm: 'text-xs px-2.5 py-1 font-medium',
    md: 'text-sm px-3 py-1 font-medium'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full tracking-wide ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
}

export default Badge;
