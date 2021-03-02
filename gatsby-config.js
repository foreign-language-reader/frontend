/* eslint camelcase: "off", global-require: "off" */

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const siteDomainName = process.env.DOMAIN_NAME;

module.exports = {
  siteMetadata: {
    title: `FluentLabs Reader`,
    description: `A reading app that combines the support of a textbook with the freedom of the internet.`,
    author: `Lucas Kjaero-Zhang`,
  },
  plugins: [
    `gatsby-plugin-typescript`,

    // SEO
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://www.fluentlabs.io`,
        stripQueryString: true,
      },
    },

    // CSS
    `gatsby-plugin-styled-components`,

    // Images
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `FluentLabs Reader - A reader for the internet`,
        short_name: `FluentLabs`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`,
      },
    },

    // Metrics
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
        // Puts tracking script in the head instead of the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
      },
    },

    // Data sources
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `product`,
        path: `${__dirname}/src/images/product`,
      },
    },
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: "gatsby-source-prismic",
      options: {
        repositoryName: "fluentlabs",
        linkResolver: () => (doc) => linkResolver(doc),
        schemas: {
          home_page: require("./custom_types/home_page.json"),
          navigation: require("./custom_types/navigation.json"),
        },
        lang: "*",
      },
    },

    // Performance
    `gatsby-plugin-offline`,

    // Deployment
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: siteDomainName,
        protocol: "https",
        hostname: siteDomainName,
      },
    },
  ],
};

const linkResolver = (doc) => "Dummy link";
