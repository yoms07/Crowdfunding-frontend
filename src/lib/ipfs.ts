import { create } from "kubo-rpc-client";

export const createIPFSClient = () =>
  create({ url: "http://localhost:5001/api/v0" });
