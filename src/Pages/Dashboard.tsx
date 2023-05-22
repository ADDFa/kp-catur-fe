import { useEffect, useState } from "react"
import Card from "./Components/Card"
import handleRequest from "../Functions/HandleRequest"
import { setSidebarActive } from "./Fractions/Sidebar"

const Dashboard = () => {
    const [count, setCount] = useState({
        incoming: 0,
        outgoing: 0,
        user: 0
    })
    const { user, incoming, outgoing } = count

    const cards: CardT[] = [
        {
            title: "Surat Masuk",
            subTitle: "Jumlah Surat Masuk",
            href: "/letter/incoming",
            number: incoming
        },
        {
            title: "Surat Keluar",
            subTitle: "Jumlah Surat Keluar",
            href: "/letter/outgoing",
            linkProps: {
                onClick: () => setSidebarActive("/letter/incoming")
            },
            number: outgoing
        },
        {
            title: "Pengguna",
            subTitle: "Jumlah Pengguna",
            href: "/user",
            number: user
        }
    ]

    useEffect(() => {
        async function getData() {
            const users = await handleRequest("get", "user")
            const numberOfLetters = await handleRequest(
                "get",
                "number-of-letters"
            )
            if (!numberOfLetters || !users) return
            setCount({
                user: users.result.data.length,
                ...numberOfLetters.result.data
            })
        }

        getData()
    }, [])

    return (
        <>
            <div className="row gap-3">
                {count &&
                    cards.map((card, i) => {
                        return <Card key={i} {...card} />
                    })}
            </div>
        </>
    )
}

export default Dashboard
