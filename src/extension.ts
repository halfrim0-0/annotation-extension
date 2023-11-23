import vscode = require("vscode");
import { HoverProvider } from "./hoverProvider";
import { showAnnotationCommand } from "./showAnnotationCommand";

function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.languages.registerHoverProvider("python", new HoverProvider())
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("showAnnotation", () => {
      const text: string = context.globalState.get("text") || "";
      showAnnotationCommand(text);
    })
  );
}

function deactivate() {
  return undefined;
}

module.exports = {
  activate,
  deactivate,
};
