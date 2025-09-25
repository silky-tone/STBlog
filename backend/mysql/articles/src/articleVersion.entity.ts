import { Column, ManyToMany, ManyToOne } from 'typeorm';
import { Articles } from './articles.entity';
import { Category } from './category.entity';
import { BaseEntity } from '../../common';
import { Tags } from './tags.entity';

export class ArticleVersion extends BaseEntity<ArticleVersion> {
  /* 标题 */
  @Column() title: string;

  /* 版本 */
  @Column() version: number;

  /* 内容 */
  @Column({ type: 'text' }) content: string;

  /* 是否草稿 */
  @Column({ default: true }) is_draft: boolean;

  /* 标签 */
  @ManyToMany(() => Tags, (tags) => tags.articles) tags: Tags[];

  /* 文章 */
  @ManyToOne(() => Articles, (article) => article.versions) article: Articles;

  /* 分类 */
  @ManyToMany(() => Category, (category) => category.articles) categories: Category[];
}
