# wiki-redirect

https://seesaawiki.jp/kemono_friends3_5ch/ のページへのリダイレクトを行うCloudflare Workerアプリケーションです。

- 最新の道場ページへのリダイレクト: https://wiki-redirect.reamkf-strcn.workers.dev/dojo
- 任意ページへのリダイレクト: https://wiki-redirect.reamkf-strcn.workers.dev/任意のページ名

## 技術仕様

- Cloudflare Workersを使用
- Node.js環境で開発
- Jest によるテスト環境を整備

## 開発環境のセットアップ
`npm`の代わりに`pnpm`も使用可能です。

1. Node.jsをインストール

2. 必要なパッケージをインストール:
```bash
npm install
```

3. wranglerをインストール:
```bash
npm install -g wrangler
```

4. wranglerでログイン:
```bash
wrangler login
```

## ローカル開発サーバーの起動
```bash
npm run dev
```

## テスト

```bash
npm run test
```

## デプロイ方法

本番環境へのデプロイ:
```bash
npm run deploy
```

ビルドのみ実行:
```bash
npm run build
```

## ライセンス
MIT License
