import {Directive, Attribute, ElementRef, DynamicComponentLoader} from 'angular2/core';
import {Router, RouterOutlet, ComponentInstruction} from 'angular2/router';
import {tokenNotExpired} from 'angular2-jwt';

@Directive({
  selector: 'router-outlet'
})
export class ProtectedRouterOutlet extends RouterOutlet {
  publicRoutes: any;
  private parentRouter: Router;

  constructor(_elementRef: ElementRef, _loader: DynamicComponentLoader,
              _parentRouter: Router, @Attribute('name') nameAttr: string) {
    super(_elementRef, _loader, _parentRouter, nameAttr);

    this.parentRouter = _parentRouter;
    this.publicRoutes = ['login'];
  }

  activate(instruction: ComponentInstruction) {
    var url = instruction.urlPath;
    if (!tokenNotExpired() && this.publicRoutes.indexOf(url) < 0) {
      this.parentRouter.navigateByUrl('/login');
    }
    return super.activate(instruction);
  }
}
