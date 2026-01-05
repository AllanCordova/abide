# Abide - App de Devocionais

**Abide** é uma aplicação web moderna desenvolvida para incentivar e facilitar a leitura diária da Bíblia através de devocionais estruturados. O aplicativo oferece uma experiência completa para quem busca crescer espiritualmente através de estudos bíblicos diários, reflexões e meditações.

## Sobre o Projeto

O Abide foi criado com o propósito de ajudar pessoas a desenvolverem o hábito de ler a Bíblia regularmente. A plataforma oferece:

- **Devocionais Diários**: Coleção de estudos bíblicos organizados por temas e dias
- **Sistema de Inscrições**: Usuários podem se inscrever em devocionais e acompanhar seu progresso
- **Acompanhamento de Progresso**: Sistema que permite marcar dias completos e visualizar o progresso
- **Busca Inteligente**: Funcionalidade de busca para encontrar devocionais por palavras-chave
- **Criação de Conteúdo**: Usuários autenticados podem criar e publicar seus próprios devocionais
- **Interface Moderna**: Design responsivo e intuitivo, otimizado para diferentes dispositivos

## Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

- **[Next.js 16](https://nextjs.org/)** - Framework React com App Router
- **[React 19](https://react.dev/)** - Biblioteca JavaScript para interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática
- **[Supabase](https://supabase.com/)** - Backend como serviço (banco de dados PostgreSQL e autenticação)
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utilitário
- **[Zod](https://zod.dev/)** - Validação de schemas TypeScript
- **[React Hook Form](https://react-hook-form.com/)** - Gerenciamento de formulários
- **[Lucide React](https://lucide.dev/)** - Biblioteca de ícones
- **[Radix UI](https://www.radix-ui.com/)** - Componentes de UI acessíveis
- **[Jest](https://jestjs.io/)** - Framework de testes

## Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn** ou **pnpm** (gerenciador de pacotes)
- Uma conta no **Supabase** (para configurar o banco de dados)

## Como Rodar o Projeto

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd abide
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

**Como obter essas variáveis:**
1. Acesse o [Supabase](https://supabase.com/)
2. Crie um novo projeto ou use um existente
3. Vá em **Settings** > **API**
4. Copie a **URL** e a **anon/public key**
5. Cole no arquivo `.env.local`

### 4. Execute o servidor de desenvolvimento

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

### 5. Acesse a aplicação

Abra seu navegador e acesse [http://localhost:3000](http://localhost:3000)

## Estrutura do Projeto

```
abide/
├── app/                    # Rotas e páginas (Next.js App Router)
│   ├── devotionals/        # Páginas relacionadas a devocionais
│   ├── login/              # Página de login
│   ├── signup/             # Página de cadastro
│   └── layout.tsx          # Layout principal
├── components/             # Componentes React reutilizáveis
│   ├── auth/               # Componentes de autenticação
│   ├── devotionals/        # Componentes de devocionais
│   ├── layout/             # Componentes de layout
│   └── ui/                 # Componentes de UI
├── actions/                # Server Actions (lógica do servidor)
├── core/                   # Lógica central (auth, models)
├── database/               # Configuração do Supabase
├── hooks/                  # React Hooks customizados
├── lib/                    # Utilitários e helpers
├── types/                  # Definições de tipos TypeScript
└── public/                 # Arquivos estáticos
```

## Testes

Para executar os testes:

```bash
npm test
# ou
yarn test
# ou
pnpm test
```

## Build para Produção

Para criar uma build de produção:

```bash
npm run build
# ou
yarn build
# ou
pnpm build
```

Para iniciar o servidor de produção:

```bash
npm start
# ou
yarn start
# ou
pnpm start
```

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria uma build de produção
- `npm start` - Inicia o servidor de produção
- `npm test` - Executa os testes
- `npm run lint` - Executa o linter

## Funcionalidades Principais

### Para Usuários

- Visualizar devocionais disponíveis
- Buscar devocionais por palavras-chave
- Inscrever-se em devocionais
- Acompanhar progresso de leitura
- Marcar dias como completos
- Visualizar devocionais inscritos
- Criar conta e fazer login

### Para Autores

- Criar novos devocionais
- Adicionar dias e versículos aos devocionais
- Gerenciar conteúdo publicado

## Banco de Dados

O banco de dados é gerenciado pelo Supabase (PostgreSQL). As principais tabelas incluem:

- `devotionals` - Armazena os devocionais
- `devotional_days` - Armazena os dias de cada devocional
- `user_subscriptions` - Gerencia as inscrições dos usuários
- `day_subscriptions` - Rastreia o progresso de leitura

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## Licença

Este projeto está sob licença privada. Todos os direitos reservados.
