import { get } from 'lodash';

import de from './locales/de.json';
import en from './locales/en-US.json';
import es from './locales/es-ES.json';
import fr from './locales/fr.json';
import it from './locales/it.json';
import ru from './locales/ru.json';
import tr from './locales/tr.json';
import uk from './locales/uk.json';

export type ILocale = 'de' | 'en-US' | 'es-ES' | 'fr' | 'it' | 'ru' | 'tr' | 'uk';

export const localeMap = { de, 'en-US': en, 'es-ES': es, fr, it, ru, tr, uk };

export const locales = Object.keys(localeMap) as ILocale[];

export const defaultLocale = 'en-US';

export const processProperties = (localeData: string, props: Record<string, string> = {}) => {
    return Object.keys(props).reduce((acc, key) => acc.replace(`{${key}}`, props[key]), localeData);
};

export const currentLocale = ref(
    (localeMap[localStorage.getItem('locale') as ILocale]
        ? localStorage.getItem('locale')
        : localeMap[navigator.language as ILocale]
        ? navigator.language
        : defaultLocale) as ILocale,
);

export const setLocale = (locale: ILocale) => {
    currentLocale.value = locale;
    localStorage.setItem('locale', locale);
};

export const t = (key: string, props: Record<string, string> = {}) => {
    if (!key) {
        return '';
    }

    if (!localeMap[currentLocale.value]) {
        currentLocale.value = defaultLocale;
    }

    const localeData = localeMap[currentLocale.value];

    if (!localeData) {
        return key;
    }

    const data = get(localeData, key);

    if (!data) {
        return key;
    }

    return Array.isArray(data) ? data : processProperties(data, props);
};
