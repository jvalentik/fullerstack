import { Component, OnInit } from '@angular/core';
import { tokenizeFullName, tryGet } from '@fullerstack/agx-util';
import { AuthRegisterCredentials, AuthService } from '@fullerstack/ngx-auth';
import { ConfigService } from '@fullerstack/ngx-config';
import { _ } from '@fullerstack/ngx-i18n';

@Component({
  selector: 'fullerstack-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  title = _('COMMON.REGISTER');
  subtitle = _('COMMON.ACCOUNT_CREATE');
  icon = 'account-plus-outline';

  constructor(public config: ConfigService, public auth: AuthService) {}

  ngOnInit() {
    if (this.auth.state.isLoggedIn) {
      const redirectUrl = tryGet(
        () => this.config.options.localConfig.registerInLandingPageUrl,
        '/'
      );
      this.auth.goTo(redirectUrl);
    } else {
      this.auth.initiateRegisterState();
    }
  }

  register(data: AuthRegisterCredentials) {
    this.auth.registerDispatch(data);
  }
}
