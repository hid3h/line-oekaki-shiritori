import "tailwindcss/tailwind.css"
import './style.css'

import Rails from 'rails-ujs';
Rails.start();

/** stimulus */
import { Application } from "stimulus"
import { definitionsFromContext } from "stimulus/webpack-helpers"

const application = Application.start()
const context = require.context("./controllers", true, /\.js$/)
application.load(definitionsFromContext(context))
/** stimulus */
