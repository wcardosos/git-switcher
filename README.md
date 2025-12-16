# git-switcher

## Visão Geral

**Nome do produto:** git-switcher  
**Versão:** 1.0.0  
**Plataforma:** Linux (inicial)  
**Stack:** Node.js, TypeScript, Commander.js, Clack  
**Distribuição:** npm

### Resumo Executivo

O git-switcher é uma ferramenta CLI que simplifica o gerenciamento de múltiplas contas Git em um mesmo sistema. Desenvolvedores que trabalham com diferentes contextos (pessoal, trabalho, clientes) frequentemente enfrentam problemas de commits com credenciais erradas. O git-switcher resolve isso através de perfis configuráveis vinculados a diretórios específicos, automatizando a troca de identidade Git e chaves SSH.

---

## Problema

Desenvolvedores que utilizam múltiplas contas Git enfrentam:

1. **Commits com credenciais erradas** — usar email pessoal em repositórios de trabalho e vice-versa
2. **Configuração manual repetitiva** — editar `.gitconfig` e `.ssh/config` manualmente para cada contexto
3. **Erros de autenticação SSH** — usar a chave SSH errada para o repositório
4. **Falta de visibilidade** — não saber qual identidade está ativa no momento

### Soluções Atuais e Limitações

| Solução | Limitação |
|---------|-----------|
| `git config --local` | Configuração manual por repositório, não escala |
| `includeIf` no `.gitconfig` | Requer edição manual do arquivo, sintaxe complexa |
| Scripts personalizados | Sem padronização, difícil manutenção |

---

## Público-Alvo

**Primário:** Desenvolvedores que utilizam múltiplas contas GitHub/GitLab no mesmo sistema.

**Perfis típicos:**
- Desenvolvedor com conta pessoal + conta corporativa
- Freelancer que trabalha para múltiplos clientes
- Contribuidor open-source que separa identidade pessoal da profissional

**Requisitos do usuário:**
- Familiaridade básica com Git e terminal
- Sistema operacional Linux
- Node.js instalado (v22+)

---

## Objetivos do Produto

### Objetivo Principal
Eliminar commits com credenciais erradas através de automação inteligente baseada em diretórios.

### Objetivos Secundários
1. Reduzir tempo de configuração de novos ambientes de desenvolvimento
2. Prover visibilidade clara sobre qual identidade está ativa
3. Manter configurações portáveis e versionáveis (dotfiles)

### Métricas de Sucesso
- Zero configuração manual do `.gitconfig` após setup inicial
- Tempo de onboarding < 2 minutos para criar primeiro perfil
- Comando `whoami` responde em < 100ms

---

## Fases de Desenvolvimento

### Fase 1: MVP (v1.0.0)
- [x] Definição de comandos
- [ ] Setup do projeto (TypeScript, ESLint, estrutura)
- [ ] Implementar `init`
- [ ] Implementar `user add`, `user list`, `user remove`
- [ ] Implementar `use`
- [ ] Implementar `whoami`
- [ ] Implementar `dir list`, `dir remove`
- [ ] Testes unitários core
- [ ] Publicar no npm

### Fase 2: Polimento (v1.1.0)
- [ ] Implementar `user edit`
- [ ] Implementar `status`
- [ ] Implementar `health`
- [ ] Implementar `export` e `import`
- [ ] Testes E2E
- [ ] Documentação (README, exemplos)

### Fase 3: Expansão (v2.0.0)
- [ ] Suporte a macOS
- [ ] Suporte a Windows (WSL)
- [ ] Suporte a GitLab e Bitbucket
- [ ] Hooks Git (warning se commitar sem perfil)
- [ ] Integração com shell (prompt mostrando perfil ativo)

---

## Desenvolvimento

### Pré-requisitos

- Node.js >= 22.0.0
- npm

### Setup do Projeto

```bash
# Clone o repositório
git clone <repository-url>
cd git-switcher

# Instale as dependências
npm install

# Compile o projeto
npm run build
```

### Como Testar a CLI

#### Opção 1: Desenvolvimento Rápido

Execute a CLI diretamente após compilar:

```bash
npm run dev
```

Este comando compila o projeto e executa a CLI imediatamente.

