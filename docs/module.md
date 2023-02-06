# node module

如果用 Node 直接运行一个 js 文件，require.main 会等于全局变量 module；
反过来，如果二者不想等，则说明 require.main 是从另一个模块导入的。

```tsx

if (require.main === module) {
  // do something
} else {
  // do others
}
```
