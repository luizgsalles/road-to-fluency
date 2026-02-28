# Demo Mode - Road to Fluency

## O que é o Demo Mode?

O Demo Mode permite que você teste o aplicativo **sem precisar configurar autenticação**. É perfeito para desenvolvimento, testes e demonstrações.

## Como usar?

### Opção 1: Botão na Home
1. Acesse http://localhost:3000
2. Clique em **"🎮 Try Demo Mode"**
3. Você será redirecionado para o Dashboard com um usuário demo

### Opção 2: URL Direta
1. Acesse http://localhost:3000/demo
2. Você será automaticamente autenticado como usuário demo

## Dados do Usuário Demo

Quando você entra no Demo Mode, um usuário fictício é criado com:

- **Email:** demo@road-to-fluency.app
- **Nome:** Demo User
- **Nível:** 3
- **XP Total:** 1,500
- **Streak Atual:** 5 dias
- **Streak Máximo:** 10 dias

### Skills do Demo User:
- 📖 Grammar: Level 2 (300 XP)
- 📚 Vocabulary: Level 2 (250 XP)
- 👂 Listening: Level 2 (200 XP)
- 🎤 Speaking: Level 3 (350 XP)
- 📄 Reading: Level 2 (200 XP)
- ✍️ Writing: Level 2 (200 XP)

## O que você pode testar?

✅ **Dashboard completo** - Visualize XP, skills, streaks
✅ **Navegação** - Acesse todas as rotas protegidas
✅ **Interface** - Teste componentes e design
✅ **Funcionalidades** - Experimente exercícios (quando implementados)

## Limitações do Demo Mode

⚠️ **Não é para produção** - Use apenas em desenvolvimento
⚠️ **Dados não persistem** - Progresso não é salvo
⚠️ **Cookie temporário** - Expira em 24 horas

## Como sair do Demo Mode?

1. Limpe os cookies do navegador
2. Ou acesse: http://localhost:3000/api/auth/signout
3. Ou feche o navegador e abra novamente

## Implementação Técnica

O Demo Mode funciona através de:

1. **Cookie simples** (`demo-session=true`) em vez de JWT
2. **Usuário demo** criado no banco de dados
3. **Middleware customizado** que permite acesso sem auth
4. **Função `getCurrentUser()`** que suporta auth + demo

## Para Desenvolvedores

```typescript
// Verificar se está em demo mode
import { isDemoMode } from '@/lib/demo';
const isDemo = await isDemoMode();

// Obter usuário atual (auth ou demo)
import { getCurrentUser } from '@/lib/demo';
const user = await getCurrentUser();
```

## Próximos Passos

Depois de testar no Demo Mode, configure a autenticação real:

1. **Google OAuth:** Configure no Google Cloud Console
2. **Resend Email:** Configure API key no Resend.com
3. **Ambiente:** Adicione as keys no `.env.local`

---

**Criado por:** @dev (Dex) - AIOS Developer
**Versão:** 1.0
**Data:** 2026-02-16
