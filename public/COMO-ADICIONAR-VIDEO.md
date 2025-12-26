# 🎥 Como Adicionar o Vídeo de Fundo

## Passo a Passo

### 1. Prepare seu vídeo
- Certifique-se de que o vídeo está em formato **MP4** ou **WebM**
- Recomendado: vídeo em alta qualidade, mas otimizado para web
- Duração: pode ser qualquer duração (o vídeo vai rodar em loop)

### 2. Coloque o vídeo na pasta `public`
- Copie seu arquivo de vídeo para esta pasta `public`
- Exemplo: `public/background-video.mp4`

### 3. Ative o vídeo no código
Abra o arquivo: `components/VideoBackground.tsx`

Encontre estas linhas (por volta da linha 24-25):

```tsx
{/* <source src="/background-video.mp4" type="video/mp4" /> */}
{/* <source src="/background-video.webm" type="video/webm" /> */}
```

**Descomente** a linha correspondente ao formato do seu vídeo, removendo `{/* */}`:

```tsx
<source src="/background-video.mp4" type="video/mp4" />
```

**IMPORTANTE:** Ajuste o nome do arquivo se o seu vídeo tiver um nome diferente!

### 4. Salve e visualize
- Salve o arquivo
- O Vite vai recarregar automaticamente
- Acesse http://localhost:3000/ para ver o vídeo rodando!

## 🎨 Personalizações Opcionais

### Ajustar a opacidade do overlay escuro
No arquivo `VideoBackground.tsx`, linha 7, altere o valor `/30`:

```tsx
<div className="absolute inset-0 bg-black/30 z-10"></div>
```

- `/30` = 30% de opacidade (padrão)
- `/50` = 50% de opacidade (mais escuro)
- `/10` = 10% de opacidade (mais claro)
- `/0` = sem overlay (totalmente transparente)

### Mudar a altura do vídeo
No arquivo `VideoBackground.tsx`, linha 5, altere `h-[200px]`:

```tsx
<div className="fixed top-0 left-0 w-full h-[200px] z-0 overflow-hidden">
```

Exemplo para 300px: `h-[300px]`

**ATENÇÃO:** Se mudar a altura aqui, também ajuste a barreira das bolinhas em `BackgroundAnimation.tsx`!

## 📁 Estrutura de Arquivos

```
gla---creative-&-technology-agency/
├── public/
│   └── background-video.mp4  ← Coloque seu vídeo aqui
├── components/
│   └── VideoBackground.tsx   ← Configure o vídeo aqui
└── App.tsx
```

## ✅ Pronto!
Seu vídeo de fundo está configurado e rodando nos primeiros 200px do site!
