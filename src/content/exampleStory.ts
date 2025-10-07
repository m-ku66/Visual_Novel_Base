import type { GameStory } from "../types/vn";
import { aliceRoute } from "./aliceRoute";
import { bobRoute } from "./bobRoute";
import { unityRoute } from "./unityRoute";
import { characters } from "./characters";

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
  characters,
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
          id: "dragon_appears I",
          text: "Things quickly take a turn for the worse when you hear a deafening roar.",
        },
        {
          id: "dragon_appears II",
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
          id: "alice_introduction I",
          speaker: "Alice",
          text: "I saw what you did back there. You've got guts. Come with me to the forest - I know a secret path the dragon can't follow!",
        },
        {
          id: "alice_introduction II",
          text: "The girl has pointy ears and a quiver of arrows on her back. She looks like a skilled ranger.",
        },
        {
          id: "bob_introduction I",
          speaker: "Bob",
          text: "That was brave, but reckless. The caves are safer. I've got supplies and ancient knowledge hidden there.",
        },
        {
          id: "bob_introduction II",
          text: "He has a rugged appearance, with a weathered face and a sturdy build. He carries a large backpack.",
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
    alice: aliceRoute as any,
    bob: bobRoute as any,
    unity: unityRoute as any,
  },
};
