const useTraverseTree = () => {
  const insertNode = (root, parentId, item, isFolder) => {
    if (root.id === parentId && root.isFolder) {
      root.items.unshift({
        id: new Date().getTime(),
        name: item,
        items: [],
        isFolder: isFolder
      });
    }

    let currentNode = root.items.map((item) => {
      return insertNode(item, parentId, item, isFolder);
    });

    return { ...root, items: currentNode };
  };

  return { insertNode };
};

export default useTraverseTree;
