import { useState } from "react";
import Folder from "./components/Folder";
import "./styles.css";
import explorer from "./data/explorerData";
import useTraverseTree from "./hooks/useTraverseTree";

export default function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  const { insertNode } = useTraverseTree();

  const handleInsertNode = (parentId, item, isFolder) => {
    const exp = insertNode(explorerData, parentId, item, isFolder);
    setExplorerData(exp);
  };

  return (
    <Folder handleInsertNode={handleInsertNode} explorerData={explorerData} />
  );
}
