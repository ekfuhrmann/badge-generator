# For The Badge Generator
[![forthebadge](https://forthebadge.com/images/badges/fuck-it-ship-it.svg)](https://forthebadge.com)

## General
**NOTE:** This repository simply builds the production code which then needs to be added to the [For The Badge](https://github.com/BraveUX/for-the-badge) project in order to render. 

Move the `production` built `dist` *files* into the `src/generator` directory found [here](https://github.com/BraveUX/for-the-badge).

## Setup

#### **Initial Setup:**
```command
$ yarn install
```

#### **Development:**
```command
$ yarn dev
```

#### **Production:**
```command
$ yarn build
```


## Important
The **Copy Markdown** output is in Base64 so as to not need the badge to be hosted anywhere. This unfortunately means that it will not render in many markdown programs due to security issues, [though there have been numerous](https://github.com/github/markup/issues/270) [submissions to account for this](https://github.com/gjtorikian/html-pipeline/pull/227). Nonetheless, should you wish to include one of these badges in your own markdown where it fails to support Base64, I suggest you download the badge, and then upload it to the project you wish for it to render in. It's a minor inconvenience, but it sure is better than nothing.

Not good enough? Well you could also [submit a pull request](https://github.com/BraveUX/for-the-badge#contributing) for the badge to be hosted on our [For The Badge](https://forthebadge.com/) site.

## About
[For The Badge](https://forthebadge.com/) was originally developed as a knock on repository badges, but over time and as more users discovered our rendition of badges, it became something more than that.

Over the years, hundreds of people have submitted badge requests and it was becaming increasingly difficult to play curator, as well as ensure that the level of detail we expect for our badges at [Brave UX](https://www.braveux.com) was being met.

The original plan up to this point had been to strictly define a ruleset for submitting a badge, but as anyone who has attempted to do so can attest, there are a lot of things to consider and we don't expect everyone to have an Adobe license, let alone have working knowledge of how to operate within it to meet the expectations we set forth. As such, I wanted to come up with some form of automating the process in order to better meet the needs of the various users who really like the style of these badges, while not having such a high bar for submission.

As such, the [For The Badge Generator](https://forthebadge.com/generator) was born!

## Challenges
### Embedding a font
Probably biggest of all of the various challenges associated with this project was that our badges do not make use of a generic font like many badges across the web do. This meant that we could **not** use an SVG font as the typeface would need to be loaded locally on each users computer, but rather come up with a way to outline our typeface so as to work in an SVG.

> Slight aside here, I did *try* all different approaches for embedding a font, but the individual badge file size bloating did not justify the ease of use.

In order to achieve this, I leveraged the fantastic [opentype.js](https://opentype.js.org/) library which allows us to isolate the paths of the typeface glyphs, converting the typography from a `text` based element, into an SVG path.

### Adding the proper letter spacing
While [opentype.js](https://opentype.js.org/) resolved the conversion of font to path, it doesn't offer a whole lot in the way of font styling and our badges make use of a generous amount of letter spacing. To solve for this, I identified each glyph by breaking down the path data and parsing out each letter. The method I used for parsing letters was identifying the `M` type, which essentially is when a new path is created within a glyph. Unfortunately some letters, such as `O` have multiple `M` types due to having an external and internal path, so in addition to identifying each `M` type, I also tested it against the prior `M` type position to make sure it was far enough away to indicate the start of a new glyph.

While that mostly worked, it didn't solve the problem 100% since the typefaces we use are not monospaced, meaning that the space from an `I` glyph to the next glyph could be less than the space between an interior `A` path from the exterior `A` path. After trying a whole bunch of hacks to solve for this, the easiest thing I came up with was to inject a space between each glyph before having [opentype.js](https://opentype.js.org/) parse out the path data. Once that was done, I could comfortably identify when a new glyph started by simply checking the space between `M` types.

At this point, all that was left to do was to adjust the spacing between each glyph to better match our intended badge letter-spacing.

## Future TODO's
  * Add support for badge icons
  * Figure out a fix for embedding badges into markdown without uploading the svg
