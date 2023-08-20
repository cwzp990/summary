class EventBus {
  eventList = new Map();

  // 绑定监听函数
  on(name, fn) {
    let eventinfo = this.eventList.get(name);

    if (!eventinfo) {
      eventinfo = {
        data: {},
        callback: new Set(),
      };
      this.eventList.set(name, eventinfo);
    }

    eventinfo.callback.add(fn);
  }

  // 解除绑定
  off(name, fn) {
    const eventinfo = this.eventList.get(name);

    if (eventinfo && typeof fn === "function") {
      eventinfo.callback.delete(fn);
    }
  }

  // 发送数据
  dispatch(name, data) {
    const eventinfo = this.eventList.get(name);

    if (eventinfo && eventinfo.data !== data) {
      eventinfo.data = data;
      eventinfo.callback.forEach((fn) => fn(data));
    }
  }
}

const eventCenter = new EventBus();

function formatEventName(appName, fromBaseApp) {
  if (typeof appName !== "string" || !appName) return "";
  return fromBaseApp
    ? `__from_base_app_${appName}_`
    : `__from_micro_app_${appName}_`;
}

// 基座应用的数据通信集合
class EventCenterForBaseApp {
  // 向指定子应用发送数据
  setData(appName, data) {
    eventCenter.dispatch(formatEventName(appName, true), data);
  }

  // 清空应用的监听函数
  clearDataListener(appName) {
    eventCenter.off(formatEventName(appName, false));
  }
}

// 子应用的数据通信集合
class EventCenterForMicroApp {
  constructor(appName) {
    this.appName = appName;
  }

  // 监听基座应用发送的数据
  addDataListener(callback) {
    eventCenter.on(formatEventName(this.appName, true), callback);
  }

  // 删除监听的函数
  removeDataListener(callback) {
    eventCenter.off(formatEventName(this.appName, true), callback);
  }

  // 向基座应用发送数据
  dispatch(data) {
    const app = appInstanceMap.get(this.appName);

    if (app?.container) {
      const event = new CustomEvent("datachange", {
        detail: {
          data,
        },
      });

      app.container.dispatchEvent(event);
    }
  }

  // 清空当前子应用绑定的所有监听函数
  clearDataListener() {
    eventCenter.off(formatEventName(this.appName, true));
  }
}
