import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// minimum: number;
// template: string;
// easing: string;
// speed: number;
// trickle: boolean;
// trickleSpeed: number;
// showSpinner: boolean;
// parent: string;
// positionUsing: string;
// barSelector: string;
// spinnerSelector: string;

export function setNProgress(options = {}) {
  const list = Object.assign(
    {
      easing: 'ease',
      speed: 500,
      showSpinner: true,
      trickleSpeed: 200,
      minimum: 0.3,
    },
    options || {}
  );
  NProgress.configure(list);
  return NProgress;
}
