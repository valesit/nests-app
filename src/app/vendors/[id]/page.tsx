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

  // Sample data for demo purposes
  const sampleReviews = [
    {
      id: '1',
      author: 'Alice Smith',
      rating: 5,
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.',
      date: '2025-06-01'
    },
    {
      id: '2',
      author: 'Alice Smith',
      rating: 5,
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.',
      date: '2025-06-01'
    }
  ];

  const samplePackages = [
    {
      id: '1',
      name: 'Standard 2-Bedroom House Painting',
      category: 'Painting',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.',
      included: ['Standard Latex Paint (2 Colors)', "Painter's Tape"],
      estimatedTime: '2 Days',
      startingPrice: '$1500.00'
    },
    {
      id: '2',
      name: 'Standard 2-Bedroom House Painting',
      category: 'Painting',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.',
      included: ['Standard Latex Paint (2 Colors)', "Painter's Tape"],
      estimatedTime: '2 Days',
      startingPrice: '$1500.00'
    }
  ];

  const averageRating: number = 5;
  const totalReviews: number = 75;

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/vendors"
            className="inline-flex items-center text-neutral-600 hover:text-primary-600"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Discovery
          </Link>
        </div>

        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0 overflow-hidden">
              {vendor.profiles?.avatar_url ? (
                <Image
                  src={vendor.profiles.avatar_url}
                  alt={vendor.business_name}
                  width={80}
                  height={80}
                  className="object-cover"
                />
              ) : (
                <span className="text-3xl font-bold text-white">
                  {vendor.business_name.charAt(0)}
                </span>
              )}
            </div>

            {/* Title and Rating */}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                    {vendor.business_name}
                  </h1>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${i < averageRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-neutral-600">({totalReviews} Review{totalReviews !== 1 ? 's' : ''})</span>
                  </div>

                  {/* Location */}
                  {vendor.service_areas && vendor.service_areas.length > 0 && (
                    <div className="flex items-center text-neutral-600">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {vendor.service_areas.join(', ')}
                    </div>
                  )}
                </div>

                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Verified
                </span>
              </div>
            </div>
          </div>

          {/* Business Information & Contact Information */}
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            {/* Business Information */}
            <div>
              <h2 className="text-lg font-semibold text-neutral-900 mb-3">Business Information</h2>
              <p className="text-neutral-600">
                {vendor.bio || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.'}
              </p>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-lg font-semibold text-neutral-900 mb-3">Contact Information</h2>
              <div className="space-y-2 text-neutral-600">
                {vendor.profiles?.phone && (
                  <p>Phone: {vendor.profiles.phone}</p>
                )}
                <p>Website: www.{vendor.business_name.toLowerCase().replace(/\s+/g, '')}.com</p>
              </div>
            </div>
          </div>

          {/* Services Offered */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">Services Offered</h2>
            <div className="flex flex-wrap gap-2">
              {categories && categories.length > 0 ? (
                categories.map((cat: string, index: number) => (
                  <span
                    key={index}
                    className="bg-primary-50 text-primary-700 px-4 py-2 rounded-md text-sm font-medium"
                  >
                    {cat}
                  </span>
                ))
              ) : (
                <>
                  <span className="bg-primary-50 text-primary-700 px-4 py-2 rounded-md text-sm font-medium">Plumbing</span>
                  <span className="bg-primary-50 text-primary-700 px-4 py-2 rounded-md text-sm font-medium">Roofing</span>
                  <span className="bg-primary-50 text-primary-700 px-4 py-2 rounded-md text-sm font-medium">Electrical</span>
                  <span className="bg-primary-50 text-primary-700 px-4 py-2 rounded-md text-sm font-medium">Masonry</span>
                  <span className="bg-primary-50 text-primary-700 px-4 py-2 rounded-md text-sm font-medium">Carpentry</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Portfolio Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Portfolio</h2>

          {vendor.portfolios && vendor.portfolios.length > 0 ? (
            <div className="space-y-6">
              {vendor.portfolios.map((portfolio: {
                id: string;
                project_name: string;
                description: string | null;
                location: string | null;
                portfolio_images?: { id: string; image_url: string; caption?: string }[];
              }) => (
                <div key={portfolio.id}>
                  <h3 className="font-semibold text-neutral-900 mb-2">{portfolio.project_name}</h3>
                  <p className="text-neutral-600 mb-4">
                    {portfolio.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.'}
                  </p>

                  {/* Images Grid */}
                  {portfolio.portfolio_images && portfolio.portfolio_images.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {portfolio.portfolio_images.slice(0, 2).map((image: { id: string; image_url: string }) => (
                        <div
                          key={image.id}
                          className="aspect-video bg-neutral-100 rounded-lg overflow-hidden relative"
                        >
                          <Image
                            src={image.image_url}
                            alt={portfolio.project_name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="aspect-video bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-12 h-12 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="aspect-video bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-12 h-12 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}

                  <button className="inline-flex items-center px-4 py-2 border border-neutral-300 rounded-md text-sm font-medium text-neutral-700 hover:bg-neutral-50">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    View Case Study
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">Luxury Home Renovation</h3>
              <p className="text-neutral-600 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="aspect-video bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-12 h-12 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="aspect-video bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-12 h-12 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              <button className="inline-flex items-center px-4 py-2 border border-neutral-300 rounded-md text-sm font-medium text-neutral-700 hover:bg-neutral-50">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View Case Study
              </button>
            </div>
          )}
        </div>

        {/* Service Packages */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-xl font-semibold text-neutral-900 mb-6">Service Packages</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {samplePackages.map((pkg) => (
              <div key={pkg.id} className="border border-neutral-200 rounded-lg p-6">
                <h3 className="font-semibold text-neutral-900 mb-2">{pkg.name}</h3>
                <p className="text-sm text-neutral-600 mb-4">{pkg.category}</p>
                <p className="text-neutral-600 mb-4">{pkg.description}</p>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-neutral-700 mb-2">Included:</p>
                  <ul className="text-sm text-neutral-600 space-y-1">
                    {pkg.included.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                  <div className="flex items-center text-sm text-neutral-600">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Estimated Timeline: {pkg.estimatedTime}
                  </div>
                  <div className="flex items-center text-sm font-semibold text-primary-600">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Starting from {pkg.startingPrice}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews & Ratings */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-xl font-semibold text-neutral-900 mb-6">Reviews & Ratings</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {sampleReviews.map((review) => (
              <div key={review.id} className="border border-neutral-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-neutral-900">{review.author}</h3>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-neutral-600 mb-3">{review.comment}</p>
                <p className="text-sm text-neutral-500">{review.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          {isClient ? (
            <RequestQuoteButton
              vendorId={vendor.id}
              vendorName={vendor.business_name}
              clientProfileId={clientProfileId!}
            />
          ) : (
            <Link href="/auth/login" className="btn-primary">
              Request a Quote
            </Link>
          )}
          
          <button className="px-6 py-3 bg-primary-900 text-white rounded-md font-medium hover:bg-primary-800">
            Book Service
          </button>
          
          <button className="px-6 py-3 border border-neutral-300 rounded-md font-medium text-neutral-700 hover:bg-neutral-50">
            Message Vendor
          </button>
        </div>
      </div>
    </div>
  );
}
