import * as vscode from "vscode";

export class AnnotationWebViewProvider implements vscode.WebviewViewProvider {
  private _view?: vscode.WebviewView;

  constructor(private extensionUri: vscode.Uri) {}

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView;

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

  public showAnnotation(text: string) {
    // TODO: 表示する内容をアノテーションにする
    this._view!.webview.html = `
            <!DOCTYPE html>
              <html lang="ja">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Annotation WebView</title>
              </head>
              <body>
                <h1>${text}</h1>
              </body>
            </html>
            `;
  }
}
