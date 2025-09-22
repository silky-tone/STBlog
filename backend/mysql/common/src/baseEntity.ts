import { BaseEntity as BaseModule, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { EntityManager } from 'typeorm/entity-manager/EntityManager';

export enum BaseState {
  /* 启用 */
  Enable = 1,
  /* 禁用 */
  Disable = 0,
}

export abstract class BaseEntity<T extends BaseEntity<T>> extends BaseModule {
  /* 自增主键 */
  @PrimaryGeneratedColumn({ type: 'int' }) id: number;

  /* 创建时间 datetime */
  @CreateDateColumn({ type: 'datetime' }) createdAt: Date;

  /* 更新时间 datetime */
  @UpdateDateColumn({ type: 'datetime' }) updatedAt: Date;

  /* 事务 - 简化 */
  static transaction<T extends BaseEntity<T>>(this: { new (): T } & typeof BaseEntity, callback: (manager: EntityManager) => Promise<T>) {
    return this.getRepository().manager.transaction(callback);
  }
}
