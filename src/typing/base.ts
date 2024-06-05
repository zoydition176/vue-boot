export interface userInfo {
  id?: number;
  username: string;
  password?: string;
  nickname: string;
  address: string;
  email: string;
  phone: string;
  avatarUrl: string;
  role: number;
}

export interface routeTabs {
  name: string;
  fullPath: string;
  title: string;
  isHidden?: boolean;
  isKeepAlive?: boolean;
  isActive?: boolean;
  isAffix?: boolean;
}

export interface menuTypes {
  path: string;
  name: string;
  component?: string | (() => Promise<unknown>);
  redirect?: string;
  meta: any;
  children?: menuTypes[];
  symbol?: string;
}
