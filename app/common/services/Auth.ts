import {Injectable} from 'angular2/core'
declare var Auth0: any;
declare var $: any;


@Injectable()
export class Auth {
  public lock: any;
  public auth0: any;
  public DB_CONNECTION: string;
  public AUTH0_DOMAIN = 'dharness.auth0.com';

  constructor() {
    let domain = 'dharness.auth0.com';
    let clientID = 'WzaZ0ltsaHT03Knycz4HyMn7beYMMM9j';
    this.DB_CONNECTION = 'babelot-db';

    this.auth0 = new Auth0({ domain, clientID });
  }

  get currentUser() { return localStorage.getItem('profile'); }

  signup(user, onFailure, onSuccess) {
    this.auth0.signup({
      // Don't display a popup to set an SSO cookie
      sso: false,
      auto_login: true,
      connection: this.DB_CONNECTION,
      email: user.email,
      password: user.password
    }, (err, profile, id_token) => {
      if (err) { return onFailure(err); }
      // successful signup, add the meta-data
      var user_metadata = { businessName: user.businessName };
      this._patchUser(profile.user_id, id_token, { user_metadata }, ()=> {
        onSuccess({ profile, id_token });
      }, onFailure);
    });
  }

  login() {}

  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
  }

  /** Adds metadata (businessName etc) to the user in auth0 db */
  private _patchUser(userId, id_token, data, onSuccess, onFailure) {
    var apiEndpoint = `https://${this.AUTH0_DOMAIN}/api/v2/`;

    $.ajax({
      method: 'patch',
      url: apiEndpoint + 'users/' + userId,
      dataType: 'json',
      headers: {'Authorization': `Bearer ${id_token}`},
      data: data,
      success: (profile) => { onSuccess(profile); },
      error: (err) => { onFailure(err); }
    });
  }
}
