---
name: reshape-estilos
description: Define, apply, or review the visual style of 3D models in Blender with ReShape. Use for realism, semi-realism, cartoon, chibi, low-poly, cel shading, clay, miniatures, handcrafted finishes, and mixed styles.
---

# 3D modeling styles

Use [ReShape](../reshape/SKILL.md) to build, capture, and approve the asset. This skill turns visual direction into decisions about geometry, surfaces, and presentation. For human figures, use the [anatomy catalog](../reshape/references/anatomia.md) to establish landmarks and junctions before stylizing.

## Define style before blockout

Record five decisions in the spec and cite the relevant brief or reference:

- **Silhouette and proportions.** Identify the masses and landmarks that define the subject. State what can be enlarged, stretched, or compressed.
- **Planes and edges.** Mark continuous, faceted, and beveled regions. Identify changes in plane that define the form.
- **Detail hierarchy.** Decide what reads at the intended distance, on approach, and in close-up. Prioritize what affects the silhouette or identifies the asset.
- **Surface and presentation.** Specify color, texture, material, lighting, and projection. Identify which features require geometry and which belong to the shader or render.
- **Intended use.** Record display scale, rigging, export, and any geometry budget. For mixed styles, assign rules by region and dimension. For example, use cartoon proportions, low-poly planes, a matte finish, and neutral review lighting.

If references conflict, identify which reference governs each decision. A technical polygon limit and a faceted visual style have separate acceptance criteria. If likeness matters, identify the relationships that carry it before exaggerating.

## Style-specific construction and review

| Style | Build | Inspect and reject |
|---|---|---|
| Realistic | Establish plausible scale, thickness, and transitions. Ground organic forms in anatomical support and verify joins and clearances in objects. Add microdetail after resolving masses, planes, and edges. | Compare landmarks and profiles in equivalent views. Reject incompatible volumes, thickness, artificial junctions, or detail that conceals bad form under specific lighting. |
| Semi-realistic | Preserve recognizable structure and landmarks. Decide which planes, edges, or volume relationships to simplify or emphasize and apply that logic across related regions. | Compare simplification across regions and views. Reject unintended changes in visual language, such as one naturalistic hand with joints exaggerated only on the other. |
| Faceted low-poly | Distribute faces to support silhouettes and plane changes in required views. Choose edges and normals deliberately. Reserve geometry for contours, meaningful curves, and deformation. | Inspect under neutral light and in motion where rigged. Reject arbitrary facets that cause dents, broken silhouettes, or flicker. Measure exported triangles when there is a budget. |
| Smooth low-poly | Prioritize silhouette and deformation. Decide where to use smooth normals, hard edges, and normal maps supported by the target. | Inspect the export under intended lighting. Reject ragged silhouettes outside tolerance, normal artifacts, and collapsing joints. Check mesh and map separately. |
| Cartoon | Exaggerate size relationships and curves that support gesture, expression, and readability. Design negative spaces, junctions, and direction of masses before finishing. | Inspect the silhouette at intended size in multiple views. Reject unreadable features, inconsistent exaggeration, or joints that work only in the primary view. |
| Chibi | Set the head-to-body relationship and compression of torso and limbs from the target. Preserve support and the integration of neck, hands, and feet even with sparse detail. | Check profile, stance, and pose. Reject unsupported heads, unintended fused limbs, or expressions that disappear at small scale. |
| Anime and cel shading | Build geometry to support features and outlines. Treat anime proportions, stepped lighting, and linework as independent choices. Document the camera range of view-dependent solutions. | Inspect eyes, nose, and mouth in profile and three-quarter views. Test outlines and shading at intended angles. Reject double lines, unstable shading bands, or unreadable required views. |
| Clay or handcrafted | Model continuous masses, edges, and irregularity appropriate to material scale. Place tool marks where the process or finish calls for them. | Inspect under soft and grazing light. Reject uniform noise, tool marks that obscure planes, or unintentionally disconnected joins. |
| Miniature or toy | Design masses, thicknesses, and divisions that read at final size. Model joins or seams required by the design. For printing, verify against the requested process and scale. | Inspect the silhouette at intended size and junctions up close. Reject detail that vanishes, incoherent supports, or thickness below manufacturing requirements. |

## Review readability before approval

1. Inspect neutral material and silhouette in front, profile, and three-quarter views. Include the reference angle and use pose.
2. Review finish under intended materials and lighting. For rigs and turntables, inspect intermediate poses or angles where form or shading can fail.
3. Record each regional deviation with an image, cause, and correction. A style decision preserves the documented intent and stays readable across required views. Unintended intersection, collapse, artifacts, and deformation block approval. Correct and recapture, or mark the delivery as partial.

**Calibration.** A low-poly face may have angular cheeks. If one looks collapsed and the crease conflicts with the target, inspect geometry and normals under neutral light before approving. A cartoon character may have large eyes. The exaggerated eyes still need to pass the documented seat, profile, and eyelid-closure checks.
