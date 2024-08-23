import type { Client as BrokerClient, Components } from "./v1";
import OpenAPIClientAxios from "openapi-client-axios";

export class Client {
  private _driver: OpenAPIClientAxios;

  public constructor(baseURL: string, originalUrl?: string) {
    this._driver = new OpenAPIClientAxios({
      definition: baseURL + "/api-docs/openapi.json",
      axiosConfigDefaults: {
        baseURL: originalUrl ?? baseURL,
      },
    });
    this._driver.init();
  }

  public async get(cid: string): Promise<[string[], Components.Schemas.EIP712]> {
    const client = await this._driver.getClient<BrokerClient>();
    const res = await client.get({ cid });
    if (res.status != 200) throw Error(res.data.msg);
    return [
      res.data.data?.operators as string[],
      res.data.data?.eip712 as Components.Schemas.EIP712,
    ];
  }

  public async add(operators: string[], eip712: Components.Schemas.EIP712): Promise<string> {
    const client = await this._driver.getClient<BrokerClient>();
    const res = await client.add(null, {
      operators,
      eip712,
    });
    if (res.status != 200) throw Error(res.data.msg);
    return res.data.data?.cid as string;
  }

  public async push(cid: string, signature: string): Promise<string> {
    const client = await this._driver.getClient<BrokerClient>();
    const res = await client.push(
      { cid },
      {
        signature,
      },
    );
    if (res.status != 200) throw Error(res.data.msg);
    return res.data.msg;
  }

  public async pull(cid: string): Promise<string[]> {
    const client = await this._driver.getClient<BrokerClient>();
    const res = await client.pull({ cid });
    if (res.status != 200) throw Error(res.data.msg);
    return res.data.data?.signatures as string[];
  }
}
