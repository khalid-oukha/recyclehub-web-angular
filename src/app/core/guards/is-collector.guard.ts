import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {map} from "rxjs";

export const collectorGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isCollector().pipe(
    map((isCollector) => {
      if (!isCollector) {
        router.navigate(['/profile']);
        return false;
      }
      return true;
    })
  );
};
