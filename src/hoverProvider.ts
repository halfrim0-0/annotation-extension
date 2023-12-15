import vscode = require("vscode");

export class HoverProvider {
  private context: vscode.ExtensionContext;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
  }

  provideHover(document: any, position: any, token: any) {
    const wordRange = document.getWordRangeAtPosition(
      position,
      /[a-zA-Z0-9_]+/
    );
    if (wordRange === undefined) return Promise.reject("no word here");

    // ホバーしているテキストを取得
    const currentWord = document
      .lineAt(position.line)
      .text.slice(wordRange.start.character, wordRange.end.character);
    this.context.globalState.update("text", currentWord);

    // ホバー時に表示する内容
    const config = vscode.workspace.getConfiguration("displayType");
    const displayInTheBrowser = config.get<Boolean>("displayInTheBrowser");
    if (displayInTheBrowser) {
      const uri = `http://127.0.0.1:5000/annotation/show?text=${currentWord}&type=browser`;
      const contents = new vscode.MarkdownString(
        `[アノテーションを表示](${uri})`
      );
      contents.isTrusted = true;
      return Promise.resolve(new vscode.Hover(contents));
    } else {
      const commandUri = vscode.Uri.parse("command:showAnnotation");
      const contents = new vscode.MarkdownString(
        `[アノテーションを表示](${commandUri})`
      );
      contents.isTrusted = true;
      return Promise.resolve(new vscode.Hover(contents));
    }
  }
}
