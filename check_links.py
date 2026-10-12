#!/usr/bin/env python3
"""Link checker for ai-on-linuxone site."""

import os
import re
import urllib.request
import urllib.error
from pathlib import Path

BASE_DIR = Path(__file__).parent
HTML_FILES = sorted(BASE_DIR.rglob("*.html"))

# Exclude .git directory
HTML_FILES = [f for f in HTML_FILES if ".git" not in f.parts]

# Also check nav.js and sidebar.js for links
JS_FILES = [BASE_DIR / "nav.js", BASE_DIR / "sidebar.js"]

broken_internal = []
broken_external = []
ok_internal = 0
ok_external = 0
checked_external = {}  # cache

def resolve_internal(href, source_file):
    """Return resolved Path or None if it can't be resolved."""
    if href.startswith("#"):
        return None  # anchor-only link, skip
    # Strip fragment
    href_no_frag = href.split("#")[0]
    if not href_no_frag:
        return None

    if href_no_frag.startswith("/"):
        # Absolute path relative to BASE_DIR
        resolved = BASE_DIR / href_no_frag.lstrip("/")
    else:
        resolved = (source_file.parent / href_no_frag).resolve()

    # If it's a directory, look for index.html
    if resolved.is_dir():
        resolved = resolved / "index.html"

    return resolved

def check_external(url):
    """Return (status_code_or_error, ok: bool)."""
    if url in checked_external:
        return checked_external[url]
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 LinkChecker"}, method="HEAD")
        with urllib.request.urlopen(req, timeout=10) as resp:
            result = (resp.status, resp.status < 400)
    except urllib.error.HTTPError as e:
        if e.code == 405:
            # HEAD not allowed, try GET
            try:
                req2 = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 LinkChecker"})
                with urllib.request.urlopen(req2, timeout=10) as resp:
                    result = (resp.status, resp.status < 400)
            except Exception as e2:
                result = (str(e2), False)
        else:
            result = (e.code, e.code < 400)
    except Exception as e:
        result = (str(e), False)
    checked_external[url] = result
    return result

HREF_RE = re.compile(r'href=["\']([^"\']+)["\']', re.IGNORECASE)
SRC_RE  = re.compile(r'src=["\']([^"\']+)["\']', re.IGNORECASE)

all_source_files = list(HTML_FILES) + [f for f in JS_FILES if f.exists()]

print(f"Checking {len(HTML_FILES)} HTML files + JS nav files...\n")

for source_file in all_source_files:
    content = source_file.read_text(encoding="utf-8", errors="replace")
    links = HREF_RE.findall(content) + SRC_RE.findall(content)

    for href in links:
        href = href.strip()
        # Skip empty, mailto, tel, javascript
        if not href or href.startswith(("mailto:", "tel:", "javascript:", "data:")):
            continue

        if href.startswith("http://") or href.startswith("https://"):
            status, ok = check_external(href)
            if ok:
                ok_external += 1
            else:
                broken_external.append({
                    "source": str(source_file.relative_to(BASE_DIR)),
                    "url": href,
                    "status": status,
                })
        else:
            resolved = resolve_internal(href, source_file)
            if resolved is None:
                continue  # anchor-only, skip
            if resolved.exists():
                ok_internal += 1
            else:
                broken_internal.append({
                    "source": str(source_file.relative_to(BASE_DIR)),
                    "href": href,
                    "resolved": str(resolved.relative_to(BASE_DIR)) if resolved.is_relative_to(BASE_DIR) else str(resolved),
                })

# ── Report ────────────────────────────────────────────────────────────────────
print("=" * 70)
print(f"INTERNAL LINKS: {ok_internal} OK, {len(broken_internal)} broken")
print("=" * 70)
if broken_internal:
    for b in broken_internal:
        print(f"  BROKEN  {b['source']}")
        print(f"    href: {b['href']}")
        print(f"    resolved to: {b['resolved']}")
else:
    print("  All internal links OK ✓")

print()
print("=" * 70)
print(f"EXTERNAL LINKS: {ok_external} OK, {len(broken_external)} broken")
print("=" * 70)
if broken_external:
    for b in broken_external:
        print(f"  BROKEN  {b['source']}")
        print(f"    url: {b['url']}")
        print(f"    status: {b['status']}")
else:
    print("  All external links OK ✓")

print()
total_broken = len(broken_internal) + len(broken_external)
print(f"SUMMARY: {total_broken} broken link(s) found.")
