import { defineElement } from "./element";
import { EventCenterForBaseApp } from "./data";

const BaseAppData = new EventCenterForBaseApp();

const SingleMicroApp = {
  start() {
    console.log("SingleMicroApp started");
    defineElement();
  },
};

// 记录原生方法
const rawSetAttribute = Element.prototype.setAttribute;

// 重写setAttribute
Element.prototype.setAttribute = function setAttribute(key, value) {
  // 目标为micro-app，且属性名为data时进行处理
  if (/^micro-app/i.test(this.tagName) && key === "data") {
    if (Object.prototype.toString.call(value) === "[object Object]") {
      const cloneValue = {};
      Object.getOwnPropertyNames(value).forEach((propertyKey) => {
        if (
          !(typeof propertyKey === "string" && propertyKey.indexOf("__") === 0)
        ) {
          cloneValue[propertyKey] = value[propertyKey];
        }
      });

      // 发送数据
      BaseAppData.setData(this.getAttribute("name", cloneValue));
    }
  } else {
    rawSetAttribute.call(this, key, value);
  }
};

export default SingleMicroApp;
