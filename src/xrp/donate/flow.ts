const { deepListDir } = require('deep-list-dir');

export async function donateFlow(): Promise<string[]> {
  const donationAddresses: string[] = [];
  const packageJsonList: string[] = await deepListDir('node_modules', {
    pattern: ['package.json'], // minimatch or RegExp
  });
  packageJsonList.forEach((packageJson) => {
    const pjson = require(`${process.cwd()}/${packageJson}`);
    const xrpAddress = pjson.donate?.XRP;
    if (xrpAddress != null) {
      donationAddresses.push(xrpAddress);
    }
  });
  return donationAddresses;
}
