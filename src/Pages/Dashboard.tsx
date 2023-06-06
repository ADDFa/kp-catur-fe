import { useEffect, useState } from "react"
import { setSidebarActive } from "./Fractions/Sidebar"
import Card from "../Components/Card"
import { get } from "../Functions/Api"

const Dashboard = () => {
    const [count, setCount] = useState({
        incoming: 0,
        outgoing: 0,
        user: 0
    })

    const [incomingLetters, setIncomingLetters] = useState<LetterT[]>([])
    const [outgoingLetters, setOutgoingLetters] = useState<LetterT[]>([])

    useEffect(() => {
        const currentDate = new Date()
        const now = `${currentDate.getFullYear()}-${
            currentDate.getMonth() + 1
        }-${currentDate.getDate()}`

        async function getData() {
            const users = await get("user")
            const numberOfLetters = await get("number-of-letters")

            if (!numberOfLetters || !users) return
            setCount({
                user: users.result.data.length,
                ...numberOfLetters.result.data
            })

            const letterEndpoint = (type: string) =>
                `letter/outgoing?${type}=${now}_${now}`

            const incomingLetters = await get(letterEndpoint("incoming"))
            const outGoingLetters = await get(letterEndpoint("outgoing"))

            setIncomingLetters(incomingLetters?.result.data)
            setOutgoingLetters(outGoingLetters?.result.data)
        }

        getData()
    }, [])

    return (
        <div className="row gap-3">
            <Card
                {...{
                    title: "Surat Masuk",
                    subTitle: "Jumlah Surat Masuk",
                    href: "/letter/incoming",
                    number: count.incoming
                }}
            />
            <Card
                {...{
                    title: "Surat Keluar",
                    subTitle: "Jumlah Surat Keluar",
                    href: "/letter/outgoing",
                    linkProps: {
                        onClick: () => setSidebarActive("/letter/incoming")
                    },
                    number: count.outgoing
                }}
            />
            <Card
                {...{
                    title: "Pengguna",
                    subTitle: "Jumlah Pengguna",
                    href: "/user",
                    number: count.user
                }}
            />

            <div className="mt-5">
                <h4 className="mb-5">Surat Masuk dan Surat Keluar Hari Ini</h4>

                <div className="row justify-content-between">
                    {[incomingLetters, outgoingLetters].map((letters, i) => (
                        <div className="col-md-6" key={i}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">No</th>
                                        <th scope="col">Jenis Surat</th>
                                        <th scope="col">Nomor Surat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {letters.map((letter, i) => {
                                        const {
                                            letter_type,
                                            reference_number
                                        } = letter.letter

                                        return (
                                            <tr key={i}>
                                                <th scope="row">{++i}</th>
                                                <td>{letter_type}</td>
                                                <td>{reference_number}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