#### Opção 2: Testar com npx (Pacote Local)

Após compilar, teste usando npx:

```bash
npm run build
npx git-switcher
```

#### Opção 3: Link Global (Recomendado para Desenvolvimento)

Crie um link simbólico global para testar a CLI como se estivesse instalada globalmente:

```bash
# Crie o link global
npm run link

# Agora você pode usar o comando em qualquer lugar
git-switcher --help
git-switcher init
git-switcher whoami

# Quando terminar os testes, remova o link
npm run unlink
```

**Vantagens desta abordagem:**
- Testa a CLI em condições reais de uso
- Funciona em qualquer diretório
- Após mudanças no código, basta executar `npm run build`
- Fácil de instalar/desinstalar

#### Opção 4: Execução Direta com Node

Execute o JavaScript compilado diretamente:

```bash
npm run build
node dist/bin/cli.js
```

### Scripts Disponíveis

```bash
# Build
npm run build              # Compila TypeScript para JavaScript
npm run build:watch        # Compila em modo watch (auto-rebuild ao salvar)
npm run clean              # Remove o diretório dist/

# Desenvolvimento
npm run dev                # Compila e executa a CLI
npm run link               # Instala CLI globalmente (symlink)
npm run unlink             # Desinstala CLI global

# Lint
npm run lint               # Verifica código com Ultracite
npm run lint:fix           # Corrige problemas de formatação automaticamente

# Testes
npm test                   # Executa testes em modo watch
npm run test:run           # Executa testes uma vez (modo CI)
npm run test:ui            # Abre interface visual do Vitest
npm run test:coverage      # Executa testes com relatório de cobertura

# CI
npm run ci                 # Executa pipeline completo (lint + build + test)
```

### Estrutura do Projeto

```
git-switcher/
├── src/
│   ├── bin/
│   │   └── cli.ts          # Entry point da CLI
│   ├── cli/                # Implementação dos comandos
│   └── core/               # Lógica de negócio
│       ├── services/       # Camada de serviços
│       ├── repositories/   # Camada de acesso a dados
│       └── types/          # Interfaces TypeScript
├── tests/                  # Arquivos de teste
├── dist/                   # Output compilado (gerado)
└── package.json
```

### Workflow de Desenvolvimento

1. Faça alterações no código
2. Compile o projeto: `npm run build`
3. Teste localmente: `npm run link` (apenas na primeira vez)
4. Execute o comando: `git-switcher <comando>`
5. Verifique os resultados
6. Itere

**Para iteração mais rápida:**
```bash
# Terminal 1: Modo watch
npm run build:watch

# Terminal 2: Teste os comandos
git-switcher <comando>
```

### Escrevendo Testes

Coloque os arquivos de teste no diretório `tests/` ou junto aos arquivos fonte com extensão `.test.ts` ou `.spec.ts`:

```typescript
import { describe, it, expect } from 'vitest'

describe('Nome da Feature', () => {
  it('should fazer algo', () => {
    expect(true).toBe(true)
  })
})
```

Executar testes:
```bash
npm test              # Modo watch
npm run test:run      # Execução única
npm run test:coverage # Com cobertura
```

### Integração Contínua (CI)

O projeto possui GitHub Actions configurado para executar automaticamente em Pull Requests e pushes para a branch `main`:

**Pipeline CI** (`.github/workflows/ci.yml`):
1. ✅ **Lint** - Verifica código com Ultracite (Biome)
2. ✅ **Build** - Compila TypeScript
3. ✅ **Tests** - Executa testes unitários
4. ✅ **Verify** - Valida artefatos de build
5. ✅ **Smoke Test** - Testa execução da CLI

Para executar o pipeline completo localmente:
```bash
npm run ci
```

Isso executa os mesmos comandos que o CI:
- `npm run lint` - Verifica formatação e linting
- `npm run build` - Compila o projeto
- `npm run test:run` - Executa testes

---

## Referências

- [Git includeIf documentation](https://git-scm.com/docs/git-config#_conditional_includes)
- [XDG Base Directory Specification](https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html)
- [Clack documentation](https://github.com/natemoo-re/clack)
- [Commander.js documentation](https://github.com/tj/commander.js)