'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

interface RequestQuoteButtonProps {
  vendorId: string;
  vendorName: string;
  clientProfileId: string;
}

export function RequestQuoteButton({ vendorId, vendorName, clientProfileId }: RequestQuoteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const supabase = createClient();

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
      // Create project with quote request
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert({
          client_id: clientProfileId,
          project_name: projectName,
          location,
          description,
          status: 'seeking_quotes',
        })
        .select()
        .single();

      if (projectError) throw projectError;

      // Create a pending quote for this vendor
      const { error: quoteError } = await supabase
        .from('quotes')
        .insert({
          project_id: project.id,
          vendor_id: vendorId,
          status: 'pending',
        });

      if (quoteError) throw quoteError;

      setIsOpen(false);
      router.push(`/client/projects/${project.id}`);
      router.refresh();
    } catch (err) {
      console.error('Error creating quote request:', err);
      setError('Failed to create quote request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="btn-primary w-full"
      >
        Request Quote
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 transition-opacity"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal Content */}
            <div className="relative bg-white rounded-xl shadow-xl max-w-lg w-full p-6 z-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-neutral-900">
                  Request Quote from {vendorName}
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-neutral-400 hover:text-neutral-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-error-100 border border-error-500 rounded-lg text-error-700 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
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
                    placeholder="e.g., 4-Bedroom House Construction"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="location" className="label">
                    Project Location *
                  </label>
                  <select
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="input"
                    required
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
                    Project Description *
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="input min-h-[120px]"
                    placeholder="Describe your project, including size, materials, timeline expectations, etc."
                    required
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="btn-outline flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary flex-1"
                  >
                    {loading ? 'Sending...' : 'Send Request'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
