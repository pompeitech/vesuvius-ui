import { Graph, layout as dagreLayout } from '@dagrejs/dagre'
import type { Employee } from '@pompeitech/mock-data'
import type { Edge, Node } from '@xyflow/react'

export const NODE_WIDTH = 240
export const NODE_HEIGHT = 88

/** One edge per employee-with-a-manager — the CEO (no `managerId`) is the only node with no incoming edge. */
export function buildHierarchyEdges(employees: Employee[]): Edge[] {
  return employees
    .filter(e => e.managerId)
    .map(e => ({
      id: `${e.managerId}->${e.id}`,
      source: e.managerId as string,
      target: e.id,
      type: 'smoothstep'
    }))
}

/**
 * Runs dagre's layered tree layout over the current nodes/edges and returns
 * the same nodes with `position` set — called on mount and again after
 * every reparent, since moving one person changes the whole tree's shape.
 */
export function layoutWithDagre<T extends Record<string, unknown>>(
  nodes: Node<T>[],
  edges: Edge[]
): Node<T>[] {
  const g = new Graph()
  g.setDefaultEdgeLabel(() => ({}))
  g.setGraph({ rankdir: 'TB', nodesep: 32, ranksep: 96 })

  for (const node of nodes) {
    g.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT })
  }
  for (const edge of edges) {
    g.setEdge(edge.source, edge.target)
  }

  dagreLayout(g)

  return nodes.map(node => {
    const { x, y } = g.node(node.id)
    // dagre positions by center, React Flow by top-left corner.
    return { ...node, position: { x: x - NODE_WIDTH / 2, y: y - NODE_HEIGHT / 2 } }
  })
}

/** True if `possibleAncestorId` is `employeeId` itself or anywhere above it in the tree — reassigning onto a descendant would create a cycle. */
export function isAncestor(
  employees: Employee[],
  employeeId: string,
  possibleAncestorId: string
): boolean {
  let current = employees.find(e => e.id === employeeId)
  const visited = new Set<string>()
  while (current) {
    if (current.id === possibleAncestorId) return true
    if (visited.has(current.id)) return false // guards against already-corrupt data
    visited.add(current.id)
    current = employees.find(e => e.id === current?.managerId)
  }
  return false
}
