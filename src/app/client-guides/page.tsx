import Link from 'next/link';

export default function ClientGuidesPage() {
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
            <Link href="/auth/signup" style={{ padding: '0.5rem 1.5rem', backgroundColor: 'white', color: '#05396c', borderRadius: '0.375rem', textDecoration: 'none', fontSize: '0.875rem' }}>Join</Link>
          </div>
        </div>
        <div style={{ maxWidth: '1280px', margin: '2rem auto 0' }}>
          <h1 style={{ color: '#00c896', fontSize: '2rem', fontWeight: 400, marginBottom: '0.5rem' }}>Client Guides</h1>
          <p style={{ color: 'white', fontSize: '0.875rem' }}>
            <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 0.5rem' }}>&gt;</span>
            <span style={{ color: '#00c896' }}>Client Guides</span>
          </p>
        </div>
      </header>

      {/* Intro Section */}
      <section style={{ backgroundColor: '#f0f7f4', padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h2 style={{ color: '#05396c', fontSize: '1.5rem', fontWeight: 500, fontStyle: 'italic', marginBottom: '1rem' }}>
            Practical Guides to Simplify Your Construction Journey
          </h2>
          <p style={{ color: '#4b5563', lineHeight: 1.7 }}>
            Not every client is a construction expert—and you don't have to be. Our Client Guides provide easy-to-follow resources that help you manage your project like a pro.
          </p>
        </div>
      </section>

      {/* Guides Grid */}
      <section style={{ padding: '4rem 1.5rem', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
            {/* Guide 1 */}
            <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1.5rem' }}>
              <span style={{ display: 'inline-block', backgroundColor: '#05396c', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: 600, marginBottom: '1rem' }}>Guide 1</span>
              <h3 style={{ color: '#05396c', fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Choosing the Right Contractor</h3>
              <ul style={{ color: '#4b5563', fontSize: '0.875rem', paddingLeft: '1.25rem', lineHeight: 1.8 }}>
                <li>How to shortlist based on skills, portfolio, and reviews.</li>
                <li>Red flags to avoid (unlicensed work, vague contracts).</li>
                <li>Questions to ask before signing an agreement.</li>
              </ul>
            </div>

            {/* Guide 2 */}
            <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1.5rem' }}>
              <span style={{ display: 'inline-block', backgroundColor: '#05396c', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: 600, marginBottom: '1rem' }}>Guide 2</span>
              <h3 style={{ color: '#05396c', fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Budgeting & Cost Estimation</h3>
              <ul style={{ color: '#4b5563', fontSize: '0.875rem', paddingLeft: '1.25rem', lineHeight: 1.8 }}>
                <li>How contractors typically price projects.</li>
                <li>Avoiding hidden costs and scope creep.</li>
                <li>Free budget calculators and cost breakdown templates.</li>
              </ul>
            </div>

            {/* Guide 3 */}
            <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1.5rem' }}>
              <span style={{ display: 'inline-block', backgroundColor: '#05396c', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: 600, marginBottom: '1rem' }}>Guide 3</span>
              <h3 style={{ color: '#05396c', fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Timeline Planning</h3>
              <ul style={{ color: '#4b5563', fontSize: '0.875rem', paddingLeft: '1.25rem', lineHeight: 1.8 }}>
                <li>Understanding project phases (design, permits, execution).</li>
                <li>Building realistic timelines.</li>
                <li>Tracking delays and how to manage them.</li>
              </ul>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* Guide 4 */}
            <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1.5rem' }}>
              <span style={{ display: 'inline-block', backgroundColor: '#05396c', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: 600, marginBottom: '1rem' }}>Guide 4</span>
              <h3 style={{ color: '#05396c', fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Avoiding Common Pitfalls</h3>
              <ul style={{ color: '#4b5563', fontSize: '0.875rem', paddingLeft: '1.25rem', lineHeight: 1.8 }}>
                <li>Importance of written contracts.</li>
                <li>Clarifying change orders in advance.</li>
                <li>Ensuring insurance coverage and liability.</li>
              </ul>
            </div>

            {/* Guide 5 */}
            <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1.5rem' }}>
              <span style={{ display: 'inline-block', backgroundColor: '#05396c', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: 600, marginBottom: '1rem' }}>Guide 5</span>
              <h3 style={{ color: '#05396c', fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Tools & Templates</h3>
              <ul style={{ color: '#4b5563', fontSize: '0.875rem', paddingLeft: '1.25rem', lineHeight: 1.8 }}>
                <li>Free downloadable project planning sheets.</li>
                <li>Sample contracts and checklists.</li>
                <li>Budget calculators and progress tracking templates.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Conclusion Section */}
      <section style={{ padding: '0 1.5rem 4rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ backgroundColor: '#d1fae5', borderRadius: '0.5rem', padding: '2rem' }}>
            <h3 style={{ color: '#05396c', fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Conclusion</h3>
            <p style={{ color: '#4b5563', marginBottom: '1.5rem' }}>
              With these guides, even first-time clients can confidently manage projects, reduce risks, and ensure quality results.
            </p>
            <Link href="#" style={{ display: 'inline-block', padding: '0.75rem 1.5rem', backgroundColor: '#00c896', color: 'white', borderRadius: '0.375rem', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}>
              Explore our full library of client guides
            </Link>
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
          <Link href="/auth/signup" style={{ display: 'inline-block', padding: '0.875rem 2.5rem', backgroundColor: 'white', color: '#05396c', fontSize: '0.875rem', fontWeight: 500, borderRadius: '0.375rem', textDecoration: 'none' }}>Sign Up Now</Link>
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
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <a href="#" style={{ color: '#4b5563' }}>
                  <svg style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" style={{ color: '#4b5563' }}>
                  <svg style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" style={{ color: '#4b5563' }}>
                  <svg style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="#" style={{ color: '#4b5563' }}>
                  <svg style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
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
