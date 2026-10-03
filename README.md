# repost-frontend

Blog público do Repost (Next.js App Router).

Decisões de arquitetura: [repost-documentation](https://github.com/devrenatafraga/repost-documentation/tree/main/docs/adr).

## Desenvolvimento local

Requisitos: Node.js 22+

```bash
npm install
cp .env.example .env
npm run dev
```

Scripts:

- `npm run dev` — servidor de desenvolvimento
- `npm run build` — build de produção
- `npm run typecheck` — verificação TypeScript
- `npm run lint` — ESLint
- `npm run gen:api` — baixa `/openapi.json` do backend e regenera `src/api/schema.d.ts`
- `npm run gen:api:check` — regenera tipos a partir do snapshot commitado e falha se houver drift

## Contrato OpenAPI (ADR-0003)

Snapshot em [`openapi/openapi.json`](openapi/openapi.json). Tipos gerados em [`src/api/schema.d.ts`](src/api/schema.d.ts).

Com o backend rodando:

```bash
OPENAPI_URL=http://localhost:8080/openapi.json npm run gen:api
```

A CI executa `gen:api:check` para impedir dessincronia entre snapshot e tipos.

## Posts públicos

A home lista `GET /api/v1/public/posts`. Cada post abre em `/posts/{slug}` via `GET /api/v1/public/posts/{slug}`. Só entram posts `published`.

`API_BASE_URL` (ver `.env.example`) é a base da API. O fetch usa ISR de 60 segundos. Na Vercel, defina `API_BASE_URL` antes do build. Ex.: `https://repost-manager-backend.onrender.com`.

## Licença

MIT
