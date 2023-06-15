import knex from "knex"

const conectarse = () => {
    return knex({
        client: 'mysql',
        connection: {
            user: 'root',
            password: 'vanni',
            server: 'localhost',
            port: 3306,
            database: 'proyecto_pruebas'
        }
    })
}

export default class {

    insert = async function(post_params) {
        let db = conectarse();
        return await db.insert(post_params).into('users').then(() => {
            return true
        }).finally(() => {
            db.destroy()
        })
    }

    list = async function(get_params) {

        let db = conectarse();

        return await db.select([
            'u.id as id',
            'u.name as name',
            'u.age as age',
            'u.created as created'
        ])
        .from('users as u').finally(() => {
            db.destroy()
        })

    }

}