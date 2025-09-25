import { Column, Entity, ManyToMany, Tree, TreeChildren, TreeParent } from 'typeorm';
import { ArticleVersion } from './articleVersion.entity';
import { BaseEntity, BaseState } from '../../common';

@Entity()
@Tree('closure-table')
export class Category extends BaseEntity<Category> {
  /* 父级 */
  @TreeParent() parent: Category;

  /* 子级 */
  @TreeChildren() children: Category[];

  /* 标识 */
  @Column({ length: 50 }) keys: string;

  /* 名称 */
  @Column({ length: 50 }) name: string;

  /* 描述 */
  @Column({ length: 100 }) desc: string;

  /* 状态 */
  @Column({ type: 'enum', enum: BaseState }) status: BaseState;

  /* 文章 */
  @ManyToMany(() => ArticleVersion, (articleVersion) => articleVersion.categories) articles: ArticleVersion;
}
