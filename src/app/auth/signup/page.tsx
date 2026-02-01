'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

function SignupForm() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (!acceptTerms) {
      setError('Please accept the Terms & Conditions');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone,
            role: 'client',
          },
        },
      });

      if (error) {
        setError(error.message);
        return;
      }

      if (data.user) {
        router.push('/client/dashboard');
        router.refresh();
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.875rem 1rem',
    backgroundColor: '#042d56',
    border: '1px solid #064578',
    borderRadius: '0.375rem',
    color: 'white',
    fontSize: '0.875rem',
    outline: 'none',
  };

  const labelStyle = {
    display: 'block',
    color: '#9ca3af',
    fontSize: '0.875rem',
    marginBottom: '0.5rem',
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Left Side - Background Image */}
      <div style={{
        flex: 1,
        backgroundImage: 'url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=1600&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'none',
      }} className="auth-image-panel" />

      {/* Right Side - Form */}
      <div style={{
        flex: 1,
        backgroundColor: '#05396c',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        minHeight: '100vh',
      }}>
        <div style={{ width: '100%', maxWidth: '500px' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <div style={{ width: '48px', height: '48px' }}>
              <svg viewBox="0 0 40 40" fill="none" style={{ width: '100%', height: '100%' }}>
                <path
                  d="M20 2C18 4 15 5 14 8C13 11 14 14 13 17C12 20 10 22 11 25C12 28 15 30 17 33C19 36 20 38 20 38C20 38 21 36 23 33C25 30 28 28 29 25C30 22 28 20 27 17C26 14 27 11 26 8C25 5 22 4 20 2Z"
                  fill="#00c896"
                  opacity="0.9"
                />
                <circle cx="20" cy="18" r="3" fill="white" opacity="0.3" />
              </svg>
            </div>
            <span style={{ color: 'white', fontSize: '1.75rem', fontWeight: 700, letterSpacing: '0.05em' }}>NESTS</span>
          </div>

          {/* Title */}
          <h1 style={{ 
            color: '#00c896', 
            fontSize: '2rem', 
            fontWeight: 400, 
            marginBottom: '2rem',
            fontStyle: 'normal'
          }}>
            Client Registration
          </h1>

          {error && (
            <div style={{
              marginBottom: '1.5rem',
              padding: '1rem',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid #ef4444',
              borderRadius: '0.5rem',
              color: '#fca5a5',
              fontSize: '0.875rem'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Full Name and Phone Number Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={labelStyle}>Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jane Doe"
                  required
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Email Address */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={labelStyle}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
                style={inputStyle}
              />
            </div>

            {/* Password Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={labelStyle}>Password (Minimum 8 characters)</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={8}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Terms Checkbox */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem',
                cursor: 'pointer'
              }}>
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  style={{
                    width: '18px',
                    height: '18px',
                    accentColor: '#00c896',
                    cursor: 'pointer',
                  }}
                />
                <span style={{ color: 'white', fontSize: '0.875rem' }}>
                  I accept the{' '}
                  <Link href="/terms" style={{ color: '#00c896', textDecoration: 'underline' }}>
                    Terms & Conditions
                  </Link>
                </span>
              </label>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.875rem',
                backgroundColor: '#00c896',
                color: '#05396c',
                fontSize: '1rem',
                fontWeight: 600,
                border: 'none',
                borderRadius: '0.375rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                marginBottom: '1.5rem',
              }}
            >
              {loading ? 'Creating Account...' : 'Register / Create Account'}
            </button>

            {/* Already have account */}
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                Already have an account?{' '}
                <Link href="/auth/login" style={{ 
                  color: '#00c896', 
                  textDecoration: 'underline',
                  fontWeight: 500
                }}>
                  Login here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      <style jsx global>{`
        @media (min-width: 768px) {
          .auth-image-panel {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#05396c'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '3px solid #042d56',
          borderTopColor: '#00c896',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }} />
      </div>
    }>
      <SignupForm />
    </Suspense>
  );
}
