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


## Referências

- [Git includeIf documentation](https://git-scm.com/docs/git-config#_conditional_includes)
- [XDG Base Directory Specification](https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html)
- [Clack documentation](https://github.com/natemoo-re/clack)
- [Commander.js documentation](https://github.com/tj/commander.js)