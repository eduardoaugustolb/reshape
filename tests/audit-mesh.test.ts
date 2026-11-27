import { expect, test } from "bun:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const audit = fileURLToPath(new URL("../skills/reshape/scripts/audit-mesh.py", import.meta.url));

test("audits saved, evaluated meshes and rejects names outside the view layer", () => {
  const directory = mkdtempSync(join(tmpdir(), "reshape-audit-"));
  const candidate = join(directory, "candidate.blend");
  try {
    const setup = Bun.spawnSync([
      "blender", "--background", "--factory-startup", "--python-exit-code", "1",
      "--python-expr", `
import bpy

cube = bpy.data.objects["Cube"]
subdivision = cube.modifiers.new("Subdivision", "SUBSURF")
subdivision.levels = 1

mesh = bpy.data.meshes.new("Open mesh")
mesh.from_pydata(
    [(0, 0, 0), (1, 0, 0), (0, 1, 0), (0, -1, 0), (2, 0, 0), (3, 0, 0)],
    [],
    [(0, 1, 2), (0, 1, 3), (0, 1, 4)],
)
mesh.update()
obj = bpy.data.objects.new("Open Mesh", mesh)
bpy.context.collection.objects.link(obj)
bpy.ops.wm.save_as_mainfile(filepath=${JSON.stringify(candidate)})
`,
    ]);
    expect(setup.exitCode).toBe(0);

    const command = [
      "blender", "--background", "--disable-autoexec", candidate, "--python-exit-code", "1",
      "--python", audit, "--",
    ];
    const result = Bun.spawnSync([...command, "Cube", "Open Mesh"]);
    expect(result.exitCode).toBe(0);
    const prefix = "RESHAPE_MESH_AUDIT ";
    const line = result.stdout.toString().split("\n").find((line) => line.startsWith(prefix));
    expect(line).toBeDefined();
    expect(JSON.parse(line!.slice(prefix.length))).toMatchObject({
      file: candidate,
      meshes: [
        { object: "Cube", vertices: 26, faces: 24, triangles: 48, boundary_edges: 0 },
        {
          object: "Open Mesh", triangles: 3, boundary_edges: 6, multi_face_edges: 1,
          isolated_vertices: 1, zero_area_triangles: 1,
        },
      ],
    });

    const missing = Bun.spawnSync([...command, "Missing"]);
    expect(missing.exitCode).toBe(1);
    expect(missing.stdout.toString()).not.toContain(prefix);
    expect(missing.stderr.toString()).toContain("'Missing' is not a mesh");
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}, 30_000);
