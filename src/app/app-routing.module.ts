import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './login/login.page';
import { SignupPage } from './signup/signup.page';
import { TabsPage } from './tabs/tabs.page';
import { StepsPage } from './steps/steps.page';
import { ProfilePage } from './profile/profile.page';
import { CaloriesPage } from './calories/calories.page';
import { WaterPage } from './water/water.page';

const routes: Routes = [
  { path: 'login', component: LoginPage }, // Correct configuration

  {
    path: 'signup',
    component: SignupPage,
    // loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'tabs',
    component: TabsPage,
    // loadChildren: () => import('./tabs-page/tabs-page.module').then( m => m.TabsPagePageModule)
  },
  {
    path: 'steps',
    component: StepsPage,
    // loadChildren: () => import('./steps/steps.module').then( m => m.StepsPageModule)
  },

  {
    path: 'water',
    component: WaterPage,
    // loadChildren: () => import('./water/water.module').then( m => m.WaterPageModule)
  },
  {
    path: 'calories',
    component: CaloriesPage,
    // loadChildren: () => import('./calories/calories.module').then( m => m.CaloriesPageModule)
  },
  {
    path: 'profile',
    component: ProfilePage,
    // loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect root to login
  { path: '**', redirectTo: '/login' },
  // Handle unknown routes
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
