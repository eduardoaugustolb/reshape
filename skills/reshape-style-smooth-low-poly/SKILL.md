---
name: reshape-style-smooth-low-poly
description: Model or review low triangle counts with smooth surfaces or baked detail in Blender. Use when the ReShape brief calls for this visual treatment.
---

# Smooth low-poly modeling

Use [ReShape](../reshape/SKILL.md) for evidence-based approval and [the styles overview](../reshape-styles/SKILL.md) for mixed briefs.

## Visual references

- [Khronos Damaged Helmet asset preview](https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/DamagedHelmet). Compare the mesh silhouette with shading contributed by its normal texture.
- [Intel retopology illustrations](https://www.intel.com/content/dam/develop/external/us/en/documents/retopologizing-vr-and-game-assets-using-blender.pdf). Inspect the paired normal-map result and node illustrations as a visual comparison.

Use these examples to study visual decisions. Use the user's own target for likeness, dimensions, and design requirements.

## Modeling pass

Reserve vertices for the silhouette and joint deformation. Plan hard edges, smoothing splits, UV seams, and baked details together. Review the triangulated mesh intended for export. Keep depth and contact features in geometry where they affect the outline or pose.

## Approval checks

Compare the export with its normal map enabled and disabled under moving light. Inspect seams and the contour. Test deformation and count triangles using the exported mesh.

Reject and correct these failures before approval. Normal-map details that disappear at grazing silhouettes, visible bake seams, wrong tangent-space appearance, or collapsed joints. Record any remaining issue as partial delivery with a named view and cause.
