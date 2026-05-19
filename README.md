# Pata de Veludo 🐾

E-commerce de brinquedos para gatos — modelo dropshipping, marca íntima e luxo acessível.

**Stack:** Next.js 14 · Spring Boot 3.2 · PostgreSQL · Mercado Pago · Docker · Kubernetes

---

## Sistemas

| Sistema | Tech | Porta | Domínio |
|---|---|---|---|
| Loja (frontend) | Next.js 14 + Tailwind | 3000 | patadeveludo.com.br |
| Admin (frontend) | Next.js 14 + Tailwind | 3001 | admin.patadeveludo.com.br |
| API (backend) | Spring Boot 3.2 / Java 21 | 8080 | api.patadeveludo.com.br |
| Banco de dados | PostgreSQL 16 | 5432 | — |
| Cache | Redis 7 | 6379 | — |

---

## Quick start (Docker Compose)

```bash
# Clone
git clone https://github.com/stpedr/Velvet_pdf.git
cd Velvet_pdf

# Copie e preencha as variáveis
cp .env.example .env

# Suba tudo
make dev
# ou: docker compose up
```

Acesse:
- **Loja:** http://localhost:3000
- **Admin:** http://localhost:3001
- **API docs (Swagger):** http://localhost:8080/swagger-ui.html
- **Health:** http://localhost:8080/actuator/health

---

## Estrutura de pastas

```
Velvet_pdf/
├── frontend/          # Loja pública (Next.js)
├── admin-frontend/    # Painel admin (Next.js)
├── backend/           # API REST (Spring Boot)
├── docs/              # Documentação técnica com brand design
├── k8s/               # Manifests Kubernetes
├── .github/workflows/ # CI/CD pipelines
├── docker-compose.yml # Ambiente local completo
└── Makefile           # Comandos úteis
```

---

## Variáveis de ambiente

Copie `.env.example` → `.env` e preencha:

```env
# Banco
DB_URL=jdbc:postgresql://localhost:5432/patadeveludo
DB_USER=postgres
DB_PASS=sua_senha_aqui

# JWT
JWT_SECRET=segredo_com_minimo_32_caracteres

# Mercado Pago
MP_ACCESS_TOKEN=APP_USR-...
MP_PUBLIC_KEY=APP_USR-...
MP_WEBHOOK_SECRET=seu_webhook_secret

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_MP_PUBLIC_KEY=${MP_PUBLIC_KEY}
```

> **Produção:** nunca commite `.env`. Use secrets do Kubernetes ou GitHub Actions Secrets.

---

## Desenvolvimento

### Backend

```bash
cd backend
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

### Frontend (loja)

```bash
cd frontend
npm install
npm run dev
```

### Admin

```bash
cd admin-frontend
npm install
npm run dev
```

---

## Testes

### Backend — unitários + integração

```bash
cd backend

# Só unitários (rápido)
mvn test

# Unitários + integração (Testcontainers, requer Docker)
mvn verify

# Com relatório de cobertura
mvn verify && open target/site/jacoco/index.html
```

Threshold mínimo de cobertura: **80%** de linhas. A pipeline falha se ficar abaixo.

### Frontend — unitários

```bash
cd frontend
npm run test:unit          # Vitest
npm run test:unit -- --ui  # UI interativa
```

### E2E — Playwright

```bash
cd frontend

# Roda com servidor local
npx playwright test

# Modo visual (headed)
npx playwright test --headed

# Só um arquivo
npx playwright test e2e/checkout.spec.ts

# Ver relatório HTML do último run
npx playwright show-report
```

---

## Pipeline CI/CD

```
push / PR
    │
    ├─ backend-test    → mvn test + mvn verify (Testcontainers)
    ├─ frontend-test   → lint + typecheck + vitest + build
    ├─ admin-test      → lint + typecheck + vitest + build
    │
    ├─ e2e             → Playwright (chromium + mobile) — após unit tests
    ├─ security        → OWASP dep-check + npm audit
    │
    └─ build-images    → Docker build + push para GHCR (só main/develop)

main ──→ deploy-staging  → kubectl apply + smoke tests
       └→ deploy-prod    → aprovação manual → kubectl apply + rollback automático
```

### Branch protection (main)

- ✅ Require PR antes de merge
- ✅ Require 1 approval
- ✅ Require status checks: `backend-test`, `frontend-test`, `e2e`
- ✅ Require branches up-to-date
- ✅ Dismiss stale reviews on new commits
- ✅ Restrict force push
- ✅ Restrict deletion

---

## Pagamentos

Suporte atual: **Mercado Pago** (Pix · Cartão de crédito 4× sem juros · Boleto)

Arquitetura extensível — adicionar novo gateway = criar 1 `@Component` Spring, zero mudança no código de negócio:

```java
@Component("stripe")
public class StripeGateway implements PaymentGateway {
    @Override public String provider() { return "stripe"; }
    // implementar os 4 métodos da interface
}
```

Veja a documentação completa em [`docs/payments.html`](docs/payments.html).

---

## Documentação técnica

Abra os HTMLs diretamente no browser — sem servidor necessário:

| Arquivo | Conteúdo |
|---|---|
| `docs/index.html` | Visão geral da arquitetura |
| `docs/frontend.html` | Next.js: rotas, componentes, estado |
| `docs/backend.html` | API REST: todos os endpoints |
| `docs/payments.html` | Gateway de pagamento extensível |
| `docs/admin.html` | Sistema admin separado |

---

## Deploy (Kubernetes)

```bash
# Ver o que vai ser aplicado
kubectl diff -k k8s/

# Aplicar
kubectl apply -k k8s/

# Dev (1 réplica de tudo)
kubectl apply -k k8s/overlays/dev

# Produção
kubectl apply -k k8s/overlays/prod

# Status
kubectl get pods -n patadeveludo
```

---

## Contribuindo

1. Crie uma branch a partir de `develop`: `git checkout -b feat/minha-feature`
2. Commite suas mudanças com mensagem clara
3. Abra PR para `develop` — CI roda automaticamente
4. Após aprovação e CI verde → merge

---

## Licença

Proprietário — Mutum Labs LTDA · CNPJ 00.000.000/0001-00  
Pata de Veludo® é uma marca registrada da Mutum Labs.
