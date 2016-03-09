scripts
=======

The fenomenal [`stack`](http://haskellstack.org) build tool is used.

Once you have `stack` installed you can simply install all requirements
with the following command (executed from the directory this REAMDE is in).

```bash
stack build
```

## sync-list-from-table

Run the `stack exec sync-list-from-table` script with:

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

