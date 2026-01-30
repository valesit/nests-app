'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

interface LineItem {
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
}

interface Project {
  id: string;
  project_name: string;
  location: string | null;
  description: string | null;
  client_profiles?: {
    profiles?: {
      full_name: string;
    };
  };
}

export default function RespondToQuotePage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [vendorId, setVendorId] = useState<string | null>(null);
  const [quoteId, setQuoteId] = useState<string | null>(null);
  
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { description: '', quantity: 1, unit_price: 0, total: 0 }
  ]);
  const [timelineDays, setTimelineDays] = useState<number>(30);
  const [notes, setNotes] = useState('');
  
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/auth/login');
        return;
      }

      // Get vendor profile
      const { data: vendorProfile } = await supabase
        .from('vendor_profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!vendorProfile) {
        router.push('/vendor/dashboard');
        return;
      }

      setVendorId(vendorProfile.id);

      // Get project details
      const { data: projectData } = await supabase
        .from('projects')
        .select(`
          *,
          client_profiles (
            profiles (full_name)
          )
        `)
        .eq('id', projectId)
        .single();

      if (!projectData) {
        router.push('/vendor/quotes');
        return;
      }

      setProject(projectData);

      // Check if there's an existing quote
      const { data: existingQuote } = await supabase
        .from('quotes')
        .select('*')
        .eq('project_id', projectId)
        .eq('vendor_id', vendorProfile.id)
        .single();

      if (existingQuote) {
        setQuoteId(existingQuote.id);
        if (existingQuote.line_items && existingQuote.line_items.length > 0) {
          setLineItems(existingQuote.line_items);
        }
        if (existingQuote.timeline_days) {
          setTimelineDays(existingQuote.timeline_days);
        }
        if (existingQuote.notes) {
          setNotes(existingQuote.notes);
        }
      }

      setLoading(false);
    };

    fetchData();
  }, [supabase, router, projectId]);

  const addLineItem = () => {
    setLineItems([...lineItems, { description: '', quantity: 1, unit_price: 0, total: 0 }]);
  };

  const removeLineItem = (index: number) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter((_, i) => i !== index));
    }
  };

  const updateLineItem = (index: number, field: keyof LineItem, value: string | number) => {
    const updated = [...lineItems];
    if (field === 'description') {
      updated[index].description = value as string;
    } else {
      updated[index][field] = Number(value) || 0;
    }
    // Recalculate total
    updated[index].total = updated[index].quantity * updated[index].unit_price;
    setLineItems(updated);
  };

  const totalAmount = lineItems.reduce((sum, item) => sum + item.total, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendorId || !project) return;

    // Validate line items
    const validLineItems = lineItems.filter(item => item.description && item.total > 0);
    if (validLineItems.length === 0) {
      setError('Please add at least one line item with a description and price');
      return;
    }

    setError(null);
    setSaving(true);

    try {
      if (quoteId) {
        // Update existing quote
        const { error: updateError } = await supabase
          .from('quotes')
          .update({
            line_items: validLineItems,
            total_amount: totalAmount,
            timeline_days: timelineDays,
            notes,
            status: 'submitted',
          })
          .eq('id', quoteId);

        if (updateError) throw updateError;
      } else {
        // Create new quote
        const { error: insertError } = await supabase
          .from('quotes')
          .insert({
            project_id: project.id,
            vendor_id: vendorId,
            line_items: validLineItems,
            total_amount: totalAmount,
            timeline_days: timelineDays,
            notes,
            status: 'submitted',
          });

        if (insertError) throw insertError;
      }

      router.push('/vendor/quotes');
      router.refresh();
    } catch (err) {
      console.error('Error submitting quote:', err);
      setError('Failed to submit quote. Please try again.');
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

  if (!project) {
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/vendor/quotes"
          className="inline-flex items-center text-neutral-600 hover:text-primary-600 mb-6"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Quotes
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">Submit Quote</h1>
          <p className="text-neutral-600 mt-1">Provide a detailed quote for this project</p>
        </div>

        {/* Project Details */}
        <div className="card mb-8">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">Project Details</h2>
          <div className="space-y-3">
            <div>
              <span className="text-sm text-neutral-500">Project Name</span>
              <p className="font-medium text-neutral-900">{project.project_name}</p>
            </div>
            {project.location && (
              <div>
                <span className="text-sm text-neutral-500">Location</span>
                <p className="font-medium text-neutral-900">{project.location}</p>
              </div>
            )}
            <div>
              <span className="text-sm text-neutral-500">Client</span>
              <p className="font-medium text-neutral-900">
                {project.client_profiles?.profiles?.full_name || 'Client'}
              </p>
            </div>
            {project.description && (
              <div>
                <span className="text-sm text-neutral-500">Description</span>
                <p className="text-neutral-700 whitespace-pre-line">{project.description}</p>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-error-100 border border-error-500 rounded-lg text-error-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Line Items */}
          <div className="card">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">Quote Breakdown</h2>
            
            <div className="space-y-4">
              {lineItems.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 items-start">
                  <div className="col-span-5">
                    {index === 0 && <label className="label">Description</label>}
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateLineItem(index, 'description', e.target.value)}
                      className="input"
                      placeholder="e.g., Foundation work"
                    />
                  </div>
                  <div className="col-span-2">
                    {index === 0 && <label className="label">Qty</label>}
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateLineItem(index, 'quantity', e.target.value)}
                      className="input"
                    />
                  </div>
                  <div className="col-span-2">
                    {index === 0 && <label className="label">Unit Price</label>}
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.unit_price}
                      onChange={(e) => updateLineItem(index, 'unit_price', e.target.value)}
                      className="input"
                      placeholder="0.00"
                    />
                  </div>
                  <div className="col-span-2">
                    {index === 0 && <label className="label">Total</label>}
                    <div className="input bg-neutral-50 text-neutral-700">
                      ${item.total.toLocaleString()}
                    </div>
                  </div>
                  <div className="col-span-1 flex items-end">
                    {index === 0 && <div className="h-6"></div>}
                    <button
                      type="button"
                      onClick={() => removeLineItem(index)}
                      className="p-2 text-neutral-400 hover:text-error-600 transition-colors"
                      disabled={lineItems.length === 1}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addLineItem}
              className="mt-4 text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Line Item
            </button>

            <div className="mt-6 pt-6 border-t border-neutral-200 flex justify-end">
              <div className="text-right">
                <span className="text-neutral-500">Total Quote Amount</span>
                <p className="text-3xl font-bold text-primary-600">
                  ${totalAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="card">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">Timeline</h2>
            <div>
              <label htmlFor="timeline" className="label">
                Estimated Duration (days)
              </label>
              <input
                id="timeline"
                type="number"
                min="1"
                value={timelineDays}
                onChange={(e) => setTimelineDays(Number(e.target.value) || 30)}
                className="input max-w-xs"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="card">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">Additional Notes</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="input min-h-[120px]"
              placeholder="Include any important details, terms, or conditions..."
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <Link href="/vendor/quotes" className="btn-outline">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="btn-primary"
            >
              {saving ? 'Submitting...' : 'Submit Quote'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
