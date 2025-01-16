// type Props 
import { UserProps } from "../types/user"

// componentes
import Search from "../components/Search"
import User from "../components/User"
import Loading from "../components/Loading"

import { useState, } from "react"

const Home = () => {

    const [user, setUser] = useState<UserProps | null>(null)
    const [error, setError] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const loadUser = async (username: string) => {
        try {
            setError(false)
            setLoading(true)

            const response = await fetch(`https://api.github.com/users/${username}`)
            const data = await response.json()

            if (response.status === 404) {
                setUser(null)
                setError(true)
                return
            }

            const { avatar_url, login, location, followers, following } = data

            const userData: UserProps = {
                avatar_url,
                login,
                location,
                followers,
                following
            }

            setUser(userData)
        }
        catch (error) {
            console.error(error)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Search loadUser={loadUser} />
            {loading ? (
                <Loading />
            ) : (
                <>
                    {user && <User {...user} />}
                    {error && <p>Usuário não encontrado</p>}
                </>
            )}

        </div>
    )
}

export default Home