# 组件 PuButton 文档

## Rationale

> 基础按钮组件，用于在应用中提供统一的按钮交互体验。支持多种变体、尺寸和禁用状态。

## Goals

> 提供一个标准化的按钮组件，支持：
>
> - 多种视觉变体 (primary, secondary, outlined, text)
> - 多种尺寸 (small, medium, large)
> - 禁用状态
> - 点击事件

## Specification

> 组件完全使用CSS变量实现样式，支持主题切换和暗黑模式。

## Implementation

> 组件基于Vue 3 Composition API实现，使用TypeScript定义类型。样式采用BEM规范。

### Props

| 属性名 | 类型 | 默认值 | 必填 | 说明 |
|--------|------|--------|------|------|
| variant | `'primary' \| 'secondary' \| 'outlined' \| 'text'` | `'primary'` | 否 | 按钮变体样式 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 否 | 按钮尺寸 |
| disabled | `boolean` | `false` | 否 | 是否禁用 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| click | `(event: MouseEvent)` | 点击事件 |

### Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| default | 默认插槽，按钮内容 | - |

### Methods

无公开方法。

### Watches

无监听器。

## 其它

- 完全使用CSS变量，支持主题切换
- 支持暗黑模式
- 兼容性：支持所有Uniapp目标平台
