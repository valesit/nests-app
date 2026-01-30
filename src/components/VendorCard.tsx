import Link from 'next/link';
import Image from 'next/image';

interface VendorCardProps {
  vendor: {
    id: string;
    business_name: string;
    bio: string | null;
    service_areas: string[];
    profiles?: {
      full_name: string;
      avatar_url: string | null;
    };
    vendor_categories?: {
      service_categories?: {
        name: string;
        slug: string;
      };
    }[];
    portfolios?: { id: string }[];
  };
}

export function VendorCard({ vendor }: VendorCardProps) {
  const categories = vendor.vendor_categories
    ?.map(vc => vc.service_categories?.name)
    .filter(Boolean)
    .slice(0, 3);

  return (
    <Link
      href={`/vendors/${vendor.id}`}
      className="card hover:shadow-lg transition-all hover:border-primary-200 group"
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
          {vendor.profiles?.avatar_url ? (
            <Image
              src={vendor.profiles.avatar_url}
              alt={vendor.business_name}
              width={64}
              height={64}
              className="object-cover"
            />
          ) : (
            <span className="text-2xl font-bold text-primary-600">
              {vendor.business_name.charAt(0)}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
            {vendor.business_name}
          </h3>
          
          {vendor.profiles?.full_name && (
            <p className="text-sm text-neutral-500">{vendor.profiles.full_name}</p>
          )}

          {/* Categories */}
          {categories && categories.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {categories.map((cat, index) => (
                <span
                  key={index}
                  className="text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          {/* Bio Preview */}
          {vendor.bio && (
            <p className="text-sm text-neutral-600 mt-2 line-clamp-2">{vendor.bio}</p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-neutral-100">
            <div className="flex items-center text-sm text-neutral-500">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {vendor.service_areas?.slice(0, 2).join(', ') || 'Zimbabwe'}
              {vendor.service_areas?.length > 2 && ` +${vendor.service_areas.length - 2}`}
            </div>
            
            <div className="flex items-center text-sm text-neutral-500">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {vendor.portfolios?.length || 0} projects
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
