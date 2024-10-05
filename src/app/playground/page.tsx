"use client";
import { useHelia } from "@/hooks/use-helia";
import { json } from "@helia/json";
import { useEffect } from "react";

export default function Page() {
  const { helia } = useHelia();

  const test = async () => {
    try {
      if (helia) {
        console.log("sampe sini");
        const j = json(helia);
        const myImmutableAddress = await j.add({ hello: "world" });

        console.log(await j.get(myImmutableAddress));
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    test();
  }, []);

  return <h1>Hello world</h1>;
}
