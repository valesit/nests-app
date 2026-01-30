import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function ClientProjectsPage() {
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

  // Get all projects with quotes
  const { data: projects } = await supabase
    .from('projects')
    .select(`
      *,
      vendor_profiles (
        business_name,
        profiles (full_name)
      ),
      quotes (
        id,
        status,
        total_amount,
        vendor_profiles (
          business_name
        )
      )
    `)
    .eq('client_id', clientProfile.id)
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">My Projects</h1>
            <p className="text-neutral-600 mt-1">Manage your construction projects</p>
          </div>
          <Link href="/vendors" className="btn-primary">
            Find Vendors
          </Link>
        </div>

        {projects && projects.length > 0 ? (
          <div className="space-y-4">
            {projects.map((project) => {
              const submittedQuotes = project.quotes?.filter(
                (q: { status: string }) => q.status === 'submitted'
              ) || [];
              const acceptedQuote = project.quotes?.find(
                (q: { status: string }) => q.status === 'accepted'
              );

              return (
                <Link
                  key={project.id}
                  href={`/client/projects/${project.id}`}
                  className="card hover:shadow-lg transition-shadow block"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-neutral-900">
                          {project.project_name}
                        </h3>
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
                        <p className="text-neutral-500 mt-1 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {project.location}
                        </p>
                      )}

                      {project.description && (
                        <p className="text-neutral-600 mt-2 line-clamp-2">{project.description}</p>
                      )}

                      {/* Vendor Info */}
                      {project.status === 'in_progress' && project.vendor_profiles && (
                        <div className="mt-3 flex items-center text-sm">
                          <span className="text-neutral-500">Vendor:</span>
                          <span className="ml-2 font-medium text-neutral-900">
                            {project.vendor_profiles.business_name}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="text-right ml-4">
                      {project.status === 'seeking_quotes' && (
                        <div>
                          <p className="text-2xl font-bold text-primary-600">
                            {submittedQuotes.length}
                          </p>
                          <p className="text-sm text-neutral-500">
                            quote{submittedQuotes.length !== 1 ? 's' : ''} received
                          </p>
                        </div>
                      )}

                      {acceptedQuote && (
                        <div>
                          <p className="text-2xl font-bold text-success-600">
                            ${acceptedQuote.total_amount?.toLocaleString() || '0'}
                          </p>
                          <p className="text-sm text-neutral-500">accepted quote</p>
                        </div>
                      )}

                      <p className="text-xs text-neutral-400 mt-2">
                        Created {new Date(project.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="card text-center py-16">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-neutral-900 mb-2">No projects yet</h3>
            <p className="text-neutral-600 mb-6">Start by browsing vendors and requesting quotes</p>
            <Link href="/vendors" className="btn-primary">
              Find Vendors
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
