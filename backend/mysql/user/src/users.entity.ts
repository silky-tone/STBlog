import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from '../../common';
import { Roles } from '../../sys';

export enum UserState {
  /* 启用 */
  normal = 'normal',
  /* 禁用 */
  disable = 'disable',
}

@Entity()
export class Users extends BaseEntity<Users> {
  /* 昵称*/
  @Column({ length: 50 }) name: string;

  /* 邮箱 */
  @Column({ length: 100 }) email: string;

  /* 密码 */
  @Column({ length: 125 }) pass: string;

  /* 头像 */
  @Column({ length: 100 }) avatar: string;

  /* 超级管理员 */
  @Column({ default: false }) is_root: boolean;

  /* 验证 */
  @Column({ default: false }) is_verify: boolean;

  /* 登录ip */
  @Column({ length: 30, nullable: true }) loginIp: string;

  /* 登录时间 */
  @Column({ type: 'datetime', nullable: true }) loginTime: Date;

  /* 状态 */
  @Column({ type: 'enum', enum: UserState, default: UserState.normal }) state: UserState;

  /* 角色 */
  @OneToOne(() => Roles, (roles) => roles.uid) role: Roles;
}
