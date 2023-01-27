Highly experimental CLI builder
===============================

Example adding CLI to `./app.ts`:

```js
#!/usr/bin/env deno run --unstable -A

import "https://deno.land/x/make_cli@0.0.1/mod.ts";

export function echo(option, longOption) {
  // @echo         Prints options to console
  // --option      Option description
  // --long-option Long option description
  console.log({ option, longOption });
}
```

Output of ` ./app.ts echo --help`:

```sh
app.ts echo

Prints options to console

Options:
  --option       Option description
  --long-option  Long option description
```
