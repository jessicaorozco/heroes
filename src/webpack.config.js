module.exports = {
    // ... other configuration
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'tslint-loader',
          enforce: 'pre',
          options: {
            emitErrors: true,
            failOnHint: true
          }
        }
      ]
    }
  };
  