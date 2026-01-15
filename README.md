# Todo リストアプリ

Nuxt.js と Laravel で構築した、Todo リストアプリケーションです。

---

## ✨ 主な機能

#### 🔐 ユーザー認証

- ログイン / ログアウト
- ユーザー名変更
- パスワードリセット
- パスワード変更、通知メール送信

#### 📝 Todo 管理

- 一覧表示
- キーワード検索
- 条件による並べ替え
- 詳細表示
- 新規作成
- 編集
- ゴミ箱へ移動
- 完了済みの Todo を一括でゴミ箱へ移動
- ゴミ箱内の Todo をすべて削除

#### 🏷️ Todo ステータス管理

- 新規作成
- 編集
- 削除
- 並び順の変更

---

## 🛠️ 技術スタック

#### 💻 フロントエンド

- **[Nuxt.js](https://sanctum.manchenkoff.me)**（v4.1.3）
  - **[Nuxt Auth Sanctum](https://github.com/manchenkoff/nuxt-auth-sanctum/tree/main)**  
    Nuxt で Laravel Sanctum を使用するための認証モジュール
  - **[Pinia](https://pinia.vuejs.org/)**  
    状態管理ライブラリ
  - **[vue-fontawesome](https://github.com/FortAwesome/vue-fontawesome)**  
    Vue3 対応の Font Awesome パッケージ
- **[Tailwind CSS](https://tailwindcss.com/)**
- **[Storybook](https://storybook.js.org/)**（※今後導入予定）

#### 🖥 バックエンド

- **[Laravel](https://laravel.com/)**（v12.34.0）
  - **[laravel-csv-seeder](https://github.com/Flynsarmy/laravel-csv-seeder)**
    Seeder に CSV ファイルを使用できるようにするパッケージ
  - **[resend-laravel](https://github.com/resend/resend-laravel)**
    Resend 公式の Laravel 用パッケージ

#### 🔐 認証機能

- **[Laravel Sanctum](https://readouble.com/laravel/12.x/ja/sanctum.html)**

#### 📩 メール送信

- **[Resend](https://resend.com/)**（無料プラン）
  開発環境では **[MailHog](https://github.com/mailhog/MailHog)** を使用

#### 🌎 デプロイ

- **[Railway](https://railway.com/)**（無料プラン）
  [こちら](https://web-production-066eed.up.railway.app/login)から本番環境にアクセスできます。
  ※無料プランを使っているので、アプリは常時起動しておらず、アクセス時に立ち上がります。その際、数十秒の待ち時間が発生します。([Serverless](https://docs.railway.com/reference/app-sleeping)機能)

#### 📜 ソース管理

- **[Github](https://github.co.jp/)**

---

<ul style="list-style-type: none; font-size:11px; color: #555">
  <li>※Windows で開発しているので、Mac での動作は確認していません。</li>
  <li>※Resend の無料プランを使っているので、利用制限によってメールが送信されない場合があります。</li>
  <li>※一個人のポートフォリオとして作成されたアプリですので、実用レベルでのご利用はご遠慮ください。</li>
</ul>
