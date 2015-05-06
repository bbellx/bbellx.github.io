---
title: Responsive SASS Blocks
collection: posts
date: 2015-03-16
template: post.html

seo-title: Responsive SASS Blocks
seo-description:

snippet: Post snippet text
featured-image: //placehold.it/500x300
---

## Responsive SASS Blocks

>Blockquote sample

Text example

* unordered list example
* another list item

```css_example
// ---------------------------------------------------------------------
// Blocks Helpers
// ---------------------------------------------------------------------

// Blocks Configuration Variables
$blocks-WIDTH: 960 !default; // Viewport width for this breakpoint in pixels (unitless)
$blocks-GUTTER_WIDTH: 12 !default; // Gutter width in pixels (unitless)
// A SASS list of blocks variations to create (number of blocks in each row)
// If none, set this to "null"
$blocks-ITERATIONS: null !default;

// Blocks Calculations
@if unitless($blocks-GUTTER_WIDTH) and ($blocks-GUTTER_WIDTH > 0) {
    $blocks-GUTTER: percentage($blocks-GUTTER_WIDTH / $blocks-WIDTH);
} @else {
    @warn "The value for variable $blocks-GUTTER_WIDTH must be unitless and/or not negative. Setting to 0 instead.";
    $blocks-GUTTER: 0;
}

// Blocks generator
//
// @param {Integer} $n number of blocks
// @param {Integer} $g gutter width (passed in as a percentage)
@mixin blocks($n, $g) {
    width: (100% - ($n * $g)) / $n;
}
```