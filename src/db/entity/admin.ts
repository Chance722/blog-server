import {Entity, Column, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class Admin {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
      type: 'varchar',
      length: 60,
      default: '',
      comment: '用户名',
    })
    name: string

    @Column({
      type: 'varchar',
      length: 60,
      default: '',
      comment: '密码',
    })
    pwd: string

    @Column({
      type: 'varchar',
      length: 200,
      nullable: true,
      comment: '头像',
    })
    avatar: string

    @Column({
      type: 'varchar',
      length: 200,
      nullable: true,
      comment: '凭证',
    })
    token: string

    @Column({
      type: 'varchar',
      length: 200,
      nullable: true,
      comment: '签名',
    })
    signature: string

    @Column({
      type: 'varchar',
      length: 200,
      nullable: true,
      comment: '爱好',
    })
    hobies: string

    @Column({
      type: 'varchar',
      length: 200,
      nullable: true,
      comment: '技能',
    })
    skills: string

    @Column({
      type: 'varchar',
      length: 60,
      nullable: true,
      comment: '地址',
    })
    address: string

    @Column({
      type: 'varchar',
      length: 200,
      nullable: true,
      comment: '用户描述',
    })
    self_description: string

    @Column({
      type: 'varchar',
      length: 60,
      nullable: true,
      comment: '站点标题',
    })
    blog_title: string

    @Column({
      type: 'varchar',
      length: 60,
      nullable: true,
      comment: '站点关键字',
    })
    blog_keywords: string

    @Column({
      type: 'varchar',
      length: 200,
      nullable: true,
      comment: '站点描述',
    })
    blog_description: string

    @Column({
      type: 'varchar',
      length: 60,
      nullable: true,
      comment: '邮箱',
    })
    email: string

    @Column({
      type: 'varchar',
      length: 60,
      nullable: true,
      comment: '备案号',
    })
    icp_numbers: string

    @Column({
      type: 'bigint',
      nullable: true,
      comment: '注册时间',
    })
    reg_time: number

    @Column({
      type: 'bigint',
      nullable: true,
      comment: '最后登录时间',
    })
    last_login_time: number

}