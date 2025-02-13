import { Log } from "../models/log.model";

export const logAction = async (
  action: string,
  model: string,
  details: any
) => {
  const log = await Log.create({
    action,
    model,
    details,
    timestamp: new Date(),
  });
};
