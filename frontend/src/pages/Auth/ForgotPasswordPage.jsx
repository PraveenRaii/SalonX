import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import { Scissors, Mail, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    addToast({
      title: 'Reset Link Dispatched',
      message: `Password reset instructions sent to ${email}`,
      type: 'success'
    });
  };

  return (
    <div className="min-h-screen bg-ivory dark:bg-charcoal text-charcoal dark:text-ivory py-16 flex items-center justify-center px-4 transition-colors">
      <div className="w-full max-w-md">
        
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-charcoal dark:bg-ivory text-orange flex items-center justify-center shadow-md">
              <Scissors className="w-6 h-6 stroke-[2.2] transform -rotate-45" />
            </div>
            <span className="font-heading font-extrabold text-3xl tracking-tight text-charcoal dark:text-ivory">
              Salon<span className="text-orange">X</span>
            </span>
          </Link>
          <h2 className="font-heading font-extrabold text-2xl text-charcoal dark:text-ivory">
            Reset Password
          </h2>
          <p className="text-xs text-sand mt-1">
            We will send you a secure verification link to regain access.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-ivory-light dark:bg-charcoal-card border border-sand/40 dark:border-charcoal-border shadow-xl">
          {submitted ? (
            <div className="text-center space-y-4 py-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h4 className="font-heading font-bold text-lg text-charcoal dark:text-ivory">Check Your Inbox</h4>
              <p className="text-xs text-sand">
                We have emailed a reset link to <strong className="text-charcoal dark:text-ivory">{email}</strong>.
              </p>
              <Link
                to="/auth/login"
                className="inline-flex items-center gap-2 text-xs font-bold text-orange hover:underline pt-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Sign In</span>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-heading font-bold text-sand uppercase tracking-wider block mb-1">
                  Your Account Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-sand absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full bg-ivory dark:bg-charcoal border border-sand/30 dark:border-charcoal-border pl-10 pr-4 py-2.5 rounded-xl text-sm text-charcoal dark:text-ivory focus:outline-none focus:border-orange"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-orange hover:bg-orange-hover text-white font-heading font-bold text-sm shadow-md shadow-orange/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Send Reset Link</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2">
                <Link to="/auth/login" className="text-xs text-sand hover:text-orange flex items-center justify-center gap-1">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
