import { NS } from "@ns";
import { listServers, findServer } from "./lib/scan";

export async function main(ns: NS) {
  const args = ns.flags([["root", false]]);
  const servers = listServers(ns);

  // if (args.root) {
  //   for (const host in cache) {
  //     if (!ns.hasRootAccess(host)) {
  //       delete cache[host];
  //     }
  //   }
  // }

  let results: string[] = ["home"];
  for (const host of servers) {
    // ns.tprint(host, findServer(ns, host));
    results.push(findServer(ns, host).join());
  }

  results = results.sort();
  results = results.map((v) =>
    v
      .replaceAll(/[^,]*,/g, ", ")
      .replace(/, ([^ ,]+)/, "└ $1")
      .replaceAll(",", "|"),
  );

  for (const result of results) ns.tprint(result);
}
