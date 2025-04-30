import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
  ...appConfig, // spread existing app config
  providers: [
    ...(appConfig.providers || []), // preserve existing providers
    provideHttpClient(withInterceptorsFromDi()) // ✅ add HttpClient
  ]
}).catch((err) => console.error(err));
