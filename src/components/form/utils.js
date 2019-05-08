import { getElement } from '@utils/dom/index.js';
import { valOrDefault, isNullOrWhitespace } from '@utils/datatype/index.js';

export function getInput(type, label) {
    if (isNullOrWhitespace(label.htmlFor)) {
        return getElement(`input[type='${valOrDefault(type, 'text')}']`, label);
    }
    return getElement(`#${label.htmlFor}`);
}