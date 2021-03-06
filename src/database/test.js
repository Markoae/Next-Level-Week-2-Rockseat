const Database = require('./db')
const createProffy = require('./createProffy')

Database.then(async (db) => {
    //Inserir dados

    proffyValue = {
        name: 'Marco Aurelio',
        avatar: 'https://avatars0.githubusercontent.com/u/38302126?s=460&u=f87353b1a60d34910b2f29b31f06573449be60f7&v=4',
        whatsapp: '12341234',
        bio: 'Instrutor de Educação Física'
    }

    classValue = {
        subject: 1,
        cost:"20",
        //O proffy id virá pelo banco de dados
    }

    classScheduleValues = [
        //class_id virá pelo banco de dados, após cadastrarmos a class
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]

    await createProffy(db, { proffyValue, classValue, classScheduleValues })

    //Consultar dados inseridos

    //Todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")
    // console.log(selectedProffys)

    //Consultar as classes de um determinado professor e trazer junto os dados dele
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    // console.log(selectClassesAndProffys)

    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = 1
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "1300"
        AND class_schedule.time_to > "1300"
    `)

    // console.log(selectClassesSchedules)
})