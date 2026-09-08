---
name: Local image background fallback
description: A local ImageMagick method for replacing near-white photo backgrounds with transparent PNGs.
---

For uploaded photos with a mostly white, contiguous background, ImageMagick's alpha flood-fill from a corner followed by trim and a transparent border can produce a usable cutout without changing the app code.

**Why:** Automatic background removal was unavailable during an image replacement, while the subject had clear contrast against a white background.

**How to apply:** Use a conservative fuzz value, inspect the generated PNG visually, and keep the output at the asset path already referenced by the app so the change remains scoped to the image.