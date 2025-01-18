/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2024 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 *
 * (https://www.youtube.com/watch?v=oz4lhZVcdj0&t=367s)
 */

(() => {
     'use strict';

     const getStoredTheme = () => localStorage.getItem('theme');
     const setStoredTheme = theme => localStorage.setItem('theme', theme);

     const getPreferredTheme = () => {
          const storedTheme = getStoredTheme();
          if (storedTheme) {
               return storedTheme;
          }
          return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
     };

     const setTheme = theme => {
          if (theme === 'auto') {
               document.documentElement.setAttribute('data-bs-theme', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
          } else {
               document.documentElement.setAttribute('data-bs-theme', theme);
          }
     };

     if (!getStoredTheme()) {
          setStoredTheme(getPreferredTheme());
     }

     setTheme(getPreferredTheme());

     const showActiveTheme = (theme, focus = false) => {
          const themeSwitcher = document.querySelector('#bd-theme');
          if (!themeSwitcher) return;

          const themeSwitcherText = document.querySelector('#bd-theme-text');
          const activeThemeIcon = document.querySelector('.theme-icon-active');
          const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`);
          if (!btnToActive) return;

          const iconOfActiveBtn = btnToActive.querySelector('i')?.dataset.themeIcon || '';

          document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
               element.classList.remove('active');
               element.setAttribute('aria-pressed', 'false');
          });

          btnToActive.classList.add('active');
          btnToActive.setAttribute('aria-pressed', 'true');

          if (activeThemeIcon && activeThemeIcon.dataset.themeIconActive) {
               activeThemeIcon.classList.remove(activeThemeIcon.dataset.themeIconActive);
               activeThemeIcon.classList.add(iconOfActiveBtn);
               activeThemeIcon.dataset.themeIconActive = iconOfActiveBtn;
          }

          const themeSwitcherLabel = `${themeSwitcherText?.textContent || 'Theme'} (${btnToActive.dataset.bsThemeValue})`;
          themeSwitcher.setAttribute('aria-label', themeSwitcherLabel);

          if (focus) {
               themeSwitcher.focus();
          }
     };

     const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
     mediaQuery.addEventListener('change', () => {
          const storedTheme = getStoredTheme();
          if (storedTheme !== 'light' && storedTheme !== 'dark') {
               setTheme(getPreferredTheme());
          }
     });

     window.addEventListener('DOMContentLoaded', () => {
          showActiveTheme(getPreferredTheme());

          document.querySelectorAll('[data-bs-theme-value]').forEach(toggle => {
               toggle.addEventListener('click', () => {
                    const theme = toggle.getAttribute('data-bs-theme-value');
                    setStoredTheme(theme);
                    setTheme(theme);
                    showActiveTheme(theme, true);
               });
          });
     });
})();
