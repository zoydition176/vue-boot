export interface userInfo {
  username: string;
  password: string;
  nickname: string;
  address: string;
  email: string;
  phone: string;
  avatarUrl: string;
}

export interface routeTabs{
  name: string;
  fullPath: string;
  title: string;
  isHidden?: boolean;
  isKeepAlive?: boolean;
  isActive?: boolean;
  isAffix?: boolean;
}
