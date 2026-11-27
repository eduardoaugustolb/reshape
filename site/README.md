# ReShape website

[Português (Brasil)](README.pt-BR.md)

The site presents the [ReShape skill](../skills/reshape/SKILL.md) and demonstrates modeling passes with Blender renders of an original vase. US English is available at `/` and Brazilian Portuguese at `/pt-br/`, with a language switcher in the header.

## Develop

```sh
bun install
bun run dev
bun run build
```

The build serves the checked-in [download package](public/reshape/reshape-skill.tar.gz). It includes ReShape, the [five anatomy skills and their local guides](../skills/reshape/references/anatomy.md), the style skills, and the [Blender audit script](../skills/reshape/references/validation.md#verify-mesh-and-intended-use). The WebP images in `public/reshape/` show the blockout, volumes, and surface from fixed views.

## Host

The Next.js deployment uses `site/` as its project root. It serves the pages, JSON API, and MCP endpoints. For mesh validation, the hosted endpoints return `unverified` with null counts. Run the local audit script against the saved `.blend` for measurements.
