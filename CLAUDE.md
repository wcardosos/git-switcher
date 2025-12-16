# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**git-switcher** is a CLI tool that simplifies managing multiple Git identities on a single system. It automates switching between different Git user configurations (name, email, SSH keys) based on directory context using Git's `includeIf` feature.

**Target users:** Developers managing multiple Git accounts (personal, work, clients) who want to avoid commits with wrong credentials.

**Stack:** Node.js, TypeScript, Commander.js, Clack (interactive prompts)

## Core Architecture

The tool is organized into three main layers:

### 1. CLI Layer (`src/cli/`)
- **Commands:** Individual command implementations (init, user/*, use, dir/*, whoami, status, health, export, import)
- **Prompts:** Reusable interactive prompts (profile selection, SSH key selection, confirmations)

### 2. Core Layer (`src/core/`)
- **Services:** Business logic for profile management, directory linking, gitconfig manipulation, SSH key discovery
  - `profile.service.ts` - CRUD operations for user profiles
  - `directory.service.ts` - Manages directory-to-profile bindings
  - `gitconfig.service.ts` - Reads/writes Git config files and `includeIf` rules
  - `ssh.service.ts` - Discovers and validates SSH keys
- **Repositories:** Data access layer
  - `config.repository.ts` - Handles `~/.config/git-switcher/config.yaml` CRUD
- **Types:** TypeScript interfaces for Profile, DirectoryLink, Config

### 3. Configuration Structure

All data stored in `~/.config/git-switcher/`:
- `config.yaml` - Central configuration with profiles and directory links
- `profiles/<name>.gitconfig` - Auto-generated gitconfig files included via `includeIf`

## Key Workflows

### Profile-to-Directory Binding
1. User runs `git-switcher use <profile> [path]`
2. Adds/updates link in `config.yaml`
3. Generates `profiles/<profile>.gitconfig` with user.name, user.email, core.sshCommand
4. Adds `[includeIf "gitdir:<path>/"]` rule to `~/.gitconfig` pointing to profile gitconfig

### Identity Resolution
1. User runs `git-switcher whoami` in a directory
2. Read `~/.gitconfig` to find matching `includeIf` rule for current directory
3. Resolve which profile's gitconfig is active
4. Display profile name and email

## Configuration Format

```yaml
# ~/.config/git-switcher/config.yaml
version: 1

profiles:
  personal:
    userName: "Wagner"
    email: "wagner@gmail.com"
    sshKey: "~/.ssh/id_ed25519"

  work:
    userName: "Wagner Silva"
    email: "wagner@empresa.com"
    sshKey: "~/.ssh/id_rsa_work"

links:
  - path: "~/projects/empresa"
    profile: "work"
  - path: "~/projects/pessoal"
    profile: "personal"
```

Generated profile gitconfig:
```gitconfig
# ~/.config/git-switcher/profiles/work.gitconfig
[user]
    name = Wagner Silva
    email = wagner@empresa.com

[core]
    sshCommand = ssh -i ~/.ssh/id_rsa_work
```

## Critical Design Constraints

### Safety and Reliability
- **Always backup `~/.gitconfig` before modification** - Corrupting user's Git config is high-impact risk
- **Atomic operations** - Never leave config in inconsistent state
- **Validate all inputs** - Email format, SSH key existence, path normalization
- **No destructive actions without confirmation** - Especially for removing profiles/links

### Performance Targets
- All commands: < 500ms response time
- `whoami` command: < 100ms response time

### File Permissions
- Config directory: 700 (drwx------)
- Config files: 600 (-rw-------)

### Path Handling
- Always normalize paths (expand `~`, resolve relative paths)
- Store paths with `~` for portability (not absolute paths)
- Handle trailing slashes consistently in `includeIf` rules

## Command Implementation Priority

### Phase 1 (MVP v1.0.0)
1. `init` - First-time setup wizard
2. `user add/list/remove` - Profile management
3. `use <profile> [path]` - Bind profile to directory
4. `whoami` - Quick identity check
5. `dir list/remove` - Directory management

### Phase 2 (v1.1.0)
6. `user edit` - Modify existing profiles
7. `status` - Detailed current configuration
8. `health` - Configuration validation
9. `export/import` - Configuration portability

## Development Notes

### Dependencies (from PRD)
- `commander` ^12.x - CLI parsing
- `@clack/prompts` ^0.7.x - Interactive prompts
- `yaml` ^2.x - Config serialization
- `chalk` ^5.x - Terminal colors
- `cli-table3` ^0.6.x - Table formatting

### Testing Strategy
- Unit tests for all service layer functions
- E2E tests for command workflows (Phase 2)
- Validate gitconfig parsing/generation
- Test path normalization edge cases

### Error Handling Patterns
- Provide clear error messages with actionable suggestions
- Use exit code 0 for success, 1 for errors
- Validate early (fail fast on invalid input)

## Platform Support

- **Current:** Linux only
- **Future:** macOS (v2.0), Windows/WSL (v2.0)

## Important Git Concepts

### includeIf Conditional Includes
Git's `includeIf` allows loading configuration based on repository path:
```gitconfig
[includeIf "gitdir:~/projects/work/"]
    path = ~/.config/git-switcher/profiles/work.gitconfig
```

Key behaviors:
- `gitdir:` matches if current repo is under specified path
- Trailing slash matters - `~/projects/work/` matches subdirectories
- Rules evaluated in order - last match wins
- Paths must be absolute or use `~`
