import { privateKey } from "./accounts/accounts.js";
import { Config } from "./config.js";
import Core from "./src/core/core.js";
import { Helper } from "./src/utils/helper.js";
import logger from "./src/utils/logger.js";
import twist from "./src/utils/twist.js";

async function operation(acc) {
  const core = new Core(acc);
  await Helper.delay(500, acc, `Config is set to ${Config.network}`, core);
  try {
    await core.connectWallet();
    await core.getBalance();

    if (core.balance.ETH < 0.1) {
      throw Error("Minimum Eth Balance Is 0.1 ETH");
    }

    while (core.balance.ETH > 0.1) {
      await core.rawTx();

      const delay = Helper.random(2000, 3000);
      await Helper.delay(
        delay,
        acc,
        `Delaying for ${Helper.msToTime(
          delay
        )} before next tx to avoid rate limit`,
        core
      );
    }

    await Helper.delay(
      0,
      acc,
      `Account ${
        privateKey.indexOf(acc) + 1
      } Processing Done, ETH Balance is on minimum balance Please add some ETH`,
      core
    );
  } catch (error) {
    if (error.message) {
      await Helper.delay(
        3000,
        acc,
        `Error : ${error.message}, Retry again after 3 Second`,
        core
      );
    } else {
      await Helper.delay(
        3000,
        acc,
        `Error :${JSON.stringify(error)}, Retry again after 3 Second`,
        core
      );
    }

    await operation(acc);
  }
}

async function startBot() {
  return new Promise(async (resolve, reject) => {
    try {
      logger.info(`BOT STARTED`);
      if (privateKey.length == 0)
        throw Error("Please input your account first on accounts.js file");
      const promiseList = [];

      for (const acc of privateKey) {
        promiseList.push(operation(acc));
      }

      await Promise.all(promiseList);
      resolve();
    } catch (error) {
      logger.info(`BOT STOPPED`);
      logger.error(JSON.stringify(error));
      reject(error);
    }
  });
}

(async () => {
  try {
    logger.clear();
    logger.info("");
    logger.info("Application Started");
    console.log("T3RN BRIDGE BOT");
    console.log();
    console.log("By : Widiskel");
    console.log("Follow On : https://github.com/Widiskel");
    console.log("Join Channel : https://t.me/skeldrophunt");
    console.log("Dont forget to run git pull to keep up to date");
    console.log();
    console.log();
    Helper.showSkelLogo();
    await startBot();
  } catch (error) {
    twist.clear();
    twist.clearInfo();
    console.log("Error During executing bot", error);
    await startBot();
  }
})();
