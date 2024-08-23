/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/v1/prove": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["post_prove"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/salt": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["post_salt"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: {
    ErrorResponse: {
      error: components["schemas"]["ErrorResponseType"];
      message: string;
      /** Format: int64 */
      timestamp: number;
    };
    ErrorResponseType:
      | "BadRequest"
      | "Connection"
      | "CSRFTokenError"
      | "Database"
      | "DatabaseIo"
      | "Disabled"
      | {
          DPoP: string | null;
        }
      | "Encryption"
      | {
          UseDpopNonce: ((string | null) & string)[];
        }
      | "Forbidden"
      | "Internal"
      | "JoseError"
      | "MfaRequired"
      | "NoSession"
      | "NotFound"
      | "PasswordExpired"
      | "PasswordRefresh"
      | "SessionExpired"
      | "SessionTimeout"
      | {
          /** Format: int64 */
          TooManyRequests: number;
        }
      | "Unauthorized"
      | {
          WWWAuthenticate: string;
        };
    ProofResponse: {
      pi_a: string[];
      pi_b: string[][];
      pi_c: string[];
      protocol: string;
    };
    ProveRequest: {
      /** Format: int32 */
      exp: number;
      jwt: string;
      keyClaimName: string;
      salt: string;
      signerPublicKey: string;
    };
    SaltRequest: {
      /** Format: int32 */
      index: number;
      jwt: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
  post_prove: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["ProveRequest"];
      };
    };
    responses: {
      /** @description Returns the salt */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": object;
        };
      };
      /** @description BadRequest */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  post_salt: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["SaltRequest"];
      };
    };
    responses: {
      /** @description Returns the salt */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "text/plain": string;
        };
      };
      /** @description BadRequest */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
}
