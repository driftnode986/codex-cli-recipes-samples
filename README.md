# Codex CLI実践レシピ — サンプルリポジトリ

書籍『Codex CLI実践レシピ ― AGENTS.md・承認モード・codex exec』（牧野 誠）のサンプルコード・設定ファイル集です。

本書のレシピは「プロンプト（指示文）と、それを実行した実際の出力」の組で構成しています。
掲載しているコマンドと出力は、すべてこのリポジトリ上で実際に走らせて採取したものです。

Kindle 版: [Codex CLI実践レシピ](https://www.amazon.co.jp/dp/B0HF3P4562)

## 動かしてみる

必要なのは **Node.js 18 以降**だけです（著者環境は 22.22.2）。外部依存はないので `npm install` は要りません。

```bash
git clone https://github.com/driftnode986/codex-cli-recipes-samples.git
cd codex-cli-recipes-samples/playground/hello-tasks
npm test
```

`# pass 14` が出れば準備完了です。あとは本書のプロンプトをこのディレクトリで実行してください。

Codex CLI 自体の導入は本書第1章で扱います。

## ディレクトリの構成

### `playground/hello-tasks/`

レシピの実行対象になる、最小の CLI タスク管理アプリです。第1章で導入し、第4章以降のレシピが
これを書き換えていきます。

第4章「コード生成」で `removeTask` を追加し、第5章「テスト・品質検証」で `updateTask` と
ファイル I/O のテストを追加した**後の状態**が入っています。本書を読みながら同じ手順を試すと、
Codex が同じ変更を提案してくるはずです。差分を見比べるために、最初に
`git switch -c my-run` でブランチを切っておくと戻しやすくなります。

`AGENTS.md` は第3章で Codex 自身に生成させたものです。

### `configs/`

`config.toml` のサンプルです。ファイル名の先頭が対応する章番号になっています。

- `ch01-first-config.toml` — 最初の設定（モデル・承認・sandbox の既定）
- `ch02-safe-defaults.toml` — 承認モードと sandbox の安全側の既定値
- `ch03-agents-md.toml` — `AGENTS.md` の読み込みに関する設定

いずれも `~/.codex/config.toml` に置く内容の抜粋です。まるごと上書きせず、必要な項目だけ
写して使ってください。

### `agents-md/`

`AGENTS.md` の出発点になるテンプレートです（第3章・第9章）。規模と言語別に分けてあります。

- `minimal/` — まず置くならこれ。5行から始める版
- `typescript/` — TypeScript / Node.js の例
- `python/` — Python の例
- `with-claude-code/` — Claude Code と併用し、指示ファイルを二重管理しない構成

詳しくは [`agents-md/README.md`](agents-md/README.md) を参照してください。

### `.github/workflows/`

第7章の `codex exec` を CI に組み込む例と、本書の実機検証に使ったワークフローです。

- `ci-sandbox-verify.yml` — CI 上で sandbox の境界を実測する（モデルを呼ばないので API キー不要）
- `windows-verify.yml` — Windows でのインストール手順の検証（第1章）
- `ch07-lint-autofix.yml` — lint の失敗を `codex exec` に修正させる例（第7章 7-15）

いずれも `workflow_dispatch` で手動実行する形にしています。フォークして試す場合、
`codex exec` を使うワークフローには API キーの設定が要ります。

## 検証環境

本書の実行結果・エラーメッセージ・所要時間は、すべて以下の環境で採取しました。

- Codex CLI 0.147.0
- モデル: gpt-5.6-terra
- macOS (Apple Silicon)
- Windows は GitHub Actions の `windows-latest`（Windows Server 2025）で検証

Codex CLI は更新が速く、フラグや既定値が変わることがあります。本書と挙動が違う場合は
`codex --version` を確認してください。バージョン差による違いは第1章で扱っています。

## うまくいかないときは

**`npm test` で `node: --test` が unknown option と出る**
Node.js が 18 より古い環境です。`node --version` を確認してください。

**`codex` コマンドが見つからない**
Codex CLI が未導入か、PATH が通っていません。第1章の導入手順を参照してください。
Windows では、インストール後に**新しい PowerShell ウィンドウを開く**必要があります。

**ワークフローが `bwrap: loopback: Failed RTM_NEWADDR` で失敗する**
GitHub Actions の Linux ランナーでは、既定で sandbox が起動できません。
`ci-sandbox-verify.yml` に回避策を入れてあります。第7章で扱っています。

## License

MIT License. 詳細は [LICENSE](LICENSE) を参照してください。
