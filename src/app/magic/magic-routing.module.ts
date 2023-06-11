import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { GroupMagicCardComponent } from './group-magic-card/group-magic-card.component';
import { IndividualMagicCardComponent } from './individual-magic-card/individual-magic-card.component';

const magicRegex = '^spells$|^summons$';
const regexMatcher = (url: UrlSegment[]) => {
  return url.length === 2 && url[0].path.match(magicRegex)
    ? {
        consumed: url,
        posParams: {
          magicType: new UrlSegment(url[0].path, {}),
          id: new UrlSegment(url[1].path, {}),
        },
      }
    : null;
};

const routes: Routes = [
  { path: '', component: GroupMagicCardComponent },

  {
    matcher: regexMatcher,
    component: IndividualMagicCardComponent,
  },
  {
    path: 'private',
    loadChildren: () =>
      import('./private/private.module').then((m) => m.PrivateModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MagicRoutingModule {}
