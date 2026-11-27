import argparse
import json
import sys

import bmesh
import bpy


def audit(obj, depsgraph):
    evaluated = obj.evaluated_get(depsgraph)
    mesh = evaluated.to_mesh()
    topology = bmesh.new()
    try:
        mesh.calc_loop_triangles()
        topology.from_mesh(mesh)
        return {
            "object": obj.name,
            "vertices": len(mesh.vertices),
            "faces": len(mesh.polygons),
            "triangles": len(mesh.loop_triangles),
            "boundary_edges": sum(edge.is_boundary for edge in topology.edges),
            "wire_edges": sum(edge.is_wire for edge in topology.edges),
            "multi_face_edges": sum(len(edge.link_faces) > 2 for edge in topology.edges),
            "winding_conflicts": sum(
                edge.is_manifold and not edge.is_contiguous for edge in topology.edges
            ),
            "isolated_vertices": sum(not vertex.link_edges for vertex in topology.verts),
            "zero_area_triangles": sum(triangle.area == 0 for triangle in mesh.loop_triangles),
        }
    finally:
        topology.free()
        evaluated.to_mesh_clear()


def main():
    parser = argparse.ArgumentParser(description="Measure named meshes in the saved Blender scene.")
    parser.add_argument("objects", metavar="OBJECT", nargs="+")
    args = parser.parse_args(sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else [])
    if not bpy.data.filepath:
        raise ValueError("Open the saved .blend candidate before auditing.")

    view_layer = bpy.context.view_layer
    objects = []
    for name in dict.fromkeys(args.objects):
        obj = view_layer.objects.get(name)
        if obj is None or obj.type != "MESH":
            raise ValueError(f"{name!r} is not a mesh in view layer {view_layer.name!r}")
        objects.append(obj)

    depsgraph = bpy.context.evaluated_depsgraph_get()
    report = {
        "file": bpy.data.filepath,
        "scene": bpy.context.scene.name,
        "view_layer": view_layer.name,
        "frame": bpy.context.scene.frame_current,
        "meshes": [audit(obj, depsgraph) for obj in objects],
    }
    print("RESHAPE_MESH_AUDIT " + json.dumps(report, separators=(",", ":")))


if __name__ == "__main__":
    main()
