import { IconType, MessageType, ParamsType, ResultType, CSSStyleType } from './type';

let globalConfig: MessageType | null = null;

/**
 *
 * @function compatible ie remove element
 *
 * @params el:{Element | null}:Elements to be removed
 *
 * @returns void
 *
 * **/
const remove = (el: Element | null): void => {
    el?.parentNode?.removeChild(el);
};

/**
 *
 * @function create common style
 *
 * @params parent:{HTMLDivElement}:parent el
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
             border-radius: 3px;
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
 * @function Query whether the public box already exists
 *
 * @return HTMLDivElement | null
 *
 * **/

const findEl = (): HTMLDivElement | null => {
    return document.querySelector('.any_message');
};

/**
 *
 * @function Create common box
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
    createStyle(box);
    return box;
};

/**
 *
 * @function Get display content
 *
 * @params content:{string | HTMLElement}:need show content
 * @params icon:{IconType}:icon configuration, whether to display icon, icon type and customized content
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
 * @function return icon according to type
 *
 * @params type:{'info' | 'warn' | 'error' | 'success'}:Icon types. There are four basic icons by default. For more, you need to pass the second parameter for customization
 * @params custom:[string]:HTML tag string of custom icon
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
 * @function add style
 *
 * @params el:{HTMLElement}:need add style el
 * @params className:{string}:need add class
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
 * @function query whether to include a style
 *
 * @params oldClassName:{string}:old class
 * @params className:{string}:need find class
 *
 * @returns boolean
 *
 * **/

const findHaveClass = (oldClassName: string, className: string): boolean => {
    return oldClassName.indexOf(className) !== -1;
};

/**
 *
 * @function Create public message body
 *
 * @params content:{string | HTMLElement}:need show content
 * @params duration:{number = 3}:Automatic closing time, no automatic closing when it is less than or equal to 0
 * @params params:[ParamsType]:Configurable message closing callback, click callback, icon information, message style name
 *
 * @return Promise<HTMLElement>
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
 * @function merge style
 *
 * @params el:{HTMLElement}:need merge el
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
 * @function check max length
 *
 * @params maxCount:{number}:max length
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
 * @function find whether there is an element that can be assigned a value
 *
 * @params key:{string}:The key to be queried needs to be set data-key
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
 * @function get all messages
 *
 * @returns NodeListOf<HTMLDivElement> | []
 *
 */
const findMessageEls = (): NodeListOf<HTMLDivElement> | [] => {
    return document.querySelectorAll('.any_message .any_message_box') || [];
};

/**
 *
 * @function remove element at specified time
 *
 * @params el:{HTMLElement}:message box el
 * @params msg_el:{HTMLElement}:message body el
 * @params duration:{number = 3}:Automatic closing time, no automatic closing when it is less than or equal to 0
 * @params onClose:[()=>void]:close callback
 * @params onClick:[(e?:any)=>void]:click callback
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
 * @function remove timer
 *
 * @params el:{HTMLElement}:Element with timer
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
 * @function add event
 *
 * @params node:{HTMLElement}:need add event el
 * @params event:{string}:event name
 * @params fn:{(e?: any) => void}:event handler
 * @params opt_useCapture:[boolean:whether automatic bubbling
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
 * @function get parameters
 *
 * @params config:{string | HTMLElement | MessageType}:parameter
 *
 * @tips The parameters are optional. However, if the parameters are transferred at the same time, the subsequent parameters will have higher priority than the preceding parameters. For example, the local parameter config contains the duration parameter, the global config is set, and the duration parameter is passed. The priority will be the highest duration priority. If the duration parameter is not passed, the local duration priority will be the highest, and the global duration will be the last
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
 * @function success
 *
 * @params content:{string | HTMLElement | MessageType}:need show content
 * @params duration:{number = 3}:close time
 * @params params:[ParamsType]:icon info
 *
 * @return Promise<HTMLElement>
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
 * @function warning
 *
 * @params content:{string | HTMLElement | MessageType}:need show content
 * @params duration:{number = 3}:close time
 * @params params:[ParamsType]:icon info
 *
 * @return Promise<HTMLElement>
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
 * @function error
 *
 * @params content:{string | HTMLElement | MessageType}:need show content
 * @params duration:{number = 3}:close time
 * @params params:[ParamsType]:icon info
 *
 * @return Promise<HTMLElement>
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
 * @function info
 *
 * @params content:{string | HTMLElement | MessageType}:need show content
 * @params duration:{number = 3}:close time
 * @params params:[ParamsType]:icon info
 *
 * @return Promise<HTMLElement>
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
 * @function loading
 *
 * @params content:{string | HTMLElement | MessageType}:need show content
 * @params duration:{number = 3}:close time
 * @params params:[ParamsType]:icon info
 *
 * @return Promise<HTMLElement>
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
 * @function remove style
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
 * @object global config
 *
 * @tips lower priority than calling the corresponding method directly
 *
 */

const config = (params: MessageType) => {
    globalConfig = params;
};

/**
 *
 * @function destroy message
 *
 * @params id:[string]：need destroy key
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
