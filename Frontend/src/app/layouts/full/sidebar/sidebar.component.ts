import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from 'src/app/shared/menu-items';
import jwt_decode from 'jwt-decode'
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [ `mat-list-item {
    background-color: #7b1fa2;
    border-radius: 10px;
    margin-bottom: 10px;
    transition: background-color 0.3s, border-radius 0.3s;
  }

  a{text-decoration: none !important;
    color: white;
    display: block;
    padding: 10px;}
  `]
})
export class AppSidebarComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  userRole:any;
  token:any = localStorage.getItem('token');
  tokenPayload:any;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems:MenuItems
  ) {
    this.tokenPayload = jwt_decode(this.token);
    this.userRole = this.tokenPayload?.role;
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
