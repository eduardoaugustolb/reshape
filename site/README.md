# ReShape website

[Português (Brasil)](README.pt-BR.md)

The site presents the [ReShape skill](../skills/reshape/SKILL.md) and demonstrates modeling passes with Blender renders of an original vase. It uses a static Next.js export. US English is available at `/` and Brazilian Portuguese at `/pt-br/`, with a language switcher in the header.

## Develop

```sh
bun install
bun run dev
bun run build
```

The build produces `out/` and packages ReShape and its anatomy and style skills from `../skills/` for download. All ReShape skills are in US English. The WebP images in `public/reshape/` show the blockout, volumes, and surface from fixed views.

## Host

Set `SITE_URL` to the public ReShape URL in the build environment to generate canonical URLs and sharing metadata. Run `bun run deploy` with an authenticated Cloudflare account to use the Worker settings in `wrangler.jsonc`. You can also host the static files directly from `out/`.

The original Reanimate showcase assets are in `public/examples/`, `public/media/`, and [video/](video/README.md).
