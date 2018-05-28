import { tmpTest } from "./sandbox";
import Commando, { Response } from "./Commando";

tmpTest(async (dirPath, done) => {
  new Commando(`dcl init`, {
    silent: false,
    workingDir: dirPath,
    env: { DCL_ENV: "dev" }
  })
    .when(/Send anonymous usage stats to Decentraland?/, () => Response.YES)
    .when(/Scene title/, () => "My test Scene\n")
    .when(/Your ethereum address/, () => "0x\n")
    .when(/Your name/, () => "John Titor\n")
    .when(/Your email/, () => "john.titor@example.com\n")
    .when(/Parcels comprising the scene/, () => "0,0\n")
    .when(/Which type of project would you like to generate/, () => "static\n")
    .endWhen(/Success! Run 'dcl preview' to see your scene/)
    .on("err", e => console.log(e))
    .on("end", async () => {
      Commando.quit();
    });
}).then(() => {
  process.exit(1);
});
