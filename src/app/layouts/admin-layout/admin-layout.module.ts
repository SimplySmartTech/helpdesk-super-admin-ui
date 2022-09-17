import { FooterModule } from './../../shared/components/footer/footer.module';
import { FixedPluginModule } from './../../shared/components/fixedplugin/fixedplugin.module';
import { SidebarModule } from './../../sidebar/sidebar.module';
import { NavbarModule } from './../../shared/components/navbar/navbar.module';
import { AdminLayoutComponent } from './admin-layout.component';
import { AngularMaterialModule } from './../../shared/modules/material-module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent }       from '../../pages/dashboard/dashboard.component';
import { UserComponent }            from '../../pages/user/user.component';
import { TableComponent }           from '../../pages/table/table.component';
import { TypographyComponent }      from '../../pages/typography/typography.component';
import { IconsComponent }           from '../../pages/icons/icons.component';
import { NotificationsComponent }   from '../../pages/notifications/notifications.component';
import { UpgradeComponent }         from '../../pages/upgrade/upgrade.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TableComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    NotificationsComponent,
    AdminLayoutComponent
  ]
})

export class AdminLayoutModule {}
