import knex from "knex"

const conectarse = () => {
    return knex({
        client: 'mysql',
        connection: {
            user: 'root',
            password: '',
            server: 'localhost',
            port: 3306,
            database: 'proyecto_pruebas'
        }
    })
}

export default class {

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