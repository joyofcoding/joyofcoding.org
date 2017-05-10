scripts
=======

The fenomenal [`stack`](http://haskellstack.org) build tool is used.

Once you have `stack` installed you can simply install all requirements
with the following command (executed from the directory this REAMDE is in).

```bash
stack build
```

## sync-list-from-table

Run the script with:

```bash
stack exec sync-list-from-table
```

This syncs the information in the `<table class="schedule">` to the
`<ol class="schedule">` that are found in the file located at
`../schedule.html`. The resulting HTML document is printed to the
standard out. Write it back to the original file with the following command.

```bash
stack exec sync-list-from-table > schedule.html
mv schedule.html ..
```

## csv-to-html-pages

Run the script with:

```bash
stack exec csv-to-html-pages
```

This uses the `.csv` file in this directory for generate a bunch of `.html`
files, also in this directory.

The `.csv` file can be obtained by downloading it from the Google Speadsheet:
`File > Download as > .csv`.

The `.html` files may be moved to `../speakers` with:

```bash
mv *.html ../speakers
```

