# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"
# pin "phaser", to: "https://ga.jspm.io/npm:phaser@3.87.0/dist/phaser.js"
pin "phaser" # @3.87.0
pin "process" # @2.1.0
