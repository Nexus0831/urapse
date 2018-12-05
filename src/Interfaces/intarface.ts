export interface OriginalNode {
  key: string,
  title: string,
  backgroundColor: string,
  textColor: string,
  link: string,
}

export interface MindMap {
  key: string,
  title: string,
  body: string,
  nodes: Array<OriginalNode>
}
