import React from 'react';
import { Check } from 'lucide-react';

export default function BookingStepIndicator({ currentStep, steps, onStepClick }) {
  return (
    <div className="w-full py-4 mb-6">
      <div className="flex items-center justify-between relative max-w-3xl mx-auto px-2">
        
        {/* Background connector line */}
        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-sand/30 dark:bg-charcoal-border -z-0" />

        {steps.map((step, idx) => {
          const stepNumber = idx + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div
              key={step.id}
              onClick={() => isCompleted && onStepClick && onStepClick(stepNumber)}
              className={`relative z-10 flex flex-col items-center group ${
                isCompleted ? 'cursor-pointer' : ''
              }`}
            >
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-heading font-bold text-xs sm:text-sm transition-all duration-300 shadow-sm ${
                  isCompleted
                    ? 'bg-emerald-600 text-white'
                    : isCurrent
                    ? 'bg-orange text-white ring-4 ring-orange/20 scale-105'
                    : 'bg-ivory dark:bg-charcoal-card border-2 border-sand/40 dark:border-charcoal-border text-sand'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : stepNumber}
              </div>

              <span
                className={`mt-2 text-[10px] sm:text-xs font-heading font-medium tracking-tight whitespace-nowrap transition-colors ${
                  isCurrent
                    ? 'text-orange font-bold'
                    : isCompleted
                    ? 'text-charcoal dark:text-ivory'
                    : 'text-sand'
                }`}
              >
                {step.title}
              </span>
            </div>
          );
        })}

      </div>
    </div>
  );
}
