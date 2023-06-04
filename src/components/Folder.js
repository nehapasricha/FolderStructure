import { useState } from "react";

export default function Folder({ handleInsertNode, explorerData }) {
  const [expand, setExpanded] = useState(false);
  const [showInput, setShowInput] = useState({
    isVisible: false,
    isFolder: false
  });

  const handleOnClick = (e) => {
    e.stopPropagation();
    setExpanded(!expand);
  };

  const handleButtonClick = (e, isFolder) => {
    e.stopPropagation();
    setShowInput({
      isVisible: true,
      isFolder: isFolder
    });
    setExpanded(true);
  };

  const insertNode = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorerData.id, e.target.value, showInput.isFolder);

      setShowInput({ ...showInput, visible: false });
    }
  };

  const onInputBlur = () => {
    setShowInput({
      isVisible: false,
      isFolder: false
    });
  };

  if (explorerData?.isFolder) {
    return (
      <div id={explorerData.id}>
        <div className="">
          <div
            className="folder"
            onClick={(e) => {
              handleOnClick(e);
            }}
          >
            <span role="img" aria-labelledby="folder">
              📁
            </span>
            <span>{explorerData?.name}</span>

            {explorerData.isFolder && (
              <div>
                <button onClick={(e) => handleButtonClick(e, true)}>
                  Folder +
                </button>
                <button onClick={(e) => handleButtonClick(e, false)}>
                  File +
                </button>
              </div>
            )}

            {showInput?.isVisible && (
              <input
                type="text"
                autoFocus
                onKeyDown={(e) => insertNode(e)}
                onBlur={(e) => onInputBlur()}
              />
            )}
            <div
              style={{ paddingLeft: 35, display: expand ? "block" : "none" }}
            >
              {explorerData.items.map((exp) => {
                return <Folder key={exp.id} explorerData={exp} />;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div id={explorerData.id}>
        <span role="img" aria-labelledby="file">
          📄
        </span>
        <span>{explorerData?.name}</span>
      </div>
    );
  }
}
