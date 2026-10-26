# NAMES of G_D

This repository explores various names and attributes of G_D, providing insights and references for study and reflection.

## Table of Contents
- [Introduction](#introduction)
- [Purpose](#purpose)
- [Contributing](#contributing)
- [License](#license)

## Introduction
The names of G_D hold deep significance and are studied across various traditions. This repository aims to document and share knowledge about these names.

## Purpose
The purpose of this repository is to serve as a resource for learning and understanding the diverse names and their meanings.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue to suggest changes or additions.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Production configuration and verification

The canonical site origin is `https://namesofgod.kanmiobasa.com`. `VERCEL_URL` is intentionally ignored. Development may set `NEXT_PUBLIC_SITE_URL=http://localhost:3000` (or another local origin); production always uses the canonical domain. Cloudflare must have `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` configured for public read. Never expose a service-role key.

Use the checked-in npm lockfile: `npm ci`, `npm run typecheck`, `npm test`, `npm run build`, `npm run cf:build`. Verify the canonical domain and Supabase environment in Cloudflare before manually deploying with `npm run cf:deploy` using the project's configured Wrangler account. `supabase/seed.sql` contains `TRUNCATE` and must never be executed against production. The daily devotional uses UTC calendar days and stable UUID ordering; additions or removals can shift subsequent selections.

See [content integrity review](docs/content-integrity.md) for editorial follow-up and read-only live checks.
