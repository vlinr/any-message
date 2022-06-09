export declare type IconType = {
    /**
     * @description icon style
     * @default info
     */
    type?: 'info' | 'warn' | 'error' | 'success' | 'loading';
    /**
     * @description Is show
     * @default true
     */
    show?: boolean;
    /**
     * @description customize icon
     * @default null
     */
    custom?: string;
};
export declare type ParamsType = {
    /**
     * @description class name
     * @default null
     */
    className?: string;
    /**
     * @description customize icon
     * @default null
     */
    icon?: IconType;
    /**
     * @description click callback
     */
    onClick?: (e?: Event) => void;
    /**
     * @description close callback
     *

     */
    onClose?: (el?: HTMLElement) => void;
    /**
     * @description Unique key value, which is specified by the user for destruction or modification
     * @default null
     */
    key?: string;
    /**
     * @description Maximum number of simultaneous renderings, exceeding which will clear the top first
     * @default Infinity
     */
    maxCount?: number;
    /**
     * @description style
     */
    style?: CSSStyleType;
};
export declare type CSSStyleType = Partial<CSSStyleDeclaration>;
export declare type MessageType = Partial<ParamsType & {
    /**
     * @description message content
     */
    content: string | HTMLElement;
    /**
     * @description close time
     * @default 3
     */
    duration?: number;
}>;
export declare type ResultType = {
    content: string | HTMLElement;
    duration?: number;
    params?: ParamsType;
};
