import re
import unittest
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class HomepageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        self.keys = {}
        self.sections = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.stack.append((tag, attrs))
        key = attrs.get("data-i18n")
        if key:
            self.keys.setdefault(key, {"attrs": attrs, "text": []})
        if tag == "section":
            self.sections.append(attrs)

    def handle_endtag(self, tag):
        for index in range(len(self.stack) - 1, -1, -1):
            if self.stack[index][0] == tag:
                del self.stack[index:]
                break

    def handle_data(self, data):
        for _, attrs in self.stack:
            key = attrs.get("data-i18n")
            if key:
                self.keys[key]["text"].append(data)


class HomepageVisibilityTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.index = (ROOT / "index.html").read_text(encoding="utf-8")
        cls.css = (ROOT / "style.css").read_text(encoding="utf-8")
        cls.i18n = (ROOT / "i18n.js").read_text(encoding="utf-8")
        cls.parser = HomepageParser()
        cls.parser.feed(cls.index)

    def test_required_home_content_is_rendered_not_hidden_or_commented(self):
        required = {
            "home.intro.bio",
            "cv.edu.heading",
            "cv.edu.1.period",
            "cv.edu.1.title",
            "cv.edu.1.desc",
        }
        self.assertEqual(set(), required - self.parser.keys.keys())
        for key in required:
            self.assertNotIn("hidden", self.parser.keys[key]["attrs"], key)
            self.assertNotIn("data-hide-when-empty", self.parser.keys[key]["attrs"], key)

    def test_patent_and_software_are_absent_from_home_and_i18n(self):
        forbidden_prefixes = ("home.patents.", "home.software.")
        self.assertFalse(
            any(key.startswith(forbidden_prefixes) for key in self.parser.keys),
            "Patent/Software i18n keys must not be rendered on Home",
        )
        dictionary_keys = set(re.findall(r'"([^"]+)"\s*:', self.i18n))
        self.assertFalse(
            any(key.startswith(forbidden_prefixes) for key in dictionary_keys),
            "Patent/Software keys must not remain in the dictionaries",
        )

    def test_home_section_order_and_no_project_or_blog_body_sections(self):
        headings = re.findall(r'<h2[^>]+data-i18n="([^"]+)"', self.index)
        self.assertEqual(
            [
                "home.interests.heading",
                "cv.edu.heading",
                "home.awards.heading",
            ],
            headings,
        )
        self.assertNotRegex(self.index, r'class="[^"]*home-(?:projects|latest|blog)')

    def test_school_and_lab_row_is_two_columns_and_stacks_at_620px(self):
        self.assertRegex(
            self.css,
            r"\.education-row\s*\{[^}]*grid-template-columns:\s*minmax\(8rem,\s*11rem\)\s+minmax\(0,\s*1fr\)",
        )
        mobile_blocks = re.findall(r"@media\s*\(max-width:\s*620px\)\s*\{(.*?)\n\}", self.css, re.S)
        if not mobile_blocks:
            self.fail("missing 620px media query")
        self.assertRegex("\n".join(mobile_blocks), r"\.education-row[^}]*\{[^}]*grid-template-columns:\s*1fr")

    def test_ko_and_en_have_matching_nonempty_author_placeholders(self):
        blocks = re.findall(r"^  (?:ko|en):\s*\{(.*?)^  \}", self.i18n, re.S | re.M)
        self.assertEqual(2, len(blocks))
        key_sets = [set(re.findall(r'"([^"]+)"\s*:', block)) for block in blocks]
        self.assertEqual(key_sets[0], key_sets[1])
        author_keys = {
            "home.intro.bio",
            "cv.edu.1.period",
            "cv.edu.1.title",
            "cv.edu.1.desc",
        }
        for block in blocks:
            values = dict(re.findall(r'"([^"]+)"\s*:\s*"([^"]*)"', block))
            for key in author_keys:
                self.assertTrue(values[key].strip(), key)

    def test_built_homepage_contains_visible_required_content(self):
        built = ROOT / "_site" / "index.html"
        self.assertTrue(built.exists(), "run `bundle exec jekyll build` first")
        parser = HomepageParser()
        parser.feed(built.read_text(encoding="utf-8"))
        for key in (
            "home.intro.bio",
            "cv.edu.heading",
            "cv.edu.1.period",
            "cv.edu.1.title",
            "cv.edu.1.desc",
        ):
            self.assertIn(key, parser.keys)
            self.assertNotIn("hidden", parser.keys[key]["attrs"], key)
            self.assertTrue("".join(parser.keys[key]["text"]).strip(), key)
        self.assertFalse(
            any(
                key.startswith(("home.patents.", "home.software."))
                for key in parser.keys
            ),
            "built Home must not expose Patent/Software placeholders",
        )


if __name__ == "__main__":
    unittest.main()
