# Lesson 04 Take-Home Exercise

## Title
Core Components Screen Review

## Purpose
This exercise reinforces lesson 04 by asking you to explain why specific React Native core components were used, how they differ from common web assumptions, and what troubleshooting steps help when a screen stops rendering correctly.

## Before You Start
Use these lesson-04 reference files:
- [component-reference.md](component-reference.md)
- [guided-build-checklist.md](guided-build-checklist.md)
- [starter-snippets.md](starter-snippets.md)
- [troubleshooting-checklist.md](troubleshooting-checklist.md)

Helpful lesson-04 terms:
- **nesting**: placing one component inside another
- **container**: a structural component that groups other UI parts
- **core component**: a built-in React Native component provided by the framework
- **screen structure**: the arrangement of sections and components that make up the UI

## Submission Format
Submit a short Markdown or PDF response. Aim for 1 page total.

If you used the instructor recovery app because your own lesson-03 project was not ready:
- you may still complete this exercise
- clearly state that you used the recovery app
- identify which changes or observations were your own work during class

## Tasks
### Part 1: Component Identification
Choose three components from your lesson-04 screen.

**`Image`**
- Job on the screen: displays the small logo graphic in the "About This App" section.
- Why it's a better fit than a plain HTML assumption: an HTML `<img>` can size itself automatically from the file it loads, but React Native's `Image` does not do that for a remote URL — you have to give it an explicit `width` and `height` in its style, or it can render as invisible/zero-size.

**`ScrollView`**
- Job on the screen: wraps the whole screen's content so it can scroll if it grows taller than the device display.
- Why it's a better fit than a plain HTML assumption: on the web a page scrolls by default; in React Native nothing scrolls automatically — you have to explicitly opt a container into scrolling by using `ScrollView`.

**`TextInput`**
- Job on the screen: the "Type here to translate!" field that lets the user type a short note.
- Why it's a better fit than a plain HTML assumption: an HTML `<input>` comes with built-in form submission and default styling; `TextInput` has neither — it is just the typing surface, and I'm responsible for all of its layout (border, padding, min height) and for deciding what happens with whatever is typed.

### Part 2: Screen Structure Explanation
Write 4 to 6 sentences explaining:
- how `View` and `Text` work together in your screen
- why `ScrollView` may be helpful in this lesson
- one place where component nesting affected the final structure

`View` and `Text` split two different jobs between them: the `View` groups the "About This App" heading and its description into one labeled section, while each piece of visible wording sits inside its own `Text` element, since `View` itself cannot display words. `ScrollView` is helpful here because it guarantees the screen stays usable even as I keep adding sections (the heading, the About block, the image, the input) — without it, content taller than the screen would simply get cut off with no way to reach it. Nesting mattered in one specific spot: the `Image` and `TextInput` are direct children of the `ScrollView` rather than nested inside the "About This App" `View`, which keeps them as their own separate blocks on the screen instead of visually lumping them into the About section's text.

### Part 3: Build Change Reflection
Describe one change you made during the guided build.

I added the `Image` block (the small remote logo) and the `TextInput` field below the "About This App" section.

- What component I added: `Image`, sized to 64x64, and `TextInput` with a placeholder and a basic border.
- What changed on screen after I saved: the logo appeared right after the About text, and a bordered, multiline input box appeared below it that visibly responded when I typed into it.
- Why this helps prepare the project for lesson 05 styling: both blocks currently have only the bare minimum styling (just enough to be visible — a size on the image, a border and padding on the input), so they are exactly the kind of plain, unstyled pieces lesson 05 is meant to improve with spacing, color, and layout.

### Part 4: Troubleshooting Reasoning
Choose one issue from [troubleshooting-checklist.md](troubleshooting-checklist.md).

I'm choosing Issue 3: "The image does not appear."

- The likely cause: an invalid `source` value, or a missing `width`/`height` on the `Image`'s style.
- One small fix I would try first: double check the style object actually sets both `width` and `height` (not just one of them), and open the remote URL directly in a browser to confirm it still loads.
- What result would show the fix worked: the image block becomes visible at the expected 64x64 size instead of staying blank or taking up no space.

## Success Criteria
Strong submissions will:
- use component names accurately
- distinguish React Native structure from web assumptions
- explain screen structure in plain language
- connect one code change to a visible UI result
- describe troubleshooting as a small-step process

## Optional Extension
Add one labeled screenshot of your screen and identify where `View`, `Text`, `Image`, `ScrollView`, and `TextInput` appear.
