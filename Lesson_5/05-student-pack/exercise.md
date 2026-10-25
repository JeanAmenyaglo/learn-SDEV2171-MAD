# Lesson 05 Take-Home Exercise

## Title
Styling Clarity Review

## Purpose
This exercise reinforces lesson 05 by asking you to explain how specific style changes improved readability, spacing, and layout structure in your React Native screen.

## Before You Start
Use these lesson-05 reference files:
- [styling-reference.md](styling-reference.md)
- [guided-build-checklist.md](guided-build-checklist.md)
- [starter-snippets.md](starter-snippets.md)
- [troubleshooting-checklist.md](troubleshooting-checklist.md)

Helpful lesson-05 terms:
- **hierarchy**: the visual difference between more important and less important content
- **alignment**: how elements line up relative to each other
- **surface**: a visible container area such as a card or section block
- **layout**: the arrangement of components on the screen

## Submission Format
Submit a short Markdown or PDF response. Aim for 1 page total.

If you used the instructor recovery app because your own lesson-04 project was not ready:
- you may still complete this exercise
- clearly state that you used the recovery app
- identify which changes or observations were your own work during class
- include one sentence naming the next step for getting your own project ready for lesson 06

## Tasks
### Part 1: Style Change Review
Choose three styling changes from your lesson-05 screen.

**`borderRadius` on the avatar image**
- What changed on screen: a 150x150 square image now renders as a perfect circle.
- Why it's clearer: it reads immediately as a profile photo instead of a plain rectangular image, matching what people expect from a profile screen.

**`flexDirection: "row"` + `justifyContent: "space-around"` on `tilesRow`**
- What changed on screen: the three tiles went from stacking on top of each other (the default) to sitting side by side with even spacing between them.
- Why it's clearer: a row of evenly spaced options is much easier to scan at a glance than three stacked blocks.

**`padding`, `borderRadius`, and `backgroundColor` on the card and listCard sections**
- What changed on screen: the heading and body text for each section are grouped inside a rounded, colored surface with breathing room around the text instead of sitting flush against the screen edge.
- Why it's clearer: the padding and rounded surface visually group related content together and separate it from the sections above and below it.

### Part 2: React Native Versus Web Assumptions
Write 4 to 6 sentences explaining:
- one way React Native styling is similar to CSS
- one way React Native styling is different from CSS
- why parent container styles matter for layout

React Native styling is similar to CSS in the core ideas it uses: padding, margin, colors, font size, and Flexbox all behave with the same vocabulary I'd use in CSS. The biggest difference is syntax and scope: instead of a stylesheet file with selectors that can cascade across a whole page, every style here is a plain JavaScript object defined in `StyleSheet.create` and attached directly to one component through its `style` prop, with no cascading between unrelated components. Parent container styles matter a lot because children inherit their available space and alignment behavior from the parent's Flexbox settings. For example, `tilesRow` sets `flexDirection: "row"`, and that one line on the parent is the only reason the three `tile` children sit side by side instead of stacking — if I had only styled the tiles and left the parent at the default column direction, no amount of styling on the tiles themselves would make them line up horizontally.

### Part 3: Build Change Reflection
Describe one styling change you made during the guided build.

The change I'm describing is turning `tilesRow` into a horizontal row using `flexDirection: "row"` and `justifyContent: "space-around"`.

- Where the change was applied: the `tilesRow` style, which wraps the three `tile` `View` components.
- What changed visually after I saved: the three tiles went from stacking vertically (the default column behavior) to sitting side by side with even spacing between them.
- Why this helps prepare the project for lesson 06 navigation work: having a clear, well-separated row of button-like tiles is exactly the kind of structure that turns into real navigation targets next — each tile already looks and is sized like something tappable, so adding an `onPress` that navigates somewhere is a small next step rather than a redesign.

### Part 4: Troubleshooting Reasoning
Choose one issue from [troubleshooting-checklist.md](troubleshooting-checklist.md).

I'm choosing Issue 4: "Alignment looks wrong."

- The likely cause: the parent container's `flexDirection` is not what I assumed, or `alignItems`/`justifyContent` got changed on the wrong axis.
- One small fix I would try first: confirm `tilesRow`'s `flexDirection` is actually `row` and not the default `column`, then adjust `justifyContent` for the row axis and `alignItems` for the cross axis one property at a time instead of guessing both together.
- What result would show it worked: the tiles line up in a predictable, evenly spaced horizontal row instead of stacking or clustering unevenly.

## Success Criteria
Strong submissions will:
- use styling terms accurately
- connect style changes to visible UI results
- distinguish React Native styling from web assumptions at a beginner level
- explain one layout dependency between parent and child components
- describe troubleshooting as a small-step process
- include one required screenshot of the styled screen
- one spacing improvement
- one text improvement
- one alignment improvement
