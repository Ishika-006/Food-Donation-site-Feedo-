import 'zone.js';  // Angular requires this

(window as any).global = window;

import { Buffer } from 'buffer';
(window as any).Buffer = Buffer;

(window as any).process = {
  env: {},
};
