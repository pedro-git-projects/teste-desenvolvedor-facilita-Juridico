import GraphNode from "./GraphNode.js";

export default class WeightedDirectedGraph {
  nodes: GraphNode[];

  constructor() {
    this.nodes = [];
  }

  addNode(node: GraphNode) {
    this.nodes.push(node);
  }

  addEdge(node1: GraphNode, node2: GraphNode) {
    const weight = this.calculateEuclideanDistance(node1, node2);
    node1.neighbors.push({ node: node2, weight });
  }

  calculateEuclideanDistance(node1: GraphNode, node2: GraphNode): number {
    const dx = node1.x - node2.x;
    const dy = node1.y - node2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}
