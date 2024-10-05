import { Helia } from "helia";

export {};

declare global {
  interface Window {
    helia?: Helia;
  }
}
