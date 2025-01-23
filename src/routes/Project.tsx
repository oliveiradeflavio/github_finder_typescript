import styles from "./Project.module.css"

import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"

// react-icons
import { MdStar, MdForkLeft } from 'react-icons/md'

// component
import Loading from "../components/Loading"

const Project = () => {

    // pegar o usuairo que foi passado na rota /repos/:logins
    const { login } = useParams()

    // loading
    const [loading, setLoading] = useState<boolean>(false)

    // pegar os repos do usuario que tem forks e starsgazes
    const [repos, setRepos] = useState([])

    type Repo = {
        id: number;
        name: string;
        description: string;
        language: string;
        forks: number;
        stargazers_count: number;
        html_url: string;
    };

    useEffect(() => {
        try {
            setLoading(true)

            fetch(`https://api.github.com/users/${login}/repos?sort=updated`)
                .then((response) => response.json())
                .then((data) => {
                    const filteredRepos = data.filter((repo: Repo) => repo.forks > 0 && repo.stargazers_count > 0)

                    // ordernar primeiros os repos com mais estrelas e forks
                    filteredRepos.sort((a: Repo, b: Repo) => {
                        return b.stargazers_count - a.stargazers_count
                    })

                    setRepos(filteredRepos)
                })
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [login])


    return (
        <div className={styles.repo_container}>

            <h2>Projetos do usuário: {login}</h2>

            {loading && <Loading />}

            <div className={styles.repo_list}>
                {/* mostrar os repos */}
                {/* se não tiver repos mostrar uma mensagem */}
                {repos.length === 0 && <p>Esse usuário não tem projetos com estrelas e forks</p>}
                {repos.map((repo: Repo) => (
                    <div className={styles.project}>
                        <div key={repo.id} className={styles.repo}>
                            <h2>{repo.name}</h2>
                            <p>{repo.description}</p>
                            <div className={styles.repo_info}>
                                <p>Linguagem: {repo.language}</p>
                                <p><MdForkLeft /> {repo.forks}</p>
                                <p>
                                    <MdStar />
                                    {repo.stargazers_count}
                                </p>
                            </div>
                            <div className={styles.repo_links}>
                                <Link to={repo.html_url} target="_blank" rel="noreferrer">Ver no GitHub</Link>
                            </div>
                        </div>
                    </div>

                ))}
                <div className={styles.back}>
                    {/* voltar home*/}
                    <Link to="/">Voltar</Link>
                </div>
            </div>
        </div>
    )
}

export default Project