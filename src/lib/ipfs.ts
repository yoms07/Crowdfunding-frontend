import { create } from "kubo-rpc-client";

export const createIPFSClient = () =>
  create({ url: "http://127.0.0.1:5001/api/v0" });
