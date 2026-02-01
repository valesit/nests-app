'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// ============================================
// NESTS Landing Page - Complete Implementation
// ============================================

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const categories = [
    { name: 'Electrical', description: 'Wiring, lighting, and power solutions.', image: '/images/electrical.jpg' },
    { name: 'Plumbing', description: 'We connect you with qualified contractors. Compare bids and profiles.', image: '/images/plumbing.jpg' },
    { name: 'Carpentry', description: 'Custom woodworking, framing, and repairs.', image: '/images/carpentry.jpg' },
    { name: 'Roofing', description: 'New roofs, repairs, and inspections.', image: '/images/roofing.jpg' },
    { name: 'Painting', description: 'Interior and exterior painting services.', image: '/images/painting.jpg' },
  ];

  const testimonials = [
    {
      name: 'Jane Doe',
      rating: 5,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      name: 'Jane Doe',
      rating: 5,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
  ];

  const quickCategories = ['Flooring', 'Landscaping', 'Carpentry', 'Painting', 'HVAC', 'Roofing', 'Electrical', 'Plumbing'];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 relative">
              <AfricaLogo />
            </div>
            <span className="text-white text-xl font-bold tracking-wide">NESTS</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link 
              href="/signin" 
              className="px-6 py-2 border border-white text-white text-sm font-medium rounded hover:bg-white hover:text-[#0a1628] transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="/join" 
              className="px-6 py-2 border border-white text-white text-sm font-medium rounded hover:bg-white hover:text-[#0a1628] transition-colors"
            >
              Join
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#1a2a42] to-[#0a1628]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/70 to-[#0a1628]/40" />
        </div>
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pt-16">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-light mb-8 leading-tight">
            Find the Right Contractor<br />
            for Your Project
          </h1>
          
          {/* Search Bar */}
          <div className="w-full max-w-2xl mb-6">
            <div className="flex items-center bg-white rounded-lg overflow-hidden shadow-lg">
              <input
                type="text"
                placeholder="Search for any service ..."
                className="flex-1 px-6 py-4 text-gray-700 text-base outline-none"
              />
              <button className="px-6 py-4 text-gray-400 hover:text-[#00c896] transition-colors">
                <SearchIcon />
              </button>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-3xl">
            {quickCategories.map((cat) => (
              <Link
                key={cat}
                href={`/categories/${cat.toLowerCase()}`}
                className="px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full hover:bg-white/30 transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>

          {/* Become a Contractor Button */}
          <Link
            href="/become-contractor"
            className="px-8 py-3 bg-white text-[#0a1628] text-sm font-medium rounded hover:bg-gray-100 transition-colors"
          >
            Become a Contractor
          </Link>

          {/* Carousel Dots */}
          <div className="flex gap-2 mt-8">
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentSlide === i ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Explore Top Service Categories */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl md:text-4xl font-light text-[#0a1628]">
              Explore Top Service Categories
            </h2>
            <Link
              href="/categories"
              className="px-6 py-2.5 bg-[#00c896] text-white text-sm font-medium rounded hover:bg-[#00b085] transition-colors"
            >
              View All Categories
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.map((category, index) => {
              const gradients = [
                'from-amber-600 to-amber-800',
                'from-blue-600 to-blue-800',
                'from-emerald-600 to-emerald-800',
                'from-red-600 to-red-800',
                'from-purple-600 to-purple-800',
              ];
              return (
                <Link
                  key={category.name}
                  href={`/categories/${category.name.toLowerCase()}`}
                  className="group relative overflow-hidden rounded-lg aspect-[4/5]"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index]} group-hover:scale-105 transition-transform duration-300`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className={`text-lg font-medium mb-1 ${index === 1 ? 'text-[#00c896]' : 'text-white'}`}>
                      {category.name}
                    </h3>
                    <p className="text-white/80 text-xs leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Everything You Need Section */}
      <section className="py-16 bg-[#0a1628]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Placeholder */}
            <div className="relative h-[500px] rounded-lg overflow-hidden bg-gradient-to-br from-[#00c896]/20 to-[#0a1628]/40 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-24 h-24 mx-auto text-[#00c896]/50 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="text-white/60 text-sm">Professional contractors</p>
              </div>
            </div>

            {/* Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-light text-white mb-10 leading-tight">
                Everything You Need to<br />
                Hire, Track, and Pay with Ease
              </h2>

              <div className="grid grid-cols-2 gap-8">
                {/* Top Rated Vendors */}
                <div>
                  <div className="w-14 h-14 bg-[#00c896] rounded-lg flex items-center justify-center mb-4">
                    <StarIcon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-white text-lg font-medium mb-2">Top Rated Vendors</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Discover verified and highly rated professionals across all services.
                  </p>
                </div>

                {/* Find the Vendors */}
                <div>
                  <div className="w-14 h-14 bg-[#00c896] rounded-lg flex items-center justify-center mb-4">
                    <PlusIcon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-white text-lg font-medium mb-2">Find the Vendors</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Easily browse and connect with the right experts for your project needs.
                  </p>
                </div>

                {/* Track Your Project Progress */}
                <div>
                  <div className="w-14 h-14 bg-[#00c896] rounded-lg flex items-center justify-center mb-4">
                    <CheckCircleIcon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-white text-lg font-medium mb-2">Track Your Project Progress</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Stay updated in real time with tools that keep your Project on schedule.
                  </p>
                </div>

                {/* Secured Payment */}
                <div>
                  <div className="w-14 h-14 bg-[#00c896] rounded-lg flex items-center justify-center mb-4">
                    <DollarIcon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-white text-lg font-medium mb-2">Secured Payment</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Your funds are safe until you're fully satisfied.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Our Customers Say */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Title Column */}
            <div>
              <h2 className="text-3xl md:text-4xl font-light text-[#0a1628] mb-6">
                What Our<br />
                Customers Say
              </h2>
              <div className="flex items-center gap-3">
                <Link
                  href="/reviews"
                  className="px-6 py-2.5 bg-[#00c896] text-white text-sm font-medium rounded hover:bg-[#00b085] transition-colors"
                >
                  View All Reviews
                </Link>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setCurrentTestimonial(Math.max(0, currentTestimonial - 1))}
                    className="w-10 h-10 rounded-full border-2 border-[#0a1628] flex items-center justify-center hover:bg-[#0a1628] hover:text-white transition-colors"
                  >
                    <ChevronLeftIcon className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setCurrentTestimonial(Math.min(testimonials.length - 1, currentTestimonial + 1))}
                    className="w-10 h-10 rounded-full border-2 border-[#0a1628] flex items-center justify-center hover:bg-[#0a1628] hover:text-white transition-colors"
                  >
                    <ChevronRightIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Testimonial Cards */}
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white">
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {testimonial.text}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <span className="text-[#0a1628] font-medium">{testimonial.name}</span>
                  <div className="flex gap-0.5 ml-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarFilledIcon key={i} className="w-4 h-4 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-light text-[#0a1628] mb-10">
                How it Works
              </h2>

              <div className="space-y-8">
                {/* Step 1 */}
                <div className="flex gap-4">
                  <div className="w-14 h-14 bg-[#e8f7f3] rounded-lg flex items-center justify-center flex-shrink-0">
                    <DocumentIcon className="w-7 h-7 text-[#00c896]" />
                  </div>
                  <div>
                    <h3 className="text-[#00c896] text-lg font-medium mb-1">Post your project</h3>
                    <p className="text-gray-600 text-sm">
                      Describe your construction needs in detail. It's quick, easy, and free.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4">
                  <div className="w-14 h-14 bg-[#e8f7f3] rounded-lg flex items-center justify-center flex-shrink-0">
                    <HandshakeIcon className="w-7 h-7 text-[#00c896]" />
                  </div>
                  <div>
                    <h3 className="text-[#00c896] text-lg font-medium mb-1">Get Matched & Receive Bids</h3>
                    <p className="text-gray-600 text-sm">
                      We connect you with qualified contractors. Compare bids and profiles.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                  <div className="w-14 h-14 bg-[#e8f7f3] rounded-lg flex items-center justify-center flex-shrink-0">
                    <FolderIcon className="w-7 h-7 text-[#00c896]" />
                  </div>
                  <div>
                    <h3 className="text-[#00c896] text-lg font-medium mb-1">Hire & Get Work Done</h3>
                    <p className="text-gray-600 text-sm">
                      Choose the best fit, hire securely, and watch your project come to life.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Placeholder */}
            <div className="relative h-[450px] rounded-lg overflow-hidden bg-gradient-to-br from-[#e8f7f3] to-[#00c896]/20 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-24 h-24 mx-auto text-[#00c896]/50 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <p className="text-[#0a1628]/60 text-sm">Review plans together</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Start Your Project CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#1a2a42] to-[#0a1628]">
          <div className="absolute inset-0 bg-[#0a1628]/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Join thousands of satisfied clients and contractors today.
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-3 bg-white text-[#0a1628] text-sm font-medium rounded hover:bg-gray-100 transition-colors"
          >
            Sign Up Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
            {/* Logo Column */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10">
                  <AfricaLogoGreen />
                </div>
                <span className="text-[#0a1628] text-xl font-bold tracking-wide">NESTS</span>
              </Link>
              <div className="flex gap-4">
                <Link href="#" className="text-gray-400 hover:text-[#0a1628] transition-colors">
                  <FacebookIcon className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-[#0a1628] transition-colors">
                  <XIcon className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-[#0a1628] transition-colors">
                  <InstagramIcon className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-[#0a1628] transition-colors">
                  <LinkedInIcon className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-[#0a1628] font-semibold text-sm mb-4">Categories</h4>
              <ul className="space-y-2">
                {['Plumbing', 'Electrical', 'Roofing', 'HVAC', 'Painting', 'Carpentry', 'Landscaping', 'Flooring'].map((item) => (
                  <li key={item}>
                    <Link href={`/categories/${item.toLowerCase()}`} className="text-gray-500 text-sm hover:text-[#00c896] transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* For Clients */}
            <div>
              <h4 className="text-[#0a1628] font-semibold text-sm mb-4">For Clients</h4>
              <ul className="space-y-2">
                {['How It Works', 'Customer Stories', 'Trust & Safety', 'Quality Guide', 'Client Guides'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-500 text-sm hover:text-[#00c896] transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* For Contractors */}
            <div>
              <h4 className="text-[#0a1628] font-semibold text-sm mb-4">For Contractors</h4>
              <ul className="space-y-2">
                {['Become a Contractor', 'Community Hub', 'Resources', 'Events'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-500 text-sm hover:text-[#00c896] transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Business Solutions */}
            <div>
              <h4 className="text-[#0a1628] font-semibold text-sm mb-4">Business Solutions</h4>
              <ul className="space-y-2">
                {['Construction Pro', 'Project Management Service', 'Expert Sourcing Service', 'AI Tools for Contractors'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-500 text-sm hover:text-[#00c896] transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-[#0a1628] font-semibold text-sm mb-4">Company</h4>
              <ul className="space-y-2">
                {['About Us', 'Careers', 'Terms of Service', 'Privacy Policy', 'Contact Us'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-500 text-sm hover:text-[#00c896] transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © Nests 2025. All Rights Reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-gray-400 text-sm hover:text-[#00c896] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="text-gray-400 text-sm hover:text-[#00c896] transition-colors">
                Cookie Policy
              </Link>
              <Link href="/terms" className="text-gray-400 text-sm hover:text-[#00c896] transition-colors">
                Terms & Conditions
              </Link>
            </div>
            <p className="text-gray-400 text-sm">
              Crafted by Alliancetek
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ============================================
// Icon Components
// ============================================

function AfricaLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
      <path
        d="M20 2C18 4 15 5 14 8C13 11 14 14 13 17C12 20 10 22 11 25C12 28 15 30 17 33C19 36 20 38 20 38C20 38 21 36 23 33C25 30 28 28 29 25C30 22 28 20 27 17C26 14 27 11 26 8C25 5 22 4 20 2Z"
        fill="white"
        opacity="0.9"
      />
      <circle cx="20" cy="18" r="3" fill="#0a1628" opacity="0.3" />
    </svg>
  );
}

function AfricaLogoGreen() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
      <path
        d="M20 2C18 4 15 5 14 8C13 11 14 14 13 17C12 20 10 22 11 25C12 28 15 30 17 33C19 36 20 38 20 38C20 38 21 36 23 33C25 30 28 28 29 25C30 22 28 20 27 17C26 14 27 11 26 8C25 5 22 4 20 2Z"
        fill="#00c896"
        opacity="0.9"
      />
      <circle cx="20" cy="18" r="3" fill="#0a1628" opacity="0.3" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function StarFilledIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function DollarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function HandshakeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.22 19.85c-.18.18-.5.21-.71 0L3.93 12.27a2 2 0 010-2.83l3.54-3.54a2 2 0 012.83 0l.71.71-1.77 1.77a1.5 1.5 0 000 2.12l3.18 3.18a1.5 1.5 0 002.12 0l1.77-1.77.71.71a2 2 0 010 2.83l-3.54 3.54c-.18.18-.5.21-.71 0l-.55-.55z" />
      <path d="M20.07 11.73a2 2 0 000-2.83l-3.54-3.54a2 2 0 00-2.83 0l-.71.71 1.77 1.77a1.5 1.5 0 010 2.12l-3.18 3.18a1.5 1.5 0 01-2.12 0L7.69 11.37l-.71.71a2 2 0 000 2.83l3.54 3.54" />
    </svg>
  );
}

function FolderIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 10H6v-2h8v2zm4-4H6v-2h12v2z" />
    </svg>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
