import { AdminLayoutComponent } from './admin-layout.component';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';

export const AdminLayoutRoutes: Routes = [
    { path: '',
        component: AdminLayoutComponent,
      children: [
        { path: '', redirectTo: 'home', pathMatch: 'full'},
        { path: 'home', component: DashboardComponent},
        { path: 'user',           component: UserComponent },
        { path: 'table',          component: TableComponent },
        { path: 'typography',     component: TypographyComponent },
        { path: 'icons',          component: IconsComponent },
        { path: 'notifications',  component: NotificationsComponent },
        { path: 'upgrade',        component: UpgradeComponent }
        
      ]
    }
  ];