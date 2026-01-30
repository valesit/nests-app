import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default async function PortfolioPage() {
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

  // Get portfolios with images
  const { data: portfolios } = await supabase
    .from('portfolios')
    .select(`
      *,
      portfolio_images (*)
    `)
    .eq('vendor_id', vendorProfile.id)
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Portfolio</h1>
            <p className="text-neutral-600 mt-1">Showcase your best work</p>
          </div>
          <Link href="/vendor/portfolio/new" className="btn-primary">
            Add Project
          </Link>
        </div>

        {portfolios && portfolios.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map((portfolio) => {
              const coverImage = portfolio.portfolio_images?.find((img: { display_order: number }) => img.display_order === 0) 
                || portfolio.portfolio_images?.[0];
              
              return (
                <Link
                  key={portfolio.id}
                  href={`/vendor/portfolio/${portfolio.id}`}
                  className="card hover:shadow-lg transition-shadow overflow-hidden p-0"
                >
                  <div className="aspect-video bg-neutral-200 relative">
                    {coverImage ? (
                      <Image
                        src={coverImage.image_url}
                        alt={portfolio.project_name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-neutral-900">{portfolio.project_name}</h3>
                    {portfolio.location && (
                      <p className="text-sm text-neutral-500 mt-1">{portfolio.location}</p>
                    )}
                    {portfolio.description && (
                      <p className="text-sm text-neutral-600 mt-2 line-clamp-2">{portfolio.description}</p>
                    )}
                    <div className="mt-3 flex items-center text-xs text-neutral-400">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {portfolio.portfolio_images?.length || 0} photos
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-neutral-900 mb-2">No portfolio items yet</h3>
            <p className="text-neutral-600 mb-6">Showcase your work to attract more clients</p>
            <Link href="/vendor/portfolio/new" className="btn-primary">
              Add Your First Project
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
