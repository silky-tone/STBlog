import { Articles, ArticleVersion, Category, Comments, Tags } from './articles';
import { Files, FriendLink, Menus, Roles, WebSite } from './sys';
import { Logs } from './logger';
import { Users } from './user';

export const mysqlLoader = [Articles, ArticleVersion, Category, Comments, Tags, Logs, Files, FriendLink, Menus, Roles, WebSite, Users];

export * from './articles';
export * from './logger';
export * from './user';
export * from './sys';
