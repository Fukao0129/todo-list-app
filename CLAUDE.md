## 前提条件

- **回答は必ず日本語でしてください。**
- コードの変更をする際は、必ず事前に差分を提示し、ユーザーに確認を取ってから行うようにしてください。
- .envファイルを直接変更することは禁止します。

## 技術スタック

本プロダクトは以下の技術・バージョンを使用しています。コードを生成・修正する際は、これらのバージョン互換性を考慮し、最新の情報に基づいて対応してください。

### バックエンド (api/)

- **PHP**: ^8.2
- **Laravel**: ^12.0
- **Laravel Sanctum**: ^4.0 (API認証)
- **Scramble**: API仕様書の自動生成

### フロントエンド (front/)

- **TypeScript**: 使用 (nuxt.config.ts / tsconfig.json 等)
- **Vue.js**: ^3.5.22
- **Nuxt**: ^4.1.3
- **Pinia**: ^3.0.4 (@pinia/nuxt: ^0.11.3)
- **Tailwind CSS**: @nuxtjs/tailwindcss ^6.14.0
- **Storybook**: ^9.0.5
- **Nuxt Auth Sanctum**: ^2.3.1 (フロントエンド認証)
- **openapi-typescript**: ^7.13.0 (API型生成)

### インフラ・その他

- **Docker / Docker Compose**: 使用 (フロントエンド、API、DBなどのコンテナ環境)
