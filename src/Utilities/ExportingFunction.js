/**
 *
 * References
 *
 * Thomas Findlay, “How to Download CSV and JSON Files in React,” The Road To Enterprise, n.d.,
 * https://theroadtoenterprise.com/blog/how-to-download-csv-and-json-files-in-react.
 */
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
