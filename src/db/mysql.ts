import * as mysql from 'mysql'
import CONFIG from '../config'

const pool = mysql.createPool({
  host: CONFIG.MYSQL.HOST,
  user: CONFIG.MYSQL.USERNAME,
  password: CONFIG.MYSQL.PASSWORD,
  database: CONFIG.MYSQL.DATABASE
})

const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
}

const createTable = sql => {
  return query(sql, [])
}

module.exports = {
  createTable,
  query
}

// export default {
//   createTable,
//   query
// }
