'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentBgImage, setCurrentBgImage] = useState(0);

  const heroBackgroundImages = [
    'https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=1920&h=1080&fit=crop', // Modern living room
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&h=1080&fit=crop', // Construction site
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&h=1080&fit=crop', // Workers on site
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop', // Modern house exterior
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&h=1080&fit=crop', // Interior design
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop', // Luxury interior
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgImage((prev) => (prev + 1) % heroBackgroundImages.length);
    }, 15000);
    return () => clearInterval(interval);
  }, [heroBackgroundImages.length]);

  const categories = [
    { 
      name: 'Electrical', 
      description: 'Wiring, lighting, and power solutions.',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=500&fit=crop'
    },
    { 
      name: 'Plumbing', 
      description: 'Pipes, fixtures, and water systems.',
      image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=500&fit=crop'
    },
    { 
      name: 'Carpentry', 
      description: 'Custom woodworking and repairs.',
      image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=500&fit=crop'
    },
    { 
      name: 'Roofing', 
      description: 'New roofs, repairs, and inspections.',
      image: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?w=400&h=500&fit=crop'
    },
    { 
      name: 'Painting', 
      description: 'Interior and exterior painting.',
      image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=500&fit=crop'
    },
  ];

  const quickCategories = ['Flooring', 'Landscaping', 'Carpentry', 'Painting', 'HVAC', 'Roofing', 'Electrical', 'Plumbing'];

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
      }}>
        {/* Background Image */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${heroBackgroundImages[currentBgImage]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'background-image 1s ease-in-out',
        }} />
        {/* Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(5, 57, 108, 0.85), rgba(5, 57, 108, 0.6))',
        }} />
        
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
            color: '#05396c',
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
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 300, color: '#05396c' }}>
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
                <img 
                  src={category.image} 
                  alt={category.name}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
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
      <section style={{ padding: '0', backgroundColor: 'white' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {/* Left Image */}
          <div style={{ 
            flex: '1 1 40%', 
            minWidth: '300px',
            minHeight: '600px',
            position: 'relative'
          }}>
            <img 
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=900&fit=crop"
              alt="Construction workers on site"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                position: 'absolute',
                inset: 0,
              }}
            />
          </div>

          {/* Right Content */}
          <div style={{ 
            flex: '1 1 60%', 
            minWidth: '300px',
            padding: '4rem 3rem',
            backgroundColor: 'white'
          }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300, color: '#05396c', marginBottom: '3rem', lineHeight: 1.2 }}>
              Everything You Need to<br />Hire, Track, and Pay with Ease
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2.5rem' }}>
              {[
                { 
                  title: 'Top Rated Vendors', 
                  desc: 'Discover verified and highly rated professionals across all services.',
                  icon: (
                    <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
                      <rect x="5" y="5" width="60" height="60" rx="8" fill="#05396c"/>
                      <path d="M35 22l5 10 11 1.5-8 8 2 11-10-5.5-10 5.5 2-11-8-8 11-1.5 5-10z" fill="#00c896"/>
                    </svg>
                  )
                },
                { 
                  title: 'Find the Vendors', 
                  desc: 'Easily browse and connect with the right experts for your project needs.',
                  icon: (
                    <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
                      <rect x="5" y="5" width="60" height="60" rx="8" fill="#05396c"/>
                      <path d="M35 20v6m0 18v6m-15-15h6m18 0h6" stroke="#00c896" strokeWidth="4" strokeLinecap="round"/>
                      <path d="M24 24l4 4m14 14l4 4m-22 0l4-4m14-14l4-4" stroke="#00c896" strokeWidth="4" strokeLinecap="round"/>
                    </svg>
                  )
                },
                { 
                  title: 'Track Your Project Progress', 
                  desc: 'Stay updated in real time with tools that keep your Project on schedule.',
                  icon: (
                    <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
                      <rect x="5" y="5" width="60" height="60" rx="8" fill="#05396c"/>
                      <circle cx="35" cy="35" r="16" stroke="#00c896" strokeWidth="4"/>
                      <path d="M35 25v10l7 7" stroke="#00c896" strokeWidth="4" strokeLinecap="round"/>
                    </svg>
                  )
                },
                { 
                  title: 'Secured Payment', 
                  desc: "Your funds are safe until you're fully satisfied.",
                  icon: (
                    <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
                      <rect x="5" y="5" width="60" height="60" rx="8" fill="#05396c"/>
                      <circle cx="35" cy="35" r="16" stroke="#00c896" strokeWidth="4"/>
                      <path d="M35 25v20M29 32h12" stroke="#00c896" strokeWidth="4" strokeLinecap="round"/>
                    </svg>
                  )
                },
              ].map((item, i) => (
                <div key={i}>
                  <div style={{
                    width: '70px',
                    height: '70px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                  }}>
                    {item.icon}
                  </div>
                  <h3 style={{ color: '#05396c', fontSize: '1.25rem', fontWeight: 500, marginBottom: '0.5rem' }}>{item.title}</h3>
                  <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What Our Customers Say */}
      <section style={{ padding: '4rem 1.5rem', backgroundColor: '#05396c' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '3rem', 
            alignItems: 'start' 
          }}>
            {/* Left Column - Title and Navigation */}
            <div>
              <h2 style={{ 
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', 
                fontWeight: 400, 
                color: 'white', 
                marginBottom: '2rem',
                lineHeight: 1.3
              }}>
                What Our<br />Customers Say
              </h2>
              
              <Link href="#" style={{
                display: 'inline-block',
                padding: '0.75rem 1.5rem',
                backgroundColor: '#00c896',
                color: 'white',
                fontSize: '0.875rem',
                fontWeight: 500,
                borderRadius: '0.375rem',
                textDecoration: 'none',
                marginBottom: '1.5rem',
              }}>
                View All Reviews
              </Link>
              
              {/* Navigation Arrows */}
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                <button style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.3)',
                  backgroundColor: 'transparent',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem'
                }}>
                  ←
                </button>
                <button style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.3)',
                  backgroundColor: 'transparent',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem'
                }}>
                  →
                </button>
              </div>
            </div>

            {/* Testimonial 1 */}
            <div>
              <p style={{ 
                color: 'rgba(255,255,255,0.85)', 
                fontSize: '0.875rem', 
                lineHeight: 1.7,
                marginBottom: '1.5rem'
              }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#4b5563',
                  overflow: 'hidden'
                }}>
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                    alt="Jane Doe"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <span style={{ color: 'white', fontWeight: 500, fontSize: '0.9rem' }}>Jane Doe</span>
                <div style={{ display: 'flex', gap: '2px', marginLeft: '0.5rem' }}>
                  {[1,2,3,4,5].map((star) => (
                    <span key={star} style={{ color: '#fbbf24', fontSize: '0.875rem' }}>★</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div>
              <p style={{ 
                color: 'rgba(255,255,255,0.85)', 
                fontSize: '0.875rem', 
                lineHeight: 1.7,
                marginBottom: '1.5rem'
              }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#4b5563',
                  overflow: 'hidden'
                }}>
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                    alt="Jane Doe"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <span style={{ color: 'white', fontWeight: 500, fontSize: '0.9rem' }}>Jane Doe</span>
                <div style={{ display: 'flex', gap: '2px', marginLeft: '0.5rem' }}>
                  {[1,2,3,4,5].map((star) => (
                    <span key={star} style={{ color: '#fbbf24', fontSize: '0.875rem' }}>★</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section style={{ padding: '0', backgroundColor: 'white' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {/* Left Content */}
          <div style={{ 
            flex: '1 1 50%', 
            minWidth: '300px',
            padding: '4rem 3rem',
            backgroundColor: 'white'
          }}>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 5vw, 3rem)', 
              fontWeight: 300, 
              color: '#05396c', 
              marginBottom: '3rem' 
            }}>
              How it Works
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {/* Step 1 - Post your project */}
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: '70px',
                    height: '70px',
                    backgroundColor: '#05396c',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                      <rect x="6" y="3" width="24" height="30" rx="3" fill="#00c896"/>
                      <rect x="10" y="8" width="16" height="2" rx="1" fill="#05396c"/>
                      <rect x="10" y="13" width="16" height="2" rx="1" fill="#05396c"/>
                      <rect x="10" y="18" width="10" height="2" rx="1" fill="#05396c"/>
                    </svg>
                  </div>
                  <div style={{ width: '2px', height: '60px', borderLeft: '2px dashed #05396c', marginTop: '0.5rem' }}></div>
                </div>
                <div style={{ paddingTop: '0.5rem' }}>
                  <h3 style={{ color: '#05396c', fontSize: '1.5rem', fontWeight: 500, marginBottom: '0.5rem' }}>Post your project</h3>
                  <p style={{ color: '#4b5563', fontSize: '1rem', lineHeight: 1.6 }}>Describe your construction needs in detail. It&apos;s quick, easy, and free.</p>
                </div>
              </div>

              {/* Step 2 - Get Matched & Receive Bids */}
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: '70px',
                    height: '70px',
                    backgroundColor: '#05396c',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                      <path d="M8 28L18 18L28 28" stroke="#00c896" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 18L18 8L28 18" stroke="#00c896" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div style={{ width: '2px', height: '60px', borderLeft: '2px dashed #05396c', marginTop: '0.5rem' }}></div>
                </div>
                <div style={{ paddingTop: '0.5rem' }}>
                  <h3 style={{ color: '#05396c', fontSize: '1.5rem', fontWeight: 500, marginBottom: '0.5rem' }}>Get Matched & Receive Bids</h3>
                  <p style={{ color: '#4b5563', fontSize: '1rem', lineHeight: 1.6 }}>We connect you with qualified contractors. Compare bids and profiles.</p>
                </div>
              </div>

              {/* Step 3 - Hire & Get Work Done */}
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: '70px',
                    height: '70px',
                    backgroundColor: '#05396c',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                      <path d="M10 18L16 24L26 12" stroke="#00c896" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div style={{ paddingTop: '0.5rem' }}>
                  <h3 style={{ color: '#05396c', fontSize: '1.5rem', fontWeight: 500, marginBottom: '0.5rem' }}>Hire & Get Work Done</h3>
                  <p style={{ color: '#4b5563', fontSize: '1rem', lineHeight: 1.6 }}>Choose the best fit, hire securely, and watch your project come to life.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div style={{ 
            flex: '1 1 50%', 
            minWidth: '300px',
            minHeight: '500px',
            position: 'relative'
          }}>
            <img 
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=700&fit=crop"
              alt="Construction workers reviewing plans"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                position: 'absolute',
                inset: 0,
              }}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        position: 'relative', 
        padding: '6rem 1.5rem', 
        overflow: 'hidden',
      }}>
        {/* Background Image */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&h=800&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
        {/* Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(5, 57, 108, 0.85)',
        }} />
        
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
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
            color: '#05396c',
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
                <span style={{ color: '#05396c', fontSize: '1.25rem', fontWeight: 700 }}>NESTS</span>
              </Link>
            </div>

            {/* Categories */}
            <div>
              <h4 style={{ color: '#05396c', fontWeight: 600, fontSize: '0.875rem', marginBottom: '1rem' }}>Categories</h4>
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
              <h4 style={{ color: '#05396c', fontWeight: 600, fontSize: '0.875rem', marginBottom: '1rem' }}>For Clients</h4>
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
              <h4 style={{ color: '#05396c', fontWeight: 600, fontSize: '0.875rem', marginBottom: '1rem' }}>For Contractors</h4>
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
              <h4 style={{ color: '#05396c', fontWeight: 600, fontSize: '0.875rem', marginBottom: '1rem' }}>Company</h4>
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
