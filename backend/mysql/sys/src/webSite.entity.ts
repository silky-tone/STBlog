import { BaseEntity, BaseState } from '../../common';
import { Column, Entity } from 'typeorm';

export enum WebSiteTypes {
  File = 'file',
  User = 'user',
  Role = 'role',
  Menu = 'menu',
  WebSite = 'website',
}

@Entity()
export class WebSite extends BaseEntity<WebSite> {
  /* 分类 */
  @Column({ type: 'enum', enum: WebSiteTypes, default: WebSiteTypes.WebSite }) type: WebSiteTypes;

  /* 类型 */
  @Column({ length: 100 }) name: string;

  /* 标识 */
  @Column({ length: 50 }) key: string;

  /* 名称 */
  @Column({ length: 50 }) value: string;

  /* 内容 */
  @Column({ type: 'text' }) content: string;

  /* 说明 */
  @Column({ length: 200, nullable: true }) desc: string;

  /* 备注 */
  @Column({ length: 200, nullable: true }) remark: string;

  /* 状态 */
  @Column({ type: 'enum', enum: BaseState, default: BaseState.Enable }) status: BaseState;
}
