import { createClient } from '@/lib/supabase/server';
import { VendorCard } from '@/components/VendorCard';
import { VendorFilters } from './VendorFilters';

interface SearchParams {
  search?: string;
  category?: string;
  location?: string;
}

export default async function VendorsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const supabase = await createClient();

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

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">Find Vendors</h1>
          <p className="text-neutral-600 mt-1">
            Browse verified contractors and specialists in Zimbabwe
          </p>
        </div>

        {/* Filters */}
        <VendorFilters
          categories={categories || []}
          locations={zimbabweCities}
          currentFilters={params}
        />

        {/* Results */}
        <div className="mt-8">
          <p className="text-sm text-neutral-500 mb-4">
            {filteredVendors.length} vendor{filteredVendors.length !== 1 ? 's' : ''} found
          </p>

          {filteredVendors.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredVendors.map((vendor) => (
                <VendorCard key={vendor.id} vendor={vendor} />
              ))}
            </div>
          ) : (
            <div className="card text-center py-16">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-2">No vendors found</h3>
              <p className="text-neutral-600">
                Try adjusting your filters or search terms
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
