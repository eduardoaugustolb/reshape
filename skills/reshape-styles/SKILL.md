---
name: reshape-styles
description: Define, apply, or review the visual style of 3D models in Blender with ReShape. Use for realism, semi-realism, cartoon, chibi, low-poly, cel shading, clay, miniatures, handcrafted finishes, and mixed styles.
---

# 3D modeling styles

Use [ReShape](../reshape/SKILL.md) to build, capture, and approve the asset. This skill turns visual direction into decisions about geometry, surfaces, and presentation. For human figures, use the [anatomy catalog](../reshape/references/anatomy.md) to establish landmarks and junctions before stylizing.

## Define style before blockout

Record five decisions in the spec and cite the relevant brief or reference:

- **Silhouette and proportions.** Identify the masses and landmarks that define the subject. State what can be enlarged, stretched, or compressed.
- **Planes and edges.** Mark continuous, faceted, and beveled regions. Identify changes in plane that define the form.
- **Detail hierarchy.** Decide what reads at the intended distance, on approach, and in close-up. Prioritize what affects the silhouette or identifies the asset.
- **Surface and presentation.** Specify color, texture, material, lighting, and projection. Identify which features require geometry and which belong to the shader or render.
- **Intended use.** Record display scale, rigging, export, and any geometry budget. For mixed styles, assign rules by region and dimension. For example, use cartoon proportions, low-poly planes, a matte finish, and neutral review lighting.

If references conflict, identify which reference governs each decision. A technical polygon limit and a faceted visual style have separate acceptance criteria. If likeness matters, identify the relationships that carry it before exaggerating.

## Specialized style skills

- [Realistic modeling](../reshape-style-realistic/SKILL.md) · `$reshape-style-realistic`
- [Semi-realistic modeling](../reshape-style-semi-realistic/SKILL.md) · `$reshape-style-semi-realistic`
- [Faceted low-poly modeling](../reshape-style-faceted-low-poly/SKILL.md) · `$reshape-style-faceted-low-poly`
- [Smooth low-poly modeling](../reshape-style-smooth-low-poly/SKILL.md) · `$reshape-style-smooth-low-poly`
- [Cartoon modeling](../reshape-style-cartoon/SKILL.md) · `$reshape-style-cartoon`
- [Chibi modeling](../reshape-style-chibi/SKILL.md) · `$reshape-style-chibi`
- [Anime-style modeling](../reshape-style-anime/SKILL.md) · `$reshape-style-anime`
- [Cel-shaded rendering for 3D models](../reshape-style-cel-shading/SKILL.md) · `$reshape-style-cel-shading`
- [Clay and handcrafted modeling](../reshape-style-clay/SKILL.md) · `$reshape-style-clay`
- [Miniature and toy modeling](../reshape-style-miniature-toy/SKILL.md) · `$reshape-style-miniature-toy`

Choose one or more skills, then name which rule controls each area. For example, combine cartoon proportions, faceted low-poly geometry, and cel shading. For anime characters, use the anime modeling skill for form and the cel-shading skill for lighting and lines.

## Review readability before approval

1. Inspect neutral material and silhouette in front, profile, and three-quarter views. Include the reference angle and use pose.
2. Review finish under intended materials and lighting. For rigs and turntables, inspect intermediate poses or angles where form or shading can fail.
3. Record each regional deviation with an image, cause, and correction. A style decision preserves the documented intent and stays readable across required views. Unintended intersection, collapse, artifacts, and deformation block approval. Correct and recapture, or mark the delivery as partial.

**Calibration.** A low-poly face may have angular cheeks. If one looks collapsed and the crease conflicts with the target, inspect geometry and normals under neutral light before approving. A cartoon character may have large eyes. The exaggerated eyes still need to pass the documented seat, profile, and eyelid-closure checks.
