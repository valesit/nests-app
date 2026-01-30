'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { UserRole } from '@/types/database';

function SignupForm() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<UserRole>('client');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  
  // Client-specific fields
  const [currentResidence, setCurrentResidence] = useState('');
  const [targetCity, setTargetCity] = useState('');
  
  // Vendor-specific fields
  const [businessName, setBusinessName] = useState('');
  const [bio, setBio] = useState('');
  const [serviceAreas, setServiceAreas] = useState<string[]>([]);
  
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  // Check URL for role parameter
  useEffect(() => {
    const urlRole = searchParams.get('role');
    if (urlRole === 'vendor') {
      setRole('vendor');
    }
  }, [searchParams]);

  const zimbabweCities = [
    'Harare', 'Bulawayo', 'Chitungwiza', 'Mutare', 'Gweru',
    'Kwekwe', 'Kadoma', 'Masvingo', 'Chinhoyi', 'Norton',
    'Marondera', 'Ruwa', 'Chegutu', 'Bindura', 'Victoria Falls'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Prepare metadata based on role
      const metadata: Record<string, unknown> = {
        full_name: fullName,
        phone,
        role,
      };

      if (role === 'client') {
        metadata.current_residence = currentResidence;
        metadata.target_city = targetCity;
      } else {
        metadata.business_name = businessName;
        metadata.bio = bio;
        metadata.service_areas = serviceAreas;
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });

      if (error) {
        setError(error.message);
        return;
      }

      if (data.user) {
        // Redirect based on role
        const destination = role === 'vendor' ? '/vendor/dashboard' : '/client/dashboard';
        router.push(destination);
        router.refresh();
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const toggleServiceArea = (city: string) => {
    setServiceAreas(prev =>
      prev.includes(city)
        ? prev.filter(c => c !== city)
        : [...prev, city]
    );
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <div className="max-w-lg w-full">
        <div className="card">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-neutral-900">Create Your Account</h1>
            <p className="text-neutral-600 mt-2">
              {step === 1 ? 'Choose how you want to use NESTS' : 'Complete your profile'}
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary-600 text-white' : 'bg-neutral-200 text-neutral-500'}`}>
              1
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-primary-600' : 'bg-neutral-200'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary-600 text-white' : 'bg-neutral-200 text-neutral-500'}`}>
              2
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-error-100 border border-error-500 rounded-lg text-error-700 text-sm">
              {error}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              {/* Role Selection */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole('client')}
                  className={`p-6 rounded-xl border-2 transition-all text-left ${
                    role === 'client'
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    role === 'client' ? 'bg-primary-600 text-white' : 'bg-neutral-100 text-neutral-600'
                  }`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-neutral-900">I&apos;m Building</h3>
                  <p className="text-sm text-neutral-600 mt-1">Find vendors for my project</p>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('vendor')}
                  className={`p-6 rounded-xl border-2 transition-all text-left ${
                    role === 'vendor'
                      ? 'border-secondary-600 bg-secondary-50'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    role === 'vendor' ? 'bg-secondary-600 text-white' : 'bg-neutral-100 text-neutral-600'
                  }`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-neutral-900">I&apos;m a Vendor</h3>
                  <p className="text-sm text-neutral-600 mt-1">Offer my services</p>
                </button>
              </div>

              {/* Basic Info */}
              <div>
                <label htmlFor="fullName" className="label">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="input"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="label">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="label">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                  placeholder="••••••••"
                  minLength={6}
                  required
                />
                <p className="text-xs text-neutral-500 mt-1">Minimum 6 characters</p>
              </div>

              <div>
                <label htmlFor="phone" className="label">
                  Phone Number (Optional)
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input"
                  placeholder="+263 77 123 4567"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!fullName || !email || !password) {
                    setError('Please fill in all required fields');
                    return;
                  }
                  if (password.length < 6) {
                    setError('Password must be at least 6 characters');
                    return;
                  }
                  setError(null);
                  setStep(2);
                }}
                className="btn-primary w-full py-3"
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {role === 'client' ? (
                <>
                  <div>
                    <label htmlFor="currentResidence" className="label">
                      Where do you currently live?
                    </label>
                    <input
                      id="currentResidence"
                      type="text"
                      value={currentResidence}
                      onChange={(e) => setCurrentResidence(e.target.value)}
                      className="input"
                      placeholder="e.g., London, UK"
                    />
                  </div>

                  <div>
                    <label htmlFor="targetCity" className="label">
                      Where do you want to build?
                    </label>
                    <select
                      id="targetCity"
                      value={targetCity}
                      onChange={(e) => setTargetCity(e.target.value)}
                      className="input"
                    >
                      <option value="">Select a city</option>
                      {zimbabweCities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label htmlFor="businessName" className="label">
                      Business Name
                    </label>
                    <input
                      id="businessName"
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="input"
                      placeholder="e.g., ABC Construction"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="bio" className="label">
                      About Your Business
                    </label>
                    <textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="input min-h-[100px]"
                      placeholder="Tell clients about your experience and services..."
                    />
                  </div>

                  <div>
                    <label className="label">Service Areas</label>
                    <p className="text-sm text-neutral-500 mb-2">Select cities where you operate</p>
                    <div className="flex flex-wrap gap-2">
                      {zimbabweCities.map((city) => (
                        <button
                          key={city}
                          type="button"
                          onClick={() => toggleServiceArea(city)}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                            serviceAreas.includes(city)
                              ? 'bg-primary-600 text-white'
                              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                          }`}
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-outline flex-1 py-3"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex-1 py-3"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Account...
                    </span>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-neutral-600">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-primary-600 hover:text-primary-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    }>
      <SignupForm />
    </Suspense>
  );
}
