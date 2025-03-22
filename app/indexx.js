import { privateKey } from "./accounts/accounts.js";
import { Config } from "./config.js";
import Core from "./src/core/core.js";
import { Helper } from "./src/utils/helper.js";
import logger from "./src/utils/logger.js";
import twist from "./src/utils/twist.js";

async function refreshWallet(core, acc) {
  logger.info(`Refreshing wallet for account ${acc}`);

  try {
    await core.requestFunds(); // Ensure this function exists in Core.js
    await core.getBalance(); // Refresh balance after funding

    if (core.balance.ETH < 0.1) {
      throw new Error("Wallet refresh failed. Insufficient ETH added.");
    }

    logger.info(`Wallet successfully refreshed for ${acc}. New balance: ${core.balance.ETH} ETH`);
  } catch (error) {
    logger.error(`Failed to refresh wallet for ${acc}: ${error.message}`);
    await Helper.delay(5000, acc, "Retrying wallet refresh in 5 seconds...", core);
    await refreshWallet(core, acc); // Retry if funding fails
  }
}

async function operation(acc) {
  const core = new Core(acc);
  await Helper.delay(500, acc, `Config is set to ${Config.network}`, core);
  
  try {
    await core.connectWallet();
    await core.getBalance();

    if (core.balance.ETH < 0.1) {
      logger.warn(`Minimum ETH Balance Is 0.1 ETH. Attempting to refresh wallet...`);
      await refreshWallet(core, acc);
    }

    while (core.balance.ETH > 0.1) {
      await core.rawTx();

      const delay = Helper.random(2000, 3000);
      await Helper.delay(
        delay,
        acc,
        `Delaying for ${Helper.msToTime(delay)} before next tx to avoid rate limit`,
        core
      );

      await core.getBalance(); // Refresh balance after transaction
      if (core.balance.ETH < 0.1) {
        logger.warn(`Balance below 0.1 ETH. Refreshing wallet...`);
        await refreshWallet(core, acc);
      }
    }

    await Helper.delay(
      0,
      acc,
      `Account ${privateKey.indexOf(acc) + 1} processing done. ETH balance is low. Please add more ETH.`,
      core
    );
  } catch (error) {
    logger.error(`Error for ${acc}: ${error.message}`);
    await Helper.delay(3000, acc, `Retrying after 3 seconds...`, core);
    await operation(acc);
  }
}

async function startBot() {
  return new Promise(async (resolve, reject) => {
    try {
      logger.info(`BOT STARTED`);
      if (privateKey.length == 0)
        throw Error("Please input your account first in accounts.js file");

      const promiseList = privateKey.map((acc) => operation(acc));
      await Promise.all(promiseList);
      resolve();
    } catch (error) {
      logger.error(`BOT STOPPED: ${JSON.stringify(error)}`);
      reject(error);
    }
  });
}

(async () => {
  try {
    logger.clear();
    logger.info("Application Started");
    console.log("T3RN BRIDGE BOT");
    console.log("\nBy : Widiskel");
    console.log("Follow On : https://github.com/Widiskel");
    console.log("Join Channel : https://t.me/skeldrophunt");
    console.log("Dont forget to run git pull to keep up to date\n");
    Helper.showSkelLogo();
    await startBot();
  } catch (error) {
    twist.clear();
    twist.clearInfo();
    console.log("Error executing bot", error);
    await startBot();
  }
})();
