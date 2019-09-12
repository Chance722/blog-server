import { Model, relModel, helper } from 'thinkorm'
import config from '../../config'

class AdminModel extends relModel {
  modelName: string
  safe: boolean
  fields: object
  validations: object
  relations: object
  // add: (params: any) => any
  constructor (...args) {
    super(...args)
  }
  init () {
    this.modelName = 'admin'
    this.safe = false
    this.fields = {
      id: {
        type: 'integer',
        pk: true,
      },
      name: {
        type: 'string',
        required: true,
        defaults: '',
      },
      pwd: {
        type: 'string',
        required: true,
        defaults: '',
      },
      avatar: {
        type: 'string',
        defaults: '',
      },
      token: {
        type: 'string',
        defaults: '',
      },
      signature: {
        type: 'string',
        defaults: '',
      },
      hobies: {
        type: 'string',
        defaults: '',
      },
      skills: {
        type: 'string',
        defaults: '',
      },
      address: {
        type: 'string',
        defaults: '',
      },
      self_description: {
        type: 'string',
        defaults: '',
      },
      blog_title: {
        type: 'string',
        defaults: '',
      },
      blog_keywords: {
        type: 'string',
        defaults: '',
      },
      blog_description: {
        type: 'string',
        defaults: '',
      },
      email: {
        type: 'string',
        defaults: '',
      },
      icp_numbers: {
        type: 'string',
        defaults: '',
      },
      reg_time: {
        type: 'integer',
        defaults: 0,
      },
      last_login_time: {
        type: 'integer',
        defaults: 0,
      },
    }
    this.validations = {
      pwd: {
        method: 'ALL',
        valid: ['required', 'length'],
        length_args: 6,
        msg: {
          required: '密码不能为空',
          length: '密码长度必须大于6'
        }
      }
    }
    this.relations = {}
  }
}

const adminModel = new AdminModel({
  db_type: 'mysql',
  db_host: config.MYSQL.HOST,
  db_port: config.MYSQL.PORT,
  db_name: config.MYSQL.DATABASE,
  db_user: config.MYSQL.USERNAME,
  db_pwd: config.MYSQL.PASSWORD
})

export default adminModel
