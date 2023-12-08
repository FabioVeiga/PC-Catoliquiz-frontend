import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Injectable,
  LOCALE_ID,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule, DatePipe } from '@angular/common';
import {
  MAT_RIPPLE_GLOBAL_OPTIONS,
  RippleGlobalOptions,
} from '@angular/material/core';

import {
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG,
} from '@angular/platform-browser';
import { ApiService } from './services/api/api.service';
import { AuthGuard } from './guards/auth.guard';
import { environment } from '../../environments/environment';
import { ApiInterceptor } from './api.interceptor';

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  override overrides = {
    swipe: { direction: 6 },
    pinch: { enable: false },
    rotate: { enable: false },
    pan: { enable: false },
  };
}

export const globalRippleConfig: RippleGlobalOptions = {
  disabled: false,
  animation: {
    enterDuration: 300,
    exitDuration: 0,
  },
};

/**
 * This abstract class used for module building by extending this class
 * prevents importing the module into somewhere else than root App Module.
 */
export abstract class EnsureImportedOnceModule {
  protected constructor(targetModule: unknown) {
    if (targetModule) {
      throw new Error(
        `${targetModule.constructor.name} has already been loaded.`
      );
    }
  }
}

@NgModule({
  declarations: [],
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [CommonModule, HttpClientModule, DatePipe],
})
export class CoreModule extends EnsureImportedOnceModule {
  public constructor(@SkipSelf() @Optional() parent: CoreModule) {
    super(parent);
  }
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: LOCALE_ID, useValue: environment.language },
        { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig },
        { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig },
        DatePipe,
        ApiService,
        AuthGuard,
      ],
    };
  }
}
