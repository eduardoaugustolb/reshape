# Visual and technical validation

## Prepare verifiable criteria

For each requirement, record the region, reference or brief requirement, view or test, tolerance where applicable, and expected evidence. Identify whether the reference governs likeness, silhouette, proportions, style, or material. For original designs, compare the intended traits and document deliberate departures.

## Compare with the visual reference

Use the [required visual reference](../SKILL.md#required-visual-reference) from the first pass through the saved delivery candidate. Open and inspect the actual images at each review.

- **Side by side.** Save a labeled reference and render pair. Match pose, camera angle, focal length or projection, framing, and display scale as closely as the source allows. Mark mismatches that limit the comparison.
- **Overlay.** When pose and projection support it, align the reference and render on stable landmarks with translation, rotation, and uniform scale. Save a translucent overlay, two-color contours, or a before/after toggle. Keep the image undistorted and inspect landmarks left out of the alignment. If a reliable overlay cannot be made, record the reason and mark affected measurements unverified.
- **Silhouette and landmarks.** Check the outer contour and negative spaces. Annotate key landmarks and compare normalized distances where alignment supports it, such as shoulder width divided by projected height. Use matched crops for joints, face, and other decisive areas.
- **Additional views.** Inspect uncluttered front, profile, and three-quarter views and add back or top when useful. Use neutral matte shading to read volume, wireframe to diagnose topology, and intended lighting to assess finish. Views absent from the reference establish form coherence and leave likeness in those regions unverified.

Archive the pair, any overlay, and useful crops with the source and candidate version. For each discrepancy, name the view and region, state what to change, and repeat the comparison after correction.

## Capture and inspect each round

- Record camera, pose, scale, framing, resolution, lighting, and shading mode. Hold them fixed between rounds.
- Capture front, profile, and three-quarter views. Capture the back where warranted. Isolate the silhouette and use neutral shading to read mass. Use close-ups for transitions and wireframe for diagnosis. Review finish under conditions appropriate to the intended use. Open every view cited in the report.
- Inspect pose and proportions, silhouette and negative spaces, masses and junctions, planes and artifacts, then detail and finish. Compare parts at the same visual scale. Record the discrepancy in the view where it appears and state what needs correction.
- Use pass, fail, unverified, and not applicable. Only a pass closes a mandatory criterion. A hidden surface can be coherent even when fidelity to the reference remains unverified. Record that distinction in the report.

## Required review of the delivery candidate

Reopen the saved .blend to be delivered. Identify its version in the evidence. Actively look for reasons to reject it using the target and captures from that saved version. Open front, profile, and three-quarter views under neutral lighting, with a matte material, contrasting background, and resolution sufficient to judge decisive regions. Capture final lighting and materials separately when they are part of the deliverable. Reframe, zoom, and recapture unreadable regions. If clothing or accessories hide a suspect junction, capture the assembly and temporarily isolate layers in an inspection copy.

For characters, capture close-ups of the head and relevant joints from multiple angles. Assess cranium, orbits, nose, mouth, jaw, ears, and neck attachment as appropriate to the style and visible areas. Inspect landmark alignment and depth, continuity of volume, and unintended deformation. For low-poly assets, compare facets to the intended planes. When a facet creates a crease, apparent hole, or inverted plane, diagnose geometry, normals, and lighting before marking the region resolved. Stylization needs evidence of intent in the reference or brief.

For each decisive region, record the target, what the view shows, and the most serious remaining defect, if any. Attach status and evidence to every mandatory criterion. One critical failure or missing evidence blocks approval. Repeat the review after changes made since the capture. If available resources cannot correct the defect, identify it and its view in the partial delivery report.

## Verify mesh and intended use

Use the [local audit script](../scripts/audit-mesh.py) from the skill folder on the saved candidate. Pass the exact mesh object names for the intended delivery:

```sh
blender --background --disable-autoexec candidate.blend --python-exit-code 1 \
  --python scripts/audit-mesh.py -- "Body" "Eyes"
```

The `RESHAPE_MESH_AUDIT` line contains one JSON report for the active view layer and saved frame, using viewport-evaluated mesh data and local-space triangle areas. It reports counts, open edges, loose geometry, edges shared by more than two faces, adjacent winding conflicts, and zero-area triangles. Compare the counts to the brief and distinguish intentional openings. Check islands, global normal orientation, intersections, render-only modifiers, unconverted instances, exports, thickness, deformation, and visual quality where applicable. Use evidence from the local Blender scene for approval. The public ReShape REST and MCP validation endpoints report `unverified` because they have no Blender scene to inspect.

- Count vertices, triangles, and objects. Include the evaluated mesh after modifiers when that is what ships. Inspect normals, degenerate faces, intersections, islands, and open edges where they would be defects. Document intentional layers, panels, and openings.
- For real-time use, check relevant triangle, material, texture, and memory limits in the export or target application. Report measured frame rate or timing only with the test scene, hardware, and conditions recorded. If no budget was given, report counts and observed cost and leave the limit open.
- For rigging, test representative joint poses for deformation and interpenetration. For printing, check closure, thickness, and scale. For rendering, check artifacts and viewport or render costs where relevant. Reopen or reimport requested exports into an isolated scene and check scale, orientation, meshes, and required resources.
- Record region, criterion, target, observation, evidence, status, and correction for each round. After a correction, compare with the reference and the previous round. Revert or refine changes that introduce regressions.

## Calibration cases

### Stylized character with mannequin joints

The reference is a clothed, stylized character in three-quarter view. The candidate is a front-facing mannequin of blocks and capsules with spherical joints. The cameras cannot support a direct overlay. The candidate still fails continuity at the shoulder and chest, hip transition, and joint design. If clothing is in scope, its external volume and effect on the contour must also be visible. Capture a matching three-quarter view, correct proportions and transitions, then recapture front, profile, and three-quarter views. Inspect topology and rig deformation separately.

### Dark portrait with unreadable facial volumes

The three-quarter portrait has shadows that obscure the orbits and the relationship among cheekbones, nose, and jaw. The edge along the face and the head-to-collar junction also need inspection. Reject the image as evidence of approval. Mark the geometry as unverified until neutral front, profile, and three-quarter close-ups are available. Isolate pieces concealing the face and inspect planes and normals. If neutral views confirm collapsed volumes, unintended facets, or interpenetration, reject the mesh, correct the cause, and recapture. Relighting only resolves the image-readability criterion.
