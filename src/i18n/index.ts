import { get } from 'lodash';

import en from './locales/en-US.json';
import tr from './locales/tr-TR.json';

export type ILocale = 'tr-TR' | 'en-US';

export const localeMap = {
    'en-US': en,
    'tr-TR': tr,
} as unknown as Record<ILocale, Record<string, string>>;

export const defaultLocale: ILocale = 'en-US';

export const processProperties = (localeData: string, props: Record<string, string> = {}) => {
    return Object.keys(props).reduce((acc, key) => acc.replace(`{${key}}`, props[key]), localeData);
};

export const t = (key: string, props: Record<string, string> = {}) => {
    if (!key) {
        return '';
    }

    let locale = navigator.language;

    if (!localeMap[locale as ILocale]) {
        locale = defaultLocale;
    }

    const localeData = localeMap[locale as ILocale];

    if (!localeData) {
        return key;
    }

    return processProperties(get(localeData, key) || key, props);
};
