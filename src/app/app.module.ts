import { OWINIntercepter } from './shared/services/OWINIntercepter';
import { HtttpTokenInterceptorService } from './shared/services/http-token-inyterceptor';
import { SettingsProvider } from './shared/services/settings-provider.service';
import { AuthLayoutComponent } from './modules/auth/auth-layout/auth-layout.component';

import { AuthModule } from './modules/auth/auth.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/components/footer/footer.module';
import { NavbarModule} from './shared/components/navbar/navbar.module';
import { FixedPluginModule} from './shared/components/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { restApiSuffix, API_CONFIG } from './shared/constants/rest-api.constants';


@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: false
    }),
    
    ToastrModule.forRoot({
      timeOut: 4000,
      closeButton: true,
      enableHtml: true,
      positionClass: 'toast-top-center'}),
    AuthModule
  ],
  providers: [
    SettingsProvider,
    {
      'provide': APP_INITIALIZER,
      'useFactory': init,
      'deps': [SettingsProvider],
      'multi': true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: OWINIntercepter,
      multi: true
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HtttpTokenInterceptorService,
    //   multi: true
    // },
    {
      provide: API_CONFIG,
      useValue: restApiSuffix,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function init(settingsProvider: SettingsProvider) {
  return () => settingsProvider.loadConfig();
}

