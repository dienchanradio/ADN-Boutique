---
name: GitHub connector upload limit
description: Cloudflare can block repeated GitHub repository write requests through the connected GitHub proxy.
---

The connected GitHub proxy may return an HTML Cloudflare 403 for large inline Git Tree or GraphQL commit payloads, while reads and small writes still succeed. Reducing one large tree into medium inline-content batches may remain blocked.

**Why:** A repository source upload encountered this behavior after the initial repository creation and partial asset upload; retrying blobs, Contents writes, and Tree writes did not restore code uploads.

**How to apply:** Compare local and remote Git blob SHAs first. Upload each differing file with the Git Data blob endpoint using base64, then create one small SHA-only tree and commit it. This avoids inline source payloads that trigger Cloudflare. Never assume the 403 means missing GitHub permissions or exhausted API quota.