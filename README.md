# Joy of Coding public website

## Jekyll build

The site is now built using Jekyll. It still uses a fair amount of plain html instead of trying to do
everything in Markdown. The rationale is to have full control, while still leveraging Jekyll to make 
recurring things like headers, footers and menu much easier to deal with.

We don't let Github build the Jekyll site, meaning we run Jekyll locally using `make`, and commit
the resulting html in the `docs` folder. 

### Prerequisites
These instructions assume a Debian based sytem

Make sure the following packages are installed:
 
 `apt install ruby-bundler ruby-dev build-essential npm`
 
Then just run `make`, which should install everything needed and pop up a browser window.

## Sites for previous years

[http://joyofcoding.org](http://joyofcoding.org) has had a new website, each year 2013-2017.
Each year’s website is now a static website in a sub-directory, including those generated with a site-builder, such as 2017 which was generated using Hugo (whose configuration was removed by an earlier commit).

From 2018 onwards, all URL paths except `/index.html` shall start with a year directory prefix, so that no URLs break when the home page is updated to a new year’s website.

## Joy of Coding 2018

The website for 2018 will probably be hand-coded static HTML and CSS, without JavaScript.
The rationale for this choice is that there is too little content and too few changes over time to justify the development and maintenance effort of using any kind of framework or sitebuilder.
For the CSS, flexbox layout’s browser support is good enough to make a CSS framework unecessary.
