import GraphNode from "../lib/data-structures/GraphNode.js";
import PriorityQueue from "../lib/data-structures/PrioriryQueue.js";
import WeightedDirectedGraph from "../lib/data-structures/WeightedDirectedGraph.js";
import Cliente from "../models/customer.js";

/**
 * Função para calcular o caminho mais curto entre um conjunto de clientes e uma loja.
 * @param clientes - Array de objetos Cliente representando os clientes.
 * @returns Um array ordenado dos clientes pelo caminho mais curto até a loja.
 */
export function calculateShortestPath(clientes: Cliente[]) {
  if (clientes.length === 0) return [];

  const targetNode: Cliente = {
    id: 0,
    created_at: new Date(),
    nome: "Loja",
    email: "minha@loja.com",
    telefone: "+1234567890",
    coordenada_x: 0,
    coordenada_y: 0,
  };

  clientes.push(targetNode);

  const graph = new WeightedDirectedGraph();

  const coordinates: [number, number][] = clientes.map(cliente => [
    cliente.coordenada_x,
    cliente.coordenada_y,
  ]);

  coordinates.forEach(([x, y]) => {
    const node = new GraphNode(x, y);
    graph.addNode(node);
  });

  // Conectando os nós
  for (let i = 0; i < graph.nodes.length; i++) {
    for (let j = i + 1; j < graph.nodes.length; j++) {
      const node1 = graph.nodes[i];
      const node2 = graph.nodes[j];
      graph.addEdge(node1, node2);
      graph.addEdge(node2, node1);
    }
  }

  const distances: { [key: number]: number } = {};
  const previous: { [key: number]: GraphNode | null } = {};
  const pq = new PriorityQueue<GraphNode>();

  graph.nodes.forEach(node => {
    distances[node.x * 1000 + node.y] = Infinity;
    previous[node.x * 1000 + node.y] = null;
    pq.enqueue(node, Infinity);
  });

  distances[targetNode.coordenada_x * 1000 + targetNode.coordenada_y] = 0;

  while (!pq.isEmpty()) {
    const current = pq.dequeue();

    if (current) {
      current.neighbors.forEach(neighbor => {
        const alt = distances[current.x * 1000 + current.y] + neighbor.weight;
        if (alt < distances[neighbor.node.x * 1000 + neighbor.node.y]) {
          distances[neighbor.node.x * 1000 + neighbor.node.y] = alt;
          previous[neighbor.node.x * 1000 + neighbor.node.y] = current;
          pq.enqueue(neighbor.node, alt);
        }
      });
    }
  }

  // Calculando as distâncias de cada cliente até a loja
  const clienteDistances: { [key: number]: number } = {};
  clientes.forEach((cliente, index) => {
    clienteDistances[index] =
      distances[cliente.coordenada_x * 1000 + cliente.coordenada_y];
  });

  // Ordenando os clientes com base na distância até a loja
  clientes.sort((a, b) => {
    const distanceA = clienteDistances[clientes.indexOf(a)];
    const distanceB = clienteDistances[clientes.indexOf(b)];
    return distanceA - distanceB;
  });

  clientes.pop();

  return clientes;
}
