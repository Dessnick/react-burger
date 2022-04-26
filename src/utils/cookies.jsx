/* eslint-disable prefer-template */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-useless-escape */
/* eslint-disable guard-for-in */
/* eslint-disable no-param-reassign */
export const getCookies = (name) => {
  const matches = document.cookie.match(
    // eslint-disable-next-line prefer-template
    new RegExp(
      '(?:^|; )' +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)'
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setCookies = (name, value, props) => {
  props = props || {};
  let exp = props.expires;
  if (typeof exp === 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    // eslint-disable-next-line no-multi-assign
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookies = `${name}=${value}`;

  for (const propName in props) {
    updatedCookies += `; ${propName}`;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookies += `=${propValue}`;
    }
  }

  document.cookie = updatedCookies;
};

export const deleteCookies = (name) => {
  setCookies(name, null, { expires: -1 });
};
