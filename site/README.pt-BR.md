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
