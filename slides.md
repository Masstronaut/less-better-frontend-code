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
🦋 [AllanDeutsch.com](https://allandeutsch.com)

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

## Changing colors

:: content ::

- opacity
- lightness/darkness
- mix colors together

<!--
There are a lot of ways to do this, but I haven't loved any of them.

- css in JS is slow
- preprocessors require a build step, configs, and dependencies
- manipulating css directly from JS is not ergonomic

Let's look at a nice alternative...*click* vanilla CSS
-->

---

:: title ::

## Changing colors

### Using vanilla CSS

:: content ::

<v-switch>
<template #1>

- CSS variables <BaselineWidely />

```css
--my-color: hsl(200, 80%, 50%);
```

</template>

<template #2>

- `color-mix()` <BaselineNewly />

<ColorMixer />
</template>

<template #3>

- Relative colors <BaselineNewly />

<RelativeColorDemo />

</template>

</v-switch>

<!--
You've used variables in JS/TS, and they're just as useful in CSS. if you've ever reused a value, you're gonna love these.

color-mix as the name implies lets you mix two colors. This is my go-to for adjusting opacity, which I change in srgb space.

Relative color syntax makes it easy to shift colors. I find it quite useful for things like active and hover states where I want a darker or lighter variant of a color.
-->

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

<v-click><div>The `&lt;dialog&gt;` element! <BaselineWidely /></div></v-click>

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

<table>
<thead>
<tr>
<th>Feature</th>
<th><code>&lt;dialog&gt;</code> support</th>
</tr>
</thead>
<tbody>
<tr v-click>
<td>Rendering on top</td>
<td>✅ special top layer: skip stacking & z-index</td>
</tr>
<tr v-click>
<td>managing open state</td>
<td>✅ <code>open</code> attribute + open & close methods</td>
</tr>
<tr v-click>
<td>accessibility tree presence</td>
<td>✅ Matches open state automatically</td>
</tr>
<tr v-click>
<td>aria roles</td>
<td>✅ <code>.showModal()</code> sets <code>aria-modal="true"</code></td>
</tr>
</tbody>
</table>

<!--
Rendering on top: dialog uses the top layer, which is a special rendering layer on top of everything else.

In most modern frameworks, managing the open state is easy so this may not seem like a big one. Notably, it's important to only open and close it via the methods, and treat the attribute as read-only.

One benefit of the managed open state is that it automatically updates the accessibility tree! If there's no dialog open, there's no dialog in the accessibility tree.

Finally, showModal automatically sets aria-modal="true" for you, which is important for screen readers to know that the rest of the page is inert.
-->

---

:: title ::

## Modal recap

:: content ::

<v-clicks>

- ✅ Use the dialog element
- ✅ Open it with `.showModal()`
- ✅ set the `closedby="any"` attribute
- ❌ Don't mutate the `open` attribute directly

</v-clicks>

---

:: title ::

## Fin

:: content ::

Thanks for being here!

Want to chat? Come find me at the afterparty.

---

:: title ::

## closing remarks

:: content ::

- Afterparty 6:30 @ Just The Tap. **luma.com/cascadiajs-day-one-afterparty**
- SeattleJS.com

<!--
- SeattleJS is hosting the afterparty tonight! We've got a super cool space with fantastic pizza, and it's sponsored by some awesome companies - mux, resend, and warp.

- If you love CascadiaJS and live within driving distance of seattle, come check out SeattleJS! It's a local meetup, totally free, run by mostly the same people as CascadiaJS.

- conf-style meetup
- katas
- workshops
-->
