import vscode = require("vscode");
import { HoverProvider } from "./hoverProvider";

function activate(context: any) {
  context.subscriptions.push(
    vscode.languages.registerHoverProvider("python", new HoverProvider())
  );
}

function deactivate() {
  return undefined;
}

module.exports = {
  activate,
  deactivate,
};
