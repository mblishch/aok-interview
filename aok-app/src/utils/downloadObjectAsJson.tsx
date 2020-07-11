export default function downloadObjectAsJson(exportObj: object, exportName: string) {
  const objStr = JSON.stringify(exportObj, null, 2);
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(objStr);
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}