export default async function Page() {

    const data = await fetch('https://www.duolingo.com/2017-06-30/users?username=DiegoNaneve')

    const duoling:any = await data.json()

    const duo = duoling.users[0]
    console.log(duoling.users[0])
    return (
        <div>

            <p>Usuário: {duo.username}</p>
            <p>Ofensivas: {duo.streak}</p>
            <p>curso: {duo.courses[0].title}</p>
            <p>Experincia: {duo.courses[0].xp}</p>

        </div>
    )

}