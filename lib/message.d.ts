import { ParamsType } from './type';
declare const _default: {
    success: (content?: string | Partial<ParamsType & {
        content: string | HTMLElement;
        duration?: number | undefined;
    }> | HTMLElement | undefined, duration?: number | undefined, params?: ParamsType | undefined) => Promise<HTMLElement>;
    destroy: (id?: string | undefined) => void;
    warn: (content?: string | Partial<ParamsType & {
        content: string | HTMLElement;
        duration?: number | undefined;
    }> | HTMLElement | undefined, duration?: number | undefined, params?: ParamsType | undefined) => Promise<HTMLElement>;
    error: (content?: string | Partial<ParamsType & {
        content: string | HTMLElement;
        duration?: number | undefined;
    }> | HTMLElement | undefined, duration?: number | undefined, params?: ParamsType | undefined) => Promise<HTMLElement>;
    info: (content?: string | Partial<ParamsType & {
        content: string | HTMLElement;
        duration?: number | undefined;
    }> | HTMLElement | undefined, duration?: number | undefined, params?: ParamsType | undefined) => Promise<HTMLElement>;
    loading: (content?: string | Partial<ParamsType & {
        content: string | HTMLElement;
        duration?: number | undefined;
    }> | HTMLElement | undefined, duration?: number | undefined, params?: ParamsType | undefined) => Promise<HTMLElement>;
    config: (params: Partial<ParamsType & {
        content: string | HTMLElement;
        duration?: number | undefined;
    }>) => void;
};
export default _default;
