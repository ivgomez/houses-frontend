import axios, { AxiosRequestConfig } from 'axios';
import { get } from 'lodash';
import qs from 'qs';
import cookies from 'js-cookie';
import { API_URL } from '../constants';

const isBrowser = typeof window !== 'undefined';

enum Endpoint {
  'Login' = '/auth',
}

const ENCODED_FORM_HEADERS = {
  'Content-Type': 'application/x-www-form-urlencoded',
};

interface LoginParams {
  readonly password: string;
  readonly username: string;
}

interface RequestResponse {
  error: any;
  data: any;
}

interface LoginResponse extends RequestResponse {
  data: {
    ok: boolean;
  };
}

export async function login(params: LoginParams): Promise<LoginResponse> {
  const formattedParams = qs.stringify({ ...params, grant_type: 'password' });

  const options: AxiosRequestConfig = {
    method: 'POST',
    headers: ENCODED_FORM_HEADERS,
    data: formattedParams,
    url: Endpoint.Login,
    baseURL: API_URL,
  };

  try {
    const { data } = await axios(options);
    const { access_token: token, expires_in: expires } = data;
    cookies.set('token', token, { expires });
    return { data: { ok: true }, error: {} };
  } catch (error) {
    const desc = get(error, 'response.data.error_description', 'server error');
    return { error: desc, data: { ok: false } };
  }
}
