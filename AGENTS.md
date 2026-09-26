## Local instructions for Codex

These instructions apply to the entire repository.

### CSS and styling
- Keep styles simple, explicit, and easy to change.
- Do not overcomplicate straightforward layout or typography rules.
- Prefer direct values such as `rem`, `vw`, `vh`, and simple percentages when they make the intent clear.
- Avoid `clamp()`, nested `min()`, `calc()`, and flex shorthand unless they are genuinely needed for the layout.
- When using flexbox, always specify `flex-direction`.
- Prefer explicit properties such as `width`, `margin-top`, `margin-bottom`, `padding-top`, and `padding-bottom` over dense shorthand when it improves editability.
- Put responsive changes in media queries instead of hiding behavior inside complex one-line formulas.
- Optimize for styles that are easy to inspect, tweak, and refactor later.
