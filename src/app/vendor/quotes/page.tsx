import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function VendorQuotesPage() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/auth/login');
  }

  // Get vendor profile
  const { data: vendorProfile } = await supabase
    .from('vendor_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (!vendorProfile) {
    redirect('/vendor/dashboard');
  }

  // Get all quotes for this vendor
  const { data: quotes } = await supabase
    .from('quotes')
    .select(`
      *,
      projects (
        id,
        project_name,
        location,
        description,
        status,
        client_profiles (
          profiles (full_name)
        )
      )
    `)
    .eq('vendor_id', vendorProfile.id)
    .order('created_at', { ascending: false });

  const pendingQuotes = quotes?.filter(q => q.status === 'pending') || [];
  const submittedQuotes = quotes?.filter(q => q.status === 'submitted') || [];
  const acceptedQuotes = quotes?.filter(q => q.status === 'accepted') || [];
  const rejectedQuotes = quotes?.filter(q => q.status === 'rejected') || [];

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">Quotes</h1>
          <p className="text-neutral-600 mt-1">Manage your quote requests and submissions</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card text-center">
            <p className="text-3xl font-bold text-warning-600">{pendingQuotes.length}</p>
            <p className="text-sm text-neutral-500">New Requests</p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-bold text-info-600">{submittedQuotes.length}</p>
            <p className="text-sm text-neutral-500">Submitted</p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-bold text-success-600">{acceptedQuotes.length}</p>
            <p className="text-sm text-neutral-500">Accepted</p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-bold text-neutral-400">{rejectedQuotes.length}</p>
            <p className="text-sm text-neutral-500">Rejected</p>
          </div>
        </div>

        {/* New Quote Requests */}
        {pendingQuotes.length > 0 && (
          <div className="card mb-8">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">
              New Quote Requests ({pendingQuotes.length})
            </h2>
            <div className="space-y-4">
              {pendingQuotes.map((quote) => (
                <div
                  key={quote.id}
                  className="border border-warning-200 bg-warning-50 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-neutral-900">
                        {quote.projects?.project_name}
                      </h3>
                      {quote.projects?.location && (
                        <p className="text-sm text-neutral-500 flex items-center mt-1">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {quote.projects.location}
                        </p>
                      )}
                      <p className="text-sm text-neutral-600 mt-2">
                        From: {quote.projects?.client_profiles?.profiles?.full_name || 'Client'}
                      </p>
                      {quote.projects?.description && (
                        <p className="text-sm text-neutral-600 mt-2 line-clamp-2">
                          {quote.projects.description}
                        </p>
                      )}
                    </div>
                    <Link
                      href={`/vendor/quotes/${quote.projects?.id}/respond`}
                      className="btn-secondary ml-4"
                    >
                      Submit Quote
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submitted Quotes */}
        {submittedQuotes.length > 0 && (
          <div className="card mb-8">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">
              Submitted Quotes ({submittedQuotes.length})
            </h2>
            <div className="space-y-4">
              {submittedQuotes.map((quote) => (
                <div
                  key={quote.id}
                  className="border border-neutral-200 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-neutral-900">
                        {quote.projects?.project_name}
                      </h3>
                      <p className="text-sm text-neutral-500">
                        {quote.projects?.location}
                      </p>
                      <p className="text-sm text-neutral-600 mt-1">
                        From: {quote.projects?.client_profiles?.profiles?.full_name || 'Client'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary-600">
                        ${quote.total_amount?.toLocaleString() || '0'}
                      </p>
                      <span className="badge badge-info">Awaiting Response</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Accepted Quotes */}
        {acceptedQuotes.length > 0 && (
          <div className="card mb-8">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">
              Won Projects ({acceptedQuotes.length})
            </h2>
            <div className="space-y-4">
              {acceptedQuotes.map((quote) => (
                <div
                  key={quote.id}
                  className="border border-success-200 bg-success-50 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-neutral-900">
                        {quote.projects?.project_name}
                      </h3>
                      <p className="text-sm text-neutral-500">
                        {quote.projects?.location}
                      </p>
                      <p className="text-sm text-neutral-600 mt-1">
                        Client: {quote.projects?.client_profiles?.profiles?.full_name || 'Client'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-success-600">
                        ${quote.total_amount?.toLocaleString() || '0'}
                      </p>
                      <span className="badge badge-success">Accepted</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {quotes?.length === 0 && (
          <div className="card text-center py-16">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-neutral-900 mb-2">No quotes yet</h3>
            <p className="text-neutral-600">
              Quote requests from clients will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
