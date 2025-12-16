# Contributing to git-switcher

Obrigado por considerar contribuir para o git-switcher! Este documento fornece diretrizes para contribuições.

## Processo de Desenvolvimento

### 1. Setup Local

```bash
# Clone o repositório
git clone <repository-url>
cd git-switcher

# Instale as dependências
npm install

# Compile o projeto
npm run build

# Instale globalmente para testes
npm run link
```

### 2. Antes de Criar um Pull Request

Execute o pipeline de CI localmente para garantir que tudo está funcionando:

```bash
npm run ci
```

Este comando executa:
- ✅ Lint (Ultracite/Biome)
- ✅ Build (TypeScript)
- ✅ Testes

### 3. Padrões de Código

Este projeto usa **Ultracite** (preset do Biome) para linting e formatação:

```bash
# Verificar problemas
npm run lint

# Corrigir automaticamente
npm run lint:fix
```

**Regras importantes:**
- Use `const` por padrão, `let` apenas quando necessário
- Extraia regex patterns para o nível superior (performance)
- Remova funções `async` que não usam `await`
- Use destructuring para imports do Vitest
- Mantenha a ordem alfabética nos imports

### 4. Escrevendo Testes

Todos os testes devem estar no diretório `tests/` ou com sufixo `.test.ts`:

```typescript
import { describe, expect, it } from 'vitest'

describe('Feature Name', () => {
  it('should do something', () => {
    expect(result).toBe(expected)
  })
})
```

Execute testes:
```bash
npm test              # Watch mode
npm run test:run      # Single run (CI)
npm run test:ui       # Visual interface
```

### 5. Estrutura de Commits

Use mensagens de commit descritivas no formato:

```
<tipo>: <descrição curta>

<descrição detalhada opcional>
```

**Tipos:**
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação (não afeta código)
- `refactor`: Refatoração
- `test`: Adiciona ou corrige testes
- `chore`: Manutenção (build, deps, etc)

**Exemplos:**
```
feat: add user list command

Implements the 'user list' command to display all configured profiles
with their associated email and SSH key.
```

```
fix: resolve path normalization in directory links

Ensures that paths with ~ are properly expanded before being
stored in the configuration file.
```

### 6. Pull Request

1. Crie uma branch a partir de `main`:
   ```bash
   git checkout -b feature/minha-feature
   ```

2. Faça suas alterações e commit:
   ```bash
   git add .
   git commit -m "feat: adicionar nova feature"
   ```

3. Execute o CI localmente:
   ```bash
   npm run ci
   ```

4. Push para o seu fork:
   ```bash
   git push origin feature/minha-feature
   ```

5. Abra um Pull Request no GitHub

### 7. CI/CD Pipeline

Quando você abre um PR, o GitHub Actions executa automaticamente:

1. **Lint** - Verifica formatação e padrões de código
2. **Build** - Compila TypeScript para JavaScript
3. **Tests** - Executa suite de testes
4. **Verify** - Valida artefatos de build
5. **Smoke Test** - Testa execução básica da CLI

O PR só pode ser mergeado se todos os checks passarem ✅

### 8. Arquitetura do Projeto

```
src/
├── bin/
│   └── cli.ts          # Entry point da CLI
├── cli/                # Comandos da CLI
│   ├── commands/       # Implementação dos comandos
│   └── prompts/        # Prompts interativos
└── core/               # Lógica de negócio
    ├── services/       # Serviços (profile, directory, etc)
    ├── repositories/   # Acesso a dados (config.yaml)
    └── types/          # Interfaces TypeScript
```

**Princípios:**
- Separação de responsabilidades (CLI vs Core)
- Services contêm lógica de negócio
- Repositories gerenciam persistência
- CLI apenas orquestra chamadas aos services

### 9. Dúvidas?

- Abra uma [Issue](../../issues) para discussão
- Consulte a [documentação](../../README.md)
- Revise PRs anteriores para referência

## Código de Conduta

- Seja respeitoso e construtivo
- Aceite feedback com mente aberta
- Foque no problema, não nas pessoas
- Contribua de forma positiva para a comunidade

Obrigado por contribuir! 🚀
