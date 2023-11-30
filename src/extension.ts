import vscode = require("vscode");
import { HoverProvider } from "./hoverProvider";
import { showAnnotationCommand } from "./showAnnotationCommand";
import { AnnotationWebViewProvider } from "./annotationWebviewProvider";

function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.languages.registerHoverProvider("python", new HoverProvider(context))
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("showAnnotation", () => {
      const text: string = context.globalState.get("text") || "";
      showAnnotationCommand(text);
    })
  );
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "annotation-view",
      new AnnotationWebViewProvider(context.extensionUri)
    )
  );
}

function deactivate() {
  return undefined;
}

module.exports = {
  activate,
  deactivate,
};
