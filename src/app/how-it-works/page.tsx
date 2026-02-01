import Link from 'next/link';

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <section className="bg-primary-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">How NESTS Works</h1>
          <p className="text-xl text-primary-100">
            Building your dream home in Zimbabwe has never been easier. 
            Here&apos;s how we connect you with trusted local professionals.
          </p>
        </div>
      </section>

      {/* For Clients */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-primary-600 font-semibold">For Homebuilders</span>
            <h2 className="text-3xl font-bold text-neutral-900 mt-2">
              Build with Confidence from Anywhere
            </h2>
          </div>

          <div className="space-y-12">
            {/* Step 1 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  Create Your Account
                </h3>
                <p className="text-neutral-600">
                  Sign up for free and tell us about your project. Whether you&apos;re 
                  planning a new build, renovation, or just starting to explore options, 
                  we&apos;ll help you get started.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  Browse Verified Vendors
                </h3>
                <p className="text-neutral-600">
                  Explore our marketplace of pre-verified contractors, architects, 
                  electricians, and more. View their portfolios, read reviews, and 
                  find the perfect match for your project.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  Request & Compare Quotes
                </h3>
                <p className="text-neutral-600">
                  Describe your project and request quotes from multiple vendors. 
                  Compare detailed breakdowns, timelines, and pricing to make an 
                  informed decision.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  4
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  Accept & Pay Securely
                </h3>
                <p className="text-neutral-600">
                  Choose your preferred vendor and make a secure payment. Your funds 
                  are held safely until project milestones are completed and approved.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-success-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  5
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  Track Progress & Approve Milestones
                </h3>
                <p className="text-neutral-600">
                  Stay connected to your project with real-time updates and photos. 
                  Review completed milestones and release payments as work progresses. 
                  Your dream home, built with transparency.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/auth/signup" className="btn-primary text-lg px-8 py-3">
              Start Building Today
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-neutral-200" />

      {/* For Vendors */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-secondary-600 font-semibold">For Vendors</span>
            <h2 className="text-3xl font-bold text-neutral-900 mt-2">
              Grow Your Business with NESTS
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Access Diaspora Clients
              </h3>
              <p className="text-neutral-600">
                Connect with Zimbabweans abroad who are ready to invest in building 
                their dream homes. Access a market of motivated, funded clients.
              </p>
            </div>

            <div className="card">
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Secure Payments
              </h3>
              <p className="text-neutral-600">
                Get paid reliably through our escrow system. Funds are released 
                as you complete milestones, ensuring fair compensation for your work.
              </p>
            </div>

            <div className="card">
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Showcase Your Work
              </h3>
              <p className="text-neutral-600">
                Build a professional portfolio that highlights your best projects. 
                Let your work speak for itself and attract quality clients.
              </p>
            </div>

            <div className="card">
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Grow Your Reputation
              </h3>
              <p className="text-neutral-600">
                Build trust through verified reviews and ratings. Quality work 
                leads to more referrals and a stronger business.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/auth/vendor-signup" className="btn-secondary text-lg px-8 py-3">
              Join as a Vendor
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-neutral-900 text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="card">
              <h3 className="font-semibold text-neutral-900 mb-2">
                How are vendors verified?
              </h3>
              <p className="text-neutral-600">
                All vendors go through a verification process that includes business 
                registration checks, portfolio review, and reference verification. 
                We ensure only qualified professionals join our platform.
              </p>
            </div>

            <div className="card">
              <h3 className="font-semibold text-neutral-900 mb-2">
                How does the payment system work?
              </h3>
              <p className="text-neutral-600">
                Payments are held in escrow until project milestones are completed. 
                You review the work, approve the milestone, and funds are released 
                to the vendor. This protects both parties throughout the project.
              </p>
            </div>

            <div className="card">
              <h3 className="font-semibold text-neutral-900 mb-2">
                What if there&apos;s a dispute?
              </h3>
              <p className="text-neutral-600">
                Our support team mediates any disputes between clients and vendors. 
                We review evidence from both parties and work to find a fair resolution. 
                The escrow system ensures funds are protected during this process.
              </p>
            </div>

            <div className="card">
              <h3 className="font-semibold text-neutral-900 mb-2">
                Can I visit my project site?
              </h3>
              <p className="text-neutral-600">
                Absolutely! While NESTS helps you manage your project remotely, 
                you&apos;re welcome to visit your site anytime. Vendors provide regular 
                photo updates, but nothing beats seeing your dream home in person.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of Zimbabweans building their dreams with NESTS.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="bg-white text-primary-600 hover:bg-primary-50 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Create Free Account
            </Link>
            <Link
              href="/vendors"
              className="bg-primary-700 hover:bg-primary-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors border border-primary-500"
            >
              Browse Vendors
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
