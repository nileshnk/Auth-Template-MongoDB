import { connect, connection, ConnectOptions, set } from "mongoose";
import { dbConstants } from "../constants/dbConstants";

type ConnectOptionsExtend = {
  dbName: unknown;
  useUnifiedTopology: boolean;
  useNewUrlParser: boolean;
};

var dbURI: string;
if (process.env.DB_URL && process.env.DB_PORT) {
  dbURI = process.env.DB_URL + ":" + process.env.DB_PORT;
}

const options: ConnectOptions & ConnectOptionsExtend = {
  dbName: process.env.DB_NAME,
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

async function connectDB() {
  try {
    set("strictQuery", false);
    connection.on("connected", () => {
      console.log(dbConstants.DB_MONGOOSE_CONNECTION_SUCCESS);
    });
    await connect(dbURI, options);
  } catch (err) {
    console.log(`[MongoDB Error]`, err);
  }
}

connectDB();

connection.on("disconnected", () => {
  console.log(dbConstants.DB_MONGOOSE_CONNECTION_DISCONNECT);
});

process.on("SIGINT", async () => {
  await connection.close();
  process.exit(0);
});
