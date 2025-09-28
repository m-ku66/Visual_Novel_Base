export const aliceRoute = {
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
          text: "I'm Alice, by the way. I'm a ranger - I know these woods like the back of my hand... at least, I used to before all this dragon chaos started.",
        },
        {
          id: "alice_exposition I",
          speaker: "Alice",
          text: "I thought they only existed on the continent of Bershka, but I guess that may not be the case anymore...",
        },
        {
          id: "alice_exposition II",
          text: "She seems knowledgeable about dragons and the world you find yourself in, but is clearly troubled by the recent events. It seems like what happened is out of the ordinary. Maybe you have something to do with it?",
        },
        {
          id: "alice_exposition III",
          speaker: "Alice",
          text: "Anyway, I got ahead of myself. What's your name?",
        },
        {
          id: "name_response",
          text: "She's asking for your name...",
          choices: [
            {
              text: "Tell her your name",
              universalPoints: { kindness: 1 },
              routePoints: { alice_bond: 1 },
            },
            {
              text: "Make up a name to keep your identity secret",
              universalPoints: { magic: 1 },
              routePoints: { alice_bond: -1, survival_skills: 1 },
            },
            {
              text: "Deflect the question and ask about her instead",
              universalPoints: { kindness: 1, wisdom: 1 },
              routePoints: { alice_bond: -1, alice_romance: 1 },
            },
          ],
        },
        {
          id: "alice_exposition IV - truth",
          speaker: "Alice",
          text: "...That's an odd name...but it suits you. In any case, we should keep moving.",
          requires: { route: { alice_bond: 1 } },
        },
        {
          id: "alice_exposition IV - mystery",
          speaker: "Alice",
          text: "Being sneaky might help you survive, but it won't help us trust each other. Still, I get it. Let's keep moving.",
          requires: { route: { alice_bond: -1, alice_romance: 1 } },
        },
        {
          id: "alice_exposition IV - lie",
          speaker: "Alice",
          text: "...Okay. In any case, we should keep moving.",
          requires: { route: { alice_bond: -1, survival_skills: 1 } },
        },
        {
          id: "forest_knowledge_test",
          text: "As you walk, Alice tests your forest knowledge and survival instincts.",
          choices: [
            {
              text: "Share your knowledge of plants and herbs",
              universalPoints: { wisdom: 1 },
              routePoints: { alice_bond: 2, survival_skills: 1 },
              requires: {
                universal: { wisdom: 2 },
                route: { survival_skills: 1 },
              },
            },
            {
              text: "Admit you're completely new to this but eager to learn",
              universalPoints: { kindness: 1 },
              routePoints: { alice_bond: 1, survival_skills: 1 },
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
              routePoints: { alice_bond: 1, survival_skills: 3 },
            },
            {
              text: "Spend time getting to know Alice personally",
              universalPoints: { kindness: 1 },
              routePoints: { alice_romance: 2, alice_bond: 1 },
            },
            {
              text: "Practice magic in secret while helping Alice",
              universalPoints: { magic: 2 },
              routePoints: { alice_bond: 1, survival_skills: 1 },
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
              universalPoints: { kindness: 3, wisdom: 1 },
              routePoints: { alice_bond: 2 },
            },
            {
              text: "Share your own fears and uncertainties",
              universalPoints: { courage: 2, kindness: 1 },
              routePoints: { alice_romance: 1, alice_bond: 1 },
            },
            {
              text: "Promise to help her become even stronger",
              universalPoints: { courage: 1 },
              routePoints: { alice_bond: 2, survival_skills: 2 },
            },
          ],
        },
        {
          id: "alice_night I",
          text: "As the night deepens, you both feel a growing connection, whether as friends or something more...you're unsure, but Alice comes to visit you while you sleep.",
          requires: { route: { alice_romance: 4, alice_bond: 3 } },
        },
        {
          id: "alice_night II",
          speaker: "Alice",
          text: "Hey, you awake still..? I couldn't sleep. Mind if I stay here a while?",
          requires: { route: { alice_romance: 4, alice_bond: 3 } },
          choices: [
            {
              text: "Welcome her to stay",
              universalPoints: { kindness: 2 },
              routePoints: { alice_romance: 1 },
            },
            {
              text: "Suggest going for a walk to clear your minds",
              universalPoints: { wisdom: 1 },
              routePoints: { alice_romance: 1 },
            },
            {
              text: "Admit that you're a bit too tired and prefer to rest alone",
              universalPoints: { courage: 1 },
              routePoints: { alice_romance: -3, alice_bond: -2 },
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
      description: "A partnership built on mutual respect and shared purpose",
      priority: 1,
      requires: {
        route: { alice_bond: 4 },
        universal: { wisdom: 2, kindness: 2 },
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
        route: { alice_romance: 3, alice_bond: 1 },
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
        universal: { magic: 3, wisdom: 3 },
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
};
