import Link from 'next/link';

export default function BecomeContractorPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white', fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <header style={{ backgroundColor: '#05396c', padding: '1.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <div style={{ width: '40px', height: '40px' }}>
              <svg viewBox="0 0 40 40" fill="none" style={{ width: '100%', height: '100%' }}>
                <path d="M20 2C18 4 15 5 14 8C13 11 14 14 13 17C12 20 10 22 11 25C12 28 15 30 17 33C19 36 20 38 20 38C20 38 21 36 23 33C25 30 28 28 29 25C30 22 28 20 27 17C26 14 27 11 26 8C25 5 22 4 20 2Z" fill="#00c896" />
              </svg>
            </div>
            <span style={{ color: 'white', fontSize: '1.5rem', fontWeight: 700 }}>NESTS</span>
          </Link>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link href="/auth/login" style={{ padding: '0.5rem 1.5rem', border: '1px solid white', color: 'white', borderRadius: '0.375rem', textDecoration: 'none', fontSize: '0.875rem' }}>Sign In</Link>
            <Link href="/auth/vendor-signup" style={{ padding: '0.5rem 1.5rem', backgroundColor: 'white', color: '#05396c', borderRadius: '0.375rem', textDecoration: 'none', fontSize: '0.875rem' }}>Join</Link>
          </div>
        </div>
        <div style={{ maxWidth: '1280px', margin: '2rem auto 0' }}>
          <h1 style={{ color: '#00c896', fontSize: '2rem', fontWeight: 400, marginBottom: '0.5rem' }}>Become a Contractor</h1>
          <p style={{ color: 'white', fontSize: '0.875rem' }}>
            <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 0.5rem' }}>&gt;</span>
            <span style={{ color: '#00c896' }}>Become a Contractor</span>
          </p>
        </div>
      </header>

      {/* Intro Section */}
      <section style={{ backgroundColor: '#f0f7f4', padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h2 style={{ color: '#05396c', fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>
            Grow Your Construction Business with Us
          </h2>
          <p style={{ color: '#4b5563', lineHeight: 1.7, marginBottom: '1rem' }}>
            As a contractor, your expertise deserves more visibility. You shouldn't have to spend endless hours chasing leads, worrying about late payments, or competing with unverified freelancers. That's where we come in.
          </p>
          <p style={{ color: '#4b5563', lineHeight: 1.7 }}>
            Our marketplace connects you directly with clients looking for trusted professionals. Whether you're a small independent contractor or manage a full construction crew, our platform helps you win projects, build credibility, and grow your income—without the stress.
          </p>
        </div>
      </section>

      {/* Why Join Section */}
      <section style={{ padding: '4rem 1.5rem', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'flex-start' }}>
            <div style={{ flex: '1 1 500px' }}>
              <h2 style={{ color: '#05396c', fontSize: '1.5rem', fontWeight: 600, marginBottom: '2rem' }}>Why Join Our Marketplace?</h2>
              
              <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '1.5rem' }}>
                <h3 style={{ color: '#05396c', fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', textDecoration: 'underline' }}>Steady Flow of Projects</h3>
                <p style={{ color: '#4b5563', fontSize: '0.875rem', lineHeight: 1.7 }}>
                  Gain access to homeowners, businesses, and developers actively searching for services—from small renovations to large-scale builds.
                </p>
              </div>

              <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '1.5rem' }}>
                <h3 style={{ color: '#05396c', fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', textDecoration: 'underline' }}>Verified & Serious Clients Only</h3>
                <p style={{ color: '#4b5563', fontSize: '0.875rem', lineHeight: 1.7 }}>
                  No time-wasters. Every client is verified, with projects backed by secure payment protection.
                </p>
              </div>

              <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '1.5rem' }}>
                <h3 style={{ color: '#05396c', fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', textDecoration: 'underline' }}>Secure Payments</h3>
                <p style={{ color: '#4b5563', fontSize: '0.875rem', lineHeight: 1.7 }}>
                  Get paid on time, every time. Our <strong>escrow system</strong> ensures funds are released once your milestones are approved.
                </p>
              </div>

              <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '1.5rem' }}>
                <h3 style={{ color: '#05396c', fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', textDecoration: 'underline' }}>Build Your Reputation</h3>
                <p style={{ color: '#4b5563', fontSize: '0.875rem', lineHeight: 1.7 }}>
                  Your profile, reviews, and portfolio help you stand out and attract higher-value clients.
                </p>
              </div>

              <div>
                <h3 style={{ color: '#05396c', fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', textDecoration: 'underline' }}>Grow Your Business</h3>
                <p style={{ color: '#4b5563', fontSize: '0.875rem', lineHeight: 1.7 }}>
                  Whether you want one extra job a month or consistent large-scale contracts, our system scales with you.
                </p>
              </div>
            </div>

            <div style={{ flex: '1 1 400px' }}>
              <img 
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=500&fit=crop"
                alt="Construction workers"
                style={{ width: '100%', height: 'auto', borderRadius: '0.5rem' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{ padding: '4rem 1.5rem', backgroundColor: '#f9fafb' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'flex-start' }}>
            <div style={{ flex: '1 1 400px' }}>
              <img 
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=500&fit=crop"
                alt="Contractors planning"
                style={{ width: '100%', height: 'auto', borderRadius: '0.5rem' }}
              />
            </div>

            <div style={{ flex: '1 1 500px' }}>
              <h2 style={{ color: '#05396c', fontSize: '1.5rem', fontWeight: 600, marginBottom: '2rem' }}>How It Works for Contractors</h2>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#00c896', fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', textDecoration: 'underline' }}>Sign Up & Verify Your Business</h3>
                <p style={{ color: '#4b5563', fontSize: '0.875rem', lineHeight: 1.7 }}>
                  Create your account, upload licenses, certifications, insurance, and past work examples. Our team verifies your profile.
                </p>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#00c896', fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', textDecoration: 'underline' }}>Browse & Apply for Projects</h3>
                <p style={{ color: '#4b5563', fontSize: '0.875rem', lineHeight: 1.7 }}>
                  Search or get matched with projects that fit your expertise and location. Submit proposals directly through the platform.
                </p>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#00c896', fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', textDecoration: 'underline' }}>Win Bids & Start Work</h3>
                <p style={{ color: '#4b5563', fontSize: '0.875rem', lineHeight: 1.7 }}>
                  When a client selects you, contracts are signed digitally, and funds are placed in escrow.
                </p>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#00c896', fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', textDecoration: 'underline' }}>Deliver & Get Paid</h3>
                <p style={{ color: '#4b5563', fontSize: '0.875rem', lineHeight: 1.7 }}>
                  Complete milestones, upload progress updates, and get your payment released securely.
                </p>
              </div>

              <div>
                <h3 style={{ color: '#00c896', fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', textDecoration: 'underline' }}>Grow with Reviews</h3>
                <p style={{ color: '#4b5563', fontSize: '0.875rem', lineHeight: 1.7 }}>
                  Positive client reviews increase your visibility and win rate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section style={{ padding: '4rem 1.5rem', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h2 style={{ color: '#05396c', fontSize: '1.5rem', fontWeight: 600, marginBottom: '2rem' }}>Success Stories</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
                alt="Mark"
                style={{ width: '100px', height: '100px', borderRadius: '0.5rem', objectFit: 'cover' }}
              />
              <div>
                <h3 style={{ color: '#05396c', fontSize: '1rem', fontWeight: 600 }}>Mark</h3>
                <p style={{ color: '#4b5563', fontSize: '0.875rem', marginBottom: '0.5rem' }}>General Contractor</p>
                <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: 1.6 }}>
                  Create your account, upload licenses, certifications, insurance, and past work examples. Our team verifies your profile.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <img 
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop"
                alt="Angela"
                style={{ width: '100px', height: '100px', borderRadius: '0.5rem', objectFit: 'cover' }}
              />
              <div>
                <h3 style={{ color: '#05396c', fontSize: '1rem', fontWeight: 600 }}>Angela</h3>
                <p style={{ color: '#4b5563', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Electrician</p>
                <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: 1.6 }}>
                  The platform gave me consistent projects and helped me grow from solo work to a three-person team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Contractors Love Us */}
      <section style={{ padding: '4rem 1.5rem', backgroundColor: '#05396c' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'center' }}>
            <div style={{ flex: '1 1 500px' }}>
              <h2 style={{ color: 'white', fontSize: '1.75rem', fontWeight: 600, marginBottom: '1.5rem' }}>Why Contractors Love Us</h2>
              <ul style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.875rem', lineHeight: 2, paddingLeft: '1.25rem' }}>
                <li>Low commission or subscription-based plans</li>
                <li>Freedom to set your own rates</li>
                <li>Work with clients across your service area</li>
                <li>Tools for invoicing, contracts, and project tracking</li>
                <li>Dedicated support team</li>
              </ul>
            </div>

            <div style={{ flex: '1 1 400px', backgroundColor: 'white', borderRadius: '0.5rem', padding: '2rem', textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', margin: '0 auto 1rem', backgroundColor: '#f0f7f4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg style={{ width: '40px', height: '40px', color: '#05396c' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 style={{ color: '#05396c', fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Join Our Network Today</h3>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                Ready to take control of your contracting career?
              </p>
              <Link href="/auth/vendor-signup" style={{ display: 'inline-block', padding: '0.875rem 2rem', backgroundColor: '#00c896', color: 'white', borderRadius: '0.375rem', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}>
                Sign Up as a Contractor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ position: 'relative', padding: '6rem 1.5rem', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=1920&h=800&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(5, 57, 108, 0.9), rgba(0, 200, 150, 0.7))' }} />
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 400, color: 'white', marginBottom: '1rem' }}>Ready to Start Your Project?</h2>
          <p style={{ color: 'white', fontSize: '1.125rem', marginBottom: '2rem' }}>Join thousands of satisfied clients and contractors today.</p>
          <Link href="/auth/vendor-signup" style={{ display: 'inline-block', padding: '0.875rem 2.5rem', backgroundColor: 'white', color: '#05396c', fontSize: '0.875rem', fontWeight: 500, borderRadius: '0.375rem', textDecoration: 'none' }}>Sign Up Now</Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: 'white', padding: '3rem 1.5rem', borderTop: '1px solid #f3f4f6' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
            <div>
              <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', marginBottom: '1rem' }}>
                <div style={{ width: '40px', height: '40px' }}>
                  <svg viewBox="0 0 40 40" fill="none" style={{ width: '100%', height: '100%' }}>
                    <path d="M20 2C18 4 15 5 14 8C13 11 14 14 13 17C12 20 10 22 11 25C12 28 15 30 17 33C19 36 20 38 20 38C20 38 21 36 23 33C25 30 28 28 29 25C30 22 28 20 27 17C26 14 27 11 26 8C25 5 22 4 20 2Z" fill="#00c896" />
                  </svg>
                </div>
                <span style={{ color: '#05396c', fontSize: '1.25rem', fontWeight: 700 }}>NESTS</span>
              </Link>
            </div>
            <div>
              <h4 style={{ color: '#05396c', fontWeight: 600, fontSize: '0.875rem', marginBottom: '1rem' }}>Categories</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['Plumbing', 'Electrical', 'Roofing', 'HVAC', 'Painting', 'Carpentry', 'Landscaping', 'Flooring'].map((item) => (
                  <li key={item} style={{ marginBottom: '0.5rem' }}>
                    <Link href={`/vendors?category=${item.toLowerCase()}`} style={{ color: '#00c896', fontSize: '0.875rem', textDecoration: 'none' }}>{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ color: '#05396c', fontWeight: 600, fontSize: '0.875rem', marginBottom: '1rem' }}>For Clients</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[{ name: 'How It Works', href: '/how-it-works' }, { name: 'Customer Stories', href: '#' }, { name: 'Trust & Safety', href: '#' }, { name: 'Quality Guide', href: '/quality-guide' }, { name: 'Client Guides', href: '/client-guides' }].map((item) => (
                  <li key={item.name} style={{ marginBottom: '0.5rem' }}>
                    <Link href={item.href} style={{ color: '#00c896', fontSize: '0.875rem', textDecoration: 'none' }}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ color: '#05396c', fontWeight: 600, fontSize: '0.875rem', marginBottom: '1rem' }}>For Contractors</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[{ name: 'Become a Contractor', href: '/become-contractor' }, { name: 'Resources', href: '/resources' }, { name: 'Events', href: '#' }].map((item) => (
                  <li key={item.name} style={{ marginBottom: '0.5rem' }}>
                    <Link href={item.href} style={{ color: '#00c896', fontSize: '0.875rem', textDecoration: 'none' }}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ color: '#05396c', fontWeight: 600, fontSize: '0.875rem', marginBottom: '1rem' }}>Company</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['About Us', 'Terms of Service', 'Privacy Policy', 'Contact Us'].map((item) => (
                  <li key={item} style={{ marginBottom: '0.5rem' }}>
                    <Link href="#" style={{ color: '#00c896', fontSize: '0.875rem', textDecoration: 'none' }}>{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div style={{ paddingTop: '2rem', borderTop: '1px solid #f3f4f6', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
            <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>© Nests 2025. All Rights Reserved.</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <Link href="#" style={{ color: '#9ca3af', fontSize: '0.875rem', textDecoration: 'none' }}>Privacy Policy</Link>
              <Link href="#" style={{ color: '#9ca3af', fontSize: '0.875rem', textDecoration: 'none' }}>Cookie Policy</Link>
              <Link href="#" style={{ color: '#9ca3af', fontSize: '0.875rem', textDecoration: 'none' }}>Terms & Conditions</Link>
            </div>
            <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Crafted by Alliancetek</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
