# devsecops-pipeline

A small Node.js + Express API used to demonstrate a secure GitHub Actions pipeline.

## Endpoints
- `GET /health`
- `GET /api/products`
- `GET /api/products/:id`

## Local development
```bash
npm ci
npm test
npm run lint
npm run build   # no compile step: syntax-checks the sources
npm start       # http://localhost:4000
```

## Pipeline (`.github/workflows/`)
| Job | Purpose |
|---|---|
| `test` | npm ci, tests, lint, build check |
| `secret-scan` | gitleaks over the full git history |
| `dependency-scan` | `npm audit` gate (high+, production deps) |
| `codeql-analysis` | CodeQL SAST (GitHub Code Scanning) |

Branch protection on `main` requires these checks to pass before a pull request can merge.
No real secrets exist in this repository; any secret the pipeline needs is a GitHub Actions secret.
