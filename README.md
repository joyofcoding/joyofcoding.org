# Joy of Coding public web site

[http://joyofcoding.org](http://joyofcoding.org) has had a new web site, each year 2013-2017.
Each year’s web site is now a static web site in a sub-directory, including those generated with a site-builder, such as 2017 which was generated using Hugo (whose configuration was removed by an earlier commit).

From 2018 onwards, all URL paths except `/index.html` shall start with a year directory prefix, so that no URLs break when the home page is updated to a new year’s web site.

## Joy of Coding 2018

The web site for 2018 will probably be hand-coded static HTML and CSS, without JavaScript.
The rationale for this choice is that there is too little content and too few changes over time to justify the development and maintenance effort of using any kind of framework or sitebuilder.
For the CSS, flexbox layout’s browser support is good enough to make a CSS framework unecessary.
