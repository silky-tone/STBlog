import { Column, Entity, ManyToOne, Tree, TreeChildren, TreeParent } from 'typeorm';
import { Articles } from './articles.entity';
import { BaseEntity } from '../../common';
import { Users } from '../../user';

@Entity()
@Tree('closure-table')
export class Comments extends BaseEntity<Comments> {
  /* 父级 */
  @TreeParent() parent: Comments;

  /* 子级 */
  @TreeChildren() children: Comments[];

  /* 内容 */
  @Column('text') content: string;

  /* 是否删除 */
  @Column({ default: false }) is_remove: boolean;

  /* 是否审核 */
  @Column({ default: false }) is_approved: boolean;

  /* 用户 */
  @ManyToOne(() => Users, (users) => users.comments) uid: Users;

  /* 文章 */
  @ManyToOne(() => Articles, (articles) => articles.comments) article: Articles;
}
