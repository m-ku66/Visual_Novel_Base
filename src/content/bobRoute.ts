export const bobRoute = {
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
          id: "bob_introduction I",
          speaker: "Bob",
          text: "I'm Bob - I used to be a miner before all this dragon business started. These caves go deep and hold many secrets.",
        },
        {
          id: "bob_introduction II",
          text: "He seems knowledgeable about the caves and the world you find yourself in, but is clearly troubled by the recent events. It seems like what happened is out of the ordinary. Maybe you have something to do with it?",
        },
        {
          id: "bob_introduction III",
          speaker: "Bob",
          text: "We should keep moving before that dragon comes back...but first, what's your name?",
        },
        {
          id: "name_response",
          text: "He's asking for your name...",
          choices: [
            {
              text: "Tell him your name",
              universalPoints: { kindness: 1 },
              routePoints: { bob_trust: 1 },
            },
            {
              text: "Make up a name to keep your identity secret",
              universalPoints: { magic: 1 },
              routePoints: { bob_trust: -1, survival_skills: 1 },
            },
            {
              text: "Deflect the question and ask about him instead",
              universalPoints: { wisdom: 3 },
            },
          ],
        },
        {
          id: "bob_introduction IV - truth",
          speaker: "Bob",
          text: "Hrm...A solid, yet foreign name... In any case, we should keep moving.",
          requires: { route: { bob_trust: 1 } },
        },
        {
          id: "bob_introduction IV - mystery",
          speaker: "Bob",
          text: "One with words, eh? I'm just a simple miner; nothing fancy. Let's keep moving for now.",
          requires: { universal: { wisdom: 3 } },
        },
        {
          id: "bob_introduction IV - lie",
          speaker: "Bob",
          text: "Hrm...Alright. In any case, we should keep moving.",
          requires: { route: { bob_trust: -1, survival_skills: 1 } },
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
};
