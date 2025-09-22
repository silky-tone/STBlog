import { BaseEntity, Column, Entity, ManyToMany, Tree, TreeChildren, TreeParent } from 'typeorm';
import { BaseState } from '../../common';
import { Roles } from './roles.entity';

export enum MenuTypes {
  /* 菜单 */
  Menu = 'menu',
  /* 链接 */
  Link = 'link',
  /* 按钮 */
  Button = 'button',
  /* 权限 */
  Permission = 'permission',
  /* 开发中 */
  Develop = 'develop',
}

@Entity()
@Tree('closure-table')
export class Menus extends BaseEntity {
  /* 角色 */
  @ManyToMany(() => Roles, (role) => role.menu) role: Roles[];

  /* 父级 */
  @TreeParent() parent: Menus;

  /*子级 */
  @TreeChildren() children: Menus[];

  /* 标识 */
  @Column({ length: 50 }) key: string;

  /* 图标 */
  @Column({ length: 50 }) icon: string;

  /* 名称 */
  @Column({ length: 50 }) name: string;

  /* 内容 */
  @Column({ length: 200 }) value: string;

  /* 描述 */
  @Column({ length: 50 }) desc: string;

  /* 分类 */
  @Column({ type: 'enum', enum: MenuTypes, default: MenuTypes.Menu }) type: MenuTypes;

  /* 状态 */
  @Column({ type: 'enum', enum: BaseState, default: BaseState.Enable }) state: BaseState;
}
