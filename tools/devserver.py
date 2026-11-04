"""Local preview server. Run from the project folder:

    python3 tools/devserver.py          (then open http://localhost:8780)

Mirrors the routes in vercel.json (/work, /about, /contact, /work/<slug>)
and turns caching off so edits show up on refresh.
"""
import functools
import http.server
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8780

ROUTES = [
    (re.compile(r"^/work/?$"), "/work.html"),
    (re.compile(r"^/about/?$"), "/about.html"),
    (re.compile(r"^/contact/?$"), "/contact.html"),
    (re.compile(r"^/work/[^/]+/?$"), "/project.html"),
]


class Handler(http.server.SimpleHTTPRequestHandler):
    def _route(self):
        path, _, query = self.path.partition("?")
        for pattern, target in ROUTES:
            if pattern.match(path):
                self.path = target + ("?" + query if query else "")
                return
        local = os.path.join(ROOT, path.lstrip("/"))
        if path != "/" and not os.path.exists(local):
            self.path = "/404.html"
            self._missing = True

    def do_GET(self):
        self._missing = False
        self._route()
        if self._missing:
            body = open(os.path.join(ROOT, "404.html"), "rb").read()
            self.send_response(404)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        super().do_GET()

    def do_HEAD(self):
        self._missing = False
        self._route()
        super().do_HEAD()

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_message(self, *args):
        pass


if __name__ == "__main__":
    print(f"Preview: http://localhost:{PORT}")
    http.server.ThreadingHTTPServer(("127.0.0.1", PORT), functools.partial(Handler, directory=ROOT)).serve_forever()
