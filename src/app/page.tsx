import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-br from-[#0B4F6C] via-[#01BAEF] to-[#20BF55] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="relative z-10 text-center px-6 py-24">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight">
            Build Your Dream Home<br />in Zimbabwe
          </h1>
          
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Connect with trusted local contractors, manage your project remotely, 
            and watch your dream home come to life.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex bg-white/90 backdrop-blur rounded-lg overflow-hidden shadow-xl">
              <input
                type="text"
                placeholder="Search for any service..."
                className="flex-1 px-6 py-4 text-gray-800 focus:outline-none"
              />
              <Link href="/vendors" className="px-8 bg-white hover:bg-gray-50 transition flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['Architect', 'Electrician', 'Plumber', 'Roofer', 'Painter', 'Carpenter', 'Mason', 'Landscaper'].map((category) => (
              <Link
                key={category}
                href={`/vendors?category=${category.toLowerCase()}`}
                className="px-5 py-2 bg-white/20 backdrop-blur text-white rounded-full hover:bg-white/30 transition border border-white/30"
              >
                {category}
              </Link>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth/signup"
              className="inline-block px-8 py-3 bg-white text-[#0B4F6C] font-semibold rounded hover:bg-gray-50 transition shadow-lg"
            >
              Start Building Today
            </Link>
            <Link 
              href="/auth/signup?role=vendor"
              className="inline-block px-8 py-3 bg-white/10 backdrop-blur text-white font-semibold rounded hover:bg-white/20 transition border border-white/30"
            >
              Become a Contractor
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl bg-gradient-to-br from-gray-200 to-gray-300">
              {/* Placeholder for construction workers image */}
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
            </div>
            
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                Everything You Need to<br />Hire, Track, and Pay with Ease
              </h2>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-[#0B4F6C] rounded-lg flex items-center justify-center">
                    <svg className="w-8 h-8 text-[#20BF55]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Top Rated Vendors</h3>
                    <p className="text-gray-600">
                      Discover verified and highly rated professionals across all services.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-[#0B4F6C] rounded-lg flex items-center justify-center">
                    <svg className="w-8 h-8 text-[#20BF55]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Find the Right Vendors</h3>
                    <p className="text-gray-600">
                      Easily browse and connect with the right experts for your project needs.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-[#0B4F6C] rounded-lg flex items-center justify-center">
                    <svg className="w-8 h-8 text-[#20BF55]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Track Your Project Progress</h3>
                    <p className="text-gray-600">
                      Stay updated in real time with tools that keep your project on schedule.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-[#0B4F6C] rounded-lg flex items-center justify-center">
                    <svg className="w-8 h-8 text-[#20BF55]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Secured Payment</h3>
                    <p className="text-gray-600">
                      Your funds are safe until you&apos;re fully satisfied with the work.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How NESTS Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Building from abroad has never been easier. Here&apos;s how we help you succeed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0B4F6C] rounded-lg flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#20BF55]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Post Your Project</h3>
              <p className="text-gray-600">
                Describe your construction needs in detail. It&apos;s quick, easy, and free.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#0B4F6C] rounded-lg flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#20BF55]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Get Matched & Receive Bids</h3>
              <p className="text-gray-600">
                We connect you with qualified contractors. Compare bids and profiles.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#0B4F6C] rounded-lg flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#20BF55]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Hire & Get Work Done</h3>
              <p className="text-gray-600">
                Choose the best fit, hire securely, and watch your project come to life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories Section */}
      <section className="py-20 px-6 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
            <h2 className="text-4xl font-bold text-gray-900">
              Explore Service Categories
            </h2>
            <Link 
              href="/vendors"
              className="px-6 py-3 bg-[#20BF55] text-white font-semibold rounded hover:bg-[#1aa849] transition"
            >
              View All Categories
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'General Contractor', slug: 'general-contractor' },
              { name: 'Architect', slug: 'architect' },
              { name: 'Electrician', slug: 'electrician' },
              { name: 'Plumber', slug: 'plumber' },
              { name: 'Roofer', slug: 'roofer' },
              { name: 'Mason', slug: 'mason' },
              { name: 'Painter', slug: 'painter' },
              { name: 'Carpenter', slug: 'carpenter' },
            ].map((category) => (
              <Link
                key={category.slug}
                href={`/vendors?category=${category.slug}`}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition bg-white"
              >
                <div className="aspect-[4/3] relative bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#0B4F6C] transition">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6 bg-gradient-to-r from-[#0B4F6C] to-[#01BAEF] overflow-hidden">
        <div className="absolute right-0 bottom-0 w-1/2 h-full">
          <div className="absolute inset-0 bg-gradient-to-l from-[#20BF55]/30 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of diaspora homebuilders who trust NESTS to bring their dreams home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth/signup"
              className="inline-block px-8 py-4 bg-white text-[#0B4F6C] font-semibold rounded hover:bg-gray-50 transition shadow-lg text-lg"
            >
              Create Free Account
            </Link>
            <Link 
              href="/auth/signup?role=vendor"
              className="inline-block px-8 py-4 bg-white/10 backdrop-blur text-white font-semibold rounded hover:bg-white/20 transition border border-white/30 text-lg"
            >
              Join as Vendor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
