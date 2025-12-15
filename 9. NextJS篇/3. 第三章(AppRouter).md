# 第三章(App Router)

## Next.js 路由基础

Next.js 采用基于文件系统的路由机制，这意味着您只需创建文件和文件夹，框架就会自动为您生成对应的路由结构。这种约定优于配置的设计理念，让路由管理变得简单而直观。

## 文件系统路由的工作原理

在 Next.js 中，app 目录下的每个文件夹都代表一个路由段（route segment），并直接映射到 URL 路径。无需配置路由表，框架会根据您的文件结构自动处理。

### page(页面)

app/
├── page.tsx # /
├── about/
│ └── page.tsx # /about
├── blog/test
│ └── page.tsx # /blog/test
└── contact/
└── page.tsx # /contact
访问 /about 页面时，Next.js 会自动将 /about/page.tsx 文件映射到 /about 路由。
访问 /blog/test 页面时，Next.js 会自动将 /blog/[slug]/page.tsx 文件映射到 /blog/[slug] 路由，其中 [slug] 是一个动态参数。
访问 /contact 页面时，Next.js 会自动将 /contact/page.tsx 文件映射到 /contact 路由。

### layout && template

layout(布局) 布局是多个页面共享 UI，例如导航栏、侧边栏、底部等。
template(模板) 基本功能跟布局一样，只是不会保存状态
布局和模板的特点就是：

- 布局嵌套：支持多层布局嵌套，构建复杂的页面结构
- 状态管理：布局会在页面切换时保持状态，而模板会重新渲染
- 根布局：app/layout.tsx 是必须存在的根布局文件
- 渲染顺序：当布局和模板同时存在时，渲染顺序为 layout → template → page

目录结构如下:

app
└─ blog
├─ layout.tsx
├─ template.tsx
├─ a
│ └─ page.tsx
└─ b
└─ page.tsx

app/blog/layout.tsx

```tsx
"use client"; //需要交互的地方要改为客户端组件 默认是服务端组件
import { useState } from "react";
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Blog 布局组件</h1>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <h1>数量： {count}</h1>
      <hr />
      {children}
    </div>
  );
}
```

app/blog/template.tsx

```tsx
"use client"; //需要交互的地方要改为客户端组件 默认是服务端组件
import { useState } from "react";
export default function BlogTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Blog Template</h1>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <h1>数量： {count}</h1>
      <hr />
      {children}
    </div>
  );
}
```

app/blog/a/page.tsx

```tsx
import Link from "next/link";
export default function APage() {
  return (
    <div>
      <h1>A Page</h1>
      <Link href="/blog/b">跳转B</Link>
    </div>
  );
}
```

app/blog/b/page.tsx

```tsx
import Link from "next/link";
export default function BPage() {
  return (
    <div>
      <h1>B Page</h1>
      <Link href="/blog/a">跳转A</Link>
    </div>
  );
}
```
