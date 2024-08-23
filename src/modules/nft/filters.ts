import { INFTFilters, INFT_FILTER_AND, INFT_FILTER_OR } from "./types";
import { cast, converToURL, unConvertFromURL } from "../../common/utilities";
import { includes, isArray, isBoolean, isEmpty, isNumber, isObject, isString } from "lodash";

import { ICollection } from "../../common/types";

export default class NFTFilters implements INFTFilters {
  terms!: string;
  collections?: string[]; //or [namespace]
  prices?: {
    min?: string;
    max?: string;
  };
  orders!: Record<string, string>;
  limit!: number;
  offset!: number;
  metadataTypes?: string[];
  metadataIndexs?: number[];
  metadataRaritys?: number[];
  metadataQualitys?: number[];

  metadataNftType!: string;
  metadataStar?: {
    min?: string;
    max?: string;
  };
  metadataLevels?: {
    min?: string;
    max?: string;
  };
  metadataGrades?: {
    min?: number;
    max?: number;
  };
  metadataNames!: string;
  localThis: any = this;
  remove = (key: string, value: any | unknown): any => {
    switch (key) {
      case "collections": {
        if (this.collections == null) this.collections = [];
        if (isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            this.remove(key, value[i]);
          }
          break;
        }
        this.collections = this.collections.filter(function (item) {
          return item !== value;
        });
        if (this.collections.length == 0 || this.collections[0] == "") this.collections = undefined;
        break;
      }
      case "metadataTypes": {
        if (this.metadataTypes == null || value == "") this.metadataTypes = [];
        if (isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            this.remove(key, value[i]);
          }
          break;
        }
        this.metadataTypes = this.metadataTypes.filter(function (item) {
          return item !== value;
        });
        if (this.metadataTypes.length == 0 || this.metadataTypes[0] == "")
          this.metadataTypes = undefined;
        break;
      }
      case "metadataQualitys": {
        if (this.metadataQualitys == null || value == "") this.metadataQualitys = [];
        if (isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            this.remove(key, value[i]);
          }
          break;
        }
        this.metadataQualitys = this.metadataQualitys.filter(function (item) {
          return item !== value;
        });
        if (this.metadataQualitys.length == 0) this.metadataQualitys = undefined;
        break;
      }
      case "metadataRaritys": {
        if (this.metadataRaritys == null || value == "") this.metadataRaritys = [];
        if (isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            this.remove(key, value[i]);
          }
          break;
        }
        this.metadataRaritys = this.metadataRaritys.filter(function (item) {
          return item !== value;
        });
        if (this.metadataRaritys.length == 0) this.metadataRaritys = undefined;
        break;
      }
      case "metadataIndexs": {
        if (this.metadataIndexs == null || value == "") this.metadataIndexs = [];
        if (isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            this.remove(key, value[i]);
          }
          break;
        }
        this.metadataIndexs = this.metadataIndexs.filter(function (item) {
          return item !== value;
        });
        if (this.metadataIndexs.length == 0) this.metadataIndexs = undefined;
        break;
      }
      case "prices":
      case "limit":
      case "offset":
      case "orders":
      case "metadataNames":
        delete this.localThis[key];
        break;
      case "metadataStar":
      case "metadataNftType":
      case "metadataLevels":
        this.localThis[key] = undefined;
        break;
      case "metadataGrades":
        this.localThis[key] = undefined;
        break;
      default:
        break;
    }
  };
  push = (key: string, value: any | unknown): any => {
    switch (key) {
      case "terms":
        this.terms = value;
        break;
      case "collections":
        if (this.collections == null) this.collections = [];
        if (isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            this.push(key, value[i]);
          }
          break;
        }
        if (!this.collections.includes(value)) this.collections.push(value);
        break;
      case "metadataQualitys":
        if (this.metadataQualitys == null) this.metadataQualitys = [];
        if (isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            this.push(key, value[i]);
          }
          break;
        }
        if (!this.metadataQualitys.includes(value)) this.metadataQualitys.push(value);
        break;
      case "metadataRaritys":
        if (this.metadataRaritys == null) this.metadataRaritys = [];
        if (isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            this.push(key, value[i]);
          }
          break;
        }
        if (!this.metadataRaritys.includes(value)) this.metadataRaritys.push(value);
        break;
      case "metadataTypes":
        if (this.metadataTypes == null) this.metadataTypes = [];
        if (isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            this.push(key, value[i]);
          }
          break;
        }
        if (!this.metadataTypes.includes(value)) this.metadataTypes.push(value);
        break;
      case "metadataIndexs":
        if (this.metadataIndexs == null) this.metadataIndexs = [];
        if (isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            this.push(key, value[i]);
          }
          break;
        }
        if (!this.metadataIndexs.includes(value)) this.metadataIndexs.push(value);
        break;
      case "metadataNftType":
        this.metadataNftType = value;
        break;
      case "prices":
      case "orders":
      case "metadataGrades":
      case "metadataStar":
      case "metadataLevels":
        if (this.localThis[key] == null) this.localThis[key] = {};
        this.localThis[key] = { ...this.localThis[key], ...value };
        break;
      case "limit":
      case "offset":
        this.localThis[key] = value;
        break;
      case "metadataNames":
        this.metadataNames = converToURL(value);
        break;
      default:
        break;
    }
  };

  toDict = (): Record<string, any> => {
    const attrs = [
      "terms",
      "collections",
      "metadataQualitys",
      "metadataRaritys",
      "metadataTypes",
      "metadataIndexs",
      "metadataLevels",
      "metadataNames",
      "metadataGrades",
      "metadataNftType",
      "metadataStar",
      "prices",
      "orders",
      "limit",
      "offset",
      "t",
      "refer_id",
    ];
    const ret: any = {};
    for (let i = 0; i < attrs.length; i++) {
      if (!isEmpty(this.localThis[attrs[i]]) || isNumber(this.localThis[attrs[i]])) {
        ret[attrs[i]] = this.localThis[attrs[i]];
      }
    }
    return ret;
  };

  toString = (): string => {
    function once(v: any) {
      if (isArray(v)) {
        let ret = "";
        for (let i = 0; i < v.length; i++) {
          if (ret != "") {
            ret += INFT_FILTER_OR;
          }
          ret += once(v[i]);
        }
        return ret;
      }
      if (isObject(v)) {
        let ret = "";
        const obj: any = v;
        for (const i in obj) {
          if (ret != "") {
            ret += INFT_FILTER_AND;
          }
          ret += `${i}:${once(obj[i])}`;
        }
        return ret;
      }
      if (isBoolean(v) || isNumber(v)) {
        return v.toString();
      }
      if (isString(v)) {
        return v.replace(" ", "+");
      }
      return v;
    }
    let ret = "";
    const d = this.toDict();
    for (const k in d) {
      if (ret != "") ret += "&";
      ret += `${k}=${once(d[k])}`;
    }
    return ret;
  };

  toInterface = (): INFTFilters => {
    return cast<INFTFilters>(this);
  };

  static fromString = (str: string): NFTFilters => {
    function once(str: string) {
      if (str.includes(":")) {
        const ret: any = {};
        const _p = str.split(INFT_FILTER_AND);
        for (let i = 0; i < _p.length; i++) {
          const [k, v] = _p[i].split(":");
          ret[k] = v;
        }
        return ret;
      }
      if (str.includes(INFT_FILTER_OR)) {
        return str.split(INFT_FILTER_OR);
      }
      return str.replace("+", " ");
    }

    const ret: NFTFilters = new NFTFilters();
    const d = new URLSearchParams(str);
    // eslint-disable-next-line
    // @ts-ignore
    for (const [k, v] of d) {
      if (["offset", "limit"].includes(k)) {
        ret.push(k, parseInt(v));
      } else if ("metadataNames" == k) {
        ret.push(k, unConvertFromURL(v));
      } else if ("metadataQualitys" == k || "metadataRaritys" == k || "metadataIndexs" == k) {
        const res = once(v);
        if (isArray(res)) {
          ret.push(
            k,
            res.map((e) => parseInt(e)),
          );
        } else {
          ret.push(k, [parseInt(res.toString())]);
        }
      } else {
        ret.push(k, once(v));
      }
    }
    return ret;
  };

  includes = (k: any | unknown, v: any | unknown): boolean => {
    switch (k) {
      case "orders":
        return this.localThis[k] == v;
      case "collections": {
        let res = false;
        const spArr = v?.split(",");
        if (spArr?.some((e: any) => includes(this.localThis[k], e))) res = true;
        return res;
      }
      case "metadataStar":
      case "metadataRaritys": {
        let res = false;
        const spArr = v?.split(",");
        if (spArr?.some((e: any) => includes(this.localThis[k], e))) res = true;
        return res;
      }
      default:
        return includes(this.localThis[k], v);
    }
  };

  static fromObject = (object: any | unknown): NFTFilters => {
    if (isEmpty(object)) {
      return new NFTFilters();
    }
    return cast<NFTFilters>(object);
  };

  static fromCollections = (collections: ICollection[]): NFTFilters => {
    const ret: NFTFilters = new NFTFilters();
    for (let i = 0; i < collections.length; i++) {
      ret.push("collections", collections[i].slug);
    }
    return ret;
  };
}
