import { NS } from "@ns";

export async function main(ns: NS) {
  const host = ns.getHostname();
  const minSec = ns.getServerMinSecurityLevel(host);
  // const maxMon = ns.getServerMaxMoney(host);
  let count = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const sec = ns.getServerSecurityLevel(host);
    // const mon = ns.getServerMoneyAvailable(host);

    if (sec > minSec) await ns.weaken(host);
    // else if (mon < maxMon) {
    else if (count == 5) {
      count = 0;
      await ns.grow(host);
    } else {
      count++;
      await ns.hack(host);
    }
  }
}
