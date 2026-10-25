# Lesson 06 Take-Home Exercise

## Title
Navigation Flow Review

## Purpose
This exercise reinforces lesson 06 by asking you to explain how your app moved from one styled screen to a simple multi-screen flow.

## Before You Start
Use these lesson-06 reference files:
- [navigation-build-checklist.md](navigation-build-checklist.md)
- [screen-flow-reference.md](screen-flow-reference.md)
- [starter-snippets.md](starter-snippets.md)
- [troubleshooting-checklist.md](troubleshooting-checklist.md)

Helpful lesson-06 terms:
- **route**: a file-based screen in the app navigation structure
- **stack**: a navigation flow where one screen is pushed on top of another
- **layout**: the file that defines how related routes are wrapped and shown
- **navigation action**: the code that moves the user to another screen or back

## Submission Format
Submit a short Markdown or PDF response. Aim for 1 page total plus one screenshot.

If you used the instructor recovery app because your own project was not ready:
- you may still complete this exercise
- clearly state that you used the recovery app
- identify which observations or edits were your own work
- include one sentence naming the next step for getting your own project ready for lesson 07

## Tasks
### Part 1: Navigation Purpose
Write 4 to 6 sentences explaining:
- why a single-screen lesson-05 app might need navigation
Helps users have a better user experince sincecintent is divided inot several parts and allows users to navigate to andf fro from one oage to another.
- what changed when you split content into two screens.
The UI changed a bit and it allowed users to be able to transition from on page to another
- how navigation improves screen flow or focus
Becasue page are broken down into bits, users can focus on one ifomation from page to page at each time.

### Part 2: Route Structure
Describe these files in your own words:
- `src/app/_layout.tsx`: This contains the stack which helps with navigation becasue it shows page name and even the effect of the transition, it also help store user state when moving form one page tpo another
- `src/app/index.js`: this contains the main page content and user can navigate from here to other pages
- `src/app/details.js`:this contains other pages that use to be in the index and users can eqially navigate from here to there index from here too

For each one, explain its job in the app.
Then add 2 to 3 sentences explaining how screens are registered in this lesson structure.

### Part 3: Navigation Action Reflection
Describe one navigation action you tested.

I'm describing the "View Tiles" button on the home screen.

- Where the action was triggered: the `Pressable` labeled "View Tiles" on `index.js`, which calls `router.push("/details")` on press.
- What happened on screen: tapping it pushed the Details screen on top of the Home screen, replacing the profile layout with the three-tile row and a "Go back" button.
- How I knew it worked: the screen content fully changed to the Details layout, and pressing "Go back" (which calls `router.back()`) returned me to the exact Home screen I started from, confirming both the push and the back action worked.

### Part 4: Troubleshooting or Recovery Reasoning
Choose one issue from [troubleshooting-checklist.md](troubleshooting-checklist.md).

I'm choosing Issue 2: "The second screen does not open."

- The likely cause: the pushed path doesn't match the actual route file name, or `details.js` is missing or misnamed.
- One small fix I would try first: confirm the file is named exactly `details.js` inside `src/app/`, and confirm the `Pressable`'s `onPress` calls `router.push("/details")` with that exact path spelling.
- What result would show the fix worked: pressing "View Tiles" actually opens the Details screen instead of doing nothing or crashing.

## Success Criteria
Strong submissions will:
- use navigation terms accurately at a beginner level
- connect route files to visible screen behaviour
- explain one forward or back navigation action clearly
- describe troubleshooting as a small-step process
- include one required screenshot of the working app or recovery app flow
- label the first screen and second screen in the screenshot
