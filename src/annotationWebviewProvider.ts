import * as vscode from "vscode";

export class AnnotationWebViewProvider implements vscode.WebviewViewProvider {
  constructor(private extensionUri: vscode.Uri) {}

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    webviewView.webview.options = {
      enableScripts: true, // スクリプトを使えるようにする
    };

    webviewView.webview.html = `
      <!DOCTYPE html>
      <html lang="ja">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Annotation WebView</title>
      </head>
      <body>
        <div id="app" />

        <script>
          const app = document.getElementById("app");
          app.innerText = "Hello World!";
        </script>
      </body>
      </html>
    `;
  }
}
