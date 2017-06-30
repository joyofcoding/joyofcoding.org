+++
type         = "speaker"
keynoteStart = "09:30"
keynoteEnd   = "10:10"
speakerImage = "extra_aisland_game.png"
name         = "AIsland"
title        = "AIsland"
slug         = "a-i-sland"
date         = "2017-05-07T20:01:07+02:00"
quote        = ""
bio          = "Dion van Dam created the AIsland Game as part of his graduation project, generously sponsored by Finalist."
+++

<br/>
<br/>

**By Dion van Dam**

**[⮩ API documentation on Github](https://github.com/mamersfo/aisland-doc)**

During the conference, the huge video wall will be running an AI programming challenge.
Code your own bot on your laptop and watch it compete with other people’s bots on the big screen.

AIsland is a turn-based strategy game for 2-8 bot players, entered for each round by their humans.
The winner of each round is the bot that successfully takes over the generated island landscape by removing the other players.

During each round, the bots have 500 ms for each turn to send a number of moves to the game server.
For each map location, a bot can choose among a dozen different moves to defend and expand its territory.

Human players participate by writing bots that use the game server’s API to send moves to the server based on the current state of the game map.
Java-based bots can use a supplied client, while bots in other languages can either use the HTTP/JSON API directly or first port the Java client (160 application LOC + 230 entity LOC).

The game server itself uses the Unity engine to implement the game front-end, and runs on a PC with a monster graphics card and 3 × HDMI outputs to drive the venue’s giant display.

We’ll publish detailed game rules and game server API specifications on the day of the event, and link from this page.
