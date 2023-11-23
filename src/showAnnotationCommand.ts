import vscode = require("vscode");

export function showAnnotationCommand(text: string) {
  vscode.window.showInformationMessage(text);
  // TODO: DB からアノテーションを取得するようにする
}
