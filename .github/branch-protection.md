# Branch Protection — configuração recomendada

Configure via **GitHub → Settings → Branches → Add rule**.

## Branch: `main`

```
Branch name pattern: main

✅ Require a pull request before merging
   ✅ Require approvals: 1
   ✅ Dismiss stale pull request approvals when new commits are pushed
   ✅ Require review from Code Owners (se CODEOWNERS existir)

✅ Require status checks to pass before merging
   ✅ Require branches to be up to date before merging
   Required status checks:
     - backend-test
     - frontend-test
     - admin-test
     - e2e
     - security

✅ Require conversation resolution before merging

✅ Require linear history (evita merge commits — usa squash/rebase)

✅ Restrict who can push to matching branches
   (só admins do repositório)

❌ Allow force pushes      ← DESATIVADO
❌ Allow deletions         ← DESATIVADO
```

## Branch: `develop`

```
Branch name pattern: develop

✅ Require a pull request before merging
   ✅ Require approvals: 1
   ✅ Dismiss stale pull request approvals when new commits are pushed

✅ Require status checks to pass before merging
   Required status checks:
     - backend-test
     - frontend-test
     - admin-test

❌ Allow force pushes      ← DESATIVADO
❌ Allow deletions         ← DESATIVADO
```

## Aplicar via GitHub CLI

```bash
# main
gh api repos/stpedr/Velvet_pdf/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["backend-test","frontend-test","admin-test","e2e","security"]}' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true}' \
  --field restrictions=null \
  --field allow_force_pushes=false \
  --field allow_deletions=false \
  --field required_linear_history=true

# develop
gh api repos/stpedr/Velvet_pdf/branches/develop/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["backend-test","frontend-test","admin-test"]}' \
  --field enforce_admins=false \
  --field required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true}' \
  --field restrictions=null \
  --field allow_force_pushes=false \
  --field allow_deletions=false
```

## CODEOWNERS

Crie `.github/CODEOWNERS` para exigir revisão por area:

```
# Padrão — qualquer arquivo
* @stpedr

# Backend
/backend/ @stpedr

# Frontend
/frontend/ @stpedr
/admin-frontend/ @stpedr

# Infraestrutura — requer revisão dedicada
/k8s/ @stpedr
/.github/ @stpedr
docker-compose.yml @stpedr
```
