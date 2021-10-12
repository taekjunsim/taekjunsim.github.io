import { graphql, useStaticQuery, Link } from "gatsby"
import React from "react"

const Categories = (name) => {
  const classname = name;

  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___categories) {
          fieldValue
          totalCount
          edges {
            node {
              frontmatter {
                title
              }
            }
          }
          nodes {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  return (
      <div className={classname.name}>
        <h4>Category</h4>
        <ul className="category-flexBox">
          {data.allMarkdownRemark.group.map(category => {
            return (
            <li className="category-list" key={category.fieldValue}>
              <Link className="category-content" to={`/category/${category.fieldValue}`}>
                {category.fieldValue} ({category.totalCount})
              </Link>
            </li>
          )})}
        </ul>
      </div>
  )
}

export default Categories
