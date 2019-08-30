/**
 * Data with nested structure.
 * Each node has a name and an optiona list of children.
 */

export class DataNode {
    name: string;
    children?: DataNode[];
  }