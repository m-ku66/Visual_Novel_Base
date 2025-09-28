export const unityRoute = {
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
};
