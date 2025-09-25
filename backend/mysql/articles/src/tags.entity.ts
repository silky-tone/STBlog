import { ArticleVersion } from './articleVersion.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity, BaseState } from '../../common';

@Entity()
export class Tags extends BaseEntity<Tags> {
  /* 标识 */
  @Column({ length: 50 }) keys: string;

  /* 名称 */
  @Column({ length: 50 }) name: string;

  /* 描述 */
  @Column({ length: 100 }) desc: string;

  /* 状态 */
  @Column({ type: 'enum', enum: BaseState }) status: BaseState;

  /* 文章 */
  @ManyToMany(() => ArticleVersion, (articleVersion) => articleVersion.tags) articles: ArticleVersion;
}
