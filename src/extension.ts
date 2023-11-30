import vscode = require("vscode");
import { HoverProvider } from "./hoverProvider";
import { AnnotationWebViewProvider } from "./annotationWebviewProvider";

function activate(context: vscode.ExtensionContext) {
  const provider = new AnnotationWebViewProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.languages.registerHoverProvider("python", new HoverProvider(context))
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("showAnnotation", () => {
      const text: string = context.globalState.get("text") || "";
      provider.showAnnotation(text);
    })
  );
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("annotation-view", provider)
  );
}

function deactivate() {
  return undefined;
}

module.exports = {
  activate,
  deactivate,
};
