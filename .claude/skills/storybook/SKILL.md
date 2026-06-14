---
name: storybook
description: "Storybookへのコンポーネント追加、作成、更新、使い方や規約の確認に関するルールを含みます。"
argument-hint: "Storybookに追加したいコンポーネント名などを指定してください"
user-invocable: true
---

# Storybook Guidelines

## When to Use

- ユーザーから「このコンポーネントをStorybookに追加してほしい」と依頼された場合
- ユーザーから「このコンポーネントのStorybookを作成・更新・修正してほしい」と依頼された場合
- Storybookの書き方やディレクトリ構造について確認したい場合

## Core Principles

1. **ドキュメント化の最優先**: コンポーネントの目的と各Props/Emitsの使用例を明確に示すこと。
2. **一貫性の保全**: プロジェクトの既存のStorybookの構造やフォーマットに合わせること。

## Procedure / Rules

Storybook関連のタスクを実行する際、以下のルールを厳守してください。

### 1. 出力先ディレクトリ (Directory)

新たにStorybookのファイルを作成するときは、**必ず**以下のディレクトリ内に作成してください。
`front/app/storybook/stories`

### 2. ファイル名 (File naming)

新たに作成するファイル名は、対象となるコンポーネント名に基づいて以下の規則で命名してください。
`[コンポーネント名].stories.ts`
（例: コンポーネントが `Button.vue` の場合、`Button.stories.ts` とすること）

### 3. ステップ (Steps)

1. 対象コンポーネントのコード（Props、Emits、Slotsなど）を読み取り、仕様を把握する。
2. `front/app/storybook/stories` 内にファイルを作成し、標準的なStorybookフォーマットに従ってStoryを定義する。
3. 必要に応じて既存の `*.stories.ts` ファイルを読み込み（read_file）、書き方のフォーマットやインポートの仕方を揃える。
