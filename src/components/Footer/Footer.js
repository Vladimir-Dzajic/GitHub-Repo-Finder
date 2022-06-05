import React from 'react';
import classes from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <a
        href="https://github.com/Vladimir-Dzajic/GitHub-Repo-Finder"
        target="_blank"
        rel="noreferrer"
      >
        Created with <span>❤</span> by Vladimir
      </a>
    </footer>
  );
};

export default Footer;
