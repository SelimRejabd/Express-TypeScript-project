/* eslint-disable no-console */
import { Server } from "http";
import app from "./app";
import config from "./config";
import mongoose from "mongoose";

let server : Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`App listening on  ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

process.on('unhandledRejection', ()=> {
  console.log(`unhandleRejection is detected, shutting down...`)
  if(server){
    server.close(()=> {
      process.exit(1);
    })
  }
  process.exit(1);
})

process.on('uncaughtException', ()=> {
  console.log(`uncaughtRejection is detected, shutting down...`)
  process.exit(1)
})
