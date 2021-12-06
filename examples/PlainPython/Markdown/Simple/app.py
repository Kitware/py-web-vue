import os
from pywebvue import App
from pywebvue.modules import Markdown

app = App("Basic Markdown Example")
app.enable_module(Markdown)

# Read markdown file
md_file_path = os.path.join(os.path.dirname(__file__), "demo.md")
with open(md_file_path) as md:
    markdown_content = md.read()

app.state = {"mdContent": markdown_content}
app.layout = """
    <markdown-it-vue
        class="md-body"
        style="padding: 20px"
        :content="mdContent"
    />
"""

# -----------------------------------------------------------------------------
# Start server
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    app.run_server()
