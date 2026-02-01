import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-primary-600 font-bold text-xl">N</span>
              </div>
              <span className="text-xl font-bold">NESTS</span>
            </div>
            <p className="text-primary-200 max-w-md">
              Connecting diaspora homebuilders with trusted local contractors in Zimbabwe. 
              Build your dream home with confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/vendors" className="text-primary-200 hover:text-white transition-colors">
                  Find Vendors
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-primary-200 hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/auth/signup" className="text-primary-200 hover:text-white transition-colors">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* For Vendors */}
          <div>
            <h3 className="font-semibold mb-4">For Vendors</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/auth/vendor-signup" className="text-primary-200 hover:text-white transition-colors">
                  Join as Vendor
                </Link>
              </li>
              <li>
                <Link href="/vendor/dashboard" className="text-primary-200 hover:text-white transition-colors">
                  Vendor Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-300 text-sm">
            &copy; {new Date().getFullYear()} NESTS. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-primary-300 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-primary-300 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
