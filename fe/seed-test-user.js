const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://vmgkgmzeuzxyuziftnbx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtZ2tnbXpldXp4eXV6aWZ0bmJ4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTY3Njk3NywiZXhwIjoyMDk3MjUyOTc3fQ.ynURfPWbDIBK_ywNO2148I5rL6l9A_hTFQDvFWDQBGY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTestUser() {
  const email = 'playwright.test@example.com';
  const password = 'TestPassword123!';
  
  // Try to delete if exists
  const { data: users, error: listError } = await supabase.auth.admin.listUsers();
  if (!listError && users) {
    const existing = users.users.find(u => u.email === email);
    if (existing) {
      await supabase.auth.admin.deleteUser(existing.id);
      console.log('Deleted existing test user.');
    }
  }

  const { data, error } = await supabase.auth.admin.createUser({
    email: email,
    password: password,
    email_confirm: true,
  });

  if (error) {
    console.error('Error creating user:', error);
  } else {
    console.log('Successfully created test user:', data.user.email);
  }
}

createTestUser();
