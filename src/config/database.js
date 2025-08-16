const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase configuration!');
  console.log('SUPABASE_URL:', supabaseUrl ? '✅ Found' : '❌ Missing');
  console.log('SUPABASE_ANON_KEY:', supabaseKey ? '✅ Found' : '❌ Missing');
  process.exit(1);
}

console.log('🔗 Connecting to Supabase...');
const supabase = createClient(supabaseUrl, supabaseKey);

// Test connection
const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('websites')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Supabase connection failed:', error.message);
      if (error.message.includes('relation "websites" does not exist')) {
        console.log('💡 You need to create the websites table first!');
      }
    } else {
      console.log('✅ Supabase connected successfully');
    }
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
  }
};

// Test connection when module loads
testConnection();

module.exports = supabase;