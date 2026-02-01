import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ClientHeader } from '@/components/ClientHeader';

interface ProjectWithQuotes {
  id: string;
  project_name: string;
  location: string | null;
  status: string;
  budget: number | null;
  deadline: string | null;
  created_at: string;
  quotes?: { 
    id: string; 
    status: string; 
    total_amount: number | null; 
    created_at: string;
    vendor_profiles?: { business_name: string };
  }[];
  vendor_profiles?: { business_name: string };
}

interface Quote {
  id: string;
  status: string;
  total_amount: number | null;
  created_at: string;
  project?: {
    project_name: string;
  };
  vendor_profiles?: {
    business_name: string;
  };
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
        total_amount,
        created_at,
        vendor_profiles (
          business_name
        )
      )
    `)
    .eq('client_id', clientProfile?.id || '')
    .order('created_at', { ascending: false });
  
  const projects = projectsData as ProjectWithQuotes[] | null;

  // Calculate stats
  const totalProjects = projects?.length || 0;
  const activeProjects = projects?.filter(p => p.status === 'in_progress').length || 0;
  const completedProjects = projects?.filter(p => p.status === 'completed').length || 0;
  const totalSpending = projects?.reduce((sum, p) => sum + (p.budget || 0), 0) || 0;

  // Get all bids/quotes received
  const allQuotes: Quote[] = [];
  projects?.forEach(project => {
    project.quotes?.forEach(quote => {
      allQuotes.push({
        ...quote,
        project: { project_name: project.project_name },
        vendor_profiles: quote.vendor_profiles as { business_name: string } | undefined
      });
    });
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toISOString().split('T')[0];
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      'active': 'bg-white text-[#05396c] border border-[#05396c]',
      'in_progress': 'bg-white text-[#05396c] border border-[#05396c]',
      'posted': 'bg-white text-[#05396c] border border-[#05396c]',
      'seeking_quotes': 'bg-white text-[#05396c] border border-[#05396c]',
      'pending': 'bg-amber-100 text-amber-800',
      'accepted': 'bg-green-100 text-green-800',
      'completed': 'bg-blue-100 text-blue-800',
    };
    const labels: Record<string, string> = {
      'in_progress': 'Active',
      'seeking_quotes': 'Posted',
      'pending': 'Pending',
      'accepted': 'Accepted',
      'completed': 'Completed',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
        {labels[status] || status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#f0f7f4]">
      <ClientHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <p className="text-[#00c896] text-lg">Welcome, {profile?.full_name?.split(' ')[0] || 'there'}!</p>
          <h1 className="text-2xl font-medium text-[#05396c]">Your Activity Overview</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {/* Projects Posted */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#e8f5f0] rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-[#00c896]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#05396c]">{String(totalProjects).padStart(2, '0')}</p>
                <p className="text-xs text-gray-500">Projects Posted</p>
              </div>
            </div>
          </div>

          {/* Active Projects */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#e8f5f0] rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-[#00c896]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#05396c]">{String(activeProjects).padStart(2, '0')}</p>
                <p className="text-xs text-gray-500">Active Projects</p>
              </div>
            </div>
          </div>

          {/* Completed Projects */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#e8f5f0] rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-[#00c896]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#05396c]">{String(completedProjects).padStart(2, '0')}</p>
                <p className="text-xs text-gray-500">Completed Projects</p>
              </div>
            </div>
          </div>

          {/* Contractor Rating */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#fef3c7] rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#05396c]">4.5</p>
                <p className="text-xs text-gray-500">Contractor Rating</p>
              </div>
            </div>
          </div>

          {/* Total Spending */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#e8f5f0] rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-[#00c896]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#05396c]">${totalSpending >= 1000 ? `${(totalSpending / 1000).toFixed(0)}k` : totalSpending}</p>
                <p className="text-xs text-gray-500">Total Spending</p>
              </div>
            </div>
          </div>
        </div>

        {/* Your Active Projects */}
        <div className="bg-white rounded-lg border border-gray-200 mb-8">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-xl font-medium text-[#05396c]">Your Active Projects</h2>
            <Link href="/client/projects" className="text-[#00c896] hover:underline text-sm font-medium">
              View All
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: '#05396c' }}>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#00c896]">Projects Posted</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#00c896]">Contractor</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#00c896]">Budget</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#00c896]">Deadline</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#00c896]">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#00c896]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects && projects.length > 0 ? (
                  projects.slice(0, 5).map((project, index) => (
                    <tr key={project.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm text-gray-900">{project.project_name}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{project.vendor_profiles?.business_name || '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{project.budget ? formatCurrency(project.budget) : '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{formatDate(project.deadline)}</td>
                      <td className="px-4 py-3">{getStatusBadge(project.status)}</td>
                      <td className="px-4 py-3">
                        <Link 
                          href={`/client/projects/${project.id}`}
                          className="inline-flex items-center gap-1 text-[#00c896] hover:underline text-sm font-medium"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                      No projects yet. <Link href="/vendors" className="text-[#00c896] hover:underline">Find vendors</Link> to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bids Received */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-xl font-medium text-[#05396c]">Bids Received</h2>
            <Link href="/client/bids" className="text-[#00c896] hover:underline text-sm font-medium">
              View All
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: '#05396c' }}>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#00c896]">Project</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#00c896]">Contractor</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#00c896]">Bid Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#00c896]">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#00c896]">Received Date</th>
                </tr>
              </thead>
              <tbody>
                {allQuotes.length > 0 ? (
                  allQuotes.slice(0, 6).map((quote, index) => (
                    <tr key={quote.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm text-gray-900">{quote.project?.project_name || '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{quote.vendor_profiles?.business_name || '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{quote.total_amount ? formatCurrency(quote.total_amount) : '-'}</td>
                      <td className="px-4 py-3">{getStatusBadge(quote.status)}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{formatDate(quote.created_at)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                      No bids received yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
