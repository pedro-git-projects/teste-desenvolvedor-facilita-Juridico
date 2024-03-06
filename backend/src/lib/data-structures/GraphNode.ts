export default class GraphNode {
  x: number;
  y: number;
  neighbors: { node: GraphNode; weight: number }[];

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.neighbors = [];
  }
}
