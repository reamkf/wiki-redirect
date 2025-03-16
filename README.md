# wiki-redirect

## 概要
https://seesaawiki.jp/kemono_friends3_5ch/ のページへのリダイレクトを行うCloudflare Workerアプリケーションです。

https://wiki-redirect.reamkf-strcn.workers.dev/

Seesaa WikiではURLのエンコードにEUC-JPを使用しているため、Discordなどに貼り付けた際に不具合が生じたり、ブラウザーの検索エンジンに登録できなかったりします。

このサイトは、UTF-8でURLを受け付け、EUC-JPに変換してリダイレクトします。

## 技術スタック
- HonoX
- Vite
- React
- TailwindCSS
- TypeScript
- Bun
- Cloudflare Workers

## 開発

To install dependencies:
```sh
bun install
```

To run:
```sh
bun run dev
```

To build:
```sh
bun run build
```


To deploy:
```sh
bun run deploy
```
