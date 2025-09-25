import { BaseEntity } from '../../common';
import { Column, Entity } from 'typeorm';

@Entity()
export class Logs extends BaseEntity<Logs> {
  /* 组 */
  @Column({ length: 50 }) group: string;

  /* 名称 */
  @Column({ length: 50 }) name: string;

  /* 文本 */
  @Column({ length: 50 }) text: string;

  /* 等级 */
  @Column({ length: 50 }) level: string;

  /* 全部数据 */
  @Column({ type: 'text' }) data: string;
}
