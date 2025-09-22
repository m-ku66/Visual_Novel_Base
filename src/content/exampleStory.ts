import type { GameStory } from "../types/vn";

/**
 * Enhanced example story demonstrating the hybrid point system:
 * - Universal points: courage, kindness, wisdom, magic
 * - Prologue points: dragon_encounter, leadership
 * - Route points: alice_bond, bob_trust, etc.
 *
 * New features demonstrated:
 * - Conditional choices based on points
 * - Multiple ending requirements
 * - Secret endings with high point requirements
 * - Route access based on prologue points
 */
export const exampleStory: GameStory = {
  title: "The Dragon's Choice",
  description:
    "A tale of courage, friendship, and magic in a world threatened by dragons.",

  pointTypes: {
    universal: {
      courage: "Courage",
      kindness: "Kindness",
      wisdom: "Wisdom",
      magic: "Magic Affinity",
    },
    prologue: {
      dragon_encounter: "Dragon Encounter",
      leadership: "Leadership",
    },
    route: {
      alice_bond: "Bond with Alice",
      bob_trust: "Trust with Bob",
      alice_romance: "Romance with Alice",
      survival_skills: "Survival Skills",
    },
  },

  prologue: [
    {
      id: "intro",
      title: "A Strange New World",
      characters: ["Dragon"],
      slides: [
        {
          id: "awakening",
          text: "You wake up in a fantasy world, confused and disoriented. The last thing you remember is falling asleep at your desk.",
        },
        {
          id: "dragon_appears",
          text: "Suddenly, a massive dragon appears in the sky above you, breathing fire and causing panic among the nearby villagers.",
        },
        {
          id: "child_in_danger",
          text: "As people flee in terror, you notice a small child who has fallen and can't get up. The dragon is circling back...",
          choices: [
            {
              text: "Rush to save the child despite the danger",
              universalPoints: { courage: 3, kindness: 2 },
              prologuePoints: { dragon_encounter: 2 },
            },
            {
              text: "Shout a warning to alert others nearby",
              universalPoints: { kindness: 1, wisdom: 1 },
              prologuePoints: { leadership: 1 },
            },
            {
              text: "Take cover and observe the situation carefully",
              universalPoints: { wisdom: 2 },
              prologuePoints: { dragon_encounter: 1 },
            },
          ],
        },
      ],
    },
    {
      id: "aftermath",
      title: "The Aftermath",
      slides: [
        {
          id: "dragon_aftermath",
          text: "The dragon eventually flies away, leaving destruction in its wake. Two strangers approach you.",
        },
        {
          id: "impressed_strangers",
          text: "Your actions during the dragon attack seem to have impressed them both.",
        },
      ],
    },
    {
      id: "choice_point",
      title: "The Escape",
      characters: ["Alice", "Bob"],
      slides: [
        {
          id: "alice_introduction",
          speaker: "Alice",
          text: "I saw what you did back there. You've got guts. Come with me to the forest - I know a secret path the dragon can't follow!",
        },
        {
          id: "bob_introduction",
          speaker: "Bob",
          text: "That was brave, but reckless. The caves are safer. I've got supplies and ancient knowledge hidden there.",
        },
        {
          id: "magical_energy",
          text: "As you consider your options, you feel a strange energy building within you...",
          choices: [
            {
              text: "Try to sense the magical energy around you",
              universalPoints: { magic: 2, wisdom: 1 },
              requires: { universal: { wisdom: 1 } },
            },
            {
              text: "Focus on the immediate danger",
              universalPoints: { courage: 1 },
            },
          ],
        },
        {
          id: "route_choice",
          text: "You have to make a choice quickly - the dragon might return!",
          choices: [
            {
              text: "Follow Alice to the forest",
              routeId: "alice",
            },
            {
              text: "Go with Bob to the caves",
              routeId: "bob",
            },
            {
              text: "Suggest all three of you work together",
              routeId: "unity",
              requires: { prologue: { leadership: 1 } },
            },
          ],
        },
      ],
    },
  ],

  routes: {
    alice: {
      id: "alice",
      name: "Alice's Forest Route",
      description: "A path of nature, survival, and growing bonds",
      scenes: [
        {
          id: "forest_escape",
          title: "Into the Woods",
          characters: ["Alice"],
          slides: [
            {
              id: "forest_cover",
              text: "You follow Alice into the dense forest. The trees provide good cover from the dragon above.",
            },
            {
              id: "alice_intro",
              speaker: "Alice",
              text: "I'm Alice, by the way. I'm a ranger - I know these woods like the back of my hand.",
            },
            {
              id: "forest_knowledge_test",
              text: "As you walk, Alice tests your forest knowledge and survival instincts.",
              choices: [
                {
                  text: "Share your knowledge of plants and herbs",
                  universalPoints: { wisdom: 1 },
                  routePoints: { alice_bond: 2, survival_skills: 1 },
                  requires: { universal: { wisdom: 2 } },
                },
                {
                  text: "Admit you're completely new to this but eager to learn",
                  universalPoints: { kindness: 1 },
                  routePoints: { alice_bond: 1 },
                },
                {
                  text: "Try to impress her with your courage from earlier",
                  routePoints: { alice_bond: 1 },
                  requires: { universal: { courage: 2 } },
                },
              ],
            },
          ],
        },
        {
          id: "forest_camp",
          title: "The Hidden Camp",
          characters: ["Alice"],
          slides: [
            {
              id: "hidden_camp",
              text: "Alice leads you to a well-hidden camp with a small cabin. It's cozy and feels secure.",
            },
            {
              id: "alice_base",
              speaker: "Alice",
              text: "This is my base. We should be safe here while we figure out what's going on with that dragon.",
            },
            {
              id: "relationship_building",
              text: "Over the next few days, you and Alice work together. Your relationship deepens.",
              choices: [
                {
                  text: "Focus on learning survival skills from Alice",
                  universalPoints: { wisdom: 1 },
                  routePoints: { alice_bond: 1, survival_skills: 2 },
                },
                {
                  text: "Spend time getting to know Alice personally",
                  universalPoints: { kindness: 1 },
                  routePoints: { alice_romance: 2, alice_bond: 1 },
                },
                {
                  text: "Practice magic in secret while helping Alice",
                  universalPoints: { magic: 2 },
                  routePoints: { alice_bond: 1 },
                  requires: { universal: { magic: 2 } },
                },
              ],
            },
            {
              id: "evening_reflection",
              text: "One evening, Alice opens up about her past while you both sit by the fire.",
            },
            {
              id: "alice_vulnerability",
              speaker: "Alice",
              text: "I became a ranger after my village was destroyed by monsters. Sometimes I wonder if I'm strong enough to really protect anyone.",
              choices: [
                {
                  text: "Reassure her about her strength and skills",
                  universalPoints: { kindness: 2 },
                  routePoints: { alice_bond: 2 },
                },
                {
                  text: "Share your own fears and uncertainties",
                  universalPoints: { courage: 1, kindness: 1 },
                  routePoints: { alice_romance: 1, alice_bond: 1 },
                },
                {
                  text: "Promise to help her become even stronger",
                  universalPoints: { courage: 1 },
                  routePoints: { alice_bond: 1 },
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
          description:
            "A partnership built on mutual respect and shared purpose",
          priority: 1,
          requires: {
            route: { alice_bond: 4 },
            universal: { wisdom: 2 },
          },
          scenes: [
            {
              id: "alice_friend_end",
              title: "A New Purpose",
              slides: [
                {
                  id: "months_later_ranger",
                  text: "Months later, you've become an excellent ranger under Alice's guidance.",
                },
                {
                  id: "alice_partnership_offer",
                  speaker: "Alice",
                  text: "You've really taken to this life. Want to be my partner in protecting these woods?",
                },
                {
                  id: "guardian_purpose",
                  text: "You smile and nod. You've found your calling as a forest guardian, protecting this magical world alongside your best friend Alice.",
                },
              ],
            },
          ],
        },
        {
          id: "alice_romance",
          name: "Love in the Forest",
          description: "A deep romantic bond forged in the wilderness",
          priority: 2,
          requires: {
            route: { alice_romance: 3, alice_bond: 3 },
            universal: { kindness: 3 },
          },
          scenes: [
            {
              id: "alice_romance_end",
              title: "A Deeper Bond",
              slides: [
                {
                  id: "deeper_relationship",
                  text: "Over time, your relationship with Alice has grown into something deeper than friendship.",
                },
                {
                  id: "alice_love_confession",
                  speaker: "Alice",
                  text: "I never expected to find someone like you in this crazy situation. I'm glad you chose to follow me that day.",
                },
                {
                  id: "forest_love_sunset",
                  text: "As you watch the sunset together from your forest home, you realize you've found both love and a new life in this magical world.",
                },
              ],
            },
          ],
        },
        {
          id: "alice_sage",
          name: "The Forest Sage",
          description: "A master of both nature and magic",
          priority: 3,
          isSecretEnding: true,
          achievementName: "Master of Nature",
          requires: {
            route: { alice_bond: 3, survival_skills: 3 },
            universal: { magic: 4, wisdom: 4 },
          },
          scenes: [
            {
              id: "alice_sage_end",
              title: "Awakening of the Forest Sage",
              slides: [
                {
                  id: "magical_growth",
                  text: "Your magical abilities have grown exponentially under Alice's tutelage and the forest's influence.",
                },
                {
                  id: "alice_sage_recognition",
                  speaker: "Alice",
                  text: "You've become something I've only heard about in legends - a Forest Sage. The very trees speak to you now.",
                },
                {
                  id: "legendary_protectors",
                  text: "Together, you and Alice become legendary protectors, using magic and nature to guard the realm against all threats, including dragons.",
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
      description: "A path of ancient mysteries and magical discovery",
      scenes: [
        {
          id: "cave_escape",
          title: "Underground Safety",
          characters: ["Bob"],
          slides: [
            {
              id: "cave_entrance",
              text: "Bob leads you to a network of caves carved into the mountainside. It's dark but feels secure.",
            },
            {
              id: "bob_introduction",
              speaker: "Bob",
              text: "I'm Bob - I used to be a miner before all this dragon business started. These caves go deep and hold many secrets.",
            },
            {
              id: "cave_supplies",
              text: "The caves are surprisingly well-stocked with supplies and have a mysterious, ancient feel.",
              choices: [
                {
                  text: "Ask Bob about the history of these caves",
                  universalPoints: { wisdom: 1 },
                  routePoints: { bob_trust: 2 },
                },
                {
                  text: "Offer to help organize his supplies",
                  universalPoints: { kindness: 1 },
                  routePoints: { bob_trust: 1 },
                },
                {
                  text: "Explore deeper into the caves",
                  universalPoints: { courage: 1 },
                  routePoints: { bob_trust: 1 },
                },
              ],
            },
          ],
        },
        {
          id: "cave_discovery",
          title: "Ancient Secrets",
          characters: ["Bob"],
          slides: [
            {
              id: "ancient_markings",
              text: "While exploring the deeper caves with Bob, you discover ancient markings on the walls.",
            },
            {
              id: "bob_amazement",
              speaker: "Bob",
              text: "I've never seen anything like this before. These symbols... they seem to glow when you're near them.",
            },
            {
              id: "magical_connection",
              text: "You realize you might have some kind of special connection to this world's ancient magic.",
              choices: [
                {
                  text: "Study the ancient magic symbols intensively",
                  universalPoints: { magic: 3, wisdom: 1 },
                  routePoints: { bob_trust: 1 },
                },
                {
                  text: "Focus on practical survival in the caves",
                  universalPoints: { wisdom: 1 },
                  routePoints: { bob_trust: 2, survival_skills: 2 },
                },
                {
                  text: "Try to commune with the ancient spirits",
                  universalPoints: { magic: 2, courage: 1 },
                  routePoints: { bob_trust: 1 },
                  requires: { universal: { magic: 3 } },
                },
              ],
            },
            {
              id: "bob_revelation",
              text: "Bob reveals more about his past and the caves' significance.",
            },
            {
              id: "cave_history",
              speaker: "Bob",
              text: "These caves belonged to an ancient civilization of mages. I've been trying to understand their knowledge for years, but I lack the magical talent. You might be different.",
              choices: [
                {
                  text: "Promise to help Bob unlock the caves' secrets",
                  universalPoints: { kindness: 2 },
                  routePoints: { bob_trust: 3 },
                },
                {
                  text: "Suggest working together as equal partners",
                  universalPoints: { wisdom: 1 },
                  routePoints: { bob_trust: 2 },
                },
              ],
            },
          ],
        },
      ],
      endings: [
        {
          id: "bob_scholar",
          name: "The Cave Scholar",
          description: "A partnership focused on knowledge and discovery",
          priority: 1,
          requires: {
            route: { bob_trust: 4 },
            universal: { wisdom: 3 },
          },
          scenes: [
            {
              id: "bob_scholar_end",
              title: "Keepers of Ancient Knowledge",
              slides: [
                {
                  id: "ancient_experts",
                  text: "You and Bob have become the foremost experts on the ancient magical civilization.",
                },
                {
                  id: "bob_wisdom_keepers",
                  speaker: "Bob",
                  text: "Together, we've unlocked secrets that were lost for centuries. We're like the new guardians of ancient wisdom.",
                },
                {
                  id: "legendary_scholars",
                  text: "Your combined knowledge helps protect the realm from magical threats, making you both legendary scholars.",
                },
              ],
            },
          ],
        },
        {
          id: "bob_mage",
          name: "The Awakened Mage",
          description: "A master of ancient magical arts",
          priority: 2,
          requires: {
            route: { bob_trust: 3 },
            universal: { magic: 4 },
          },
          scenes: [
            {
              id: "bob_magic_end",
              title: "Magical Awakening",
              slides: [
                {
                  id: "magical_awakening",
                  text: "Your studies of the ancient magic have awakened powerful abilities within you.",
                },
                {
                  id: "bob_mage_recognition",
                  speaker: "Bob",
                  text: "I can't believe it - you're like those legendary mages from the old stories!",
                },
                {
                  id: "peace_mission",
                  text: "With your newfound magical powers and Bob as your loyal companion, you set out to bring peace to this troubled world.",
                },
              ],
            },
          ],
        },
        {
          id: "bob_archmage",
          name: "The Archmage Ascendant",
          description: "A being of incredible magical power",
          priority: 3,
          isSecretEnding: true,
          achievementName: "Master of All Magic",
          requires: {
            route: { bob_trust: 5 },
            universal: { magic: 6, wisdom: 4, courage: 3 },
          },
          scenes: [
            {
              id: "bob_archmage_end",
              title: "Ascension to Archmage",
              slides: [
                {
                  id: "transcendence",
                  text: "You've transcended mortal limitations, becoming an Archmage of unprecedented power.",
                },
                {
                  id: "bob_awe",
                  speaker: "Bob",
                  text: "You've become something beyond even the ancient mages. The very fabric of magic bends to your will.",
                },
                {
                  id: "world_reshape",
                  text: "As the new Archmage, you reshape the world itself, ending the dragon threat and ushering in a new age of peace and magical prosperity.",
                },
              ],
            },
          ],
        },
      ],
    },

    unity: {
      id: "unity",
      name: "The Unity Route",
      description: "A path where all three companions work together",
      requires: {
        prologue: { leadership: 1 },
      },
      scenes: [
        {
          id: "unity_beginning",
          title: "Strength in Numbers",
          characters: ["Alice", "Bob"],
          slides: [
            {
              id: "unity_proposal",
              text: "Your suggestion to work together surprises both Alice and Bob, but they agree to try.",
            },
            {
              id: "alice_cooperation",
              speaker: "Alice",
              text: "I suppose the forest and caves aren't that far apart. We could use both as safe havens.",
            },
            {
              id: "bob_synergy",
              speaker: "Bob",
              text: "And my knowledge combined with Alice's skills... that could be powerful.",
            },
            {
              id: "leadership_responsibility",
              text: "Leading this small group, you feel a sense of responsibility and purpose.",
              choices: [
                {
                  text: "Focus on building trust between Alice and Bob",
                  universalPoints: { kindness: 2, wisdom: 1 },
                  routePoints: { alice_bond: 1, bob_trust: 1 },
                },
                {
                  text: "Take charge and assign roles to each person",
                  universalPoints: { courage: 2 },
                  routePoints: { alice_bond: 1, bob_trust: 1 },
                  requires: { prologue: { leadership: 1 } },
                },
                {
                  text: "Suggest exploring magical solutions together",
                  universalPoints: { magic: 2, wisdom: 1 },
                  routePoints: { alice_bond: 1, bob_trust: 1 },
                  requires: { universal: { magic: 2 } },
                },
              ],
            },
          ],
        },
      ],
      endings: [
        {
          id: "unity_leader",
          name: "The True Leader",
          description: "A leader who unites all allies",
          priority: 3,
          isSecretEnding: true,
          achievementName: "Unity Bringer",
          requires: {
            route: { alice_bond: 3, bob_trust: 3 },
            universal: { courage: 4, kindness: 4, wisdom: 3 },
          },
          scenes: [
            {
              id: "unity_leader_end",
              title: "The Leader's Path",
              slides: [
                {
                  id: "team_formation",
                  text: "Under your leadership, Alice and Bob have not only become friends but formed an unstoppable team.",
                },
                {
                  id: "alice_leadership_praise",
                  speaker: "Alice",
                  text: "You brought us together when we might have gone our separate ways. That's true leadership.",
                },
                {
                  id: "bob_synergy_praise",
                  speaker: "Bob",
                  text: "With your guidance, we've become something greater than the sum of our parts.",
                },
                {
                  id: "legendary_unity",
                  text: "Together, your united group becomes legendary, bringing peace to the realm and showing that cooperation triumphs over conflict.",
                },
              ],
            },
          ],
        },
      ],
    },
  },
};
