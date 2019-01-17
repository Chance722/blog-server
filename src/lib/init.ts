import tab from './tab'
import mysql from './mysql'

for (const key of Object.keys(tab)) {
  mysql.createTable(tab[key]).then(res => {
    console.log(`lib/init createTable ${tab[key]} successed`)
  }).catch(err => {
    // console.error(`lib/init createTable ${tab[key]} failed`)
    console.error(err)
  })
}
