export type IconType = {
    /**
     * @description 图标类型，内置五种类型
     * @default info
     */
    type?: 'info' | 'warn' | 'error' | 'success' | 'loading';
    /**
     * @description 是否显示
     * @default true
     */
    show?: boolean;
    /**
     * @description 自定义图标
     * @default null
     */
    custom?: string;
};

export type ParamsType = {
    /**
     * @description 样式名称
     * @default null
     */
    className?: string;
    /**
     * @description 自定义图标
     * @default null
     */
    icon?: IconType;
    /**
     * @description 点击后的回调事件
     */
    onClick?: (e?: Event) => void;
    /**
     * @description 关闭后的回调事件
     *

     */
    onClose?: (el?: HTMLElement) => void;
    /**
     * @description 唯一key值，用户指定销毁或修改使用
     * @default null
     */
    key?: string;
    /**
     * @description 最大同时渲染数量，超过会清除顶部第一个
     * @default Infinity
     */
    maxCount?: number;
    /**
     * @description 额外的样式
     */
    style?: CSSStyleType;
};

export type CSSStyleType = Partial<CSSStyleDeclaration>;

export type MessageType = Partial<
    ParamsType & {
        /**
         * @description 需要显示的提示内容
         */
        content: string | HTMLElement;
        /**
         * @description 显示多久关闭
         * @default 3
         */
        duration?: number;
    }
>;

export type ResultType = {
    content: string | HTMLElement;
    duration?: number;
    params?: ParamsType;
};
