# Modeling in passes

## Operating Blender

Use Blender MCP's scene and capture tools when available. Keep geometry scripts scoped to named objects. Use [mesh data](https://docs.blender.org/api/current/bpy.types.Mesh.html) or [BMesh](https://docs.blender.org/api/current/bmesh.html) for vertex and topology edits that can run without a viewport. Check mode, active object, and selection before an operation that uses them. If an operator fails its context check, reproduce the edit with direct data access or use Blender's interactive tools for that pass. If MCP is unavailable and Blender is installed, run the pass on a working copy via Blender in background mode with `--python-exit-code 1`, then capture from that version. Open the captures after each pass.

## Choosing a construction method

- **Organic or realistic.** Use a topology-appropriate base mesh when the user supplied it or its license permits the intended use. Fit broad proportions and depth with a low-resolution cage or proportional edits, then correct individual planes and transitions. For a new base, place landmarks in front and profile and build a connected surface between them. If the handoff from blockout to sculpt stalls at a junction, rebuild the local patch or use an interactive sculpt pass. After remeshing, compare volume, openings, and the separation of digits. Record base provenance and inspect the new silhouette and landmarks before adding density.
- **Hard surface.** Build profiles, thicknesses, joints, and planes from the reference. Use reversible modifiers where appropriate. Judge bevels and normals by the continuity of reflections. Real seams, panels, and accessories may remain separate pieces.
- **Stylized or low-poly.** Place sparse, connected rings or patches at contour changes, joint creases, and plane boundaries. Put edges where they control the projected silhouette or describe a change in plane. Review the cage in flat shading first, then with the intended normals and export triangulation. When simplifying a dense source, use it as a target for the cage and correct silhouette drift before reducing more polygons.
- **Existing mesh.** Identify the defect's cause before rebuilding. Preserve UVs, materials, weights, and shape keys as required. Topology changes can invalidate them. Compare the working version before replacing existing data.

## Form order

Resolve the relationship between landmarks and masses from more than one view. Changing a plane often affects two profiles. Then solve transitions and pieces that alter the silhouette. Add folds, seams, materials, or wear after approving the forms they follow. For clothed characters, inspect body and clothing together for thickness, drape, and interference. Isolate layers to diagnose the cause.

Keep the pass script on disk and return measurements, failed regions, and paths to captures. For a local correction, load the relevant anatomy guide and reuse the same cameras. Fix the form in the lowest-resolution mesh that controls it, then recheck the neighboring junction before continuing.
