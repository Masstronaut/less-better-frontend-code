---
# You can also start simply with 'default'
theme: seriph
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://cover.sli.dev
# some information about your slides (markdown enabled)
title: Welcome to Slidev
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
# apply unocss classes to the current slide
class: text-center
# https://sli.dev/features/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: slide-left
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true
# open graph
seoMeta:
  # By default, Slidev will use ./og-image.png if it exists,
  # or generate one from the first slide if not found.
  ogImage: auto
  # ogImage: https://cover.sli.dev
defaults:
  layout: centered-content
---

:: title ::

## Less but better frontend code

:: content ::

Allan Deutsch
[AllanDeutsch.com](https://allandeutsch.com)

---

:: title ::

## About this talk

:: content ::

- Practical\* tips

<v-clicks>

- <BaselineWidely /> - Baseline widely available ~95%
- <BaselineNewly /> - Baseline newly available ~85-90%

</v-clicks>

<!--
Practical unless you ship frontends to IE or mail clients
baseline % is for features I'm covering, but may not be the same for other features
-->

---

:: title ::

## Live CSS Demo

:: content ::

Try editing the CSS below and see the button update live:

```css {monaco-run}
.demo-button {
  background: red;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s ease;
}

.demo-button:hover {
  background: darkred;
  transform: scale(1.05);
}
```

<button class="demo-button">Click me!</button>

---

:: title ::

## Changing colors

:: content ::

<div style="display: flex; flex-direction: row; justify-content: space-between;">

- opacity
- lightness/darkness
- mix colors together

<div v-click>

Lots of tools for color changing

- CSS in JS
- Preprocessor manipulations
- JS manipulation

Each with its own drawbacks

</div>
</div>

---

:: title ::

## Changing colors

:: content ::

Avoid those drawbacks by using... vanilla CSS

- CSS variables for reusable values <BaselineWidely />
- `color-mix()` <BaselineNewly />
- Relative colors <BaselineNewly />

```css
hsl(from var(--my-color) h s calc(l + 10%) )
```

---

:: title ::

## Nested CSS

:: content ::

<v-switch>
  <template #0>Have you ever written code like this?</template>
  <template #1-4>We can nest CSS selectors instead</template>
</v-switch>

````md magic-move {at:1}
flat css:

```css
.button {
  background: var(--primary);
  color: var(--primary-content);
  /* more styles... */
}
.button:hover {
  background: hsl(from var(--primary) h s calc(l - 5%));
}
.button:hover:active {
  background: hsl(from var(--primary) h s calc(l - 10%));
}
.button:active {
  outline: 2px solid var(--primary-content);
}
```

nested css:

```css
.button {
  background: var(--primary);
  color: var(--primary-content);
  /* more styles... */
  &:hover {
    background: hsl(from var(--primary) h s calc(l - 5%) )
    &:active {
      background: hsl(from var(--primary) h s calc(l - 10%));
    }
  }
  &:active {
    outline: 2px solid var(--primary-content);
  }
}
```
````

<v-switch at="0">
<template #0>Hard to keep track as selector count grows</template>
<template #1><span style="color: #00000000">Layout shift sucks</span></template>
<template #2>... but it requires a preprocessor!</template>
<template #3>
<span style="text-decoration: line-through;">... but it requires a preprocessor!</span>
in vanilla CSS! <BaselineNewly />
</template>
</v-switch>

<!--
Styles: imagine how much worse this is for a real component with full styling, light/dark theme, pseudo-states, and nested element. The CSS doesn't fit on screen!

- flat (unindented) hard to read and reason about
- CSSWG has give us tons of great new selector tools recently
- new complex css selectors made this harder for me

Preprocessor: dealing with them is a hassle and nobody wants another build step. So are we out of luck?
-->

---

:: title ::

## Modal dialogs

:: content ::

<v-switch>
<template #0>

Render a div

- In the middle of the screen
- On top of everything
- That can be dismissed predictably

</template>

<template #1> Simple, right? </template>
<template #2>
What about...

<div style="display: flex; flex-direction: row; gap: 20px;">
<ul>
<li>Close button [x]</li>
<li>Close with `esc` key</li>
<li>Nested modals</li>
<li>Close on backdrop click</li>
<li>Backdrop</li>
<li>Rendering other content inert</li>
<li>Capture focus when opened</li>
</ul>
<ul>
<li>trapping focus inside the dialog</li>
<li>Prevent page scrolling</li>
<li>Managing open state</li>
<li>Rendering on top of everything</li>
<li>Aria roles</li>
<li>Accessibility tree</li>
</ul>
</div>
</template>
</v-switch>

---

:: title ::

## Modal dialogs

:: content ::

<div style="display: flex; gap: 20px; justify-content: center;">
<DivModalDemo />
<DialogDemo />
</div>

---

:: title ::

## Modal dialogs

:: content ::

What about.... A better way?

The `<dialog>` element!

---

:: title ::

## Modal `<dialog>`s

:: content ::

| Feature                 | `<dialog>` support                      |
| ----------------------- | --------------------------------------- |
| Close button            | BYO element, `onclick={dialog.close()}` |
| close with `esc`        | ✅ closes most recently opened modal    |
| close on backdrop click | ✅ `closedby=any` attribute             |
| Backdrop                | ✅ style with `::backdrop`              |

---

:: title ::

## Modal `<dialog>`s

:: content ::

| Feature                       | `<dialog>` support                                                                                                       |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Rendering other content inert | ✅ [`inert`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inert) set by `.showModal()`  |
| Set focus when opened         | ✅ `.showModal()` or `autofocus` attribute                                                                               |
| Trapping focus in dialog      | ✅ [`inert`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inert) items aren't focusable |
| Prevent page scrolling        | ✅ [`inert`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inert) items aren't focusable |

---

:: title ::

## Modal `<dialog>`s

:: content ::

| Feature                     | `<dialog>` support                            |
| --------------------------- | --------------------------------------------- |
| managing open state         | ✅ `open` attribute + open & close methods    |
| Rendering on top            | ✅ special top layer: skip stacking & z-index |
| aria roles                  | ✅ `aria-modal="true"` set by `.showModal()`  |
| accessibility tree presence | ✅ Matches open state automatically           |

---

:: title ::

## Modal `<dialog>`s

:: content ::

<DialogDemo />

---

:: title ::

## Fin

:: content ::

Comments, questions, feedback, etc. in the beer room!

---

```html
<dialog closedby="any">
  <p>Are you sure you want to applaud?</p>
  <button onclick="this.parent.close()" autofocus>Cancel</button>
  <button onclick="applaud()">Applaud</button>
</dialog>
```

```css
dialog ::backdrop {
  filter: blur(5px);
  background: hsla(0, 0, 0%, 80%);
}
```
