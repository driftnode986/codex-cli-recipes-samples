# 開発ガイド

## 概要
- Node.js（ESM）製の最小 CLI タスク管理アプリ。実装は `src/`、単体テストは `tests/`。

## コマンド
- `npm test` — Node 組み込みテストランナーで全テストを実行する。
- `npm start` — CLI を起動する（例: `node src/index.js list`）。
- ビルド、lint、format 用のスクリプトや設定は存在しない。

## コード規約
- ESM の `import`/`export` と Node.js 標準 API を使う。外部依存は追加しない。
- 既存どおり 2 スペースインデント、ダブルクォート、セミコロンを使用する。
- タスク操作は可能な限り純粋関数として `src/tasks.js` に置き、変更時は `tests/tasks.test.js` を更新する。
- エラーは明確な `Error` とし、CLI 境界の `main().catch(...)` で表示・終了する。

## 変更しない場所
- `tasks.json` は実行時のローカルデータで `.gitignore` 対象。作成・編集・コミットしない。
- `README.md` の書籍・検証用の説明は、明示的な依頼がない限り変更しない。
