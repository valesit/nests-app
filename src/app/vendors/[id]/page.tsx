import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { RequestQuoteButton } from './RequestQuoteButton';

export default async function VendorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  // Get vendor with all details
  const { data: vendor } = await supabase
    .from('vendor_profiles')
    .select(`
      *,
      profiles (full_name, avatar_url, phone),
      vendor_categories (
        service_categories (name, slug)
      ),
      portfolios (
        *,
        portfolio_images (*)
      )
    `)
    .eq('id', id)
    .eq('verification_status', 'approved')
    .single();

  if (!vendor) {
    notFound();
  }

  // Check if current user is a client
  const { data: { user } } = await supabase.auth.getUser();
  let isClient = false;
  let clientProfileId: string | null = null;

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role === 'client') {
      isClient = true;
      const { data: clientProfile } = await supabase
        .from('client_profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();
      clientProfileId = clientProfile?.id || null;
    }
  }

  const categories = vendor.vendor_categories
    ?.map((vc: { service_categories?: { name: string } }) => vc.service_categories?.name)
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/vendors"
          className="inline-flex items-center text-neutral-600 hover:text-primary-600 mb-6"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Vendors
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Header */}
            <div className="card">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {vendor.profiles?.avatar_url ? (
                    <Image
                      src={vendor.profiles.avatar_url}
                      alt={vendor.business_name}
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-4xl font-bold text-primary-600">
                      {vendor.business_name.charAt(0)}
                    </span>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-neutral-900">
                        {vendor.business_name}
                      </h1>
                      {vendor.profiles?.full_name && (
                        <p className="text-neutral-600">{vendor.profiles.full_name}</p>
                      )}
                    </div>
                    <span className="badge badge-success">Verified</span>
                  </div>

                  {/* Categories */}
                  {categories && categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {categories.map((cat: string, index: number) => (
                        <span
                          key={index}
                          className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Service Areas */}
                  {vendor.service_areas && vendor.service_areas.length > 0 && (
                    <div className="flex items-center mt-4 text-neutral-600">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {vendor.service_areas.join(', ')}
                    </div>
                  )}
                </div>
              </div>

              {/* Bio */}
              {vendor.bio && (
                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <h2 className="font-semibold text-neutral-900 mb-2">About</h2>
                  <p className="text-neutral-600 whitespace-pre-line">{vendor.bio}</p>
                </div>
              )}
            </div>

            {/* Portfolio */}
            <div className="card">
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">Portfolio</h2>

              {vendor.portfolios && vendor.portfolios.length > 0 ? (
                <div className="space-y-8">
                  {vendor.portfolios.map((portfolio: {
                    id: string;
                    project_name: string;
                    description: string | null;
                    location: string | null;
                    portfolio_images?: { id: string; image_url: string; caption?: string }[];
                  }) => (
                    <div key={portfolio.id} className="border-b border-neutral-200 pb-8 last:border-0 last:pb-0">
                      <h3 className="font-semibold text-neutral-900">{portfolio.project_name}</h3>
                      {portfolio.location && (
                        <p className="text-sm text-neutral-500">{portfolio.location}</p>
                      )}
                      {portfolio.description && (
                        <p className="text-neutral-600 mt-2">{portfolio.description}</p>
                      )}

                      {/* Images Grid */}
                      {portfolio.portfolio_images && portfolio.portfolio_images.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                          {portfolio.portfolio_images.map((image: { id: string; image_url: string }) => (
                            <div
                              key={image.id}
                              className="aspect-square bg-neutral-100 rounded-lg overflow-hidden relative"
                            >
                              <Image
                                src={image.image_url}
                                alt={portfolio.project_name}
                                fill
                                className="object-cover hover:scale-105 transition-transform"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-neutral-500">No portfolio items yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <h2 className="font-semibold text-neutral-900 mb-4">Request a Quote</h2>
              <p className="text-neutral-600 text-sm mb-6">
                Describe your project and get a detailed quote from {vendor.business_name}.
              </p>

              {isClient ? (
                <RequestQuoteButton
                  vendorId={vendor.id}
                  vendorName={vendor.business_name}
                  clientProfileId={clientProfileId!}
                />
              ) : user ? (
                <p className="text-sm text-neutral-500">
                  Only clients can request quotes. 
                  <Link href="/auth/signup" className="text-primary-600 hover:underline ml-1">
                    Sign up as a client
                  </Link>
                </p>
              ) : (
                <div className="space-y-3">
                  <Link href="/auth/login" className="btn-primary w-full text-center block">
                    Log In to Request Quote
                  </Link>
                  <Link href="/auth/signup" className="btn-outline w-full text-center block">
                    Create Account
                  </Link>
                </div>
              )}

              {/* Contact Info */}
              <div className="mt-6 pt-6 border-t border-neutral-200">
                <h3 className="font-medium text-neutral-900 mb-3">Contact</h3>
                {vendor.profiles?.phone && (
                  <div className="flex items-center text-neutral-600 text-sm">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {vendor.profiles.phone}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
