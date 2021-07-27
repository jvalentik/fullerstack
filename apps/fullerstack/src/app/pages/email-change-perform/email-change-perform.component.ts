/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by a proprietary notice
 * that can be found at http://neekware.com/license/PRI.html
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '@fullerstack/ngx-auth';
import { i18nExtractor as _ } from '@fullerstack/ngx-i18n';
import { ValidationService } from '@fullerstack/ngx-util';

import { Subject, filter, first, map, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'fullerstack-email-change-perform',
  templateUrl: './email-change-perform.component.html',
  styleUrls: ['./email-change-perform.component.scss'],
})
export class EmailChangePerformComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  title = _('COMMON.CHANGE');
  subtitle = _('COMMON.ACCOUNT.EMAIL');
  icon = 'email';
  isLoading = false;
  status = { ok: true, message: '' };

  constructor(
    readonly route: ActivatedRoute,
    readonly validation: ValidationService,
    readonly auth: AuthService
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map((params) => params.get('token')),
        filter((token) => !!token),
        first(),
        switchMap((token) => {
          this.isLoading = true;
          return this.auth.emailChangePerform$({ token });
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (resp) => {
          this.isLoading = false;
          if (!resp.ok) {
            // handle known errors
            this.icon = 'account-alert-outline';
            this.status = {
              ok: false,
              message: resp.message || _('WARN.USER.VERIFICATION_FAILURE'),
            };
          }
        },
        error: (err) => {
          // handler server errors
          this.icon = 'account-alert-outline';
          this.isLoading = false;
          this.status = {
            ok: false,
            message: err.error?.message || _('WARN.USER.VERIFICATION_FAILURE'),
          };
        },
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}