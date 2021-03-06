import { graphql, Link } from "gatsby"
import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/seo"

// SitePageContext로부터 context를 이용해 전달한 값들의 type을 얻을 수 있다.

const Category = ({ data, location, pageContext }) => {
  const { title } = data.site.siteMetadata
  const { category } = pageContext // gatsby-node.js의 createPage에서 넣어준 카테고리 이름.
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${totalCount === 1 ? "" : "s"
    } in "${category}"`

  return (
    <div className="category-page">
      <Layout location={location} title={title}>
        <SEO title={title} />
        <h1 className="header">{tagHeader}</h1>
        <ul>
          {/* 각 카테고리에 해당하는 포스트의 목록을 출력한다. */}
          {edges.map(({ node }) => {
            const { slug } = node.fields
            const { title } = node.frontmatter
            return (
              <li key={slug}>
                <Link to={slug}>{title}</Link>
              </li>
            )
          })}
        </ul>
        <Link to="/">Go back to the homepage</Link>
      </Layout>
    </div>
  )
}

export default Category

// 쿼리의 argument인 $category는 page context로 전달 받는다.
export const pageQuery = graphql`
  query Category($category: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { in: [$category] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`