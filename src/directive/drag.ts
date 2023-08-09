import { App } from "vue";

const drag = (app: App) => {
  app.directive("lnDrag", {
    beforeMount(el: any) {
      el.style.cssText += ";cursor:move;";
      el.onmousedown = (e: any) => {
        // 鼠标按下，计算当前元素距离可视区的距离
        const disX = e.clientX;
        const disY = e.clientY;
        const screenWidth = document.body.clientWidth; // body当前宽度
        const screenHeight = document.documentElement.clientHeight; // 可见区域高度(应为body高度，可某些环境下无法获取)

        const dragDomWidth = el.offsetWidth; // 对话框宽度
        const dragDomheight = el.offsetHeight; // 对话框高度

        const minDragDomLeft = el.offsetLeft;
        const maxDragDomLeft = screenWidth - el.offsetLeft - dragDomWidth;

        const minDragDomTop = el.offsetTop;
        const maxDragDomTop = screenHeight - el.offsetTop - dragDomheight;

        const sty = (function () {
          if ((document.body as any).currentStyle) {
            // 在ie下兼容写法
            return (dom: any, attr: any) => dom.currentStyle[attr];
          }
          return (dom: any, attr: any) => getComputedStyle(dom, null)[attr];
        })();

        // 获取到的值带px 正则匹配替换
        let styL = sty(el, "left");
        // 为兼容ie
        if (styL === "auto") styL = "0px";
        let styT = sty(el, "top");

        // console.log(styL)
        // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
        if (styL.includes("%")) {
          styL = +document.body.clientWidth * (+styL.replace(/%/g, "") / 100);
          styT = +document.body.clientHeight * (+styT.replace(/%/g, "") / 100);
        } else {
          styL = +styL.replace(/px/g, "");
          styT = +styT.replace(/px/g, "");
        }

        document.onmousemove = function (e) {
          let left = e.clientX - disX;
          let top = e.clientY - disY;
          if (-left > minDragDomLeft) {
            left = -minDragDomLeft;
          } else if (
            left >
            maxDragDomLeft - el.parentElement.offsetParent.offsetLeft - 29
          ) {
            left =
              maxDragDomLeft - el.parentElement.offsetParent.offsetLeft - 29;
          }

          if (-top > minDragDomTop) {
            top = -minDragDomTop;
          } else if (
            top >
            maxDragDomTop - el.parentElement.offsetParent.offsetTop - 12
          ) {
            top = maxDragDomTop - el.parentElement.offsetParent.offsetTop - 12;
          }

          // 移动当前元素
          el.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`;
        };

        document.onmouseup = function (e: any) {
          document.onmousemove = null;
          document.onmouseup = null;
        };
        return false;
      };
    },
  });
};

export { drag };
