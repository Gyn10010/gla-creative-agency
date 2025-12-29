import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

console.log('\n🔍 Verificando variáveis de ambiente...\n');

const requiredVars = {
    'SUPABASE_URL': process.env.SUPABASE_URL,
    'SUPABASE_SERVICE_ROLE_KEY': process.env.SUPABASE_SERVICE_ROLE_KEY,
    'EMAIL_SERVICE': process.env.EMAIL_SERVICE,
    'EMAIL_USER': process.env.EMAIL_USER,
    'EMAIL_PASS': process.env.EMAIL_PASS,
    'GOOGLE_GENAI_API_KEY': process.env.GOOGLE_GENAI_API_KEY,
    'FRONTEND_URL': process.env.FRONTEND_URL
};

let allGood = true;

for (const [key, value] of Object.entries(requiredVars)) {
    const isSet = value && value !== `your-${key.toLowerCase().replace(/_/g, '-')}-here` && !value.includes('your-');
    const status = isSet ? '✅' : '❌';
    const displayValue = isSet ? (value.length > 20 ? value.substring(0, 20) + '...' : value) : '(não configurado)';

    console.log(`${status} ${key}: ${displayValue}`);

    if (!isSet) allGood = false;
}

console.log('\n' + (allGood ? '✅ Todas as variáveis estão configuradas!' : '❌ Algumas variáveis precisam ser configuradas no arquivo .env'));
console.log('\n📝 Edite o arquivo .env e substitua os valores de exemplo pelas suas credenciais reais.\n');
