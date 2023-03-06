module.exports = {
    plugins: [
        `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/soft-engine/components/`,
      },
    },

    //   {
    //     resolve: `gatsby-source-filesystem`,
    //     options: {
    //       name: `components`,
    //       // Location of your React components
    //       path: `src/soft-engine/components/`,
    //     },
    //   },
      // "Transforms" our "source" of React/JS files with the react-docgen CLI
      // and creates a GraphQL node with the output
      `gatsby-transformer-react-docgen`,
    ],
  }