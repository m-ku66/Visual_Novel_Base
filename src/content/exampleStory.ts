import type { GameStory } from "../types/vn";

/**
 * Example story demonstrating the structure:
 * Prologue → Route Selection → Routes → Endings
 */
export const exampleStory: GameStory = {
  // Shared beginning for all players
  prologue: [
    {
      id: "intro",
      title: "A Strange New World",
      characters: ["Dragon"],
      slides: [
        {
          text: "You wake up in a fantasy world, confused and disoriented. The last thing you remember is falling asleep at your desk.",
        },
        {
          text: "Suddenly, a massive dragon appears in the sky above you, breathing fire and causing panic among the nearby villagers.",
        },
        {
          text: "Two strangers run up to you, both offering to help you escape to safety.",
        },
      ],
    },
    {
      id: "choice_point",
      title: "The Escape",
      characters: ["Alice", "Bob"],
      slides: [
        {
          speaker: "Alice",
          text: "Quick! Come with me to the forest! I know a secret path the dragon can't follow!",
        },
        {
          speaker: "Bob",
          text: "No way! The caves are safer! I've got supplies hidden there!",
        },
        {
          text: "You have to make a choice quickly - the dragon is getting closer!",
          choices: [
            {
              text: "Follow Alice to the forest",
              routeId: "alice",
            },
            {
              text: "Go with Bob to the caves",
              routeId: "bob",
            },
          ],
        },
      ],
    },
  ],

  // Different story routes
  routes: {
    alice: {
      id: "alice",
      name: "Alice's Forest Route",
      scenes: [
        {
          id: "forest_escape",
          title: "Into the Woods",
          characters: ["Alice"],
          slides: [
            {
              text: "You follow Alice into the dense forest. The trees provide good cover from the dragon above.",
            },
            {
              speaker: "Alice",
              text: "I'm Alice, by the way. I'm a ranger - I know these woods like the back of my hand.",
            },
            {
              text: "As you walk deeper into the forest, you start to feel safer. Alice seems confident and capable.",
            },
          ],
        },
        {
          id: "forest_camp",
          title: "The Hidden Camp",
          characters: ["Alice"],
          slides: [
            {
              text: "Alice leads you to a well-hidden camp with a small cabin. It's cozy and feels secure.",
            },
            {
              speaker: "Alice",
              text: "This is my base. We should be safe here while we figure out what's going on with that dragon.",
            },
            {
              text: "Over the next few days, you and Alice work together to understand this new world.",
              choices: [
                {
                  text: "Focus on learning survival skills from Alice",
                  points: { survival: 2, friendship: 1 },
                },
                {
                  text: "Spend time getting to know Alice personally",
                  points: { romance: 2, friendship: 1 },
                },
              ],
            },
          ],
        },
      ],
      endings: [
        {
          id: "alice_friendship",
          name: "Forest Guardian",
          scenes: [
            {
              id: "alice_friend_end",
              title: "A New Purpose",
              slides: [
                {
                  text: "Months later, you've become an excellent ranger under Alice's guidance.",
                },
                {
                  speaker: "Alice",
                  text: "You've really taken to this life. Want to be my partner in protecting these woods?",
                },
                {
                  text: "You smile and nod. You've found your calling as a forest guardian, protecting this magical world alongside your best friend Alice.",
                },
              ],
            },
          ],
        },
        {
          id: "alice_romance",
          name: "Love in the Forest",
          scenes: [
            {
              id: "alice_romance_end",
              title: "A Deeper Bond",
              slides: [
                {
                  text: "Over time, your relationship with Alice has grown into something deeper than friendship.",
                },
                {
                  speaker: "Alice",
                  text: "I never expected to find someone like you in this crazy situation. I'm glad you chose to follow me that day.",
                },
                {
                  text: "As you watch the sunset together from your forest home, you realize you've found both love and a new life in this magical world.",
                },
              ],
            },
          ],
        },
      ],
    },

    bob: {
      id: "bob",
      name: "Bob's Cave Route",
      scenes: [
        {
          id: "cave_escape",
          title: "Underground Safety",
          characters: ["Bob"],
          slides: [
            {
              text: "Bob leads you to a network of caves carved into the mountainside. It's dark but feels secure.",
            },
            {
              speaker: "Bob",
              text: "I'm Bob - I used to be a miner before all this dragon business started. These caves go deep.",
            },
            {
              text: "The caves are surprisingly well-stocked with supplies and have a mysterious, ancient feel to them.",
            },
          ],
        },
        {
          id: "cave_discovery",
          title: "Ancient Secrets",
          characters: ["Bob"],
          slides: [
            {
              text: "While exploring the deeper caves with Bob, you discover ancient markings on the walls.",
            },
            {
              speaker: "Bob",
              text: "I've never seen anything like this before. These symbols... they seem to glow when you're near them.",
            },
            {
              text: "You realize you might have some kind of special connection to this world's ancient magic.",
              choices: [
                {
                  text: "Study the ancient magic symbols intensively",
                  points: { magic: 3 },
                },
                {
                  text: "Focus on practical survival in the caves",
                  points: { survival: 2, friendship: 1 },
                },
              ],
            },
          ],
        },
      ],
      endings: [
        {
          id: "bob_mage",
          name: "The Awakened Mage",
          scenes: [
            {
              id: "bob_magic_end",
              title: "Magical Awakening",
              slides: [
                {
                  text: "Your studies of the ancient magic have awakened powerful abilities within you.",
                },
                {
                  speaker: "Bob",
                  text: "I can't believe it - you're like those legendary mages from the old stories!",
                },
                {
                  text: "With your newfound magical powers and Bob as your loyal companion, you set out to bring peace to this troubled world.",
                },
              ],
            },
          ],
        },
      ],
    },
  },
};
