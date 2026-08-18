#!/usr/bin/env python3
"""Bundle the portfolio into ONE self-contained HTML file for publishing as a
Claude Artifact (strict CSP: no external files, images inlined as data URIs).

    python3 build-artifact.py [output.html]

The artifact build differs from index.html in two ways:
  * CSS, JS and images are inlined
  * <head> wrapper tags are dropped (the artifact host supplies them)
"""
import base64, pathlib, sys

root = pathlib.Path(__file__).parent
out = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else root / "portfolio-artifact.html")

html = (root / "index.html").read_text()
css = (root / "assets/css/styles.css").read_text()
js = (root / "assets/js/main.js").read_text()

def data_uri(rel, mime):
    return "data:%s;base64,%s" % (mime, base64.b64encode((root / rel).read_bytes()).decode())

# --- body content only -------------------------------------------------------
body = html.split("<body>", 1)[1].split("</body>", 1)[0]
body = body.replace('<script src="assets/js/main.js"></script>', "")

# --- inline images -----------------------------------------------------------
for rel, mime in [("assets/img/aashiya-hero.jpg", "image/jpeg"),
                  ("assets/img/aashiya-about.jpg", "image/jpeg")]:
    assert 'src="%s"' % rel in body, "image reference not found: " + rel
    body = body.replace('src="%s"' % rel, 'src="%s"' % data_uri(rel, mime))

page = (
    "<title>Aashiya Bi</title>\n"
    '<link rel="preconnect" href="https://fonts.googleapis.com" />\n'
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />\n'
    '<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,600'
    '&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />\n'
    "<style>\n" + css + "\n</style>\n"
    + body.strip() + "\n"
    "<script>\n" + js + "\n</script>\n"
)

assert "assets/" not in page, "unresolved local asset reference in bundle"
out.write_text(page)
print("%s  %.0f KB" % (out, len(page.encode()) / 1024))
