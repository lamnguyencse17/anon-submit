import { ZodObject } from "zod";

const tryParse = (schema: ZodObject<any, any>, data: any) => {
  try {
    return schema.parse(data);
  } catch (error) {
    return undefined;
  }
};

export default tryParse;
