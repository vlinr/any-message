/**
 *
 * @function 兼容ie移除元素
 *
 * @params el:{Element | null}:需要移除的元素
 *
 * @returns void
 *
 * **/

import { IconType, MessageType, ParamsType, ResultType, CSSStyleType } from './type';

let globalConfig: MessageType | null = null;

const remove = (el: Element | null): void => {
    el?.parentNode?.removeChild(el);
};

/**
 *
 * @function 创建公共样式
 *
 * @params parent:{HTMLDivElement}:父级元素
 *
 * @return void
 *
 * **/

const createStyle = (parent: HTMLDivElement): void => {
    const style: HTMLStyleElement =
        parent.querySelector('style') || document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
         .any_message {
             box-sizing: border-box;
             margin: 0;
             padding: 0;
             color: rgba(0, 0, 0, 0.85);
             font-size: 14px;
             font-variant: tabular-nums;
             line-height: 1.5715;
             list-style: none;
             font-feature-settings: 'tnum';
             position: fixed;
             top: 8px;
             left: 0;
             z-index: 1010;
             width: 100%;
             pointer-events: none;
         }
 
         .any_message_box {
             text-align: center;
             padding: 8px 0;
         }
 
         .any_message_content {
             display: inline-flex;
             font-size: 14px;
             padding: 10px 16px;
             background-color: #fff;
             box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d;
             border-radius: 4px;
             text-align: center;
             transition: all .2s ease;
             position: relative;
             top: -20px;
             opacity: 0;
             pointer-events:auto;
         }
 
         .any_message_content .any_message_icon {
             font-style:normal;
             display:flex;
             align-items: center;
         }
 
         .any_message_content .any_message_text{
             text-indent:10px;
         }
 
         .any_message_content .any_message_icon.success{
             color: #06a561;
         }
 
         .any_message_content .any_message_icon.warn{
             color: #f99600;
         }
 
         .any_message_content .any_message_icon.info{
             color: #1e5eff;
         }
 
         .any_message_content .any_message_icon.error{
             color: #f0142f;
         }
 
         .any_message_in {
             opacity: 1;
             top: 0;
         }
 
         .any_message_out {
             opacity: 0;
             top: -20px;
         }
         
         .any_message_loading {
             position: relative;
             display: inline-block;
             width: 16px;
             height: 16px;
         }
 
         .any_message_loading span{
             position: absolute;
             top: 0;
             left: 0;
             margin: 10%;
             border: 3px solid;
             border-color: #1e5eff transparent transparent;
             border-radius: 50%;
             -webkit-border-radius: 50%;
             -ms-border-radius: 50%;
             -o-border-radius: 50%;
             -moz-border-radius: 50%;
             width: 80%;
             height: 80%;
             box-sizing: border-box;
             animation: any_message_loader 1.5s cubic-bezier(0.5, 0, 0.5, 1) infinite;
             -webkit-animation: any_message_loader 1.5s cubic-bezier(0.5, 0, 0.5, 1) infinite;
             -ms-animation: any_message_loader 1.5s cubic-bezier(0.5, 0, 0.5, 1) infinite;
             -o-animation: any_message_loader 1.5s cubic-bezier(0.5, 0, 0.5, 1) infinite;
             -moz-animation: any_message_loader 1.5s cubic-bezier(0.5, 0, 0.5, 1) infinite;
         }
 
         .any_message_loading span:nth-child(1) {
             animation-delay: -0.3s;
             -webkit-animation-delay: -0.3s;
             -ms-animation-delay: -0.3s;
             -o-animation-delay: -0.3s;
             -moz-animation-delay: -0.3s;
         }
 
         .any_message_loading span:nth-child(2) {
             animation-delay: -0.2s;
             -webkit-animation-delay: -0.2s;
             -ms-animation-delay: -0.2s;
             -o-animation-delay: -0.2s;
             -moz-animation-delay: -0.2s;
         }
 
         .any_message_loading span:nth-child(3) {
             animation-delay: -0.1s;
             -webkit-animation-delay: -0.1s;
             -ms-animation-delay: -0.1s;
             -o-animation-delay: -0.1s;
             -moz-animation-delay: -0.1s;
         }
 
         .any_message_loading span:nth-child(4) {
             animation-delay: 0s;
             -webkit-animation-delay: 0s;
             -ms-animation-delay: 0s;
             -o-animation-delay: 0s;
             -moz-animation-delay: 0s;
         }
 
         @keyframes any_message_loader {
             0% {
                 transform: rotate(0);
                 -webkit-transform: rotate(0);
                 -ms-transform: rotate(0);
                 -moz-transform: rotate(0);
                 -o-transform: rotate(0);
             }
         
             100% {
                 transform: rotate(360deg);
                 -webkit-transform: rotate(360deg);
                 -ms-transform: rotate(360deg);
                 -moz-transform: rotate(360deg);
                 -o-transform: rotate(360deg);
             }
         }
         `;
    parent.appendChild(style);
};

/**
 *
 * @function 查询公共盒子是否已存在
 *
 * @return HTMLDivElement | null
 *
 * **/

const findEl = (): HTMLDivElement | null => {
    return document.querySelector('.any_message');
};

/**
 *
 * @function 创建公共盒子
 *
 * @return HTMLDivElement
 *
 * **/

const createBox = (): HTMLDivElement => {
    let box: HTMLDivElement | null = findEl();
    if (!box) {
        box = document.createElement('div');
        box.setAttribute('class', 'any_message');
    }
    createStyle(box); // 创建样式
    return box;
};

/**
 *
 * @function 获取显示内容
 *
 * @params content:{string | HTMLElement}:需要显示的内容
 * @params icon:{IconType}:icon的配置，是否显示icon，icon类型以及自定义的内容
 *
 * @return string
 *
 * **/

const getInnerHtml = (content: string | HTMLElement, icon: IconType): string => {
    return `
             ${icon.show && getIconStr(icon.type, icon?.custom)}
             <span class="any_message_text">${content}</span>
         `;
};

/**
 *
 * @function 根据type返回icon
 *
 * @params type:{'info' | 'warn' | 'error' | 'success'}:icon的类型，默认4种基础icon，更多需要传递第二个参数进行自定义
 * @params custom:[string]:自定义icon的html标签字符串
 *
 * @return string
 *
 * **/

const getIconStr = (type: IconType['type'], custom?: string): string => {
    return `<i class="any_message_icon ${type}">
             ${
                 custom
                     ? custom
                     : type === 'success'
                     ? `<svg viewBox="64 64 896 896" focusable="false" data-icon="check-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path></svg>`
                     : type === 'error'
                     ? `<svg viewBox="64 64 896 896" focusable="false" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>`
                     : type === 'warn'
                     ? `<svg viewBox="64 64 896 896" focusable="false" data-icon="exclamation-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path></svg>`
                     : type === 'loading'
                     ? `<span class='any_message_loading'><span></span><span></span><span></span><span></span></span>`
                     : `<svg viewBox="64 64 896 896" focusable="false" data-icon="info-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path></svg>`
             }
         </i>`;
};

/**
 *
 * @function 添加样式
 *
 * @params el:{HTMLElement}:需要添加样式的元素
 * @params className:{string}:需要添加的class名称
 *
 * @returns void
 *
 * **/

const updateClassName = (el: HTMLElement, className: string): void => {
    const oldClassName: string | null = el.getAttribute('class');
    oldClassName?.trim();
    if (!oldClassName || !findHaveClass(oldClassName, className)) {
        el.setAttribute('class', !oldClassName ? className : oldClassName + ' ' + className);
    }
};

/**
 *
 * @function 查询是否包含某个样式
 *
 * @params oldClassName:{string}:旧的样式
 * @params className:{string}:要查询的样式
 *
 * @returns boolean
 *
 * **/

const findHaveClass = (oldClassName: string, className: string): boolean => {
    return oldClassName.indexOf(className) !== -1;
};

/**
 *
 * @function 创建公共消息体
 *
 * @params content:{string | HTMLElement}:需要显示的内容
 * @params duration:{number = 3}:自动关闭时间，小于等于0不自动关闭
 * @params params:[ParamsType]:可配置消息关闭回调，点击回调，icon信息，消息样式名称
 *
 * @return void
 *
 * **/

const createMessage = (
    content: string | HTMLElement,
    duration: number = 3,
    params?: ParamsType,
): Promise<HTMLElement> => {
    return new Promise((resolve) => {
        const { className = '', icon, onClick, onClose, key = '', maxCount, style } = params || {};
        const box: HTMLDivElement = createBox();
        let message_box: HTMLDivElement | undefined = findMessageElByKey(key);
        const append: boolean = message_box === undefined;
        if (!message_box) {
            message_box = document.createElement('div');
            message_box.setAttribute('class', 'any_message_box');
            if (key) message_box.setAttribute('data-key', key);
        }
        let message: HTMLDivElement;
        if (append) {
            message = document.createElement('div');
            message.setAttribute('class', `any_message_content ${className}`);
            mergeStyle(message, style);
            message_box.appendChild(message);
        } else {
            message = message_box.querySelector('.any_message_content') as HTMLDivElement;
        }
        message.innerHTML = getInnerHtml(content, {
            show: true,
            ...icon,
        });
        if (!findEl()) {
            document.body.appendChild(box);
        }
        checkMaxLength(maxCount);
        if (append) {
            box.appendChild(message_box);
            setTimeout(function () {
                updateClassName(message, 'any_message_in');
                message_box &&
                    removeElByTimer(
                        message_box,
                        message,
                        duration,
                        () => {
                            resolve(message);
                            onClose?.(message);
                        },
                        onClick,
                    );
            }, 100);
        } else {
            message_box &&
                removeElByTimer(
                    message_box,
                    message,
                    duration,
                    () => {
                        resolve(message);
                        onClose?.(message);
                    },
                    onClick,
                );
        }
    });
};

/**
 *
 * @function 合并style样式
 *
 * @params el:{HTMLElement}:需要设置的元素
 * @params style:{CSSStyleType}
 *
 */

const mergeStyle = (el: HTMLElement, style?: CSSStyleType) => {
    if (style)
        for (let key in style) {
            el.style[key as any] = style[key] as string;
        }
};

/**
 *
 * @function 最大长度校验
 *
 * @params maxCount:{number}:最大程度
 *
 * @returns  void
 *
 */
const checkMaxLength = (maxCount: number = 0) => {
    const msg: NodeListOf<HTMLDivElement> | [] = findMessageEls();
    if (maxCount > 0 && msg.length >= maxCount) {
        remove(msg[0]);
    }
};

/**
 *
 * @function 查找是否有指定可以值的元素
 *
 * @params key:{string}:需要查询的key，需要设置data-key
 *
 * @returns  HTMLDivElement | undefined
 *
 */

const findMessageElByKey = (key: string): HTMLDivElement | undefined => {
    let result: HTMLDivElement | undefined;
    if (key) {
        const mList: NodeListOf<HTMLDivElement> | [] = findMessageEls();
        for (let i: number = 0; i < mList.length; i++) {
            const item: HTMLDivElement = mList[i];
            if (item.getAttribute('data-key') === key) {
                result = item;
                break;
            }
        }
    }
    return result;
};

/**
 *
 * @function 获取所有的消息
 *
 * @returns NodeListOf<HTMLDivElement> | []
 *
 */
const findMessageEls = (): NodeListOf<HTMLDivElement> | [] => {
    return document.querySelectorAll('.any_message .any_message_box') || [];
};

/**
 *
 * @function 规定时机移除元素
 *
 * @params el:{HTMLElement}:消息盒子元素
 * @params msg_el:{HTMLElement}:消息体元素
 * @params duration:{number = 3}:自动关闭时间，小于等于0不自动关闭
 * @params onClose:[()=>void]:关闭回调
 * @params onClick:[(e?:any)=>void]:点击回调
 *
 * @return void
 *
 * **/

const removeElByTimer = (
    el: HTMLElement,
    msg_el: HTMLElement,
    duration: number,
    onClose?: () => void,
    onClick?: (e?: any) => void,
): void => {
    clearTimer(el);
    let timer: number | undefined = undefined;
    const startTimer = () => {
        if (duration > 0) {
            timer = setTimeout(function () {
                updateClassName(msg_el, 'any_message_out');
                timer = setTimeout(function () {
                    remove(el);
                    removeStyle();
                    onClose?.();
                }, 200);
                el.setAttribute('data-timer', String(timer));
            }, duration * 1000);
            el.setAttribute('data-timer', String(timer));
        }
    };
    addEvent(msg_el, 'mousemove', () => {
        timer && clearTimeout(timer);
    });
    addEvent(msg_el, 'mouseout', () => {
        timer && startTimer();
    });
    if (onClick) {
        addEvent(msg_el, 'click', onClick);
    }
    startTimer();
};

/**
 *
 * @function 结束定时器
 *
 * @params el:{HTMLElement}:装有定时器的元素
 *
 * @returns void
 *
 * */

const clearTimer = (el: HTMLElement) => {
    const prevTimer: string | null = el.getAttribute('data-timer');
    if (prevTimer) clearTimeout(Number(prevTimer));
};

/**
 *
 * @function 添加事件
 *
 * @params node:{HTMLElement}:需要添加事件的元素
 * @params event:{string}:事件名称
 * @params fn:{(e?: any) => void}:事件处理函数
 * @params opt_useCapture:[boolean:是否自动冒泡
 *
 * @return void
 *
 * **/

const addEvent = (
    node: HTMLElement,
    event: string,
    fn: (e?: any) => void,
    opt_useCapture?: boolean,
) => {
    if (typeof node.addEventListener === 'function') {
        node.removeEventListener(event, fn, opt_useCapture || false);
        node.addEventListener(event, fn, opt_useCapture || false);
    } else if (typeof (node as any)?.attachEvent === 'function') {
        (node as any)?.detachEvent('on' + event, fn);
        (node as any)?.attachEvent('on' + event, fn);
    }
};

/**
 *
 * @function 获取参数
 *
 * @params config:{string | HTMLElement | MessageType}:参数
 *
 * @tips 参数均为可选参数，但如果同时传参，后续参数将比前置参数优先级更高，如：局部参数config内部包含duration参数，同时设置了全局config，并且传递了duration参数，优先级
 * 将是duration优先级最高，如不传递duration，则是局部duration优先级最高，最后才是全局duration
 *
 * @return void
 *
 * **/
const getConfig = (
    config?: string | HTMLElement | MessageType,
    duration?: number,
    params?: ParamsType,
): ResultType => {
    if (
        (typeof config === 'object' && config instanceof HTMLElement) ||
        typeof config === 'string'
    ) {
        return {
            content: config || globalConfig?.content || '',
            duration:
                typeof globalConfig?.duration === 'number' && typeof duration !== 'number'
                    ? globalConfig.duration
                    : duration,
            params: {
                ...globalConfig,
                ...params,
            },
        };
    } else {
        return {
            content: config?.content || globalConfig?.content || '',
            duration:
                typeof config?.duration === 'number' && typeof duration !== 'number'
                    ? config.duration
                    : typeof globalConfig?.duration === 'number' && typeof duration !== 'number'
                    ? globalConfig.duration
                    : duration,
            params: {
                ...globalConfig,
                ...config,
                ...params,
            },
        };
    }
};

/**
 *
 * @function 成功提示
 *
 * @params content:{string | HTMLElement | MessageType}:需要提示的内容
 * @params duration:{number = 3}:自动关闭事件，默认单位秒
 * @params params:[ParamsType]:可配置消息关闭回调，点击回调，icon信息，消息样式名称
 *
 * @return void
 *
 * **/

const success = (
    content?: string | HTMLElement | MessageType,
    duration?: number,
    params?: ParamsType,
): Promise<HTMLElement> => {
    const config: ResultType = getConfig(content, duration, {
        ...params,
        icon: {
            ...params?.icon,
            type: 'success',
        },
    });
    return createMessage(config.content, config.duration, config.params);
};

/**
 *
 * @function 警告提示
 *
 * @params content:{string | HTMLElement | MessageType}:需要提示的内容
 * @params duration:{number = 3}:自动关闭事件，默认单位秒
 * @params params:[ParamsType]:可配置消息关闭回调，点击回调，icon信息，消息样式名称
 *
 * @return void
 *
 * **/

const warn = (
    content?: string | HTMLElement | MessageType,
    duration?: number,
    params?: ParamsType,
): Promise<HTMLElement> => {
    const config: ResultType = getConfig(content, duration, {
        ...params,
        icon: {
            ...params?.icon,
            type: 'warn',
        },
    });
    return createMessage(config.content, config.duration, config.params);
};

/**
 *
 * @function 错误提示
 *
 * @params content:{string | HTMLElement| MessageType}:需要提示的内容
 * @params duration:{number = 3}:自动关闭事件，默认单位秒
 * @params params:[ParamsType]:可配置消息关闭回调，点击回调，icon信息，消息样式名称
 *
 * @return void
 *
 * **/

const error = (
    content?: string | HTMLElement | MessageType,
    duration?: number,
    params?: ParamsType,
): Promise<HTMLElement> => {
    const config: ResultType = getConfig(content, duration, {
        ...params,
        icon: {
            ...params?.icon,
            type: 'error',
        },
    });
    return createMessage(config.content, config.duration, config.params);
};

/**
 *
 * @function 普通信息提示
 *
 * @params content:{string | HTMLElement| MessageType}:需要提示的内容
 * @params duration:{number = 3}:自动关闭事件，默认单位秒
 * @params params:[ParamsType]:可配置消息关闭回调，点击回调，icon信息，消息样式名称
 *
 * @return void
 *
 * **/

const info = (
    content?: string | HTMLElement | MessageType,
    duration?: number,
    params?: ParamsType,
): Promise<HTMLElement> => {
    const config: ResultType = getConfig(content, duration, {
        ...params,
        icon: {
            ...params?.icon,
            type: 'info',
        },
    });
    return createMessage(config.content, config.duration, config.params);
};

/**
 *
 * @function 加载中
 *
 * @params content:{string | HTMLElement| MessageType}:需要提示的内容
 * @params duration:{number = 3}:自动关闭事件，默认单位秒
 * @params params:[ParamsType]:可配置消息关闭回调，点击回调，icon信息，消息样式名称
 *
 * @return void
 *
 * **/

const loading = (
    content?: string | HTMLElement | MessageType,
    duration?: number,
    params?: ParamsType,
): Promise<HTMLElement> => {
    const config: ResultType = getConfig(content, duration, {
        ...params,
        icon: {
            ...params?.icon,
            type: 'loading',
        },
    });
    return createMessage(config.content, config.duration, config.params);
};

/**
 *
 * @function 移除样式
 *
 * @return void
 *
 * **/

const removeStyle = (): void => {
    if (document.querySelectorAll('.any_message .any_message_box').length === 0) {
        remove(document.querySelector('.any_message style'));
    }
};

/**
 *
 * @object 全局配置
 *
 * @tips 优先级比直接调用相应方法更低
 *
 */

const config = (params: MessageType) => {
    globalConfig = params;
};

/**
 *
 * @function 销毁消息
 *
 * @params id:[string]：需要销毁的key
 *
 * @return void
 *
 */

const destroy = (id?: string): void => {
    if (id) {
        const box: HTMLDivElement | undefined = findMessageElByKey(id);
        if (box) {
            clearTimer(box);
            const content: HTMLDivElement | null = box.querySelector('.any_message_content');
            content && updateClassName(content, 'any_message_out');
            setTimeout(() => {
                box && remove(box);
            }, 200);
        }
    } else {
        const els: NodeListOf<HTMLDivElement> | [] = findMessageEls();
        for (let i: number = 0; i < els.length; i++) {
            clearTimer(els[i]);
        }
        remove(document.querySelector('.any_message'));
    }
};

export default {
    success,
    destroy,
    warn,
    error,
    info,
    loading,
    config,
};
