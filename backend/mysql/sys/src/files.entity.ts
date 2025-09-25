import { BaseEntity } from '../../common';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Users } from '../../user';

export enum FileType {
  /* 头像 */
  avatar = 'avatar',
  /* 背景 */
  background = 'background',
  /* 文件 */
  file = 'file',
}

@Entity()
export class Files extends BaseEntity<Files> {
  /* 分类 */
  @Column({ type: 'enum', enum: FileType, default: FileType.file }) type: FileType;

  /* 文件名 */
  @Column({ length: 100 }) name: string;

  /* 文件路径 */
  @Column({ length: 200 }) path: string;

  /* 文件大小 */
  @Column({ type: 'int' }) size: number;

  /* 文件格式 */
  @Column({ length: 50 }) format: string;

  /* md5 */
  @Column({ length: 100 }) md5: string;

  /* 哈希 */
  @Column({ length: 100 }) hash: string;

  /* 引用 */
  @Column({ length: 100 }) ref: string;

  /* 用户 */
  @ManyToOne(() => Users) uid: Users;
}
