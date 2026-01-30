'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { ImageUpload } from '@/components/ImageUpload';

interface UploadedImage {
  id: string;
  url: string;
}

export default function NewPortfolioPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [vendorId, setVendorId] = useState<string | null>(null);
  
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState<UploadedImage[]>([]);
  
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const supabase = createClient();

  const zimbabweCities = [
    'Harare', 'Bulawayo', 'Chitungwiza', 'Mutare', 'Gweru',
    'Kwekwe', 'Kadoma', 'Masvingo', 'Chinhoyi', 'Norton',
    'Marondera', 'Ruwa', 'Chegutu', 'Bindura', 'Victoria Falls'
  ];

  useEffect(() => {
    const fetchVendorProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/auth/login');
        return;
      }

      const { data: vendorProfile } = await supabase
        .from('vendor_profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (vendorProfile) {
        setVendorId(vendorProfile.id);
      } else {
        router.push('/vendor/dashboard');
      }

      setLoading(false);
    };

    fetchVendorProfile();
  }, [supabase, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendorId) return;

    setError(null);
    setSaving(true);

    try {
      // Create portfolio
      const { data: portfolio, error: portfolioError } = await supabase
        .from('portfolios')
        .insert({
          vendor_id: vendorId,
          project_name: projectName,
          description,
          location,
        })
        .select()
        .single();

      if (portfolioError) throw portfolioError;

      // Add images to portfolio
      if (images.length > 0 && portfolio) {
        const imageRecords = images.map((img, index) => ({
          portfolio_id: portfolio.id,
          image_url: img.url,
          display_order: index,
        }));

        const { error: imagesError } = await supabase
          .from('portfolio_images')
          .insert(imageRecords);

        if (imagesError) throw imagesError;
      }

      router.push('/vendor/portfolio');
    } catch (err) {
      console.error('Error creating portfolio:', err);
      setError('Failed to create portfolio. Please try again.');
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
          <h1 className="text-3xl font-bold text-neutral-900">Add Portfolio Project</h1>
          <p className="text-neutral-600 mt-1">Showcase your completed work</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-error-100 border border-error-500 rounded-lg text-error-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Project Details */}
          <div className="card">
            <h2 className="text-lg font-semibold text-neutral-900 mb-6">Project Details</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="projectName" className="label">
                  Project Name *
                </label>
                <input
                  id="projectName"
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="input"
                  placeholder="e.g., Modern 4-Bedroom House"
                  required
                />
              </div>

              <div>
                <label htmlFor="location" className="label">
                  Location
                </label>
                <select
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
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

              <div>
                <label htmlFor="description" className="label">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input min-h-[150px]"
                  placeholder="Describe the project, scope of work, challenges overcome, etc."
                />
              </div>
            </div>
          </div>

          {/* Photos */}
          <div className="card">
            <h2 className="text-lg font-semibold text-neutral-900 mb-6">Project Photos</h2>
            
            {vendorId && (
              <ImageUpload
                vendorId={vendorId}
                onImagesChange={setImages}
              />
            )}
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
              disabled={saving || !projectName}
              className="btn-primary"
            >
              {saving ? 'Saving...' : 'Add Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
