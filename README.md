# [Periscope](https://periscope.net.au)

<img width="200" src="www/static/illustrations/anaesthetic_machine.svg" alt="" align="right" />

Periscope is a little web app designed to help perioperative doctors do their job quickly and safely. It exists because:

- We need to produce accurate, comprehensive assessments under time pressure
- Most digital tools are clunky and have few (if any) safety features
- When you get distracted with busywork:
  - It's easy to forget critical questions
  - It's easy to waste time looking thing up
  - It's easy to miss critical risks
  - Your job gets very frustrating

Periscope is here to help. The key features are:

- **Structured data entry** to help you get all the information you need, even when you’re a beginner
- **Embedded calculators** for a few risk scoring tools so you can keep your thinking cap on, instead of switching to MDCalc
- **Archiving functionality** to download a nice little Markdown summary of your appointment
- **A safety algorithm** that recognises high-risk features in your note and reminds you of them when it comes time to make a plan
- **Evidence-based management suggestions** with built-in references that keep you up to date with the latest evidence-based practices

The UI is rich with smarty-pants features that save you time:

- Identical fields that appear multiple times in your note are synchronised (so you don’t need to enter HbA1c more than one)
- A custom CMD-K bar helps you search and switch between fields quickly
- Keyboard shortcuts are baked in when the browser-defaults won’t cut it
- Auto-expanding text snippets (a la [TextExpander](https://textexpander.com/)) are included for commonly-typed phrases
- Anthropometric data is automatically piped into score calculators, so you don’t need to manually check most of the boxes
- A locally-implemented version of the [SORT Tool] (http://sortsurgery.com) is included to speed up calculation and save you to hassle of mode-switching

## Research

Periscope is in the early stages of implementing a new feature: automatic enrolment of eligible patients into clinical trial and audit databases. This is an area of active development, so comments and pull requests are welcome.

## Architecture

The first version of Periscope was a single static page hosted on Cloudflare Pages. Periscope needs to learn some secrets about the institutions that use it (e.g. their REDCap survey URLs, their inclusion criteria, etc) to facilitate the above-mentioned research, so it is being rearchitected as a Flask app. Watch this space.

## Open Source

Periscope is proudly released under the [MIT License](LICENSE.txt). This software was made with the help of these open source projects:

- [SORTWebCalc_dev](https://github.com/dannyjnwong/SORTWebCalc_dev) (MIT License)
- [fuzzysort](https://github.com/farzher/fuzzysort?tab=readme-ov-file) (MIT License)
- [Feather Icons](https://feathericons.com/), lightly customised (MIT License)

And these closed-source ones:

- [Monodraw](https://monodraw.helftone.com/) for the ASCII art
- [Flat UI Colors 2](https://flatuicolors.com/)
- [favicon.io](https://favicon.io/) for formatting the favicon
