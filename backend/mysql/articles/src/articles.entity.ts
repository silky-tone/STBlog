import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ArticleVersion } from './articleVersion.entity';
import { Comments } from './comments.entity';
import { BaseEntity } from '../../common';
import { Users } from '../../user';

@Entity()
export class Articles extends BaseEntity<Articles> {
  /* 点赞数 */
  @Column({ default: 0 }) likes: number;

  /* 浏览数 */
  @Column({ default: 0 }) views: number;

  /* 封面 */
  @Column({ nullable: true }) cover: string;

  /* 是否草稿 */
  @Column({ default: true }) is_draft: boolean;

  /* 当前版本 */
  @Column({ default: 1 }) current_version: number;

  /* 是否发布 */
  @Column({ default: false }) is_published: boolean;

  /* 是否允许评论 */
  @Column({ default: true }) allow_comment: boolean;

  /* 发布时间 */
  @Column({ type: 'datetime', nullable: true }) published_at: Date;

  /* 用户 */
  @ManyToOne(() => Users, (users) => users.articles) uid: Users;

  /* 评论 */
  @OneToMany(() => Comments, (comments) => comments.article) comments: Comments[];

  /* 版本 */
  @OneToMany(() => ArticleVersion, (version) => version.article) versions: ArticleVersion[];
}
