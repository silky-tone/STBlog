import { BaseEntity, BaseState } from '../../common';
import { Column, Entity } from 'typeorm';

@Entity()
export class FriendLink extends BaseEntity<FriendLink> {
  /* 名称 */
  @Column({ length: 50 }) name: string;

  /* 链接 */
  @Column({ length: 200 }) url: string;

  /* 排序 */
  @Column({ default: 0 }) order: number;

  /* logo */
  @Column({ nullable: true }) logo: string;

  /* 描述 */
  @Column({ nullable: true }) description: string;

  /* 状态 */
  @Column({ type: 'enum', enum: BaseState, default: BaseState.Enable }) status: BaseState;
}
