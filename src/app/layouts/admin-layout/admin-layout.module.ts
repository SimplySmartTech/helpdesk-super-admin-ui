import { FooterModule } from './../../shared/components/footer/footer.module';
import { FixedPluginModule } from './../../shared/components/fixedplugin/fixedplugin.module';
import { SidebarModule } from './../../sidebar/sidebar.module';
import { NavbarModule } from './../../shared/components/navbar/navbar.module';
import { AdminLayoutComponent } from './admin-layout.component';
import { AngularMaterialModule } from './../../shared/modules/material-module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent }       from '../../pages/dashboard/dashboard.component';
import { UserComponent }            from '../../pages/user/user.component';
import { TableComponent }           from '../../pages/table/table.component';
import { TypographyComponent }      from '../../pages/typography/typography.component';
import { IconsComponent }           from '../../pages/icons/icons.component';
import { NotificationsComponent }   from '../../pages/notifications/notifications.component';
import { SpinnerInterceptorInterceptor } from '../../interceptors/spinner-interceptor.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    AngularMaterialModule,
    FooterModule,
    FixedPluginModule,
    SidebarModule,
    NavbarModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TableComponent,
    TypographyComponent,
    IconsComponent,
    NotificationsComponent,
    AdminLayoutComponent
  ],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptorInterceptor,
      multi: true
    },
  ]
})

export class AdminLayoutModule {}
