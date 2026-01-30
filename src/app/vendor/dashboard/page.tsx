import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function VendorDashboard() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/auth/login');
  }

  // Get profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Get vendor profile
  const { data: vendorProfile } = await supabase
    .from('vendor_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();

  // Get portfolios count
  const { count: portfolioCount } = await supabase
    .from('portfolios')
    .select('*', { count: 'exact', head: true })
    .eq('vendor_id', vendorProfile?.id || '');

  // Get quotes with project info
  const { data: quotes } = await supabase
    .from('quotes')
    .select(`
      *,
      projects (
        project_name,
        location,
        description,
        client_profiles (
          profiles (full_name)
        )
      )
    `)
    .eq('vendor_id', vendorProfile?.id || '')
    .order('created_at', { ascending: false });

  // Get pending quote requests (projects requesting quotes from this vendor)
  const { data: pendingRequests } = await supabase
    .from('projects')
    .select(`
      *,
      client_profiles (
        profiles (full_name)
      )
    `)
    .eq('status', 'seeking_quotes')
    .contains('vendor_id', [vendorProfile?.id || ''])
    .order('created_at', { ascending: false });

  const pendingQuotes = quotes?.filter(q => q.status === 'pending' || q.status === 'submitted') || [];
  const acceptedQuotes = quotes?.filter(q => q.status === 'accepted') || [];

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">
            Welcome back, {profile?.full_name?.split(' ')[0] || 'there'}!
          </h1>
          <p className="text-neutral-600 mt-1">
            {vendorProfile?.business_name || 'Manage your vendor profile'}
          </p>
        </div>

        {/* Profile Completion Banner */}
        {(!vendorProfile?.bio || !vendorProfile?.service_areas?.length) && (
          <div className="card bg-secondary-50 border-secondary-200 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-secondary-900">Complete Your Profile</h3>
                  <p className="text-sm text-secondary-700">Add more details to attract more clients</p>
                </div>
              </div>
              <Link href="/vendor/profile" className="btn-secondary">
                Update Profile
              </Link>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Portfolio Items</p>
                <p className="text-3xl font-bold text-neutral-900">{portfolioCount || 0}</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Quote Requests</p>
                <p className="text-3xl font-bold text-neutral-900">{pendingRequests?.length || 0}</p>
              </div>
              <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Pending Quotes</p>
                <p className="text-3xl font-bold text-neutral-900">{pendingQuotes.length}</p>
              </div>
              <div className="w-12 h-12 bg-info-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-info-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Won Projects</p>
                <p className="text-3xl font-bold text-neutral-900">{acceptedQuotes.length}</p>
              </div>
              <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card mb-8">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/vendor/portfolio/new" className="btn-primary">
              Add Portfolio Item
            </Link>
            <Link href="/vendor/profile" className="btn-outline">
              Edit Profile
            </Link>
            <Link href="/vendor/quotes" className="btn-outline">
              View All Quotes
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Recent Quote Requests */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-neutral-900">Quote Requests</h2>
              <Link href="/vendor/quotes" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View All
              </Link>
            </div>

            {pendingRequests && pendingRequests.length > 0 ? (
              <div className="space-y-4">
                {pendingRequests.slice(0, 3).map((project) => (
                  <Link
                    key={project.id}
                    href={`/vendor/quotes/${project.id}/respond`}
                    className="block p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-neutral-900">{project.project_name}</h3>
                        <p className="text-sm text-neutral-500">{project.location}</p>
                        <p className="text-xs text-neutral-400 mt-1">
                          From: {project.client_profiles?.profiles?.full_name || 'Client'}
                        </p>
                      </div>
                      <span className="badge badge-warning">New Request</span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-neutral-500">No pending quote requests</p>
              </div>
            )}
          </div>

          {/* Recent Quotes */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-neutral-900">Your Quotes</h2>
              <Link href="/vendor/quotes" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View All
              </Link>
            </div>

            {quotes && quotes.length > 0 ? (
              <div className="space-y-4">
                {quotes.slice(0, 3).map((quote) => (
                  <div
                    key={quote.id}
                    className="p-4 bg-neutral-50 rounded-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-neutral-900">
                          {quote.projects?.project_name || 'Project'}
                        </h3>
                        <p className="text-sm text-neutral-500">
                          ${quote.total_amount?.toLocaleString() || '0'}
                        </p>
                      </div>
                      <span className={`badge ${
                        quote.status === 'accepted' ? 'badge-success' :
                        quote.status === 'rejected' ? 'badge-error' :
                        quote.status === 'submitted' ? 'badge-info' :
                        'badge-warning'
                      }`}>
                        {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-neutral-500">No quotes submitted yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
