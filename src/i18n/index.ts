import { get } from 'lodash';

import de from './locales/de.json';
import en from './locales/en-US.json';
import es from './locales/es-ES.json';
import fr from './locales/fr.json';
import it from './locales/it.json';
import ru from './locales/ru.json';
import tr from './locales/tr-TR.json';
import uk from './locales/uk.json';

export type ILocale = 'de' | 'en-US' | 'es-ES' | 'fr' | 'it' | 'ru' | 'tr-TR' | 'uk';

export const localeMap = { de, 'en-US': en, 'es-ES': es, fr, it, ru, 'tr-TR': tr, uk };

export const defaultLocale = 'en-US';

export const processProperties = (localeData: string, props: Record<string, string> = {}) => {
    return Object.keys(props).reduce((acc, key) => acc.replace(`{${key}}`, props[key]), localeData);
};

export const t = (key: string, props: Record<string, string> = {}) => {
    if (!key) {
        return '';
    }

    let locale = navigator.language as ILocale;

    if (!localeMap[locale]) {
        locale = defaultLocale;
    }

    const localeData = localeMap[locale];

    if (!localeData) {
        return key;
    }

    const data = get(localeData, key);

    if (!data) {
        return key;
    }

    return Array.isArray(data) ? data : processProperties(data, props);
};
