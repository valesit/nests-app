const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rxikvjmjiixnowpftnoa.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4aWt2am1qaWl4bm93cGZ0bm9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3ODM1OTksImV4cCI6MjA4NTM1OTU5OX0.QqR30-JmdDgCa2r3DwDPD754l_jYAf11TWiT3GYFOOw';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testAuth() {
  console.log('🔐 Testing Supabase Authentication...\n');
  console.log('URL:', supabaseUrl);
  console.log('Using anon key:', supabaseAnonKey.substring(0, 30) + '...\n');
  
  // Test with each demo account
  const testAccounts = [
    { email: 'client1@demo.com', password: 'demo123', name: 'Client' },
    { email: 'vendor1@demo.com', password: 'demo123', name: 'Vendor 1' }
  ];
  
  for (const account of testAccounts) {
    console.log(`Testing ${account.name}: ${account.email}`);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: account.email,
        password: account.password
      });
      
      if (error) {
        console.log('❌ Login failed:', error.message);
        console.log('   Error code:', error.status);
        console.log('   Full error:', JSON.stringify(error, null, 2));
      } else if (data.user) {
        console.log('✅ Login successful!');
        console.log('   User ID:', data.user.id);
        console.log('   Email:', data.user.email);
        console.log('   Email confirmed:', data.user.email_confirmed_at ? 'Yes' : 'No');
        
        // Sign out
        await supabase.auth.signOut();
      }
    } catch (err) {
      console.log('❌ Exception:', err.message);
    }
    console.log('');
  }
}

testAuth().catch(console.error);
