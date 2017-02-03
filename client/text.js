import React from 'react';
import Polyglot from 'node-polyglot';
import language from 'language';
import MTRC from 'markdown-to-react-components';
import styles from './text.css';

const polyglot = new Polyglot({
  phrases: language.phrases,
  locale: language.locale
});

MTRC.configure({
  a(props) {
    return (
      <a
        href={props.href}
        target={props.target}
        className={styles.hyperlink}
        >
          {props.children}
      </a>
    );
  },
  ul(props) {
    return (
      <ul className={styles.list}>
          {props.children}
      </ul>
    );
  },
  p(props) {
    return (
      <p className={styles.paragraph}>
        {props.children}
      </p>
    );
  }
});

export const t = (...args) => {
  const text = polyglot.t(...args);

  if (text.substr(0, 9) === 'MARKDOWN:') {
    return MTRC(text.replace('MARKDOWN:', '')).tree;
  }
  return text;
};

export const markdown = (text) => {
  if (text.substr(0, 9) === 'MARKDOWN:') {
    return MTRC(text.replace('MARKDOWN:', '')).tree;
  }
  return text;
};
