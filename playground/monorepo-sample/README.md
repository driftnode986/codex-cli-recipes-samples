# monorepo-sample

第3章「AGENTS.md とコンテキスト設計」で、**階層マージ**の動きを実測するための最小構成です。

ルートとサブディレクトリに、それぞれ別の目印（codeword）を書いた `AGENTS.md` を置いてあります。
どちらのディレクトリで Codex を実行するかによって、返ってくる目印が変わります。

```
monorepo-sample/
├── AGENTS.md              ← ALPHA と ROOTLEVEL
└── packages/api/
    └── AGENTS.md          ← BRAVO
```

実行方法は本書 3-16 を参照してください。
