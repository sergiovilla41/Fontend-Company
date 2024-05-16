import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import { MsalService } from '@azure/msal-angular';

export const customMsalGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const msalService: MsalService = inject(MsalService)
  const router = inject(Router)
  if (msalService.instance.getActiveAccount() !== null) {
    return true
  }else{
    router.navigate(['/login'])
    return false
  }
}
