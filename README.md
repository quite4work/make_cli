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

## Implementaion details

Commands are created from all exported functions of `Deno.mainModule`.  
Options are parsed from the function signature.  
Descriptions are parsed from comments inside the function.  
ES2018 guarantees that comments inside of a function are always preserved.  
