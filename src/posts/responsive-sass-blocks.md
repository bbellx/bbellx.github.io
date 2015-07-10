---
title: Responsive Blocks Built with Sass
collection: posts
date: 2015-07-02
template: post.html

seo-title: Responsive Blocks Built with Sass
seo-description:

snippet: Generate a responsive "blocks" object using Sass.

image-featured: /assets/media/images/responsive-blocks-2000x800.gif
image-featured-alt: Responsive Sass blocks generator

image-snippet: /assets/media/images/responsive-blocks-640x320.gif
---

Generate a responsive `.blocks` object using Sass. Optionally generate mixins to change the layout at different breakpoints.

## Rendered Example

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

## Folder Structure

Use whatever folder structure you want. The example follows this structure:

```
// The folder structure

└── blocks
    ├── _blocks.scss
    ├── _blocks_md.scss
    └── _helpers.scss
```

## The Sass

Start with the `_helpers.scss` file:

### Object Helpers

```scss
// ---------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------

// Define Variable Defaults

// Viewport width in pixels (unitless)
// This value is only used to generate the percentages
$blocks-WIDTH: 960 !default;

// Desired gutter width in pixels (unitless)
// This value is only used to generate the percentages
$blocks-GUTTER_WIDTH: 12 !default;

// A comma-separated Sass list of variations to create (number of blocks in each row)
$blocks-ITERATIONS: null !default;

// Default calculated gutter
$blocks-GUTTER: 0 !default;

// Calculations

// Calculate the gutter percentage
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

### Define Base Object

Next, import the `_helpers.scss` file into your object file, `_blocks.scss`. Make sure to override any of the configuration variables above the `@import`:

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

### Extend the Object

Optionally, extend this object across breakpoints to adjust the layout at each viewport by resetting the variables and generating mixins. For example, load `_blocks_md.scss` using a media query at your medium breakpoint.

```scss
// ---------------------------------------------------------------------
// Blocks (loaded at medium breakpoint)
// ---------------------------------------------------------------------

// Override variables as desired
$blocks-WIDTH: 600;
$blocks-GUTTER_WIDTH: 20;
$blocks-ITERATIONS: 2, 3, 4;

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

## Compiled CSS

Once compiled by Sass, the resulting CSS will look like this:

```css
.blocks {
    font-size: 0;
    margin-left: -1.26582%;
    margin-top: -1.26582%;
}

.blocks > * {
    display: inline-block;
    vertical-align: top;
    width: 98.75%;
    margin-left: 1.25%;
    margin-top: 1.25%;
    font-size: 14px;
}

.blocks_2up > * {
    width: 48.75%;
}

.blocks_3up > * {
    width: 32.08333%;
}

@media screen and (min-width: 600px) {
    .blocks {
        margin-left: -3.44828%;
        margin-top: -3.44828%;
    }

    .blocks > * {
        margin-left: 3.33333%;
        margin-top: 3.33333%;
    }

    .blocks_2up > * {
        width: 46.66667%;
    }

    .mix-blocks_2upMD > * {
        width: 46.66667%;
    }

    .blocks_3up > * {
        width: 30%;
    }

    .mix-blocks_3upMD > * {
        width: 30%;
    }

    .blocks_4up > * {
        width: 21.66667%;
    }

    .mix-blocks_4upMD > * {
        width: 21.66667%;
    }
}
```