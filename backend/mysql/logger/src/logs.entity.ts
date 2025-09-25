import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../../common';

export enum LogLevel {
  VERBOSE = 'verbose',
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  FATAL = 'fatal',
}

export enum LogGroup {
  API = 'api',
  SYSTEM = 'system',
  SECURITY = 'security',
  BUSINESS = 'business',
  DATABASE = 'database',
}

@Entity()
@Index('idx_logs_level', ['level'], { unique: false })
@Index('idx_logs_group', ['group'], { unique: false })
@Index('idx_logs_created_at', ['createdAt'], { unique: false })
export class Logs extends BaseEntity<Logs> {
  /* 日志组 */
  @Column({ length: 50, default: LogGroup.SYSTEM }) group: string;

  /* 日志名称/标题 */
  @Column({ length: 100 }) name: string;

  /* 日志文本内容 */
  @Column({ type: 'text' }) text: string;

  /* 日志等级 */
  @Column({ length: 20, default: LogLevel.INFO }) level: string;

  /* 完整数据 */
  @Column({ type: 'longtext', nullable: true }) data: string;

  /* 请求IP */
  @Column({ length: 50, nullable: true }) ip: string;

  /* 用户ID */
  @Column({ type: 'int', nullable: true }) userId: number;

  /* 请求URL */
  @Column({ length: 500, nullable: true }) url: string;

  /* 用户代理 */
  @Column({ length: 500, nullable: true }) userAgent: string;

  /* 操作模块 */
  @Column({ length: 50, nullable: true }) module: string;

  /* 操作方法 */
  @Column({ length: 100, nullable: true }) method: string;
}
