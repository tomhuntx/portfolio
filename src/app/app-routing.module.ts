import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AboutCardComponent } from './about-card/about-card.component';
import { TitleCardComponent } from './title-card/title-card.component';

const routes: Routes = [
  { path: '', component: TitleCardComponent },
  {
    path: 'about',
    data: { preload: true },
    component: AboutCardComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
