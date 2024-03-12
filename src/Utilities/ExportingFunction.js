export const exportJSON = (data) => {
  const json = JSON.stringify(data);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.download = "data.json";
  a.href = url;
  const clickEvt = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  a.dispatchEvent(clickEvt);
  a.remove();
};

// const link = document.createElement("a");
// link.href = url;
// link.download = "data.json";
// document.body.appendChild(link);
// link.click();

// URL.revokeObjectURL(url);
// document.body.removeChild(link);
