const { relModel, helper } = require('thinkorm')

export default class extends relModel {
  modelName: string
  safe: boolean
  fields: object
  validations: object
  relations: object
  init () {
    this.modelName = 'user'
    this.safe = false
    this.fields = {
      id: {
        type: 'integer',
        pk: true
      },
      name: {
        type: 'string',
        defaults: '',
      },
    }
    this.validations = {
      name: {
        method: 'ALL',
        valid: ['required', 'length'],
        length_args: 6,
        msg: {
          required: '用户名必填',
          length: '用户名长度必须大于6'
        }
      }
    }
    this.relations = {}
  }
}