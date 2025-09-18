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

<!--
Okay, so modal dialogs. Quick show of hands, who knows what a modal dialog is?

For those of you who don't know, those obnoxious pop-up windows that ask you for your cookie preferences are modal dialogs. And they all suck, none of them offer me chocolate chip cookies.

When I was a kid I always dreamed that one day I'd be able to stand on stage and talk about implementing popups on the internet. *click*
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
- That can be closed easily

</template>

<template #1> Simple, right? </template>
<template #2>
What about...

<div style="display: flex; flex-direction: row; gap: 20px;">
<ul>
<li>Close button [x]</li>
<li>Close with <kbd>ESC</kbd></li>
<li>Nested modals</li>
<li>Backdrop</li>
<li>Close on backdrop click</li>
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

Is there another way?

<v-click>The `&lt;dialog&gt;` element!</v-click>

<!--
I don't want to implement all that stuff! Surely there must be another way? *click*

Let's compare across all those things a modal should do

- a 100 line div modal
- an 80 line dialog modal

-->

---

:: title ::

## Modal dialogs

### Close with <kbd>ESC</kbd> key

:: content ::

<ModalComparison />

<!--
div: easy! I know how to write a keyboard handler. And I've definitely never forgotten to remove an event listener when unmounting a component. Let's see how dialog did

dialog: Has it built in! Even easier.
-->

---

:: title ::

## Modal dialogs

### Nested modals

:: content ::

<ModalComparison />

<!--
Nested modals are a great UX pattern and everyone should use them more often.

div: My Modal component is already wired up to close when esc is pressed, so this should work fine.

They're both gone! Probably not what I want from a UX perspective, but as a user who killed two popups with one keypress, I'm happy.

dialog: Wow look at that, it correctly closes only the top modal.
-->

---

:: title ::

## Modal dialogs

### Backdrop

:: content ::

<ModalComparison />

<!--
Every frontend dev can probably figure out how to make an element cover the whole screen as a backdrop for their modal. If you're clever you can even do it using the ::before pseudo-element from your modal!

and of course the dialog element does it for you.
-->

---

:: title ::

## Modal dialogs

### Close on backdrop click

:: content ::

<div class="h-1lh mt-10"></div>
<ModalComparison />

<v-click><div class="mt-10">

```html
<dialog closedby="any">...</dialog>
```

</div></v-click>

<!--
div: I already implemented a closeModal function for the esc key. Reusing it for this is easy.

Dialog: This one is a bit trickier unless you know the magic incantation. (spooky voice) *click* closedby="any"
-->

---

:: title ::

## Modal dialogs

### Rendering other content inert

:: content ::

<v-clicks>

- `inert` attribute set by `.showModal()`
- renders all non-dialog content inert
- prevents page scrolling
- and doesn't jump the scroll position!

</v-clicks>

<!--
I think inert was added specifically for the dialog element. It makes all the other content on the page non-interactive and locks the scroll position. This is better than something like hiding the y-axis overflow, because it won't jump the scroll position and doesn't need to be restored.
-->

---

:: title ::

## Modal dialogs

### Capture focus when opened

:: content ::

<div class="h-1lh mt-10"></div>
<ModalComparison />

<v-click><div class="mt-10">

```ts
let myDialog: HTMLDialogElement = ...;
myDialog.showModal();
```

</div></v-click>

<!--
If you've managed to stay focused during this talk, you've probably noticed that the content of the div modal is _not_ focused. Divs aren't focusable, so the autofocus attribute doesn't help here. To get this right, every single usage of my div modal would need to manually set autofocus on a focusable element inside the modal.

With the dialog element, if you open it with showModal it works. Easy to wrap in the component logic so there's nothing to remember when using it!
-->

---

:: title ::

## Modal dialogs

### Trapping focus inside the dialog

:: content ::

<ModalComparison />

<!--
This is the most notoriously difficult parts of rolling your own modal. As you can see, I can tab right out of it and onto the rest of the page. Terrible for anyone using keyboard navigation or screen readers.

The dialog of course works perfectly. It gets this for free since the rest of the page is inert and can't be interacted with.
-->

---

:: title ::

## Modal dialogs

### Additional built-ins

:: content ::

| Feature                     | `<dialog>` support                            |
| --------------------------- | --------------------------------------------- |
| managing open state         | ✅ `open` attribute + open & close methods    |
| Rendering on top            | ✅ special top layer: skip stacking & z-index |
| aria roles                  | ✅ `aria-modal="true"` set by `.showModal()`  |
| accessibility tree presence | ✅ Matches open state automatically           |

<!--

-->

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
