import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="bg-neutral-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Build Your Dream Home in Zimbabwe
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8">
              Connect with trusted local contractors, manage your project remotely, 
              and watch your dream home come to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/auth/signup"
                className="bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors text-center"
              >
                Start Building Today
              </Link>
              <Link
                href="/vendors"
                className="bg-white/10 hover:bg-white/20 backdrop-blur text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors text-center border border-white/20"
              >
                Browse Vendors
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              How NESTS Works
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Building from abroad has never been easier. Here&apos;s how we help you succeed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Find Trusted Vendors
              </h3>
              <p className="text-neutral-600">
                Browse verified contractors, architects, and specialists. View portfolios, 
                ratings, and past projects to find the perfect match.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-secondary-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Request & Compare Quotes
              </h3>
              <p className="text-neutral-600">
                Describe your project and receive detailed quotes from multiple vendors. 
                Compare pricing, timelines, and scope to make informed decisions.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-success-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Build with Confidence
              </h3>
              <p className="text-neutral-600">
                Track progress, approve milestones, and release payments securely. 
                Stay connected to your project every step of the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                Built for the Diaspora
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
                We understand the unique challenges of building a home from abroad. 
                NESTS bridges the gap between you and trusted local professionals.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-success-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-neutral-700">
                    <strong className="text-neutral-900">Verified Vendors</strong> - All contractors are vetted and verified
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-success-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-neutral-700">
                    <strong className="text-neutral-900">Transparent Pricing</strong> - Get detailed quotes with no hidden fees
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-success-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-neutral-700">
                    <strong className="text-neutral-900">Secure Payments</strong> - Milestone-based payments protect both parties
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-success-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-neutral-700">
                    <strong className="text-neutral-900">Real-time Updates</strong> - Track progress with photos and reports
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-neutral-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-neutral-900">Project Progress</h3>
                <span className="badge badge-success">On Track</span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-600">Foundation</span>
                    <span className="text-success-600 font-medium">Complete</span>
                  </div>
                  <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div className="h-full bg-success-500 rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-600">Superstructure</span>
                    <span className="text-primary-600 font-medium">75%</span>
                  </div>
                  <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-500 rounded-full" style={{ width: '75%' }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-600">Roofing</span>
                    <span className="text-neutral-400 font-medium">Pending</span>
                  </div>
                  <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div className="h-full bg-neutral-300 rounded-full" style={{ width: '0%' }} />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-neutral-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-500">Total Budget</p>
                    <p className="text-xl font-bold text-neutral-900">$45,000</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-neutral-500">Spent</p>
                    <p className="text-xl font-bold text-primary-600">$28,500</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Building?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of diaspora homebuilders who trust NESTS to bring their dreams home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="bg-white text-primary-600 hover:bg-primary-50 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Create Free Account
            </Link>
            <Link
              href="/auth/signup?role=vendor"
              className="bg-primary-700 hover:bg-primary-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors border border-primary-500"
            >
              Join as Vendor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
