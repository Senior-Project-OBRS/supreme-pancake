const { defineConfig } = require("cypress");

module.exports = defineConfig({
  videoCompression: false,
  env: {
    user_name: 'admin',
    user_password: 'password',

    customer_name: 'customer',
    customer_pass :'password',

    sales_name: 'salesperson',
    sales_pass: 'password',

    driver_name: 'driver',
    driver_pass:'password'
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
