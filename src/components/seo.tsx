import React from "react"
import { Helmet } from "react-helmet"

import useSiteMetadata from "Hooks/useSiteMetadata"
import type { MarkdownRemarkFrontmatter } from "Types/GraphQL"
import defaultOpenGraphImage from "../images/og-default.png"

const DEFAULT_LANG = "en"

type Meta = React.DetailedHTMLProps<
  React.MetaHTMLAttributes<HTMLMetaElement>,
  HTMLMetaElement
>[]

interface SEOProps extends Pick<MarkdownRemarkFrontmatter, "title" | "desc"> {
  image?: string
  meta?: Meta
}

const SEO: React.FC<SEOProps> = ({ title, desc = "", image }) => {
  const site = useSiteMetadata()
  const description = desc || site.description
  const ogImageUrl =
    site.siteUrl ?? "" + (image || (defaultOpenGraphImage as string))
  const googleContent = ["google-site-verification","b_TVIvamvnRinc4ExC5PfbMcjvAZiW6byJPFdTYDdj4"]

  return (
    <Helmet
      htmlAttributes={{ lang: site.lang ?? DEFAULT_LANG }}
      title={title ?? ""}
      titleTemplate={`%s | ${site.title}`}
      meta={
        [
          {
            name: "description",
            content: description,
          },
          {
            property: "og:title",
            content: title,
          },
          {
            property: "og:description",
            content: description,
          },
          {
            property: "og:type",
            content: "website",
          },
          {
            name: "twitter:card",
            content: "summary",
          },
          {
            name: "twitter:creator",
            content: site.author,
          },
          {
            name: "twitter:title",
            content: title,
          },
          {
            name: "twitter:description",
            content: description,
          },
          {
            property: "image",
            content: ogImageUrl,
          },
          {
            property: "og:image",
            content: ogImageUrl,
          },
          {
            property: "twitter:image",
            content: ogImageUrl,
          },
          {
            name: googleContent[0],
            content: googleContent[1],
          },
        ] as Meta
      }
    />
  )
}

export default SEO
