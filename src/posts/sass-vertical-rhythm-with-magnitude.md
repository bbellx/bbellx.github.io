---
title: Sass Vertical Rhythm with Magnitude
collection: posts
date: 2015-08-28
template: post.html
seo-description:
snippet:
image-snippet:
---



## Rendered Example

<div class="renderSample">
    <div class="vr">
        <div class="swatch">vr</div>
    </div>
    <div class="vr_2n">
        <div class="swatch">vr_2n</div>
    </div>
    <div class="vr_3n">
        <div class="swatch">vr_3n</div>
    </div>
    <div class="vr_4n">
        <div class="swatch">vr_4n</div>
    </div>
    <div class="vr_5n">
        <div class="swatch">vr_5n</div>
    </div>
    <div class="vr_6n">
        <div class="swatch">vr_6n</div>
    </div>
</div>

```scss
// ---------------------------------------------------------------------
// Vertical Rhythm
// ---------------------------------------------------------------------
$vr-BASE: 1 !default; // (unitless) Base measurement
$vr-MAGNITUDE: 1 !default; // (unitless) The spacing multiplier
$vr-ITERATIONS: 1 !default; // (unitless) Number of variations to generate

// @return {Integer} converted to em units
@function vr($b: $vr-BASE) {
    @if unitless($b) == false {
        @warn "$vr-BASE: #{$vr-BASE}; must be unitless.";
        @return 0;
    }

    @if $vr-MAGNITUDE == null {
        @warn "$vr-MAGNITUDE must be a non-negative number.";
        @return 0;
    }

    @if $b != 0 {
        @return $b * $vr-MAGNITUDE + 0em;
    } @else {
        @return 0;
    }
}

// The following classes can be re-generated across breakpoints.
// This allows for a different magnitude of vertical space at certain viewport widths.
.vr {
    margin-bottom: vr();
}

// Generate vertical rhythm extensions
@if $vr-ITERATIONS > 1 {
    @for $i from 2 through $vr-ITERATIONS {
        .vr_#{$i}n {
            margin-bottom: vr($vr-BASE * $i);
        }
    }
}
```

```scss
// Vertical Rhythm Configuration Variables
$vr-BASE: 2; // (unitless) Base measurement
$vr-MAGNITUDE: 0.5; // (unitless) The spacing multiplier
$vr-ITERATIONS: 6; // (unitless) Number of variations to generate

@import "_helpers";
```