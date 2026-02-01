'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const categories = [
    { name: 'Electrical', description: 'Wiring, lighting, and power solutions.' },
    { name: 'Plumbing', description: 'Pipes, fixtures, and water systems.' },
    { name: 'Carpentry', description: 'Custom woodworking and repairs.' },
    { name: 'Roofing', description: 'New roofs, repairs, and inspections.' },
    { name: 'Painting', description: 'Interior and exterior painting.' },
  ];

  const quickCategories = ['Flooring', 'Landscaping', 'Carpentry', 'Painting', 'HVAC', 'Roofing', 'Electrical', 'Plumbing'];

  const gradientColors = [
    ['#d97706', '#92400e'],
    ['#2563eb', '#1e40af'],
    ['#059669', '#065f46'],
    ['#dc2626', '#991b1b'],
    ['#9333ea', '#6b21a8'],
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white', fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <header style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 50, 
        padding: '1rem 1.5rem' 
      }}>
        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between' 
        }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <div style={{ width: '40px', height: '40px' }}>
              <svg viewBox="0 0 40 40" fill="none" style={{ width: '100%', height: '100%' }}>
                <path
                  d="M20 2C18 4 15 5 14 8C13 11 14 14 13 17C12 20 10 22 11 25C12 28 15 30 17 33C19 36 20 38 20 38C20 38 21 36 23 33C25 30 28 28 29 25C30 22 28 20 27 17C26 14 27 11 26 8C25 5 22 4 20 2Z"
                  fill="white"
                  opacity="0.9"
                />
              </svg>
            </div>
            <span style={{ color: 'white', fontSize: '1.25rem', fontWeight: 700 }}>NESTS</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link href="/auth/login" style={{
              padding: '0.5rem 1.5rem',
              border: '1px solid white',
              color: 'white',
              fontSize: '0.875rem',
              fontWeight: 500,
              borderRadius: '0.375rem',
              textDecoration: 'none',
            }}>
              Sign In
            </Link>
            <Link href="/auth/signup" style={{
              padding: '0.5rem 1.5rem',
              border: '1px solid white',
              color: 'white',
              fontSize: '0.875rem',
              fontWeight: 500,
              borderRadius: '0.375rem',
              textDecoration: 'none',
            }}>
              Join
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ 
        position: 'relative', 
        height: '600px', 
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0a1628 0%, #1a2a42 50%, #0a1628 100%)'
      }}>
        <div style={{ 
          position: 'relative', 
          zIndex: 10, 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          textAlign: 'center', 
          padding: '4rem 1rem 0' 
        }}>
          <h1 style={{ 
            color: 'white', 
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
            fontWeight: 300, 
            marginBottom: '2rem', 
            lineHeight: 1.2 
          }}>
            Find the Right Contractor<br />for Your Project
          </h1>
          
          {/* Search Bar */}
          <div style={{ width: '100%', maxWidth: '640px', marginBottom: '1.5rem', padding: '0 1rem' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              backgroundColor: 'white', 
              borderRadius: '0.5rem', 
              overflow: 'hidden',
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
            }}>
              <input
                type="text"
                placeholder="Search for any service ..."
                style={{ 
                  flex: 1, 
                  padding: '1rem 1.5rem', 
                  border: 'none', 
                  outline: 'none', 
                  fontSize: '1rem',
                  color: '#374151'
                }}
              />
              <button style={{ 
                padding: '1rem 1.5rem', 
                background: 'transparent', 
                border: 'none', 
                cursor: 'pointer',
                color: '#9ca3af'
              }}>
                <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Category Pills */}
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center', 
            gap: '0.5rem', 
            marginBottom: '2rem',
            maxWidth: '700px',
            padding: '0 1rem'
          }}>
            {quickCategories.map((cat) => (
              <Link
                key={cat}
                href={`/vendors?category=${cat.toLowerCase()}`}
                style={{
                  padding: '0.375rem 1rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontSize: '0.875rem',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                }}
              >
                {cat}
              </Link>
            ))}
          </div>

          {/* Become a Contractor Button */}
          <Link href="/auth/signup?role=vendor" style={{
            padding: '0.75rem 2rem',
            backgroundColor: 'white',
            color: '#0a1628',
            fontSize: '0.875rem',
            fontWeight: 500,
            borderRadius: '0.375rem',
            textDecoration: 'none',
          }}>
            Become a Contractor
          </Link>

          {/* Carousel Dots */}
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '2rem' }}>
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: currentSlide === i ? 'white' : 'rgba(255,255,255,0.4)',
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Explore Top Service Categories */}
      <section style={{ padding: '4rem 1.5rem', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            alignItems: 'center', 
            justifyContent: 'space-between', 
            marginBottom: '2.5rem',
            gap: '1rem'
          }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 300, color: '#0a1628' }}>
              Explore Top Service Categories
            </h2>
            <Link href="/vendors" style={{
              padding: '0.625rem 1.5rem',
              backgroundColor: '#00c896',
              color: 'white',
              fontSize: '0.875rem',
              fontWeight: 500,
              borderRadius: '0.375rem',
              textDecoration: 'none',
            }}>
              View All Categories
            </Link>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
            gap: '1rem' 
          }}>
            {categories.map((category, index) => (
              <Link
                key={category.name}
                href={`/vendors?category=${category.name.toLowerCase()}`}
                style={{
                  position: 'relative',
                  aspectRatio: '4/5',
                  borderRadius: '0.5rem',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  display: 'block',
                }}
              >
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(135deg, ${gradientColors[index][0]} 0%, ${gradientColors[index][1]} 100%)`,
                }} />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
                }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1rem' }}>
                  <h3 style={{ 
                    fontSize: '1.125rem', 
                    fontWeight: 500, 
                    marginBottom: '0.25rem',
                    color: index === 1 ? '#00c896' : 'white'
                  }}>
                    {category.name}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem', lineHeight: 1.5 }}>
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Everything You Need Section */}
      <section style={{ padding: '4rem 1.5rem', backgroundColor: '#0a1628' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '3rem', 
            alignItems: 'center' 
          }}>
            {/* Image Placeholder */}
            <div style={{ 
              height: '400px', 
              borderRadius: '0.5rem', 
              background: 'linear-gradient(135deg, rgba(0,200,150,0.2) 0%, rgba(10,22,40,0.4) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{ textAlign: 'center' }}>
                <svg style={{ width: '80px', height: '80px', margin: '0 auto 1rem', color: 'rgba(0,200,150,0.5)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>Professional contractors</p>
              </div>
            </div>

            {/* Content */}
            <div>
              <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 300, color: 'white', marginBottom: '2.5rem', lineHeight: 1.2 }}>
                Everything You Need to<br />Hire, Track, and Pay with Ease
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
                {[
                  { icon: '⭐', title: 'Top Rated Vendors', desc: 'Discover verified and highly rated professionals across all services.' },
                  { icon: '🔍', title: 'Find the Vendors', desc: 'Easily browse and connect with the right experts for your project needs.' },
                  { icon: '✓', title: 'Track Your Progress', desc: 'Stay updated in real time with tools that keep your project on schedule.' },
                  { icon: '💰', title: 'Secured Payment', desc: "Your funds are safe until you're fully satisfied." },
                ].map((item, i) => (
                  <div key={i}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      backgroundColor: '#00c896',
                      borderRadius: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1rem',
                      fontSize: '1.5rem'
                    }}>
                      {item.icon}
                    </div>
                    <h3 style={{ color: 'white', fontSize: '1.125rem', fontWeight: 500, marginBottom: '0.5rem' }}>{item.title}</h3>
                    <p style={{ color: '#9ca3af', fontSize: '0.875rem', lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section style={{ padding: '4rem 1.5rem', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '3rem', 
            alignItems: 'center' 
          }}>
            {/* Content */}
            <div>
              <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 300, color: '#0a1628', marginBottom: '2.5rem' }}>
                How it Works
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {[
                  { icon: '📋', title: 'Post your project', desc: "Describe your construction needs in detail. It's quick, easy, and free." },
                  { icon: '🤝', title: 'Get Matched & Receive Bids', desc: 'We connect you with qualified contractors. Compare bids and profiles.' },
                  { icon: '✅', title: 'Hire & Get Work Done', desc: 'Choose the best fit, hire securely, and watch your project come to life.' },
                ].map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      backgroundColor: '#e8f7f3',
                      borderRadius: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      fontSize: '1.5rem'
                    }}>
                      {step.icon}
                    </div>
                    <div>
                      <h3 style={{ color: '#00c896', fontSize: '1.125rem', fontWeight: 500, marginBottom: '0.25rem' }}>{step.title}</h3>
                      <p style={{ color: '#4b5563', fontSize: '0.875rem' }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Placeholder */}
            <div style={{
              height: '400px',
              borderRadius: '0.5rem',
              background: 'linear-gradient(135deg, #e8f7f3 0%, rgba(0,200,150,0.2) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{ textAlign: 'center' }}>
                <svg style={{ width: '80px', height: '80px', margin: '0 auto 1rem', color: 'rgba(0,200,150,0.5)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <p style={{ color: 'rgba(10,22,40,0.6)', fontSize: '0.875rem' }}>Review plans together</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        position: 'relative', 
        padding: '6rem 1.5rem', 
        background: 'linear-gradient(135deg, #0a1628 0%, #1a2a42 50%, #0a1628 100%)'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 300, color: 'white', marginBottom: '1rem' }}>
            Ready to Start Your Project?
          </h2>
          <p style={{ color: '#d1d5db', fontSize: '1.125rem', marginBottom: '2rem' }}>
            Join thousands of satisfied clients and contractors today.
          </p>
          <Link href="/auth/signup" style={{
            display: 'inline-block',
            padding: '0.875rem 2.5rem',
            backgroundColor: 'white',
            color: '#0a1628',
            fontSize: '0.875rem',
            fontWeight: 500,
            borderRadius: '0.375rem',
            textDecoration: 'none',
          }}>
            Sign Up Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: 'white', padding: '3rem 1.5rem', borderTop: '1px solid #f3f4f6' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
            gap: '2rem', 
            marginBottom: '3rem' 
          }}>
            {/* Logo Column */}
            <div>
              <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', marginBottom: '1.5rem' }}>
                <div style={{ width: '40px', height: '40px' }}>
                  <svg viewBox="0 0 40 40" fill="none" style={{ width: '100%', height: '100%' }}>
                    <path
                      d="M20 2C18 4 15 5 14 8C13 11 14 14 13 17C12 20 10 22 11 25C12 28 15 30 17 33C19 36 20 38 20 38C20 38 21 36 23 33C25 30 28 28 29 25C30 22 28 20 27 17C26 14 27 11 26 8C25 5 22 4 20 2Z"
                      fill="#00c896"
                      opacity="0.9"
                    />
                  </svg>
                </div>
                <span style={{ color: '#0a1628', fontSize: '1.25rem', fontWeight: 700 }}>NESTS</span>
              </Link>
            </div>

            {/* Categories */}
            <div>
              <h4 style={{ color: '#0a1628', fontWeight: 600, fontSize: '0.875rem', marginBottom: '1rem' }}>Categories</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['Plumbing', 'Electrical', 'Roofing', 'HVAC', 'Painting'].map((item) => (
                  <li key={item} style={{ marginBottom: '0.5rem' }}>
                    <Link href={`/vendors?category=${item.toLowerCase()}`} style={{ color: '#6b7280', fontSize: '0.875rem', textDecoration: 'none' }}>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* For Clients */}
            <div>
              <h4 style={{ color: '#0a1628', fontWeight: 600, fontSize: '0.875rem', marginBottom: '1rem' }}>For Clients</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['How It Works', 'Customer Stories', 'Trust & Safety'].map((item) => (
                  <li key={item} style={{ marginBottom: '0.5rem' }}>
                    <Link href="#" style={{ color: '#6b7280', fontSize: '0.875rem', textDecoration: 'none' }}>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* For Contractors */}
            <div>
              <h4 style={{ color: '#0a1628', fontWeight: 600, fontSize: '0.875rem', marginBottom: '1rem' }}>For Contractors</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['Become a Contractor', 'Resources', 'Events'].map((item) => (
                  <li key={item} style={{ marginBottom: '0.5rem' }}>
                    <Link href="#" style={{ color: '#6b7280', fontSize: '0.875rem', textDecoration: 'none' }}>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 style={{ color: '#0a1628', fontWeight: 600, fontSize: '0.875rem', marginBottom: '1rem' }}>Company</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['About Us', 'Careers', 'Contact Us'].map((item) => (
                  <li key={item} style={{ marginBottom: '0.5rem' }}>
                    <Link href="#" style={{ color: '#6b7280', fontSize: '0.875rem', textDecoration: 'none' }}>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div style={{ 
            paddingTop: '2rem', 
            borderTop: '1px solid #f3f4f6', 
            display: 'flex', 
            flexWrap: 'wrap',
            alignItems: 'center', 
            justifyContent: 'space-between',
            gap: '1rem'
          }}>
            <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
              © Nests 2025. All Rights Reserved.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <Link href="/privacy" style={{ color: '#9ca3af', fontSize: '0.875rem', textDecoration: 'none' }}>
                Privacy Policy
              </Link>
              <Link href="/terms" style={{ color: '#9ca3af', fontSize: '0.875rem', textDecoration: 'none' }}>
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
