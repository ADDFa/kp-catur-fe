import { useEffect, useState } from "react"
import Card from "./Dashboard/Card"
import { get } from "../Functions/Api"
import Table from "./Dashboard/Table"

const Dashboard = () => {
    const [count, setCount] = useState<CountT>({
        incoming: 0,
        outgoing: 0,
        user: 0
    })
    const [incomingLetters, setIncomingLetters] = useState<ResponseT.DataT[]>()
    const [outgoingLetters, setOutgoingLetters] = useState<ResponseT.DataT[]>()

    useEffect(() => {
        const dateO = new Date()
        const year = dateO.getFullYear()
        const month = dateO.getMonth() + 1
        const date = dateO.getDate()
        const now = `${year}-${month}-${date}`

        const getData = async () => {
            const totalLetter = await get("letter/total")
            const totalUser = await get("user/total")
            if (totalLetter?.ok && totalUser?.ok) {
                const { incoming, outgoing } = totalLetter.result.data
                const user = totalUser.result.data
                setCount({
                    incoming,
                    outgoing,
                    user
                })
            }

            const getPath = (type: string) =>
                `letter/${type}?before=${now}&after=${now}`
            const incomingLetters = await get(getPath("incoming"))
            const outgoingLetters = await get(getPath("outgoing"))

            if (incomingLetters?.ok && outgoingLetters?.ok) {
                setIncomingLetters(incomingLetters?.result.data)
                setOutgoingLetters(outgoingLetters?.result.data)
            }
        }

        getData()
    }, [])

    const cards: CardT[] = [
        {
            title: "Surat Masuk",
            subTitle: "Jumlah Surat Masuk",
            to: "/letter/incoming",
            number: count.incoming
        },
        {
            title: "Surat Keluar",
            subTitle: "Jumlah Surat Keluar",
            to: "/letter/outgoing",
            number: count.outgoing
        },
        {
            title: "Pengguna",
            subTitle: "Jumlah Pengguna",
            to: "/user",
            number: count.user
        }
    ]

    return (
        <div className="row gap-3">
            {cards.map((card, i) => (
                <Card {...card} key={i}></Card>
            ))}

            <div className="mt-5">
                <h4 className="mb-5">Surat Masuk dan Surat Keluar Hari Ini</h4>

                <div className="row justify-content-between">
                    <Table>
                        {incomingLetters?.map(
                            ({ letter: { number, type } }, i) => (
                                <tr key={i}>
                                    <th scope="row">{++i}</th>
                                    <td>{type}</td>
                                    <td>{number}</td>
                                </tr>
                            )
                        )}
                    </Table>
                    <Table>
                        {outgoingLetters?.map(
                            ({ letter: { number, type } }, i) => (
                                <tr key={i}>
                                    <th scope="row">{++i}</th>
                                    <td>{type}</td>
                                    <td>{number}</td>
                                </tr>
                            )
                        )}
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
