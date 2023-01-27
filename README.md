Highly experimental CLI builder
===============================

Example:

```js
#!/usr/bin/env deno run --unstable -A

import "https://deno.land/x/make_cli/mod.ts";

export function test(param, optParam1, optParam2, optParam3) {
  // @test        Command description
  // --param      Description0
  // --opt-param1 Description1
  // --opt-param2 Description2
  // --opt-param3 Description3
  console.log([param, optParam1, optParam2, optParam3]);
}
```
