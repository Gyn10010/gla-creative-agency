import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('\n🔍 Testando conexão com Supabase...\n');
console.log('URL:', supabaseUrl);
console.log('Key (primeiros 20 chars):', supabaseKey?.substring(0, 20) + '...');

const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

// Test 1: Check if we can connect
console.log('\n📊 Teste 1: Verificando conexão...');
try {
    const { data, error } = await supabase
        .from('contacts')
        .select('count');

    if (error) {
        console.log('❌ Erro ao conectar:', error.message);
        console.log('Detalhes:', error);
    } else {
        console.log('✅ Conexão estabelecida com sucesso!');
        console.log('Dados:', data);
    }
} catch (err) {
    console.log('❌ Erro de conexão:', err.message);
}

// Test 2: Try to insert a test record
console.log('\n📝 Teste 2: Tentando inserir registro de teste...');
try {
    const { data, error } = await supabase
        .from('contacts')
        .insert([
            {
                name: 'Teste Script',
                email: 'teste-script@example.com',
                service: 'Test Service',
                message: 'Mensagem de teste do script',
                ip_address: '127.0.0.1',
                user_agent: 'Test Script'
            }
        ])
        .select()
        .single();

    if (error) {
        console.log('❌ Erro ao inserir:', error.message);
        console.log('Código:', error.code);
        console.log('Detalhes:', error.details);
        console.log('Hint:', error.hint);
    } else {
        console.log('✅ Registro inserido com sucesso!');
        console.log('ID:', data.id);
        console.log('Dados:', data);
    }
} catch (err) {
    console.log('❌ Erro ao inserir:', err.message);
}

console.log('\n✅ Teste concluído!\n');
process.exit(0);
