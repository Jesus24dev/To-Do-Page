const mysql = require ('mysql')

class DataBase {
    host;
    user;
    password;
    database
    
    //Agrego los datos de la base de datos
    constructor(host,user,password,database){
        this.host = host
        this.user = user
        this.password = password
        this.database = database
    }

//Se crea la conexion a la base de datos
    newConnection(){
        return mysql.createConnection({
            host: this.host,
            user: this.user,
            passwoord: this.password,
            database: this.database
        })
    }

    //Comprueba que exista la conexion
    checkConnection(){
         this.newConnection().connect((error) => {
            error ? console.log('Error al conectar') : console.log('Conectado exitosamente')
        }) 
    }

    //Agregar a la base de datos
    insertQuery(table, fields, data) {
        this.newConnection().query( `INSERT INTO ${table} (${fields}) VALUES ?`, [data], (error) => {
            if (error) {
                console.log(error)
            } else {
                console.log('datos guardados')
            }
    });

      }

    //Cargar datos de la base de datos
    async selectQuery(fields, table, where, data){
        try {
            const resultado = await new Promise ((resolve, reject) => {
                    this.newConnection().query(`SELECT ${fields} from ${table} WHERE ${where} = ? `, data, (error, results) => {    
                        if(error){
                            reject(error)
                        } else {
                            resolve(results)
                        }
                    })
                })
                return resultado
            } catch(error){
                console.log('sida')
            }
    }
    //actualizar datos de la base de datos
    updateQuery(table, field, change, where, name){
        this.newConnection().query(`UPDATE ${table} SET ${field} = ? WHERE ${where} = ? `, [change, name], (error) => {
            error ? console.log('Error al actualizar') : console.log('Datos actualizados')
        })
    }

    //Cerrar la conexion a la base de datos
    closeConnection(){
        this.newConnection().end((error) => {
            error ? console.log('Error al cerrar conexion') : console.log('Conexion cerrada exitosamente')
        })
    }
}

module.exports = DataBase







