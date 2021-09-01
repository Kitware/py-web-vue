import pywebvue
import random

app = pywebvue.App("Getting started")

QUOTES = [
    "It is easier to act yourself into a new way of thinking, than it is to think yourself into a new way of acting. - Millard Fuller",
    "Man is most nearly himself when he achieves the seriousness of a child at play. - Heraclitus",
    "What a man hasn't been reasoned into believing, he cannot be reasoned out of believing.",
    "Time has no practical value without attention. - Tim Ferriss",
    "Shedding one’s skin. The snake that cannot shed its skin perishes. So do the spirits who are prevented from changing their opinions; they cease to be spirit. - Nietzsche",
    "Envy of other people shows how they are unhappy. Their continual attention to others behavior shows how they are boring. - Seneca",
]


def generate_content():
    idx = random.randint(0, len(QUOTES) - 1)
    quote = QUOTES[idx]
    app.set("idx", idx)
    app.set("quote", quote)
    return f"""
    <v-app>
      <v-app-bar app>
        <v-btn icon @click="trigger('updateLayout')" class="mr-2">
            <v-icon>mdi-dice-{idx + 1}</v-icon>
        </v-btn> Random Quote Generator
        {{{{ idx + 1 }}}}
      </v-app-bar>
      <v-main>
        <v-container fluid>
          <v-row>
            <v-col cols="6">
              <v-card elevation="2" outlined shaped>
                <v-card-text>
                  {quote}
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card elevation="2" outlined shaped>
                <v-card-text>
                  {{{{ quote }}}}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
"""


app.layout = generate_content()

app.state = {
    "idx": 0,
    "quote": "nothing...",
}

# -----------------------------------------------------------------------------
# Callbacks
# -----------------------------------------------------------------------------


@app.trigger("updateLayout")
def update_ayout():
    app.layout = generate_content()


# -----------------------------------------------------------------------------
# MAIN
#   python ./examples/.../app.py --port 1234
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    app.run_server()
