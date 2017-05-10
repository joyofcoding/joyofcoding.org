# JoC 2017 website

Made with the [Hugo](https://gohugo.io) static site generator.
Kindly hosted by Github.


## Project overview

  * `themes/joyofcoding/`
    * `archetypes/` — Scaffold for new entries (only `speaker` for now) are defined in this folder.
    * `layouts/` — All templates are found here.
    * `static/` — Contains all static resources like images, web fonts and JS.
    * `theme.toml` — The description of the theme.
  * `content/` — Contains the "Hugo managed" content (some content, like the homepage, goes straight into the HTML).
  * `docs/` — As per convention of Github Pages this folder contains the generated files ready to be served.
    * `201?*/` — These dirs contain the websites of previous editions.
  * `README.md` — This file.
  * `config.toml` — Hugo's configuration file.


## Generating

If you made changes to the content or the themes, you must re-generate the site. Make sure you have Hugo installed and simply run the `hugo` command from the root of the project.

After generating you may want to update the sym links from the `docs/` folder to the respective folders containing the sites from previous years. The `update-old-site-links.sh` script takes care of that.

For development Hugo offers a built in server (that uses BrowserSync to automatically reload the page when you save a file). To start this server run `hugo server -v`.


## License

The code is MIT licensed. All images belong to their respecive owners. Any code that is not MIT licesed is marked as such.

