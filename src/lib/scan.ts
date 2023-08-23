import { NS } from "@ns";

function scan(ns: NS, parent: string, server: string, list: string[]) {
  const children = ns.scan(server);
  for (const child of children) {
    if (parent == child) {
      continue;
    }
    list.push(child);

    scan(ns, server, child, list);
  }
}

export function listServers(ns: NS) {
  const list: string[] = [];
  scan(ns, "", "home", list);
  return list;
}

function recursiveScan(
  ns: NS,
  parent: string,
  server: string,
  target: string,
  route: string[],
) {
  const children = ns.scan(server);
  for (const child of children) {
    if (parent == child) {
      continue;
    }
    if (child == target) {
      route.unshift(child);
      route.unshift(server);
      return true;
    }

    if (recursiveScan(ns, server, child, target, route)) {
      route.unshift(server);
      return true;
    }
  }
  return false;
}

export function findServer(ns: NS, host: string) {
  const route: string[] = [];
  recursiveScan(ns, "", "home", host, route);
  return route;
}

export function main(ns: NS) {
  ns.tprint(listServers(ns));
}
