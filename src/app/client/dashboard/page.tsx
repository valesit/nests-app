import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

interface ProjectWithQuotes {
  id: string;
  project_name: string;
  location: string | null;
  status: string;
  quotes?: { id: string; status: string; total_amount: number | null }[];
  vendor_profiles?: { business_name: string };
}

export default async function ClientDashboard() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/auth/login');
  }

  // Get profile
  const { data: profileData } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
  
  const profile = profileData as { full_name: string } | null;

  // Get client profile
  const { data: clientProfileData } = await supabase
    .from('client_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();
  
  const clientProfile = clientProfileData as { id: string; target_city: string | null } | null;

  // Get projects with quotes
  const { data: projectsData } = await supabase
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
        total_amount
      )
    `)
    .eq('client_id', clientProfile?.id || '')
    .order('created_at', { ascending: false });
  
  const projects = projectsData as ProjectWithQuotes[] | null;

  const activeProjects = projects?.filter(p => p.status === 'in_progress') || [];
  const pendingQuotes = projects?.filter(p => p.status === 'seeking_quotes') || [];

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">
            Welcome back, {profile?.full_name?.split(' ')[0] || 'there'}!
          </h1>
          <p className="text-neutral-600 mt-1">
            {clientProfile?.target_city 
              ? `Building in ${clientProfile.target_city}` 
              : 'Manage your construction projects'}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Active Projects</p>
                <p className="text-3xl font-bold text-neutral-900">{activeProjects.length}</p>
              </div>
              <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
              <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Total Projects</p>
                <p className="text-3xl font-bold text-neutral-900">{projects?.length || 0}</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card mb-8">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/vendors" className="btn-primary">
              Find Vendors
            </Link>
            <Link href="/client/projects" className="btn-outline">
              View All Projects
            </Link>
          </div>
        </div>

        {/* Recent Projects */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-neutral-900">Your Projects</h2>
            <Link href="/client/projects" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All
            </Link>
          </div>

          {projects && projects.length > 0 ? (
            <div className="space-y-4">
              {projects.slice(0, 5).map((project) => (
                <Link
                  key={project.id}
                  href={`/client/projects/${project.id}`}
                  className="block p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-neutral-900">{project.project_name}</h3>
                      <p className="text-sm text-neutral-500">{project.location}</p>
                    </div>
                    <div className="text-right">
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
                      {project.quotes && project.quotes.length > 0 && (
                        <p className="text-xs text-neutral-500 mt-1">
                          {project.quotes.length} quote{project.quotes.length > 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-2">No projects yet</h3>
              <p className="text-neutral-600 mb-4">Start by browsing vendors and requesting quotes</p>
              <Link href="/vendors" className="btn-primary">
                Find Vendors
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
