'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { VendorProfile, ServiceCategory } from '@/types/database';

export default function VendorProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [vendorProfile, setVendorProfile] = useState<VendorProfile | null>(null);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const [businessName, setBusinessName] = useState('');
  const [bio, setBio] = useState('');
  const [serviceAreas, setServiceAreas] = useState<string[]>([]);
  
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const router = useRouter();
  const supabase = createClient();

  const zimbabweCities = [
    'Harare', 'Bulawayo', 'Chitungwiza', 'Mutare', 'Gweru',
    'Kwekwe', 'Kadoma', 'Masvingo', 'Chinhoyi', 'Norton',
    'Marondera', 'Ruwa', 'Chegutu', 'Bindura', 'Victoria Falls'
  ];

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/auth/login');
        return;
      }

      // Get vendor profile
      const { data: profile } = await supabase
        .from('vendor_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profile) {
        setVendorProfile(profile);
        setBusinessName(profile.business_name);
        setBio(profile.bio || '');
        setServiceAreas(profile.service_areas || []);
      }

      // Get all categories
      const { data: cats } = await supabase
        .from('service_categories')
        .select('*')
        .order('name');

      if (cats) {
        setCategories(cats);
      }

      // Get vendor's selected categories
      if (profile) {
        const { data: vendorCats } = await supabase
          .from('vendor_categories')
          .select('category_id')
          .eq('vendor_id', profile.id);

        if (vendorCats) {
          setSelectedCategories(vendorCats.map(vc => vc.category_id));
        }
      }

      setLoading(false);
    };

    fetchData();
  }, [supabase, router]);

  const toggleServiceArea = (city: string) => {
    setServiceAreas(prev =>
      prev.includes(city)
        ? prev.filter(c => c !== city)
        : [...prev, city]
    );
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      if (!vendorProfile) return;

      // Update vendor profile
      const { error: profileError } = await supabase
        .from('vendor_profiles')
        .update({
          business_name: businessName,
          bio,
          service_areas: serviceAreas,
        })
        .eq('id', vendorProfile.id);

      if (profileError) throw profileError;

      // Update categories - delete existing and insert new
      await supabase
        .from('vendor_categories')
        .delete()
        .eq('vendor_id', vendorProfile.id);

      if (selectedCategories.length > 0) {
        const { error: catError } = await supabase
          .from('vendor_categories')
          .insert(
            selectedCategories.map(categoryId => ({
              vendor_id: vendorProfile.id,
              category_id: categoryId,
            }))
          );

        if (catError) throw catError;
      }

      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">Edit Profile</h1>
          <p className="text-neutral-600 mt-1">Update your business information</p>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-success-100 border border-success-500 text-success-700' 
              : 'bg-error-100 border border-error-500 text-error-700'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Business Info */}
          <div className="card">
            <h2 className="text-lg font-semibold text-neutral-900 mb-6">Business Information</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="businessName" className="label">
                  Business Name *
                </label>
                <input
                  id="businessName"
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="input"
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
                  className="input min-h-[150px]"
                  placeholder="Tell clients about your experience, specialties, and what makes your business unique..."
                />
              </div>
            </div>
          </div>

          {/* Service Categories */}
          <div className="card">
            <h2 className="text-lg font-semibold text-neutral-900 mb-2">Service Categories</h2>
            <p className="text-sm text-neutral-500 mb-6">Select the services you offer</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => toggleCategory(category.id)}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors text-left ${
                    selectedCategories.includes(category.id)
                      ? 'bg-primary-600 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Service Areas */}
          <div className="card">
            <h2 className="text-lg font-semibold text-neutral-900 mb-2">Service Areas</h2>
            <p className="text-sm text-neutral-500 mb-6">Select cities where you operate</p>
            
            <div className="flex flex-wrap gap-2">
              {zimbabweCities.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => toggleServiceArea(city)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    serviceAreas.includes(city)
                      ? 'bg-secondary-600 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="btn-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="btn-primary"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
