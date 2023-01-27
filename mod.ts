import yargs from "npm:yargs@17.6.2";
import esprima from "npm:esprima@4.0.1";
import { paramCase } from "https://deno.land/x/case@2.1.1/mod.ts";
import { basename } from "https://deno.land/std@0.174.0/path/mod.ts";

function makeHandler(fun: (...args: unknown[]) => void, params: string[]) {
  return (argv: { [x: string]: unknown }) => {
    fun(...params.map((a: string) => argv[a]));
  };
}

function parseDesc(
  prefix: string,
  key: string,
  comments: { type: string; value: string }[],
) {
  let desc = "";
  for (const { type, value } of comments) {
    if (type === "Line") {
      const [_, rest] = value.split(`${prefix}${key}`);
      if (rest) {
        desc = rest.trim();
      }
    }
  }
  return desc;
}

async function run() {
  const exports = await import(Deno.mainModule);
  const commands = [];
  for (const exp of Object.entries(exports)) {
    const name = exp[0];
    const fun = exp[1] as (...args: unknown[]) => void;
    const {
      body: [{ params }],
      comments,
    } = esprima.parseScript(fun.toString(), { comment: true });
    const builder: Record<string, { desc: string }> = {};
    const params2 = params.map(({ name }: { name: string }) => paramCase(name));
    for (const name of params2) {
      builder[name] = { desc: parseDesc("--", name, comments) };
    }
    commands.push({
      command: name,
      desc: parseDesc("@", name, comments),
      builder,
      handler: makeHandler(fun, params2),
    });
  }
  yargs(Deno.args)
    .commands(commands)
    .demandCommand()
    .recommendCommands()
    .strict()
    .parserConfiguration({
      "sort-commands": true,
      "camel-case-expansion": false,
    })
    .scriptName(basename(Deno.mainModule))
    .usage("$0")
    .version(false)
    .help()
    .hide("help")
    .parse();
}

run();
