// 微应用实例
export const appInstanceMap = new Map();

// 创建微应用
export default class CreateApp {
  constructor(name, url, container) {
    this.name = name;
    this.url = url;
    this.container = container;
    this.status = "loading";
    loadHtml(this);
    this.sandbox = new Sandbox(name);
  }

  status = "created";

  // 缓存应用的静态资源
  source = {
    links: new Map(),
    scripts: new Map(),
  };

  // 资源加载完执行
  onLoad(htmlDom) {
    this.loadCount = this.loadCount ? this.loadCount + 1 : 1;

    if (this.loadCount === 2 && this.status !== "unmount") {
      this.source.html = htmlDom;
      this.mount();
    }
  }

  // 资源加载完成后进行渲染
  mount() {
    const cloneHtml = this.source.html.cloneNode(true);
    const fragement = document.createDocumentFragment();

    Array.from(cloneHtml.childNodes).forEach((node) => {
      fragement.appendChild(node);
    });

    this.container.appendChild(fragement);

    this.sandbox.start(this.name);

    this.source.scripts.forEach((info) => {
      (0, eval)(this.sandbox.bindScope(info.code));
    });

    this.status = "mounted";
  }

  // 卸载应用
  unmount(destory) {
    this.status = "unmount";
    this.container = null;
    this.sandbox.stop();

    // 为true，需要删除应用
    if (destory) {
      appInstanceMap.delete(this.name);
    }
  }
}
