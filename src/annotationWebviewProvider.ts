import axios from "axios";
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

  public async showAnnotation(text: string) {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/annotation/show",
        {
          params: {
            type: "vscode",
            text: text,
          },
        }
      );
      const annotations = response.data;
      annotations.sort((a: any, b: any) => {
        const aCreateAt = new Date(a.create_at);
        const bCreateAt = new Date(b.create_at);
        return aCreateAt < bCreateAt ? 1 : -1;
      });
      let list = "";
      for (const annotation of annotations) {
        const date = new Date(annotation.create_at);
        list += `<li>${annotation.description}<small>(${date.toLocaleString(
          "ja-JP",
          { year: "numeric", month: "numeric", day: "numeric" }
        )})</small></li>`;
      }

      this._view!.webview.html = `
            <!DOCTYPE html>
              <html lang="ja">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Annotation WebView</title>
              </head>
              <body>
                <h1 id="text">${text}</h1>
                <form>
                  <label for="description">アノテーション追加</label><br/>
                  <textarea id="description" name="description" required="required"></textarea><br/>
                  <input type="button" value="登録" onclick="createAnnotation()">
                </form>
                <ul>${list}</ul>

                <script>
                  function createAnnotation() {
                    const textElement = document.getElementById("text");
                    const text = textElement.innerText || textElement.textContent;
                    const descriptionField = document.getElementById("description");
                    const description = descriptionField.value;

                    const url = "http://127.0.0.1:5000/annotation/create";
                    const data = {
                      text: text,
                      description: description
                    }
                    const jsonData = JSON.stringify(data);

                    fetch(url, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body: jsonData
                    })
                      .then(function () {
                      })
                      .catch(function (error) {
                        console.error("エラーが発生しました:", error);
                      });
                  }
                </script>
              </body>
            </html>
            `;
    } catch (err: any) {
      vscode.window.showInformationMessage(err);
    }
  }
}
