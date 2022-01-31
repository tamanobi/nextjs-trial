import { getAllPostIds, getPostData } from '../../lib/posts'
import Layout from '../../components/layout'
import Date from '../../components/date'
import Head from 'next/head'
import styles from '../../styles/utils.module.css'

export default function Post({ postData }) {
    return (<Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <article>
            <h1 className={styles.headingX1}>{postData.title}</h1>
            <div className={styles.lightText}>
                <Date dateString={postData.date} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
    </Layout>)
}

export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)

    return {
        props: {
            postData
        }
    }
}
