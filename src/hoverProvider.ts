import vscode = require("vscode");

export class HoverProvider {
  provideHover(document: any, position: any, token: any) {
    const wordRange = document.getWordRangeAtPosition(
      position,
      /[a-zA-Z0-9_]+/
    );
    if (wordRange === undefined) return Promise.reject("no word here");

    const currentWord = document
      .lineAt(position.line)
      .text.slice(wordRange.start.character, wordRange.end.character);
    return Promise.resolve(new vscode.Hover(currentWord));
  }
}
