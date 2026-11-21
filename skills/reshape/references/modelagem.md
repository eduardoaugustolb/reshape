# Modeling in passes

## Operating Blender

Use MCP's native inspection and capture tools when available. Model interactively or entirely through Python via Blender MCP. Scripts may create geometry, move vertices, reshape regions, and apply native Blender operations. Before each operation, verify the active object, selection, mode, and scope. Split mass construction, regional correction, and finish into inspectable and reversible operations. Open a capture after each pass. If the form fails, correct its geometric cause and recapture before detailing. Successful execution, a saved file, and a closed mesh are technical evidence. Visual approval comes from inspected views.

## Choosing a construction method

- **Organic.** Build a continuous base with simple topology or prepare a unified blockout on a copy. Establish the silhouette with broad changes, then refine planes and transitions with brushes or local edits. Adjust mesh density before sculpting details. After remeshing, check for volume loss, fused fingers, sealed openings, and accidental joints. Union, remesh, and smoothing prepare the surface. Shoulders, elbows, hips, and knees still need volumes and transitions designed for the pose.
- **Hard surface.** Build profiles, thicknesses, joints, and planes from the reference. Use reversible modifiers where appropriate. Judge bevels and normals by the continuity of reflections. Real seams, panels, and accessories may remain separate pieces.
- **Stylized or low-poly.** Preserve the readability of planes, edge design, and deliberate polygon distribution. Control topology on continuous surfaces and inspect facets at the intended viewing scale. Intentional facets pass where they support the form.
- **Existing mesh.** Identify the defect's cause before rebuilding. Preserve UVs, materials, weights, and shape keys as required. Topology changes can invalidate them. Compare the working version before replacing existing data.

## Form order

Resolve the relationship between landmarks and masses from more than one view. Changing a plane often affects two profiles. Then solve transitions and pieces that alter the silhouette. Add folds, seams, materials, or wear after approving the forms they follow. For clothed characters, inspect body and clothing together for thickness, drape, and interference. Isolate layers to diagnose the cause.
