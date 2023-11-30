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
    const commandUri = vscode.Uri.parse("command:showAnnotation");
    const contents = new vscode.MarkdownString(
      `[アノテーションを表示](${commandUri})`
    );
    contents.isTrusted = true;
    return Promise.resolve(new vscode.Hover(contents));
  }
}
