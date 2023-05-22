import { useEffect, useState } from "react"
import Card from "./Components/Card"
import handleRequest from "../Functions/HandleRequest"
import { setSidebarActive } from "./Fractions/Sidebar"
import Table from "./Dashboard/Table"

const Dashboard = () => {
    const [count, setCount] = useState({
        incoming: 0,
        outgoing: 0,
        user: 0
    })
    const { user, incoming, outgoing } = count
    const [incomingLetters, setIncomingLetters] = useState<LetterT[]>([])
    const [outgoingLetters, setOutgoingLetters] = useState<LetterT[]>([])

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
        const currentDate = new Date()
        const now = `${currentDate.getFullYear()}-${
            currentDate.getMonth() + 1
        }-${currentDate.getDate()}`

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

            const incomingLetters = await handleRequest(
                "get",
                `letter/incoming?range=${now}_${now}`
            )
            const outGoingLetters = await handleRequest(
                "get",
                `letter/outgoing?range=${now}_${now}`
            )
            setIncomingLetters(incomingLetters?.result.data)
            setOutgoingLetters(outGoingLetters?.result.data)
        }

        getData()
    }, [])

    return (
        <>
            <div className="row gap-3">
                {cards.map((card, i) => {
                    return <Card key={i} {...card} />
                })}

                <div className="mt-5">
                    <h4 className="mb-5">
                        Surat Masuk dan Surat Keluar Hari Ini
                    </h4>

                    <div className="row justify-content-between">
                        <div className="col-md-6">
                            <Table letters={incomingLetters} />
                        </div>
                        <div className="col-md-6">
                            <Table letters={outgoingLetters} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
