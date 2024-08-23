import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from "openapi-client-axios";

declare namespace Components {
  namespace Schemas {
    export interface AddRequest {
      eip712: EIP712;
      operators: string[];
    }
    export interface AddResponse {
      data?: {
        cid: string;
      } | null;
      msg: string;
    }
    export interface AddResponseData {
      cid: string;
    }
    export interface EIP712 {
      domain: {
        [name: string]: string;
      };
      message: {
        [name: string]: string;
      };
      primaryType: string;
      types: {
        [name: string]: any[];
      };
    }
    export interface GetResponse {
      data?: {
        eip712: EIP712;
        operators: string[];
      } | null;
      msg: string;
    }
    export interface PullResponse {
      data?: {
        signatures: string[];
      } | null;
      msg: string;
    }
    export interface PullResponseData {
      signatures: string[];
    }
    export interface PushRequest {
      signature: string;
    }
    export interface PushResponse {
      data?: string | null;
      msg: string;
    }
  }
}
declare namespace Paths {
  namespace Add {
    export type RequestBody = Components.Schemas.AddRequest;
    namespace Responses {
      export type $200 = Components.Schemas.AddResponse;
      export interface $409 {}
      export interface $500 {}
    }
  }
  namespace Get {
    namespace Parameters {
      export type Cid = string;
    }
    export interface PathParameters {
      cid: Parameters.Cid;
    }
    namespace Responses {
      export type $200 = Components.Schemas.GetResponse;
      export interface $409 {}
      export interface $500 {}
    }
  }
  namespace Pull {
    namespace Parameters {
      export type Cid = string;
    }
    export interface PathParameters {
      cid: Parameters.Cid;
    }
    namespace Responses {
      export type $200 = Components.Schemas.PullResponse;
      export interface $409 {}
      export interface $500 {}
    }
  }
  namespace Push {
    namespace Parameters {
      export type Cid = string;
    }
    export interface PathParameters {
      cid: Parameters.Cid;
    }
    export type RequestBody = Components.Schemas.PushRequest;
    namespace Responses {
      export type $200 = Components.Schemas.PushResponse;
      export interface $409 {}
      export interface $500 {}
    }
  }
}

export interface OperationMethods {
  /**
   * add - Add Tx Data Endpoint
   *
   * Add Tx Data
   */
  "add"(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.Add.RequestBody,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.Add.Responses.$200>;
  /**
   * get - Get Tx Data Endpoint
   *
   * Get Tx Data
   */
  "get"(
    parameters?: Parameters<Paths.Get.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.Get.Responses.$200>;
  /**
   * pull - Pull Proof Endpoint
   *
   * Pull Proof
   */
  "pull"(
    parameters?: Parameters<Paths.Pull.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.Pull.Responses.$200>;
  /**
   * push - Push Signature Endpoint
   *
   * Push Signature
   */
  "push"(
    parameters?: Parameters<Paths.Push.PathParameters> | null,
    data?: Paths.Push.RequestBody,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.Push.Responses.$200>;
}

export interface PathsDictionary {
  ["/v1/add"]: {
    /**
     * add - Add Tx Data Endpoint
     *
     * Add Tx Data
     */
    "post"(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.Add.RequestBody,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.Add.Responses.$200>;
  };
  ["/v1/get/{cid}"]: {
    /**
     * get - Get Tx Data Endpoint
     *
     * Get Tx Data
     */
    "get"(
      parameters?: Parameters<Paths.Get.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.Get.Responses.$200>;
  };
  ["/v1/pull/{cid}"]: {
    /**
     * pull - Pull Proof Endpoint
     *
     * Pull Proof
     */
    "get"(
      parameters?: Parameters<Paths.Pull.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.Pull.Responses.$200>;
  };
  ["/v1/push/{cid}"]: {
    /**
     * push - Push Signature Endpoint
     *
     * Push Signature
     */
    "post"(
      parameters?: Parameters<Paths.Push.PathParameters> | null,
      data?: Paths.Push.RequestBody,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.Push.Responses.$200>;
  };
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>;
