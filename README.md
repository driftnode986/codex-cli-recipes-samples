# Codex CLI実践レシピ — サンプルリポジトリ

書籍『Codex CLI実践レシピ ― AGENTS.md・承認モード・codex exec』（牧野 誠）のサンプルコード・設定ファイル集です。

> 🚧 執筆中です。内容は出版時に確定します。

## 構成

- `playground/` — レシピの実行対象となる練習用プロジェクト。手元にクローンして、本書のレシピ（プロンプト）をそのまま試せます
- `configs/` — `config.toml` のサンプル（承認モード・sandbox・MCP 設定など、章別）
- `agents-md/` — `AGENTS.md` のサンプル（第3章。プロジェクト規模別のテンプレート）
- `.github/workflows/` — `codex exec` を CI に組み込むワークフロー例（第7章）

## 検証環境

- Codex CLI 0.147.0
- モデル: GPT-5.5
- macOS (Apple Silicon) / Windows 11

各章の本文に記載したコマンド・出力は、すべてこのリポジトリ上で実機検証したものです。

## License

MIT
