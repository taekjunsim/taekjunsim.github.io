import * as React from "react"
import {useState, useEffect, useRef} from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Categories from '../components/category'

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  const [categoryName, setCategoryName] = useState();

  const viewport = useRef(null);
  const target = useRef(null);

  useEffect(() => {
    const handleIntersection = (entires) => {
      entires.forEach((entry) => {
        if (!entry.isIntersecting) {
          setCategoryName('category-comp-fixed')
        } else {
          setCategoryName('category-comp-absolute')
        }
      });
    };

    const io = new IntersectionObserver(handleIntersection);
  
    io.observe(target.current);

    return () => io.disconnect();
  }, [categoryName]) 


  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }
  
  return (
    <div className="custom-wrapper" ref={viewport}>
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <div className="category-wrapper" ref={target}>
          {/* <div className="category-comp-icon" >
            <StaticImage src="../images/hamburger.png" width={20} />
          </div> */}
          <Categories name={categoryName} />
        </div>
        <h4>Post</h4>
        <ol style={{ listStyle: `none` }}>
          {posts.map(post => {
            const title = post.frontmatter.title || post.fields.slug

            return (
              <li key={post.fields.slug}>
                <article
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <header>
                    <h5>
                      <Link to={post.fields.slug} itemProp="url">
                        <span itemProp="headline">{title}</span>
                      </Link>
                    </h5>
                    <small>{post.frontmatter.date}</small>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: post.frontmatter.description || post.excerpt,
                      }}
                      itemProp="description"
                    />
                  </section>
                </article>
              </li>
            )
          })}
        </ol>
      </Layout>
    </div>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
