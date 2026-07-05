import { bootstrapApplication }                                                 from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular }                              from '@ionic/angular/standalone';
import { provideRemoteConfig, getRemoteConfig }                                 from '@angular/fire/remote-config';
import { provideFirebaseApp, initializeApp }                                    from '@angular/fire/app';
import { firebaseConfig }                                                       from './app/core/firebase/firebase.config';
import { routes }                                                               from './app/app.routes';
import { AppComponent }                                                         from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideFirebaseApp(() =>
      initializeApp(firebaseConfig)
    ),
    provideRemoteConfig(() =>
      getRemoteConfig()
    ),
  ],
});
