
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function debugData() {
  console.log('Checking "products" table...')
  const { data, error, count } = await supabase
    .from('products')
    .select('*', { count: 'exact' })
  
  if (error) {
    console.error('Error fetching data:', error)
  } else {
    console.log(`Count: ${count}`)
    console.log('Data:', JSON.stringify(data, null, 2))
  }
}

debugData()
