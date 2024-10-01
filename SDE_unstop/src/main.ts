

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// Extend the Window interface to include ngRef
declare global {
  interface Window {
    ngRef: any;  // Add ngRef property to window object
  }
}

platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
  // Ensure Angular destroys itself on hot reloads.
  if (window.ngRef) {
    window.ngRef.destroy();
  }
  window.ngRef = ref;

  // Otherwise, log the boot error
}).catch(err => console.error(err));
