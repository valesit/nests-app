const { createClient } = require('@supabase/supabase-js');

// Get credentials from command line or use defaults
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rxikvjmjiixnowpftnoa.supabase.co';
const supabaseServiceKey = process.argv[2]; // Service role key needed

if (!supabaseServiceKey) {
  console.error('❌ Service role key required!');
  console.log('\nUsage: node create-demo-users.js <service-role-key>');
  console.log('\nTo get your service role key:');
  console.log('1. Go to https://supabase.com/dashboard');
  console.log('2. Open project: rxikvjmjiixnowpftnoa');
  console.log('3. Project Settings → API');
  console.log('4. Copy the "service_role" key (NOT the anon key)\n');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const demoUsers = [
  {
    email: 'vendor1@demo.com',
    password: 'demo123',
    metadata: {
      full_name: 'John Moyo',
      role: 'vendor',
      business_name: 'Harare Master Builders',
      phone: '+263 77 123 4567'
    }
  },
  {
    email: 'vendor2@demo.com',
    password: 'demo123',
    metadata: {
      full_name: 'Sarah Ncube',
      role: 'vendor',
      business_name: 'ZimDesign Architects',
      phone: '+263 77 234 5678'
    }
  },
  {
    email: 'vendor3@demo.com',
    password: 'demo123',
    metadata: {
      full_name: 'Michael Chikwanha',
      role: 'vendor',
      business_name: 'PowerUp Electrical Services',
      phone: '+263 77 345 6789'
    }
  },
  {
    email: 'client1@demo.com',
    password: 'demo123',
    metadata: {
      full_name: 'Grace Mutasa',
      role: 'client',
      current_residence: 'London, UK',
      target_city: 'Harare',
      phone: '+44 20 1234 5678'
    }
  }
];

async function createDemoUsers() {
  console.log('🔧 Creating/updating demo user accounts...\n');
  
  let successCount = 0;
  let updateCount = 0;
  
  for (const user of demoUsers) {
    try {
      // First, try to delete existing user
      const { data: existingUsers } = await supabase.auth.admin.listUsers();
      const existing = existingUsers?.users?.find(u => u.email === user.email);
      
      if (existing) {
        console.log(`🔄 Updating existing user: ${user.email}`);
        
        // Update the user's password and metadata
        const { data, error } = await supabase.auth.admin.updateUserById(
          existing.id,
          {
            password: user.password,
            email_confirm: true,
            user_metadata: user.metadata
          }
        );
        
        if (error) {
          console.log(`   ⚠️  Update failed: ${error.message}`);
        } else {
          console.log(`   ✓ Password reset to: ${user.password}`);
          updateCount++;
        }
      } else {
        // Create new user
        console.log(`➕ Creating new user: ${user.email}`);
        
        const { data, error } = await supabase.auth.admin.createUser({
          email: user.email,
          password: user.password,
          email_confirm: true,
          user_metadata: user.metadata
        });
        
        if (error) {
          console.log(`   ✗ Failed: ${error.message}`);
        } else {
          console.log(`   ✓ Created with password: ${user.password}`);
          successCount++;
        }
      }
      console.log('');
      
    } catch (error) {
      console.log(`   ✗ Error: ${error.message}\n`);
    }
  }
  
  console.log('═'.repeat(60));
  console.log('✅ Demo users setup complete!');
  console.log(`   Created: ${successCount}, Updated: ${updateCount}`);
  console.log('═'.repeat(60));
  console.log('\n📝 Demo Accounts:\n');
  
  demoUsers.forEach(user => {
    const role = user.metadata.role === 'vendor' ? '🏗️  Vendor' : '🏡 Client';
    console.log(`${role}: ${user.email}`);
    console.log(`   Password: ${user.password}`);
    console.log(`   Name: ${user.metadata.full_name}`);
    if (user.metadata.business_name) {
      console.log(`   Business: ${user.metadata.business_name}`);
    }
    console.log('');
  });
  
  console.log('🚀 You can now log in at: http://localhost:3000/auth/login\n');
}

createDemoUsers().catch(console.error);
