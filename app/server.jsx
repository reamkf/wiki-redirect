import { Hono } from 'hono'
import { getWikiNanodaPageUrl, getWikiNanodaPageAddUrl } from '../src/seesaawiki'
import { getCurrentSeasonCount } from '../src/dojo-season'

const app = new Hono()

// ルートページ
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ja">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Wiki リダイレクトサービス</title>
        <style>
          /* Base styles */
          html, body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            line-height: 1.5;
          }

          /* Container styles */
          .container {
            min-height: 100vh;
            background-color: #f3f4f6;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 1rem;
          }

          .card {
            background-color: white;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border-radius: 0.5rem;
            padding: 2rem;
            max-width: 28rem;
            width: 100%;
          }

          .title {
            font-size: 1.5rem;
            font-weight: bold;
            text-align: center;
            color: #1f2937;
            margin-bottom: 1.5rem;
          }

          .info-box {
            background-color: #eff6ff;
            padding: 1rem;
            border-radius: 0.375rem;
            border: 1px solid #dbeafe;
            margin-bottom: 1.5rem;
          }

          .paragraph {
            color: #374151;
            margin-bottom: 1rem;
          }

          .button {
            display: block;
            width: 100%;
            text-align: center;
            background-color: #3b82f6;
            color: white;
            font-weight: 500;
            padding: 0.5rem 1rem;
            border-radius: 0.25rem;
            transition: background-color 0.3s;
            text-decoration: none;
          }

          .button:hover {
            background-color: #2563eb;
          }

          .small-text {
            font-size: 0.875rem;
            color: #6b7280;
            margin-top: 0.5rem;
          }

          .code {
            background-color: #f3f4f6;
            padding: 0 0.25rem;
            border-radius: 0.125rem;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="card">
            <h1 class="title">
              Wiki リダイレクトサービス
            </h1>

            <div class="info-box">
              <p class="paragraph">
                リダイレクト先が指定されていません。
              </p>

              <div>
                <a
                  href="/dojo"
                  class="button"
                >
                  最新の道場ページへ移動
                </a>

                <p class="small-text">
                  <span style="font-weight: 500">/dojo</span> にアクセスすると最新の道場ページへリダイレクトされます。
                </p>
              </div>
            </div>

            <div style="margin-top: 1rem">
              <p class="small-text">その他の任意の文字列を指定するとそのページ名を持つページへリダイレクトされます。</p>
              <p style="margin-top: 0.5rem" class="small-text">
                例: <code class="code">/page/ページ名</code>
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `)
})

// /dojoへのアクセスを処理
app.get('/dojo', (c) => {
  const currentCount = getCurrentSeasonCount()
  const dojoUrl = getWikiNanodaPageUrl(`シーサーバル道場（β2-${currentCount}）`)
  return c.redirect(dojoUrl, 302)
})

// /page/:pageNameへのアクセスを処理
app.get('/page/:pageName', (c) => {
  const pageName = c.req.param('pageName')

  if (pageName) {
    const decodedPageName = decodeURIComponent(pageName)
    const targetUrl = getWikiNanodaPageUrl(decodedPageName)
    return c.redirect(targetUrl, 302)
  }

  return c.redirect('/')
})

// /add/:pageNameへのアクセスを処理
app.get('/add/:pageName', (c) => {
  const pageName = c.req.param('pageName')

  if (pageName) {
    const decodedPageName = decodeURIComponent(pageName)
    const targetUrl = getWikiNanodaPageAddUrl(decodedPageName)
    return c.redirect(targetUrl, 302)
  }

  return c.redirect('/')
})

export default app