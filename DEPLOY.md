# 🚀 Guia de Deploy - GLA Website

## Pré-requisitos

Antes de fazer o deploy, você precisa:

1. ✅ Conta em um provedor de email (Gmail ou SendGrid)
2. ✅ API Key do Google GenAI
3. ✅ Conta em plataforma de hospedagem (Vercel, Railway, etc.)

## 📋 Checklist de Deploy

### 1. Preparação do Backend

- [ ] Criar arquivo `.env` no diretório `server/`
- [ ] Configurar credenciais de email
- [ ] Adicionar Google GenAI API Key
- [ ] Testar backend localmente (`cd server && npm start`)
- [ ] Verificar que emails estão sendo enviados
- [ ] Testar AI Consultant

### 2. Preparação do Frontend

- [ ] Atualizar URLs da API para produção em:
  - `components/Contact.tsx` (linha ~21)
  - `components/AIConsultant.tsx` (linha ~34)
- [ ] Adicionar vídeo de fundo em `public/background-video.mp4`
- [ ] Testar build de produção (`npm run build`)

### 3. Deploy do Backend

#### Opção A: Railway (Recomendado)

1. Criar conta em [railway.app](https://railway.app)
2. Conectar repositório GitHub
3. Selecionar diretório `server/`
4. Adicionar variáveis de ambiente:
   ```
   PORT=5000
   NODE_ENV=production
   EMAIL_SERVICE=gmail
   EMAIL_USER=seu-email@gmail.com
   EMAIL_PASS=sua-senha-app
   EMAIL_FROM=noreply@gla-design.com
   EMAIL_TO=contato@gla-design.com
   GOOGLE_GENAI_API_KEY=sua-api-key
   FRONTEND_URL=https://seu-dominio.vercel.app
   ```
5. Deploy automático!

#### Opção B: Heroku

```bash
# No diretório server/
heroku create gla-backend
heroku config:set NODE_ENV=production
heroku config:set EMAIL_SERVICE=gmail
# ... adicionar todas as variáveis
git subtree push --prefix server heroku main
```

### 4. Deploy do Frontend

#### Vercel (Recomendado)

1. Instalar Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Configurar variáveis de ambiente na dashboard:
   - `VITE_API_URL` = URL do backend (ex: https://gla-backend.railway.app)

#### Netlify

1. Build local:
   ```bash
   npm run build
   ```

2. Deploy pasta `dist/`:
   ```bash
   netlify deploy --prod --dir=dist
   ```

## 🔧 Configurações Importantes

### CORS

Atualizar `FRONTEND_URL` no backend para o domínio de produção:
```env
FRONTEND_URL=https://gla-agency.vercel.app
```

### URLs da API

Atualizar nos componentes frontend:

**Contact.tsx:**
```typescript
const response = await fetch('https://seu-backend.railway.app/api/contact', {
```

**AIConsultant.tsx:**
```typescript
const response = await fetch('https://seu-backend.railway.app/api/ai/chat', {
```

## ✅ Verificação Pós-Deploy

### Backend
- [ ] Acessar `https://seu-backend.com/health` retorna status OK
- [ ] Testar endpoint de contato via Postman/cURL
- [ ] Verificar logs para erros

### Frontend
- [ ] Site carrega corretamente
- [ ] Vídeo de fundo está funcionando
- [ ] Formulário de contato envia com sucesso
- [ ] Email de notificação é recebido
- [ ] AI Consultant responde corretamente
- [ ] Animações de partículas funcionam

## 🐛 Troubleshooting

### Erro de CORS
- Verificar `FRONTEND_URL` no backend
- Confirmar que URLs estão corretas (sem barra final)

### Emails não enviando
- Para Gmail, usar "App Password" não senha normal
- Verificar configurações de segurança da conta Google
- Checar logs do servidor para erros específicos

### AI Consultant não responde
- Verificar `GOOGLE_GENAI_API_KEY` está configurada
- Confirmar que API key tem permissões corretas
- Checar cota da API no Google Cloud Console

### Database não persiste dados
- Verificar permissões de escrita no servidor
- Para Railway/Heroku, considerar usar volume persistente
- Checar logs para erros de I/O

## 📊 Monitoramento

Após deploy, monitorar:

1. **Logs do servidor** - Erros e requisições
2. **Uso da API GenAI** - Cota e custos
3. **Emails enviados** - Taxa de sucesso
4. **Performance** - Tempo de resposta

## 🔐 Segurança

- ✅ Nunca commitar arquivo `.env`
- ✅ Usar HTTPS em produção
- ✅ Configurar rate limiting (futuro)
- ✅ Validar todos os inputs do usuário
- ✅ Manter dependências atualizadas

## 📞 Suporte

Se encontrar problemas:
1. Verificar logs do servidor
2. Revisar [server/README.md](../server/README.md)
3. Consultar documentação da plataforma de hospedagem
