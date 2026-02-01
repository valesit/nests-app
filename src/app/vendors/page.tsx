import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import Image from 'next/image';
import { ClientHeader } from '@/components/ClientHeader';

interface SearchParams {
  search?: string;
  category?: string;
  location?: string;
  view?: string;
}

const categoryImages: Record<string, string> = {
  // Basic categories
  plumbing: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=300&fit=crop',
  electrical: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop',
  electrician: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop',
  roofing: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?w=400&h=300&fit=crop',
  hvac: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
  'hvac-specialist': 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
  painting: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=300&fit=crop',
  carpentry: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop',
  carpenter: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop',
  landscaping: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=300&fit=crop',
  flooring: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=400&h=300&fit=crop',
  // Additional categories from screenshot
  architect: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop',
  'general-contractor': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop',
  'interior-designer': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=300&fit=crop',
  'interior-design': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=300&fit=crop',
  masonry: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
  concrete: 'https://images.unsplash.com/photo-1590496793929-36417d3117de?w=400&h=300&fit=crop',
  welding: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop',
  tiling: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&h=300&fit=crop',
};

export default async function VendorsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const supabase = await createClient();

  // Check if user is logged in
  const { data: { user } } = await supabase.auth.getUser();

  // Get all categories for filter
  const { data: categories } = await supabase
    .from('service_categories')
    .select('*')
    .order('name');

  // Build vendor query
  let query = supabase
    .from('vendor_profiles')
    .select(`
      *,
      profiles (full_name, avatar_url),
      vendor_categories (
        service_categories (name, slug)
      ),
      portfolios (id)
    `)
    .eq('verification_status', 'approved');

  // Apply search filter
  if (params.search) {
    query = query.ilike('business_name', `%${params.search}%`);
  }

  // Apply location filter
  if (params.location) {
    query = query.contains('service_areas', [params.location]);
  }

  const { data: vendors } = await query.order('created_at', { ascending: false });

  // Filter by category (client-side since it's a junction table)
  let filteredVendors = vendors || [];
  if (params.category) {
    filteredVendors = filteredVendors.filter(vendor =>
      vendor.vendor_categories?.some(
        (vc: { service_categories?: { slug: string } }) => 
          vc.service_categories?.slug === params.category
      )
    );
  }

  const zimbabweCities = [
    'Harare', 'Bulawayo', 'Chitungwiza', 'Mutare', 'Gweru',
    'Kwekwe', 'Kadoma', 'Masvingo', 'Chinhoyi', 'Norton',
    'Marondera', 'Ruwa', 'Chegutu', 'Bindura', 'Victoria Falls'
  ];

  // If no category selected, show category grid view
  const showCategoryView = !params.category && !params.search;

  return (
    <div className="min-h-screen bg-[#f0f7f4]">
      {user && <ClientHeader />}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          {params.category && (
            <Link href="/vendors" className="inline-flex items-center text-[#05396c] hover:text-[#00c896] mb-2">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Discovery
            </Link>
          )}
          <h1 className="text-2xl font-medium text-[#05396c]">
            {showCategoryView ? 'Explore Construction Service' : 'Discovery'}
          </h1>
          {showCategoryView && (
            <p className="text-gray-600 mt-1">Connecting you to reliable construction solutions, all in one place.</p>
          )}
        </div>

        {/* Filters */}
        <form className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end mb-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  name="search"
                  placeholder={showCategoryView ? "Search category" : "Search"}
                  defaultValue={params.search}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00c896] focus:border-transparent bg-white"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">Category</label>
              <select
                name="category"
                defaultValue={params.category || ''}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00c896] focus:border-transparent bg-white"
              >
                <option value="">All Categories</option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">Location</label>
              <div className="relative">
                <select
                  name="location"
                  defaultValue={params.location || ''}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00c896] focus:border-transparent bg-white appearance-none"
                >
                  <option value="">All locations</option>
                  {zimbabweCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00c896]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              className="px-6 py-2 bg-[#00c896] text-white font-medium rounded-lg hover:bg-[#00b087] transition-colors"
            >
              Apply Filters
            </button>
            <Link
              href="/vendors"
              className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear Filters
            </Link>
          </div>
        </form>

        {/* Category Grid View */}
        {showCategoryView ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories?.map((category) => (
              <Link
                key={category.id}
                href={`/vendors?category=${category.slug}`}
                className="group"
              >
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-2">
                  <Image
                    src={categoryImages[category.slug] || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop'}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold text-[#05396c]">{category.name}</h3>
                <p className="text-sm text-gray-500">120 active members</p>
              </Link>
            ))}
          </div>
        ) : (
          /* Vendor List View */
          <div>
            <p className="text-sm text-gray-500 mb-4">
              {filteredVendors.length} vendor{filteredVendors.length !== 1 ? 's' : ''} found
            </p>

            {filteredVendors.length > 0 ? (
              <>
                <div className="grid md:grid-cols-3 gap-6">
                  {filteredVendors.map((vendor) => (
                    <div key={vendor.id} className="bg-white rounded-lg border border-gray-200 p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-[#05396c] flex items-center justify-center text-white font-bold text-lg">
                            {vendor.business_name.substring(0, 2).toUpperCase()}
                          </div>
                          <h3 className="font-semibold text-[#05396c]">{vendor.business_name}</h3>
                        </div>
                        <button className="text-[#00c896] hover:text-[#00b087]">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        </button>
                      </div>

                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {vendor.bio || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ....'}
                      </p>

                      <Link 
                        href={`/vendors/${vendor.id}`}
                        className="text-[#00c896] text-sm font-medium hover:underline mb-3 inline-block"
                      >
                        View Profile &gt;
                      </Link>

                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg key={star} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                            ))}
                          </div>
                          <span>(75 Review)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{vendor.service_areas?.[0] || 'Seattle, WA'}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-[#00c896] font-medium text-sm mb-4">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z" />
                        </svg>
                        Starting from $1500.00
                      </div>

                      <div className="flex gap-2">
                        <Link
                          href={`/vendors/${vendor.id}/quote`}
                          className="flex-1 px-4 py-2 bg-[#00c896] text-white text-sm font-medium rounded-lg hover:bg-[#00b087] transition-colors text-center"
                        >
                          Request a Quote
                        </Link>
                        <Link
                          href={`/vendors/${vendor.id}`}
                          className="flex-1 px-4 py-2 border border-[#00c896] text-[#00c896] text-sm font-medium rounded-lg hover:bg-[#00c896]/10 transition-colors text-center"
                        >
                          Book Service
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-2 mt-8">
                  <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div className="px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-600">
                    Page 1 of 2
                  </div>
                  <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 text-center py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No vendors found</h3>
                <p className="text-gray-600">
                  Try adjusting your filters or search terms
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
