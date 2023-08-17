import { defineElement } from "./element";

const SingleMicroApp = {
  start() {
    console.log("SingleMicroApp started");
    defineElement();
  },
};

export default SingleMicroApp;
