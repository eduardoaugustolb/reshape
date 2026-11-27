# Site da ReShape

[English](README.md)

A página apresenta a [skill ReShape](../skills/reshape/SKILL.md) e demonstra suas passagens de modelagem com renders de um vaso original feitos no Blender.

## Desenvolver

```sh
bun install
bun run dev
bun run build
```

A página está disponível em inglês dos EUA em `/` e em português em `/pt-br/`, com seletor no cabeçalho. As skills distribuídas no pacote estão em inglês dos EUA.

O build serve o [pacote para download](public/reshape/reshape-skill.tar.gz) versionado no repositório. Ele inclui a ReShape, as [cinco skills de anatomia e seus guias locais](../skills/reshape/references/anatomy.md), as skills de estilo e o [script de auditoria do Blender](../skills/reshape/references/validation.md#verify-mesh-and-intended-use). As imagens WebP em `public/reshape/` mostram o bloqueio, os volumes e a superfície em vistas fixas.

## Hospedar

A implantação Next.js usa `site/` como raiz do projeto e serve as páginas e os endpoints JSON e MCP. A validação de malha hospedada retorna `unverified` com contagens nulas. Para obter as medições, execute a auditoria local no `.blend` salvo.

A vitrine antiga permanece em `public/examples/`, `public/media/` e [video/](video/README.md).

## Arquivo da Reanimate

The live examples recreate parts of vercel.com, nextjs.org, turborepo.com, stripe.com, workos.com, clerk.com, liveblocks.io, resend.com and pro.reactbits.dev as a study of the technique. The Stripe cards use Inter instead of Stripe's licensed Söhne, but port Stripe's shaders and use Stripe's images; the WorkOS visual uses WorkOS's robot images, app icons and screen shaders; the Clerk cards use Geist and Geist Mono instead of Clerk's licensed fonts, and port Clerk's inline SVG, light-streak canvas and dot-field shader. The Liveblocks demo uses Inter instead of the licensed Suisse Int'l, and reuses liveblocks.io's avatars, drawings and icons. The Resend cube draws resend.com's own Spline scene (geometry, textures and shaders) with three.js, over resend.com's hero images. Fading Stars ports the shaders and simulation that pro.reactbits.dev runs for its live preview. The Vercel, Next.js and Turborepo copies use the Geist builds those sites serve (OFL). The vercel.com hero and Fluid ocean port vercel.com's own renderers, its 13 GLSL shaders and 10 WGSL modules unchanged; the toolbar, workflow dashboard and Turborepo gauge reuse their sites' inline SVG and run their animation code ported from the page, the toolbar with vercel.com's avatar images; the Next.js cards port nextjs.org's canvas and SVG drawing code with its dot data. Not affiliated with or endorsed by Vercel, Stripe, WorkOS, Clerk, Liveblocks, Resend or React Bits.
