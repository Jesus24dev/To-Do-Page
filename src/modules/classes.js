const sql = require ('./connection')

const connection = new sql('localhost', 'root', '', 'todopage')

class User {
    nickname;
    password;
    user_log 

    constructor(nickname, password){
        this.nickname = nickname
        this.password = password
    }

    async findData(nickname, password) {
        try {
            const result = await connection.selectQuery('*', 'user', 'NICKNAME', nickname);
    
            // Comprobar si existe
            if (result.length > 0) {
                if (result[0].PASSWORD == password){
                    this.user_log = true;
                    console.log('Inicio de sesion')
                } else {
                    console.log('Clave erronea')
                    this.user_log = false
                }
            } else {
                //Crear usuario en caso de no existir
                connection.insertQuery('user', ['NICKNAME', 'PASSWORD'], [[nickname, password]])
                console.log('Usuario registrado')
                this.user_log = true
            }
        } catch (error) {
            console.log('Hubo un error en la base de datos', error);
        }
    }

    //Confirma el inicio de sesion
    async logIn(){
        try{
            await this.findData(this.nickname, this.password)
            console.log(this.user_log)
        } catch (error) {
            console.log('Hubo un error en el inicio de sesion')
            throw error
        }
    }
    
    //Devuelve el logOut
    logOut(){
        this.user_log = false
    }

    //Devuelve el nickname del user
    getNickname(){
        return this.nickname
    }
}

class Task {
    user_nickname
    description
    status

    constructor(user_nickname, description, status) {
        this.user_nickname = user_nickname
        this.description = description
        this.status = status
    }

    //Agrega las tareas a la lista
    addTask(){
        connection.insertQuery('task', ['USER_NICKNAME', 'TASK_DESCRIPTION', 'TASK_STATUS'],[[this.user_nickname, this.description, this.status]])
        console.log('Tarea agregada a la lista de:',this.user_nickname)
    }

    //Actualiza el estado, si estan listas o no
    checkTask(check){
        if (check){
            connection.updateQuery('task', 'TASK_STATUS', true, 'TASK_DESCRIPTION', this.description)
        } else {
            connection.updateQuery('task', 'TASK_STATUS', false, 'TASK_DESCRIPTION', this.description)
        }
    }

    //Se me ocurrio esta idea mientras vi un ejemplo, asi no tienes que sufrir tanto. Eso si, no se si funciona.
    /*
    async displayTasks(page){
        try {
            const results = connection.selectQuery(['TASK_DESCRIPTION', 'TASK_STATUS'], 'task', 'NICKNAME', this.user_nickname)
                res.render(page, {results})
        } catch (error){
            throw error
        }
    }
    */
   //En caso de funcionar, podrias hacer algo similar con el login alla arriba.

   deleteTask(){
    connection.deleteQuery('task','TASK_DESCRIPTION', this.description)
   }
}

module.exports = {User, Task}

/*
const user1 = new User ('Jesus',123, true)
const task1 = new Task (user1.getNickname(), 'Aprender a programar', false)

user1.logIn()
task1.addTask()
task1.deleteTask()
*/





