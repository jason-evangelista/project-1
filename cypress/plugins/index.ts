/* eslint-disable import/no-anonymous-default-export */
import { getUserSession } from "./tasks";

export default (on, config) => {
  on("task", {
    getUserSession,
  });
  return config;
};
