# wiki-redirect

シーサーバル道場のWikiページへの自動リダイレクトを行うCloudflare Workerアプリケーションです。<br>
https://wiki-redirect.reamkf-strcn.workers.dev/

## 機能概要

- 2020年8月1日を基準日として、2ヶ月ごとに更新されるシーサーバル道場のWikiページへ自動的にリダイレクトします
- リダイレクト先のURLは自動的に計算され、常に最新のシーズンのページへリダイレクトします
- JST（日本標準時）に基づいて計算を行います

## 技術仕様

- Cloudflare Workersを使用
- Node.js環境で開発
- Jest によるテスト環境を整備

### 主要な計算ロジック

- 基準日: 2020年8月1日（UTC）
- 基準カウント: 2
- シーズンカウントの計算方法:
  - 基準日からの経過月数を計算
  - 2ヶ月ごとにカウントを1増加
  - 現在のカウント = 基準カウント + 経過した偶数月の数

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
