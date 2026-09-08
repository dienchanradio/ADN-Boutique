---
name: GitHub connector upload limit
description: Cloudflare can block repeated GitHub repository write requests through the connected GitHub proxy.
---

The connected GitHub proxy may return an HTML Cloudflare 403 after a burst of repository writes, while read requests and the GitHub rate-limit endpoint still succeed. Slowing requests helps for some asset uploads, but the block can persist for later Contents and Git Tree writes.

**Why:** A repository source upload encountered this behavior after the initial repository creation and partial asset upload; retrying blobs, Contents writes, and Tree writes did not restore code uploads.

**How to apply:** Prefer a repository-capable alternate GitHub connection for bulk uploads, or resume from the remote tree and upload only missing paths after the connector is available. Never assume a 403 here means GitHub permissions or exhausted API quota.