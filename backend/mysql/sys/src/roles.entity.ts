import { Column, Entity, Index, ManyToMany, OneToOne } from 'typeorm';
import { BaseEntity, BaseState } from '../../common';
import { Menus } from './menus.entity';
import { Users } from '../../user';

@Entity()
@Index('index', ['key'], { unique: false })
export class Roles extends BaseEntity<Roles> {
  /* 名称 */
  @Column({ length: 50 }) name: string;

  /* 说明 */
  @Column({ length: 50, nullable: true }) desc: string;

  /* 软删除 */
  @Column({ type: 'boolean', default: false }) deleted: boolean;

  /* 状态 */
  @Column({ type: 'enum', enum: BaseState, default: BaseState.Enable }) status: BaseState;

  /* 用户 */
  @OneToOne(() => Users, (user) => user.role) uid: Users;

  /* 菜单 */
  @ManyToMany(() => Menus, (menu) => menu.role) menu: Menus[];
}
