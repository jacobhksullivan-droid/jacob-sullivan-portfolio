"""Rebuild sitemap.xml and robots.txt from the content files.

Run from the project folder after adding, removing or hiding a project:

    python3 tools/make_sitemap.py
"""
import datetime
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def read(name):
    with open(os.path.join(ROOT, name), encoding="utf-8") as f:
        return f.read()


def strip_comments(js):
    js = re.sub(r"/\*.*?\*/", "", js, flags=re.S)
    return re.sub(r"(^|[^:\"'])//[^\n]*", r"\1", js)


site = strip_comments(read("content/site.js"))
m = re.search(r"\burl\s*:\s*[\"']([^\"']+)[\"']", site)
if not m:
    raise SystemExit("Couldn't find url: \"...\" in content/site.js")
base = m.group(1).rstrip("/")

projects = strip_comments(read("content/projects.js"))
chunks = re.split(r"\bslug\s*:", projects)[1:]
slugs = []
for chunk in chunks:
    s = re.match(r"\s*[\"']([^\"']+)[\"']", chunk)
    if not s:
        continue
    hidden = re.search(r"\bvisible\s*:\s*false\b", chunk)
    if not hidden:
        slugs.append(s.group(1))

today = datetime.date.today().isoformat()
paths = ["/", "/work", "/about", "/contact"] + [f"/work/{s}" for s in slugs]
urls = "\n".join(
    f"  <url><loc>{base}{p}</loc><lastmod>{today}</lastmod></url>" for p in paths
)
xml = f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{urls}\n</urlset>\n'
with open(os.path.join(ROOT, "sitemap.xml"), "w", encoding="utf-8") as f:
    f.write(xml)

robots = f"User-agent: *\nAllow: /\n\nSitemap: {base}/sitemap.xml\n"
with open(os.path.join(ROOT, "robots.txt"), "w", encoding="utf-8") as f:
    f.write(robots)

print(f"sitemap.xml: {len(paths)} pages ({len(slugs)} projects). robots.txt updated. Base: {base}")
