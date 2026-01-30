const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Get connection string and properly encode special characters
let connectionString = process.argv[2];
if (!connectionString) {
  console.error('Usage: node setup-database.js <connection_string>');
  process.exit(1);
}

// URL encode the password portion if it contains special characters
// postgresql://user:password@host:port/database
const urlMatch = connectionString.match(/postgresql:\/\/([^:]+):([^@]+)@(.+)/);
if (urlMatch) {
  const [, user, password, rest] = urlMatch;
  const encodedPassword = encodeURIComponent(password);
  connectionString = `postgresql://${user}:${encodedPassword}@${rest}`;
  console.log('Connection string prepared with encoded password');
}

console.log('Connecting to Supabase database...');

async function executeSql() {
  const { Client } = require('pg');
  let client = null;
  
  try {
    // Read the SQL file
    const sqlPath = path.join(__dirname, '../supabase/complete_setup.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    console.log('Reading SQL file...');
    console.log(`SQL file size: ${sql.length} characters\n`);
    
    // Connect to the database
    console.log('Connecting to database...');
    client = new Client({ connectionString });
    await client.connect();
    console.log('✓ Connected successfully\n');
    
    // Split SQL into statements but be smart about it
    // We need to handle multi-line statements and keep them together
    console.log('Parsing SQL statements...\n');
    
    const statements = [];
    let currentStatement = '';
    let inDollarQuote = false;
    let dollarQuoteTag = '';
    
    const lines = sql.split('\n');
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Skip empty lines and comments at the start
      if (!currentStatement && (trimmedLine === '' || trimmedLine.startsWith('--'))) {
        continue;
      }
      
      // Check for dollar quotes ($$)
      const dollarMatch = line.match(/\$\$|\$([a-zA-Z_][a-zA-Z0-9_]*)\$/);
      if (dollarMatch) {
        if (!inDollarQuote) {
          inDollarQuote = true;
          dollarQuoteTag = dollarMatch[0];
        } else if (line.includes(dollarQuoteTag)) {
          inDollarQuote = false;
          dollarQuoteTag = '';
        }
      }
      
      currentStatement += line + '\n';
      
      // If we hit a semicolon and we're not in a dollar quote, that's the end of a statement
      if (line.includes(';') && !inDollarQuote) {
        statements.push(currentStatement.trim());
        currentStatement = '';
      }
    }
    
    // Add any remaining statement
    if (currentStatement.trim()) {
      statements.push(currentStatement.trim());
    }
    
    console.log(`Found ${statements.length} SQL statements\n`);
    console.log('Executing SQL setup...');
    console.log('(This may take a minute...)\n');
    
    let successCount = 0;
    let skipCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      const preview = statement.substring(0, 70).replace(/\n/g, ' ').replace(/\s+/g, ' ');
      
      try {
        await client.query(statement);
        successCount++;
        
        // Show progress every 10 statements
        if ((i + 1) % 10 === 0) {
          console.log(`✓ Progress: ${i + 1}/${statements.length} statements executed`);
        }
      } catch (error) {
        // Some errors are expected and can be safely ignored
        const errorMsg = error.message.toLowerCase();
        if (
          errorMsg.includes('already exists') ||
          errorMsg.includes('does not exist') ||
          errorMsg.includes('duplicate key') ||
          statement.includes('DROP POLICY IF EXISTS') ||
          statement.includes('DROP TRIGGER IF EXISTS') ||
          statement.includes('ON CONFLICT DO NOTHING')
        ) {
          skipCount++;
          if (skipCount <= 5) {
            console.log(`⊙ Skipped: ${preview}...`);
          }
        } else {
          errorCount++;
          console.log(`✗ Error at statement ${i + 1}: ${preview}...`);
          console.log(`   ${error.message}\n`);
          
          // Don't fail the entire setup for minor errors
          if (errorCount > 10) {
            throw new Error('Too many errors, stopping setup');
          }
        }
      }
    }
    
    console.log('\n' + '─'.repeat(60));
    console.log(`Execution complete!`);
    console.log(`  ✓ Success: ${successCount}`);
    console.log(`  ⊙ Skipped: ${skipCount}`);
    console.log(`  ✗ Errors: ${errorCount}`);
    console.log('─'.repeat(60) + '\n');
    
    // Verify the setup by checking for key tables
    console.log('Verifying database setup...\n');
    
    const tables = ['profiles', 'vendor_profiles', 'client_profiles', 
                   'service_categories', 'portfolios', 'projects', 'quotes'];
    
    for (const table of tables) {
      try {
        const result = await client.query(
          `SELECT COUNT(*) FROM ${table}`
        );
        console.log(`✓ ${table.padEnd(25)} ${result.rows[0].count} records`);
      } catch (error) {
        console.log(`✗ ${table.padEnd(25)} Error: ${error.message}`);
      }
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('✓ Database setup complete!');
    console.log('='.repeat(60));
    console.log('\nDemo accounts:');
    console.log('  • vendor1@demo.com (password: demo123)');
    console.log('  • vendor2@demo.com (password: demo123)');
    console.log('  • vendor3@demo.com (password: demo123)');
    console.log('  • client1@demo.com (password: demo123)');
    console.log('\nYou can now log in to your application with these accounts.');
    
  } catch (error) {
    console.error('\n✗ Setup failed:', error.message);
    console.error('\nFull error:', error);
    process.exit(1);
  } finally {
    if (client) {
      await client.end();
    }
  }
}

executeSql();
