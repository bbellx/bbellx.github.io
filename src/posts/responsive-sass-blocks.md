---
title: Responsive Sass Blocks
collection: posts
date: 2015-07-02
template: post.html

seo-title: Responsive Sass Blocks
seo-description:

snippet: Generate a responsive "blocks" object using Sass.
featured-image: //placehold.it/1000x400
---

Generate a responsive `.blocks` object using Sass. Optionally generate mixins to change the layout at different breakpoints.

<div class="renderSample">
    <ul class="blocks blocks_2up mix-blocks_3upMD">
        <li>
            <div class="swatch">Block</div>
        </li>
        <li>
            <div class="swatch">Block</div>
        </li>
        <li>
            <div class="swatch">Block</div>
        </li>
        <li>
            <div class="swatch">Block</div>
        </li>
        <li>
            <div class="swatch">Block</div>
        </li>
        <li>
            <div class="swatch">Block</div>
        </li>
    </ul>
</div>

## The Markup

The markup is a simple list. Include the base object `blocks`, then add an extension and/or mixins as needed to create the desired responsive layout.

```html
<ul class="blocks blocks_2up mix-blocks_3upMD">
    ...
</ul>
```

## The Sass

Start with a `_helpers.scss` file:

```scss
// ---------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------

// Define Variable Defaults

// Viewport width in pixels (unitless)
// This value is only used to generate the percentages
$blocks-WIDTH: 960 !default;

// Desired gutter width in pixels (unitless)
$blocks-GUTTER_WIDTH: 12 !default;

// A SASS list of variations to create (number of blocks in each row)
$blocks-ITERATIONS: null !default;

// Default calculated gutter
$blocks-GUTTER: 0 !default;

// Calculations

// Calculate the gutter
@if unitless($blocks-GUTTER_WIDTH) and ($blocks-GUTTER_WIDTH > 0) {
    $blocks-GUTTER: percentage($blocks-GUTTER_WIDTH / $blocks-WIDTH);
} @else {
    @warn "The value for $blocks-GUTTER_WIDTH must be unitless and greater than zero.";
    $blocks-GUTTER: 0;
}

// Blocks generator
//
// $n number of blocks (integer)
// $g gutter width (percentage)
@mixin blocks($n, $g) {
    width: (100% - ($n * $g)) / $n;
}

// Get parent container offset
//
// When dealing with percentage-based fluid containers and children,
// the parent offset is not simply the gutter of the children set as
// a negative margin on the parent. Because the width of the child
// elements plus the total number of gutters determine the total width
// of the parent object, a calculation must be made to derive the same
// offset for the parent and children.
//
// ((parent * gutter) / (parent - gutter)) * -1
//
// $g desired gutter width (percentage)
@function getParentOffset($g) {
    @if $g <= 0 {
        @return 0;
    } @else {
        @return ((100% * $g) / (100% - $g)) * -1;
    }
}
```

Next, import the `_helpers.scss` file into your object file after overriding the desired variables:

```scss
// ---------------------------------------------------------------------
// Blocks
// ---------------------------------------------------------------------

// Override defaults as desired
$blocks-ITERATIONS: 2, 3;

// Import calculation and function helpers
@import "_helpers";

.blocks {
    font-size: 0; // Remove whitespace between inline-block children
    margin-left: getParentOffset($blocks-GUTTER);
    margin-top: getParentOffset($blocks-GUTTER);
}

.blocks > * {
    display: inline-block;
    vertical-align: top;
    @include blocks(1, $blocks-GUTTER);
    margin-left: $blocks-GUTTER;
    margin-top: $blocks-GUTTER;
    font-size: 14px; // Reset font-size of children
}

@if $blocks-ITERATIONS {
    @for $i from 1 through length($blocks-ITERATIONS) {

        // Select an item by index from the iterations list
        $n: nth($blocks-ITERATIONS, $i);

        .blocks_#{$n}up > * {
            @include blocks($n, $blocks-GUTTER);
        }
    }
}
```

Optionally, extend across breakpoints to adjust the layout to better fit the viewport by resetting the variables and generating mixins:

```scss
// ---------------------------------------------------------------------
// Blocks (loaded at medium breakpoint)
// ---------------------------------------------------------------------

// Override variables as desired
$blocks-WIDTH: 600;
$blocks-GUTTER_WIDTH: 20;
$blocks-ITERATIONS: 2, 3;

// Import calculation and function helpers
@import "_helpers";

// Rebuild object with new measurements
.blocks {
    margin-left: getParentOffset($blocks-GUTTER);
    margin-top: getParentOffset($blocks-GUTTER);
}

.blocks > * {
    margin-left: $blocks-GUTTER;
    margin-top: $blocks-GUTTER;
}

@if $blocks-ITERATIONS {
    @for $i from 1 through length($blocks-ITERATIONS) {

        // Select an item by index from the iterations list
        $n: nth($blocks-ITERATIONS, $i);

        // Rebuild the object extensions with new measurements
        .blocks_#{$n}up > * {
            @include blocks($n, $blocks-GUTTER);
        }

        // Generate mixins to be applied at the breakpoint
        .mix-blocks_#{$n}upMD > * {
            @include blocks($n, $blocks-GUTTER);
        }
    }
}
```