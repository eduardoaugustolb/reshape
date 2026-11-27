<p align="center"><img src="site/public/reshape/icon.svg" width="64" height="64" alt=""></p>

<h1 align="center">ReShape</h1>

<p align="center"><strong>Crie, esculpa e revise modelos 3D no Blender com o Codex e o Blender MCP.</strong></p>
<p align="center">Parta de uma imagem, de um briefing ou de uma malha existente. Compare as mesmas vistas a cada rodada para decidir o que corrigir.</p>
<p align="center"><a href="#instalação-no-codex">Instalar</a> · <a href="skills/reshape/references/anatomy.md">Anatomia</a> · <a href="skills/reshape-styles/SKILL.md">Estilos</a> · <a href="#site">Site</a> · <a href="README.md" lang="en-US">English</a></p>

| Bloqueio | Volumes | Superfície |
| :---: | :---: | :---: |
| ![Vaso facetado no bloqueio](site/public/reshape/base-three-quarter.webp) | ![Vaso com transições suaves no ombro e no gargalo](site/public/reshape/volume-three-quarter.webp) | ![Vaso com sulcos na superfície](site/public/reshape/surface-three-quarter.webp) |
| Estabeleça a silhueta. | Refine o ombro e o gargalo. | Esculpa e confira os sulcos. |

*O mesmo vaso em três passagens, com câmera e luz fixas.*

## Instalação no Codex

Na raiz do repositório, copie a pasta da skill para o diretório de skills do Codex.

```sh
mkdir -p ~/.agents/skills
cp -R skills/reshape skills/reshape-styles skills/reshape-style-* skills/reshape-anatomy-* ~/.agents/skills/
```

Para editar pelo MCP, abra o Blender e conecte o servidor Blender MCP ao agente. No Codex, invoque `$reshape` com o briefing ou a referência.

```text
$reshape Modele o vaso desta imagem no Blender. Compare a silhueta de frente e em três quartos.
$reshape Revise as transições dos ombros nesta malha e confira a deformação nas poses de teste.
```

## Como funciona

1. Extraia critérios observáveis da referência ou do briefing. Registre o que pode ser conferido e o que precisou ser inferido.
2. Modele em passagens. Resolva primeiro a silhueta e as massas principais, depois as transições e os detalhes da superfície.
3. Capture vistas comparáveis e corrija os desvios. Mantenha pose, câmera, escala e luz fixas entre rodadas.
4. Verifique a malha conforme o destino. Para rig, confira a deformação. Para impressão, confira fechamento e espessura. Para tempo real, confira o custo no destino.

A entrega inclui a malha editável, as vistas comparativas e o estado da validação. O [guia da skill](skills/reshape/SKILL.md) detalha cada etapa.

## Anatomia humana

O [catálogo de anatomia](skills/reshape/references/anatomy.md) reúne cinco skills para corpo inteiro, cabeça e pescoço, tronco, membros superiores e membros inferiores. Os guias locais preservam regras de construção, vistas, motivos de reprovação e fontes. Para corrigir o nariz, invoque `$reshape-anatomy-head` e abra o guia do nariz.

Ao atualizar, mova as pastas antigas `reshape-anatomy-*` para um backup fora do diretório de skills. Mantenha as cinco pastas listadas no catálogo e reinicie o Codex para atualizar a lista.

Use a [auditoria local no Blender](skills/reshape/references/validation.md#verify-mesh-and-intended-use) para medir a topologia do arquivo salvo. Revise as vistas comparáveis para aprovar a forma.

## Estilos de modelagem

Use [`$reshape-styles`](skills/reshape-styles/SKILL.md) para escolher entre 10 skills especializadas, cada uma com referências visuais e critérios de aprovação. Use `$reshape-style-faceted-low-poly` para geometria facetada ou `$reshape-style-cel-shading` para sombras em faixas e contornos.

## Site

O [site da ReShape](site/README.pt-BR.md) demonstra três passagens de modelagem de um vaso e permite comparar bloqueio e superfície em frente, perfil e três quartos.

```sh
cd site
bun install
bun run dev
```

## Créditos

O ciclo de captura, comparação e revisão foi adaptado da [Reanimate de Niaz Morshed](https://github.com/NiazMorshed2007/reanimate). O código original da skill está em [skills/reanimate](skills/reanimate). [Licença MIT](LICENSE).
