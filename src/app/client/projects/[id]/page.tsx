import { createClient } from '@/lib/supabase/server';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { AcceptQuoteButton } from './AcceptQuoteButton';

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/auth/login');
  }

  // Get client profile
  const { data: clientProfile } = await supabase
    .from('client_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (!clientProfile) {
    redirect('/client/dashboard');
  }

  // Get project with all details
  const { data: project } = await supabase
    .from('projects')
    .select(`
      *,
      vendor_profiles (
        id,
        business_name,
        profiles (full_name, phone)
      ),
      quotes (
        *,
        vendor_profiles (
          id,
          business_name,
          bio,
          profiles (full_name, avatar_url)
        )
      )
    `)
    .eq('id', id)
    .eq('client_id', clientProfile.id)
    .single();

  if (!project) {
    notFound();
  }

  const submittedQuotes = project.quotes?.filter(
    (q: { status: string }) => q.status === 'submitted'
  ) || [];
  const acceptedQuote = project.quotes?.find(
    (q: { status: string }) => q.status === 'accepted'
  );
  const pendingQuotes = project.quotes?.filter(
    (q: { status: string }) => q.status === 'pending'
  ) || [];

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/client/projects"
          className="inline-flex items-center text-neutral-600 hover:text-primary-600 mb-6"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </Link>

        {/* Project Header */}
        <div className="card mb-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-neutral-900">{project.project_name}</h1>
                <span className={`badge ${
                  project.status === 'in_progress' ? 'badge-success' :
                  project.status === 'seeking_quotes' ? 'badge-warning' :
                  project.status === 'completed' ? 'badge-info' :
                  'badge-neutral'
                }`}>
                  {project.status === 'seeking_quotes' ? 'Seeking Quotes' :
                   project.status === 'in_progress' ? 'In Progress' :
                   project.status === 'completed' ? 'Completed' :
                   project.status}
                </span>
              </div>
              
              {project.location && (
                <p className="text-neutral-500 mt-2 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {project.location}
                </p>
              )}
            </div>

            <p className="text-sm text-neutral-400">
              Created {new Date(project.created_at).toLocaleDateString()}
            </p>
          </div>

          {project.description && (
            <div className="mt-4 pt-4 border-t border-neutral-200">
              <h3 className="font-medium text-neutral-900 mb-2">Project Description</h3>
              <p className="text-neutral-600 whitespace-pre-line">{project.description}</p>
            </div>
          )}

          {/* Assigned Vendor (if in progress) */}
          {project.status === 'in_progress' && project.vendor_profiles && (
            <div className="mt-4 pt-4 border-t border-neutral-200">
              <h3 className="font-medium text-neutral-900 mb-2">Assigned Vendor</h3>
              <div className="flex items-center justify-between bg-success-50 p-4 rounded-lg">
                <div>
                  <p className="font-semibold text-neutral-900">{project.vendor_profiles.business_name}</p>
                  <p className="text-sm text-neutral-600">{project.vendor_profiles.profiles?.full_name}</p>
                  {project.vendor_profiles.profiles?.phone && (
                    <p className="text-sm text-neutral-500">{project.vendor_profiles.profiles.phone}</p>
                  )}
                </div>
                {acceptedQuote && (
                  <div className="text-right">
                    <p className="text-2xl font-bold text-success-600">
                      ${acceptedQuote.total_amount?.toLocaleString() || '0'}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {acceptedQuote.timeline_days} days timeline
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Quotes Section */}
        {project.status === 'seeking_quotes' && (
          <div className="space-y-6">
            {/* Waiting for Quotes */}
            {pendingQuotes.length > 0 && (
              <div className="card">
                <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                  Awaiting Response ({pendingQuotes.length})
                </h2>
                <div className="space-y-3">
                  {pendingQuotes.map((quote: {
                    id: string;
                    vendor_profiles?: {
                      business_name: string;
                      profiles?: { full_name: string };
                    };
                    created_at: string;
                  }) => (
                    <div key={quote.id} className="p-4 bg-neutral-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-neutral-900">
                            {quote.vendor_profiles?.business_name}
                          </p>
                          <p className="text-sm text-neutral-500">
                            Requested {new Date(quote.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <span className="badge badge-warning">Pending</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Received Quotes */}
            {submittedQuotes.length > 0 ? (
              <div className="card">
                <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                  Received Quotes ({submittedQuotes.length})
                </h2>
                <div className="space-y-4">
                  {submittedQuotes.map((quote: {
                    id: string;
                    vendor_id: string;
                    total_amount: number | null;
                    timeline_days: number | null;
                    notes: string | null;
                    line_items: { description: string; quantity: number; unit_price: number; total: number }[];
                    vendor_profiles?: {
                      business_name: string;
                      profiles?: { full_name: string };
                    };
                  }) => (
                    <div key={quote.id} className="border border-neutral-200 rounded-lg overflow-hidden">
                      <div className="p-4 bg-neutral-50 border-b border-neutral-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-neutral-900">
                              {quote.vendor_profiles?.business_name}
                            </p>
                            <p className="text-sm text-neutral-500">
                              {quote.vendor_profiles?.profiles?.full_name}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary-600">
                              ${quote.total_amount?.toLocaleString() || '0'}
                            </p>
                            {quote.timeline_days && (
                              <p className="text-sm text-neutral-500">
                                {quote.timeline_days} days
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="p-4">
                        {/* Line Items */}
                        {quote.line_items && quote.line_items.length > 0 && (
                          <div className="mb-4">
                            <h4 className="font-medium text-neutral-900 mb-2">Breakdown</h4>
                            <div className="space-y-2">
                              {quote.line_items.map((item: {
                                description: string;
                                quantity: number;
                                unit_price: number;
                                total: number;
                              }, index: number) => (
                                <div key={index} className="flex justify-between text-sm">
                                  <span className="text-neutral-600">
                                    {item.description} ({item.quantity} x ${item.unit_price})
                                  </span>
                                  <span className="font-medium text-neutral-900">
                                    ${item.total.toLocaleString()}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Notes */}
                        {quote.notes && (
                          <div className="mb-4">
                            <h4 className="font-medium text-neutral-900 mb-1">Notes</h4>
                            <p className="text-sm text-neutral-600">{quote.notes}</p>
                          </div>
                        )}

                        {/* Accept Button */}
                        <AcceptQuoteButton
                          quoteId={quote.id}
                          projectId={project.id}
                          vendorId={quote.vendor_id}
                          vendorName={quote.vendor_profiles?.business_name || 'Vendor'}
                          amount={quote.total_amount || 0}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : pendingQuotes.length === 0 ? (
              <div className="card text-center py-12">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-neutral-900 mb-2">No quotes yet</h3>
                <p className="text-neutral-600 mb-4">Request quotes from vendors to get started</p>
                <Link href="/vendors" className="btn-primary">
                  Find Vendors
                </Link>
              </div>
            ) : null}
          </div>
        )}

        {/* Active Project View */}
        {project.status === 'in_progress' && acceptedQuote && (
          <div className="card">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">Accepted Quote Details</h2>
            
            {/* Line Items */}
            {acceptedQuote.line_items && acceptedQuote.line_items.length > 0 && (
              <div className="mb-6">
                <h4 className="font-medium text-neutral-900 mb-3">Scope of Work</h4>
                <div className="bg-neutral-50 rounded-lg p-4">
                  <div className="space-y-2">
                    {acceptedQuote.line_items.map((item: {
                      description: string;
                      quantity: number;
                      unit_price: number;
                      total: number;
                    }, index: number) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-neutral-600">
                          {item.description} ({item.quantity} x ${item.unit_price})
                        </span>
                        <span className="font-medium text-neutral-900">
                          ${item.total.toLocaleString()}
                        </span>
                      </div>
                    ))}
                    <div className="pt-2 mt-2 border-t border-neutral-200 flex justify-between">
                      <span className="font-semibold text-neutral-900">Total</span>
                      <span className="font-bold text-primary-600">
                        ${acceptedQuote.total_amount?.toLocaleString() || '0'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notes */}
            {acceptedQuote.notes && (
              <div>
                <h4 className="font-medium text-neutral-900 mb-2">Vendor Notes</h4>
                <p className="text-neutral-600">{acceptedQuote.notes}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
