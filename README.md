# Vite Inconsistent Resolve Id

In most places Vite is using POSIX path separators even on Windows (i.e in
`config.root`, file identifiers and etc).

However, there is one place where this is inconsistent and platform path
separators are used:

If `build.lib.entry` includes a virtual file, the `resolveId()` hook in plugins
will be called:

```ts
  build: {
    lib: {
      formats: ["es"],
      entry: "virtual-file.js",
    },
  },
```

The `resolveId()` is called with an absolute path (process.cwd() +
'/virtual-file.js') that uses the platform's path separator (`\` on Windows),
rather than POSIX path separator

This is inconsistent behavior and lead to a bug in my plugin on Windows.

## Reproduction

1. Use Windows machine

2. Clone this repository

   ```sh
   git clone https://github.com/maxpatiiuk/vite-inconsistent-resolve-id
   ```

3. Install dependencies

   ```sh
   npm install
   ```

4. Run build

   ```
   npx vite build
   ```

5. See build output show a message like
   `resolveId called with C:\Users\root\...` rather than
   `resolveId called with C:/Users/root/...`
