import { Scene, ScriptMetadata } from './types';

// Let's create a helper to generate unique IDs
const makeId = () => Math.random().toString(36).substring(2, 9);

export const defaultMetadata: ScriptMetadata = {
  title: "The Case of the Missing Masala",
  subtitle: "Official Storyboard Prompt Compendium",
  author: "89Studio.in Creative Team",
  email: "production@89studio.in",
  phone: "+1 (89) STUDIO-IN",
  version: "v2.0 Gold Master",
  date: "May 19, 2026",
  copyright: "© 2026 89Studio.in. All rights reserved."
};

export const defaultScenes: Scene[] = [
  {
    id: "scene-1",
    sceneNumber: 1,
    title: "The Calm Before the Storm",
    location: "RASOI NAGAR MARKET",
    timeOfDay: "GOLDEN SUNRISE",
    estimatedDuration: "0:45",
    dialogue: [
      {
        id: makeId(),
        character: "Pyaaz Uncle",
        text: "Aaj phir aankhein bhari hain... yeh duniya samajhti kyun nahi!",
        translation: "My eyes are full again today... why doesn't this world understand!"
      },
      {
        id: makeId(),
        character: "Tamatar Bhai",
        text: "Uncle, tu roz rota hai. Koi crime nahi hua, tu bas... tu hai.",
        translation: "Uncle, you cry every day. No crime happened, you're just... you."
      },
      {
        id: makeId(),
        character: "Mirchi Madam",
        text: "Dono haato ko apne kaam se kaam rakhna.",
        translation: "Both of you mind your own business."
      },
      {
        id: makeId(),
        character: "Pyaaz Uncle",
        text: "Dekha! Usne mujhe ignore kiya! PHIR RONAaaaaa—",
        translation: "See! She ignored me! TIME TO CRY AGAIIIiiin—"
      }
    ],
    actionPrompt: "Pixar-style 3D cinematic render, wide establishing shot, vibrant Indian vegetable market at golden sunrise, Pyaaz Uncle old chubby onion man in white dhoti sitting at sabzi stall crying dramatically into soaking handkerchief mouth wide open, Tamatar Bhai smooth red tomato young man leaning coolly against red crate rolling his eyes adjusting gold chain with smirk, Mirchi Madam tall red chili woman in flowing red saree strutting past not even glancing at them green hair in fierce bun red sunglasses, colorful market banners, warm golden morning dust particles, vegetable townspeople busy, cobblestone street, speech bubble visual cues, hyperrealistic Pixar 3D cinematic render, 9:16 vertical"
  },
  {
    id: "scene-2",
    sceneNumber: 2,
    title: "Inspector Aloo Makes His Entrance",
    location: "RASOI NAGAR STREET",
    timeOfDay: "MORNING",
    estimatedDuration: "0:50",
    dialogue: [
      {
        id: makeId(),
        character: "Radio crackle",
        text: "Inspector Aloo! Rasoi Nagar ka saara garam masala... GAYAB HO GAYA!",
        translation: "Inspector Aloo! All of Rasoi Nagar's garam masala... HAS VANISHED!"
      },
      {
        id: makeId(),
        character: "Inspector Aloo",
        text: "Masala churaya kisne... uski khair nahi.",
        translation: "Whoever stole the masala... God help them."
      },
      {
        id: makeId(),
        character: "Dhaniya Devi",
        text: "Sir! Sir! Maine already 3 suspects identify kar liye hain!",
        translation: "Sir! Sir! I've already identified 3 suspects!"
      },
      {
        id: makeId(),
        character: "Inspector Aloo",
        text: "Dhaniya... tu garnish hai. Garnish chup rehti hai.",
        translation: "Dhaniya... you are garnish. Garnish stays quiet."
      },
      {
        id: makeId(),
        character: "Dhaniya Devi",
        text: "Aur aloo... bina masale ke kuch nahi hota.",
        translation: "And potato... means nothing without spice."
      },
      {
        id: makeId(),
        character: "Inspector Aloo",
        text: "...Theek hai. Bol.",
        translation: "...Fine. Talk."
      }
    ],
    actionPrompt: "Pixar-style 3D cinematic render, dramatic hero entrance, Inspector Aloo bulky potato cop bursting from tiny police jeep door foot slamming cobblestone sending dust explosion, khaki Indian police uniform immaculate, dark sunglasses blazing in sunlight, thick mustache, one hand on belt buckle pointing forward with authority, jaw set hard, Dhaniya Devi green coriander girl leaping behind him green leafy hair bouncing face bright with excitement notebook already open, vegetable crowd parting with wide eyes, long dramatic hero shadows on street, intense morning backlight, dust cloud at boots, cinematic slow motion energy frozen in peak action, hyperdetailed Pixar 3D render, 9:16 vertical"
  },
  {
    id: "scene-3",
    sceneNumber: 3,
    title: "The Crime Scene",
    location: "RUSTIC KITCHEN INTERIOR",
    timeOfDay: "MORNING",
    estimatedDuration: "0:40",
    dialogue: [
      {
        id: makeId(),
        character: "Inspector Aloo",
        text: "Haldi ke nishan... zeera ka dhakkan... aur yeh...",
        translation: "Turmeric marks... cumin lid... and this..."
      },
      {
        id: makeId(),
        character: "Dhaniya Devi",
        text: "Sir! Yahan footprint hai. Aur dekho — heel mark. High heels.",
        translation: "Sir! There's a footprint here. And look — heel mark. High heels."
      },
      {
        id: makeId(),
        character: "Inspector Aloo",
        text: "Rasoi Nagar mein high heels pehenta kaun hai...",
        translation: "Who in Rasoi Nagar wears high heels..."
      },
      {
        id: makeId(),
        character: "Both together",
        text: "Mirchi Madam.",
        translation: "Mirchi Madam."
      },
      {
        id: makeId(),
        character: "Inspector Aloo",
        text: "Par sirf woh akeli nahi kar sakti. Koi aur bhi hai.",
        translation: "But she couldn't have done it alone. Someone else is involved."
      },
      {
        id: makeId(),
        character: "Dhaniya Devi",
        text: "Gold chain ka ek tukda bhi mila hai sir... yahan.",
        translation: "There's also a piece of gold chain found here... sir."
      },
      {
        id: makeId(),
        character: "Inspector Aloo",
        text: "Tamatar.",
        translation: "Tamatar."
      }
    ],
    actionPrompt: "Pixar-style 3D cinematic render, tense crime scene investigation, rustic Indian kitchen interior, Inspector Aloo crouched extremely low magnifying glass nearly touching floor examining turmeric trail, eyes narrowed behind sunglasses in intense focus, yellow police tape across empty glowing masala shelf, overturned spice jars scattered with powder explosions of color on wooden floor, Dhaniya Devi on hands and knees beside him pointing at tiny heel footprint with shocked realization expression finger trembling slightly, flashlight cutting through dusty kitchen air, warm shaft of sunlight through window catching spice particles like golden snow, long dramatic shadows of both investigators stretching across floor, moody atmospheric close-up cinematic composition, hyperdetailed Pixar 3D render, 9:16 vertical"
  },
  {
    id: "scene-4",
    sceneNumber: 4,
    title: "Pyaaz Uncle — The Interrogation",
    location: "OUTDOOR UNDER NEEM TREE",
    timeOfDay: "AFTERNOON",
    estimatedDuration: "1:00",
    dialogue: [
      {
        id: makeId(),
        character: "Inspector Aloo",
        text: "Pyaaz Uncle! Raat ko kahan the aap?",
        translation: "Pyaaz Uncle! Where were you last night?"
      },
      {
        id: makeId(),
        character: "Pyaaz Uncle",
        text: "GHAAARRR PEEEEE THAAAA— 😭😭😭",
        translation: "I WAS AT HOOOooome— 😭😭😭"
      },
      {
        id: makeId(),
        character: "Inspector Aloo",
        text: "Koi witness hai?",
        translation: "Any witness?"
      },
      {
        id: makeId(),
        character: "Pyaaz Uncle",
        text: "Meri aankhein witness hain! Woh RAAT BHAR ROTI RAHI HAIN!",
        translation: "My eyes are the witness! They've been CRYING ALL NIGHT!"
      },
      {
        id: makeId(),
        character: "Inspector Aloo",
        text: "Yeh... yeh aankhon mein kuch gaya hai mujhe.",
        translation: "Something... something got in my eyes."
      },
      {
        id: makeId(),
        character: "Dhaniya Devi",
        text: "Sir aap bhi ro rahe ho?",
        translation: "Sir are you also crying?"
      },
      {
        id: makeId(),
        character: "Inspector Aloo",
        text: "BILKUL NAHI. Next question.",
        translation: "ABSOLUTELY NOT. Next question."
      },
      {
        id: makeId(),
        character: "Pyaaz Uncle",
        text: "Beta... mera alibi yeh hai. Main roya. Phir roya. Phir aur roya.",
        translation: "Child... my alibi is this. I cried. Then cried. Then cried more."
      },
      {
        id: makeId(),
        character: "Dhaniya Devi",
        text: "Alibi... confirmed. ✅",
        translation: "Alibi... confirmed. ✅"
      }
    ],
    actionPrompt: "Pixar-style 3D cinematic comedic render, outdoor interrogation under giant neem tree, Inspector Aloo both fists slammed on wooden table leaning aggressively forward toward Pyaaz Uncle, but secretly one tear visibly escaping under his sunglasses, Pyaaz Uncle completely exploding in tears across table rivers streaming off face soaking the table puddle forming, round spectacles fully fogged white, handkerchief completely saturated being wrung out, white dhoti damp and crumpled, onion layers visibly peeling and floating off in the breeze, Dhaniya Devi standing to side notebook held up blocking her face pretending to write but clearly holding breath with puffed cheeks turning slightly blue, entire background crowd of vegetable townspeople ALL crying involuntarily and rubbing eyes, one tomato completely face-planted on his stall table, dappled afternoon golden light through neem leaves, chaotic comedic energy, hyperdetailed Pixar 3D render, 9:16 vertical"
  },
  {
    id: "scene-5",
    sceneNumber: 5,
    title: "Tamatar Bhai Plays It Cool",
    location: "CRUMBLING WALL STREET",
    timeOfDay: "AFTERNOON",
    estimatedDuration: "0:45",
    dialogue: [
      {
        id: makeId(),
        character: "Inspector Aloo",
        text: "Tamatar. Raat ko 11 baje kahan the?",
        translation: "Tamatar. Where were you at 11pm last night?"
      },
      {
        id: makeId(),
        character: "Tamatar Bhai",
        text: "Ghar pe. Apna glow maintain kar raha tha.",
        translation: "At home. Maintaining my glow."
      },
      {
        id: makeId(),
        character: "Dhaniya Devi",
        text: "Tere shirt pe haldi ka daag hai.",
        translation: "There's a turmeric stain on your shirt."
      },
      {
        id: makeId(),
        character: "Tamatar Bhai",
        text: "Main khana kha raha tha.",
        translation: "I was eating food."
      },
      {
        id: makeId(),
        character: "Dhaniya Devi",
        text: "Raat ke 11 baje?",
        translation: "At 11pm at night?"
      },
      {
        id: makeId(),
        character: "Tamatar Bhai",
        text: "Main late dinner type hoon.",
        translation: "I'm a late dinner type."
      },
      {
        id: makeId(),
        character: "Inspector Aloo",
        text: "Tamatar bhai... tune kabhi kisi aloo ko jhooth bolte dekha hai?",
        translation: "Tamatar bhai... have you ever seen a potato get lied to?"
      },
      {
        id: makeId(),
        character: "Tamatar Bhai",
        text: "...Nahi.",
        translation: "...No."
      },
      {
        id: makeId(),
        character: "Inspector Aloo",
        text: "Smart boy.",
        translation: "Smart boy."
      }
    ],
    actionPrompt: "Pixar-style 3D cinematic render, high tension confrontation scene, Tamatar Bhai smooth red tomato young man pressed casually against crumbling wall arms crossed slow confident smirk beginning to crack very slightly at edges, white rolled-up sleeves, gold chain catching dramatic side light, single bead of sweat just appearing at temple, Inspector Aloo both hands slammed flat on wall on either side caging him in face extremely close to Tamatar's face sunglasses almost touching his forehead, jaw set like stone, Dhaniya Devi circling from the right with arms crossed head tilted studying him with narrowed suspicious green eyes, dramatic hard contrast side lighting creating intense shadows, faded urban graffiti wall, atmosphere thick with tension, hyperdetailed Pixar 3D cinematic render, 9:16 vertical"
  },
  {
    id: "scene-6",
    sceneNumber: 6,
    title: "Mirchi Madam's Power Entrance",
    location: "NARROW MARKET ALLEY",
    timeOfDay: "AFTERNOON",
    estimatedDuration: "0:50",
    dialogue: [
      {
        id: makeId(),
        character: "Vegetable bystander 1",
        text: "Woh aa rahi hai...",
        translation: "She's coming..."
      },
      {
        id: makeId(),
        character: "Vegetable bystander 2",
        text: "Kaun?",
        translation: "Who?"
      },
      {
        id: makeId(),
        character: "Vegetable bystander 1",
        text: "...Mirchi. Madam.",
        translation: "...Chili. Madam."
      },
      {
        id: makeId(),
        character: "Mirchi Madam",
        text: "Raasta do. Main baar baar nahi kehti.",
        translation: "Make way. I don't say it twice."
      },
      {
        id: makeId(),
        character: "Inspector Aloo",
        text: "Madam. Humein aapse baat karni hai.",
        translation: "Madam. We need to speak with you."
      },
      {
        id: makeId(),
        character: "Mirchi Madam",
        text: "Inspector... kya aap handle kar sakte ho... heat?",
        translation: "Inspector... can you handle... the heat?"
      },
      {
        id: makeId(),
        character: "Inspector Aloo",
        text: "Main aloo hoon, Madam. Main pressure mein bhi tikta hoon.",
        translation: "I am a potato, Madam. I hold firm under pressure too."
      },
      {
        id: makeId(),
        character: "Mirchi Madam",
        text: "Hmmm... dekhte hain.",
        translation: "Hmmm... we'll see."
      }
    ],
    actionPrompt: "Pixar-style 3D cinematic action render, legendary power entrance, Mirchi Madam tall fiery red chili woman dead center of narrow market alley walking forward in absolute slow motion, red saree billowing dramatically behind her like a battle cape, green hair in fierce bun with loose strands whipping in hot air, oversized red sunglasses lowered halfway revealing one dangerous eye, visible intense heat shimmer waves radiating from her entire body distorting the air and buildings behind her, every single vegetable townsperson on both sides stumbling and falling backward over each other in fear and awe fanning themselves frantically, flower petals and dust swirling at her feet like a tornado, Inspector Aloo standing at far end of alley arms crossed sweating slightly collar damp holding his ground, Dhaniya Devi beside him bracing herself against the heat wave, extreme low angle camera looking up at Mirchi making her massive, intense orange fire backlight making her entire silhouette glow, hyperdetailed Pixar 3D cinematic render, 9:16 vertical"
  },
  {
    id: "scene-7",
    sceneNumber: 7,
    title: "The Suspicious Night Meeting",
    location: "DARK NIGHT ALLEY",
    timeOfDay: "NIGHT",
    estimatedDuration: "0:40",
    dialogue: [
      {
        id: makeId(),
        character: "Tamatar Bhai",
        text: "Yeh plan bahut risky hai. Agar Aloo ko pata chal gaya—",
        translation: "This plan is very risky. If Aloo finds out—"
      },
      {
        id: makeId(),
        character: "Mirchi Madam",
        text: "Woh aalu hai. Aalu sochta nahi... pakta hai.",
        translation: "He's a potato. Potatoes don't think... they get cooked."
      },
      {
        id: makeId(),
        character: "Tamatar Bhai",
        text: "Aur woh chhoti coriander?",
        translation: "And that little coriander girl?"
      },
      {
        id: makeId(),
        character: "Mirchi Madam",
        text: "...Woh thodi ziyadah smart hai.",
        translation: "...She's a little too smart."
      },
      {
        id: makeId(),
        character: "Tamatar Bhai",
        text: "Toh phir humein abhi—",
        translation: "Then we should now—"
      },
      {
        id: makeId(),
        character: "Both",
        text: "...Kaun hai wahan?",
        translation: "...Who's there?"
      },
      {
        id: makeId(),
        character: "Dhaniya Devi",
        text: "...Oh no. 😳",
        translation: "...Oh no. 😳"
      }
    ],
    actionPrompt: "Pixar-style 3D cinematic noir render, dark tense night alley scene, Tamatar Bhai and Mirchi Madam hunched over crumpled map spread on wooden crate, single cold moonbeam cutting diagonally across them, Tamatar Bhai's red skin visibly pale with anxiety finger trembling slightly on map, Mirchi Madam leaning over with razor sharp focus whispering intensely one long finger tracing a route her expression calculating and cold, steam wisps from distant chai stall creating atmospheric ground fog, Dhaniya Devi crouched behind large barrel in deep background barely visible only her wide horrified eyes and tip of green hair catching moonlight, both Tamatar and Mirchi suddenly frozen mid-conversation staring toward barrel with suspicious narrowed eyes, deep noir shadow patterns on walls, cool blue moonlight vs warm amber chai stall glow contrast, cinematic thriller composition, hyperdetailed Pixar 3D noir render, 9:16 vertical"
  },
  {
    id: "scene-8",
    sceneNumber: 8,
    title: "Pyaaz Uncle's Epic Breakdown",
    location: "SABZI MANDI TABLE",
    timeOfDay: "MIDDAY",
    estimatedDuration: "1:10",
    dialogue: [
      {
        id: makeId(),
        character: "Inspector Aloo",
        text: "Uncle. Last question. Bas. EK. SAWAAL.",
        translation: "Uncle. Last question. Just. ONE. QUESTION."
      },
      {
        id: makeId(),
        character: "Pyaaz Uncle",
        text: "Pooch-hic-lo beta-hic-poochlo—",
        translation: "Ask-hic-away son-hic-go ahead—"
      },
      {
        id: makeId(),
        character: "Inspector Aloo",
        text: "Kya tumne Mirchi Madam ko—",
        translation: "Did you see Mirchi Madam—"
      },
      {
        id: makeId(),
        character: "Entire Market",
        text: "KYAAAAA HO GAYA— 😭😭😭",
        translation: "WHAT JUST HAPPENED— 😭😭😭"
      },
      {
        id: makeId(),
        character: "Dhaniya Devi",
        text: "Siiiirrr... main... nahi... rok... sakti—",
        translation: "Siiiirrr... I... can't... stop... it—"
      },
      {
        id: makeId(),
        character: "Dhaniya Devi",
        text: "AHHH NAHI— 😭",
        translation: "OH NO— 😭"
      },
      {
        id: makeId(),
        character: "Inspector Aloo",
        text: "YEH CASE... HIC... BAHUT... MUSHKIL HAI.",
        translation: "THIS CASE... HIC... IS VERY... DIFFICULT."
      },
      {
        id: makeId(),
        character: "Pyaaz Uncle",
        text: "Beta... mujhe pata hai tujhe bhi rona aa raha hai.",
        translation: "Son... I know you also want to cry."
      },
      {
        id: makeId(),
        character: "Inspector Aloo",
        text: "...Main aloo hoon. Aloo nahi rota.",
        translation: "...I am a potato. Potatoes don't cry."
      }
    ],
    actionPrompt: "Pixar-style 3D cinematic comedic masterpiece render, Pyaaz Uncle in absolute maximum crying explosion center frame, onion skin layers peeling off and flying outward like confetti in all directions, tears literally arcing through the air in thick streams hitting nearby vegetable stalls making splash effects, Inspector Aloo standing over him with rivers of tears streaming freely down face while simultaneously pointing finger at him in aggressive interrogation position looking mortified by his own crying, Dhaniya Devi in background mouth clamped shut hands pressed over face eyes streaming involuntarily and turning slightly blue, entire market background crowd ALL in various stages of weeping — one tomato face down on stall table, one brinjal hugging a stranger crying, one pumpkin on knees looking at sky crying, bright harsh comedic midday sun making chaos look utterly absurd, exaggerated cartoon tear physics everywhere, hyperdetailed Pixar 3D render, 9:16 vertical"
  },
  {
    id: "scene-9",
    sceneNumber: 9,
    title: "The Great Bazaar Chase",
    location: "PACKED INDIAN BAZAAR",
    timeOfDay: "SUNSET",
    estimatedDuration: "1:00",
    dialogue: [
      {
        id: makeId(),
        character: "Dhaniya Devi",
        text: "SIR! WOH BHAAG RAHA HAI!",
        translation: "SIR! HE'S RUNNING!"
      },
      {
        id: makeId(),
        character: "Tamatar Bhai",
        text: "Sorry! Sorry! SORRYYYY— 💨",
        translation: "Sorry! Sorry! SORRYYYY— 💨"
      },
      {
        id: makeId(),
        character: "Inspector Aloo",
        text: "TAMATAR BHAI... RUKO! ALOO SE NAHI BHAAG SAKTE!",
        translation: "TAMATAR BHAI... STOP! YOU CAN'T RUN FROM A POTATO!"
      },
      {
        id: makeId(),
        character: "Mango vendor",
        text: "ARRE MERE AAMMMM— 🥭💥",
        translation: "OH MY MANGOEEEeees— 🥭💥"
      },
      {
        id: makeId(),
        character: "Dhaniya Devi",
        text: "Sir main aage hoon—",
        translation: "Sir I'm going ahead—"
      },
      {
        id: makeId(),
        character: "Inspector Aloo",
        text: "Haan haan... seedha jao... main... hic... peeche hoon.",
        translation: "Yes yes... go straight... I'm... hic... right behind."
      },
      {
        id: makeId(),
        character: "Mirchi Madam",
        text: "Hahaha! Ek potato aur ek coriander... yeh toh entertainment hai!",
        translation: "Hahaha! One potato and one coriander... now THIS is entertainment!"
      },
      {
        id: makeId(),
        character: "Tamatar Bhai",
        text: "AAAAAYYY NAHI NAHI NAHI— 💫",
        translation: "OH NO NO NOOO— 💫"
      }
    ],
    actionPrompt: "Pixar-style 3D cinematic explosive action render, high speed chase through packed colorful Indian bazaar, Tamatar Bhai full sprint in foreground arms pumping wildly gold chain flying horizontally behind him red skin gleaming sweat, just knocked over giant fruit stall sending mangoes papayas and coconuts exploding spectacularly into air in slow motion, eyes wild with panic, Inspector Aloo charging heavily just behind with surprising power belly bouncing face locked in grim determination sunglasses slightly askew, Dhaniya Devi running alongside Aloo clearly faster green leafy hair streaming perfectly horizontally in speed wind, motion blur streaks on all three running figures, colorful market stalls blurring into streaks on sides, vegetable bystanders diving dramatically in every direction, tomatoes rolling all across cobblestones, Mirchi Madam visible on rooftop above in background head thrown back laughing, warm explosive golden sunset light, cinematic wide action shot, hyperdetailed Pixar 3D render, 9:16 vertical"
  },
  {
    id: "scene-10",
    sceneNumber: 10,
    title: "Mirchi Madam's Ultimate Standoff",
    location: "NARROW BACK ALLEY",
    timeOfDay: "MIDDAY",
    estimatedDuration: "0:50",
    dialogue: [
      {
        id: makeId(),
        character: "Mirchi Madam",
        text: "Yahan tak aaye ho tum dono. Mujhe surprise hua.",
        translation: "You two made it this far. I'm surprised."
      },
      {
        id: makeId(),
        character: "Inspector Aloo",
        text: "Madam... ek taraf hojao. Warna—",
        translation: "Madam... step aside. Otherwise—"
      },
      {
        id: makeId(),
        character: "Mirchi Madam",
        text: "Warna...?",
        translation: "Otherwise...?"
      },
      {
        id: makeId(),
        character: "Inspector Aloo",
        text: "Warna... warna hum...",
        translation: "Otherwise... otherwise we will..."
      },
      {
        id: makeId(),
        character: "Dhaniya Devi",
        text: "Warna main aapko personally handle karungi, Madam.",
        translation: "Otherwise I'll handle you personally, Madam."
      },
      {
        id: makeId(),
        character: "Mirchi Madam",
        text: "Tu? Ek chhoti si dhaniya... mujhe rokegi?",
        translation: "You? A tiny little coriander... will stop me?"
      },
      {
        id: makeId(),
        character: "Dhaniya Devi",
        text: "Har biryani mein dhaniya hi sabse upar rehti hai, Madam.",
        translation: "Coriander always sits on top of every biryani, Madam."
      },
      {
        id: makeId(),
        character: "Mirchi Madam",
        text: "...Interesting.",
        translation: "...Interesting."
      }
    ],
    actionPrompt: "Pixar-style 3D cinematic render, epic three-way standoff, Mirchi Madam planted in absolute dead center of narrow alley blocking everything, legs wide apart arms crossed, intense heat shimmer waves radiating and visibly distorting buildings behind her, red saree whipping in hot turbulent air, green hair coming loose and rising upward from heat like flames, one hand slowly removing sunglasses dramatically revealing sharp intense eyes, Inspector Aloo and Dhaniya Devi skidded to a full stop facing her, Aloo sweating heavily one finger pulling collar loose with uncomfortable expression but feet planted firm, Dhaniya Devi in perfect wide fighting stance both fists raised jaw set with fierce unwavering determination small green figure against the heat, dramatic triangle standoff composition, deep orange backlight turning Mirchi Madam into glowing silhouette with heat sparks floating like fireflies around her, extreme atmospheric tension, hyperdetailed Pixar 3D cinematic render, 9:16 vertical"
  },
  {
    id: "scene-11",
    sceneNumber: 11,
    title: "Dhaniya Devi's Legendary Move",
    location: "ALLEY INTERSECTION",
    timeOfDay: "MIDDAY",
    estimatedDuration: "1:05",
    dialogue: [
      {
        id: makeId(),
        character: "Mirchi Madam",
        text: "Teri himmat toh dekh chhori... par himmat aur aukaat alag hoti hai.",
        translation: "Look at your courage girl... but courage and capability are different things."
      },
      {
        id: makeId(),
        character: "Dhaniya Devi",
        text: "Aap jaanti hain Madam... fresh coriander heat ko neutralize karti hai.",
        translation: "You know Madam... fresh coriander neutralizes heat."
      },
      {
        id: makeId(),
        character: "Mirchi Madam",
        text: "Tujhe lagta hai tu meri heat—",
        translation: "You think you can handle my heat—"
      },
      {
        id: makeId(),
        character: "Dhaniya Devi",
        text: "ABBBBBBB— 💨🌿",
        translation: "NOWWWWWWW— 💨🌿"
      },
      {
        id: makeId(),
        character: "Crowd",
        text: "OHHHHHHH—",
        translation: "OHHHHHHH—"
      },
      {
        id: makeId(),
        character: "Inspector Aloo",
        text: "DHANIYAAAA YESSSS!",
        translation: "DHANIYAAAA YESSSS!"
      },
      {
        id: makeId(),
        character: "Mirchi Madam",
        text: "Yeh... yeh toh maine socha hi nahi tha.",
        translation: "This... this I did not expect at all."
      }
    ],
    actionPrompt: "Pixar-style 3D cinematic peak action render, ultimate hero moment, Dhaniya Devi fully airborne horizontal flying leap directly at Mirchi Madam, green coriander girl body completely extended in air, leafy green hair spread wide like magnificent wings catching light, denim jacket billowing behind, sneakers kicked back, both arms reaching forward with total fierce commitment, face expressing absolute unwavering determination eyes blazing green, Mirchi Madam below bracing with genuinely shocked expression for first time sunglasses flying completely off her face eyes wide, heat shimmer around Mirchi being disrupted and pushed back by visible cool fresh green energy aura radiating from Dhaniya, massive explosion of green and red particles colliding in center impact zone, giant dust and spice powder eruption from ground, crowd of vegetables behind frozen mid-gasp in perfect horror and awe, Inspector Aloo in far background fist raised in the air cheering with tears of pride, dramatic diagonal action composition maximum energy, hyperdetailed Pixar 3D cinematic render, 9:16 vertical"
  },
  {
    id: "scene-12",
    sceneNumber: 12,
    title: "Tamatar Bhai Cornered",
    location: "DEAD-END BRICK ALLEY",
    timeOfDay: "SUNSET",
    estimatedDuration: "0:45",
    dialogue: [
      {
        id: makeId(),
        character: "Tamatar Bhai",
        text: "Yaar... yaar sun... main explain kar sakta hoon—",
        translation: "Buddy... buddy listen... I can explain—"
      },
      {
        id: makeId(),
        character: "Inspector Aloo",
        text: "Tamatar... main sun raha hoon.",
        translation: "Tamatar... I'm listening."
      },
      {
        id: makeId(),
        character: "Tamatar Bhai",
        text: "Woh actually... Mirchi Madam ne kaha ki—",
        translation: "Actually... Mirchi Madam said that—"
      },
      {
        id: makeId(),
        character: "Dhaniya Devi",
        text: "Ki masala chura lo aur blame Chef Google pe daaldo?",
        translation: "To steal the masala and blame it on Chef Google?"
      },
      {
        id: makeId(),
        character: "Tamatar Bhai",
        text: "Tu... tune kaise jaana?",
        translation: "You... how did you know?"
      },
      {
        id: makeId(),
        character: "Dhaniya Devi",
        text: "Scene 7. Dark alley. Barrel. Main wahan thi.",
        translation: "Scene 7. Dark alley. Barrel. I was there."
      },
      {
        id: makeId(),
        character: "Tamatar Bhai",
        text: "Yaar... aloo aur dhaniya ka combination bahut khatarnak hai.",
        translation: "Bro... the combination of potato and coriander is very dangerous."
      },
      {
        id: makeId(),
        character: "Inspector Aloo",
        text: "Isiliye toh hum saath hain.",
        translation: "That's exactly why we're together."
      }
    ],
    actionPrompt: "Pixar-style 3D cinematic render, perfect comedic defeat scene, Tamatar Bhai fully cornered in dead-end brick alley back completely flat against wall beginning to slide down it slowly in defeat, dozens of scattered tomatoes rolling on cobblestones around his feet, gold chain completely twisted sideways, white shirt collar wilted and rumpled, his shiny red skin distinctly darker and patchier with visible guilt, jaw dropped open staring at Dhaniya with disbelief, Inspector Aloo walking forward slowly with enormous arms spread wide absolutely blocking every escape route sunglasses lowered slightly showing disappointed eyes but slight satisfaction at corner of mouth, Dhaniya Devi leaning one shoulder casually against alley wall arms crossed head tilted slow knowing smirk small notebook dangling from one finger, single dramatic overhead spotlight beam cutting through dusty alley air perfectly illuminating Tamatar, deep heavy shadows on walls literally closing in around him, hyperdetailed Pixar 3D cinematic render, 9:16 vertical"
  },
  {
    id: "scene-13",
    sceneNumber: 13,
    title: "The Hidden Masala Stash Revealed",
    location: "SECRET PANTRY VAULT",
    timeOfDay: "SUNSET",
    estimatedDuration: "0:55",
    dialogue: [
      {
        id: makeId(),
        character: "Inspector Aloo",
        text: "Jo bhi yahan hai... yeh case ka sabse bada saboot hai.",
        translation: "Whatever is here... this is the biggest evidence of the case."
      },
      {
        id: makeId(),
        character: "Dhaniya Devi",
        text: "Sir... pull it.",
        translation: "Sir... pull it."
      },
      {
        id: makeId(),
        character: "Pyaaz Uncle",
        text: "HAAAYYYYYYY— 😭✨",
        translation: "OH MY GOSH— 😭✨"
      },
      {
        id: makeId(),
        character: "Tamatar Bhai",
        text: "Itna... itna saara masala...",
        translation: "This... this much masala..."
      },
      {
        id: makeId(),
        character: "Mirchi Madam",
        text: "Maine sirf... maine sirf unhe safe rakhna chahata tha.",
        translation: "I just... I just wanted to keep them safe."
      },
      {
        id: makeId(),
        character: "Dhaniya Devi",
        text: "...Safe? Masala... CHURAAYA TUNE. Safe karna nahi tha yeh.",
        translation: "...Safe? You STOLE the masala. This wasn't keeping it safe."
      },
      {
        id: makeId(),
        character: "Mirchi Madam",
        text: "Tum nahi samjhoge.",
        translation: "You won't understand."
      },
      {
        id: makeId(),
        character: "Inspector Aloo",
        text: "Toh samjhao.",
        translation: "Then explain."
      }
    ],
    actionPrompt: "Pixar-style 3D cinematic reveal render, ultimate dramatic curtain moment, Inspector Aloo mid-pull on heavy dark curtain falling away in slow motion, absolutely blinding warm golden amber light bursting through from the wall of masala jars behind, hundreds of stolen spice jars stacked perfectly floor to ceiling each glowing warmly from within like treasures, turmeric yellow and chili red and cardamom green light painting every character's face in magical warm color, full cast frozen in perfect shock tableau — Dhaniya Devi hand on cheek mouth open, Pyaaz Uncle glasses launched completely off face mid-air tears of shock arcing, Tamatar Bhai stumbling backward hands grabbing own head, Mirchi Madam at back sunglasses slipped to tip of nose staring with complicated expression neither proud nor guilty just... complicated, Inspector Aloo lowering curtain slowly with grim satisfied jaw, golden spice dust floating through beam like magical snowfall, cinematic curtain-reveal master composition, hyperdetailed Pixar 3D render, 9:16 vertical"
  },
  {
    id: "scene-14",
    sceneNumber: 14,
    title: "Mirchi Madam's Confession",
    location: "HIDDEN MASALA VAULT",
    timeOfDay: "SUNSET",
    estimatedDuration: "1:15",
    dialogue: [
      {
        id: makeId(),
        character: "Mirchi Madam",
        text: "Chef Google... woh AI tha. Woh kehta tha ki masale ki zaroorat nahi. Ki food ko optimize karo. Ki flavor ek distraction hai.",
        translation: "Chef Google... he was an AI. He said spices aren't needed. To optimize food. That flavor is a distraction."
      },
      {
        id: makeId(),
        character: "Mirchi Madam",
        text: "Woh puri city ka masala kharidne wala tha. Legal tarike se. Ek ek karke. Aur phir band kar deta. Hamesha ke liye.",
        translation: "He was going to buy the whole city's masala. Legally. One by one. And then shut it down. Forever."
      },
      {
        id: makeId(),
        character: "Dhaniya Devi",
        text: "Isliye tune chura liya... unhe bachane ke liye?",
        translation: "So you stole them... to save them?"
      },
      {
        id: makeId(),
        character: "Mirchi Madam",
        text: "Main Mirchi hoon. Main dard deti hoon. Par... bina masale ke khana... bina pyaar ke zindagi jaisi hai.",
        translation: "I am Chili. I give pain. But... food without spice... is like life without love."
      },
      {
        id: makeId(),
        character: "Pyaaz Uncle",
        text: "Beta... tune jo kiya woh galat tha... par dil sahi jagah tha.",
        translation: "Child... what you did was wrong... but your heart was in the right place."
      },
      {
        id: makeId(),
        character: "Inspector Aloo",
        text: "...Masala wapas karna padega. Par... hum Chef Google ko rok sakte hain. Sahi tarike se.",
        translation: "...The masala must be returned. But... we can stop Chef Google. The right way."
      },
      {
        id: makeId(),
        character: "Tamatar Bhai",
        text: "Hum saath hain.",
        translation: "We're with you."
      }
    ],
    actionPrompt: "Pixar-style 3D cinematic emotional render, powerful intimate confession scene, Mirchi Madam holding her red sunglasses in both hands at her side having just removed them, revealing genuinely sad and tired eyes for the very first time, green hair coming down soft and drooping, tall sharp frame looking unexpectedly small and vulnerable, one single perfect tear tracking down her red cheek which she does not wipe, speaking with one hand pressed deeply over her heart, warm golden masala jar light washing over her face in soft amber glow making her look human and beautiful, Inspector Aloo across from her arms fully uncrossed hanging at sides expression transformed from stern to genuine understanding, Dhaniya Devi one small green hand placed gently on Mirchi's arm looking up at her with pure empathy, Tamatar Bhai standing quietly head slightly bowed hands clasped in front looking at floor with remorse, Pyaaz Uncle in background hand over heart crying but this time it is clearly from deep genuine emotion not comedy, warm intimate golden light composition with soft shadows, emotional masterpiece Pixar 3D cinematic render, 9:16 vertical"
  },
  {
    id: "scene-15",
    sceneNumber: 15,
    title: "The Grand Celebration",
    location: "MARKET SQUARE CELEBRATION",
    timeOfDay: "MAGICAL NIGHT",
    estimatedDuration: "1:10",
    dialogue: [
      {
        id: makeId(),
        character: "Announcer vegetable",
        text: "Chef Google ka license CANCEL kar diya gaya hai! Rasoi Nagar ka masala... WAPAS AA GAYA!",
        translation: "Chef Google's license has been CANCELLED! Rasoi Nagar's masala... IS BACK!"
      },
      {
        id: makeId(),
        character: "Pyaaz Uncle",
        text: "AJ MERE AANSU KHUSHI KE HAIN! KHUSHI KE!",
        translation: "TODAY MY TEARS ARE OF JOY! OF JOY!"
      },
      {
        id: makeId(),
        character: "Tamatar Bhai",
        text: "Yaar... tu sach mein bahut fast hai. Partner banegi meri?",
        translation: "Girl... you're genuinely very fast. Will you be my partner?"
      },
      {
        id: makeId(),
        character: "Dhaniya Devi",
        text: "Tera record file mein hai bhai. Pehle saaf ho.",
        translation: "Your record is in the file bro. Clear yourself first."
      },
      {
        id: makeId(),
        character: "Inspector Aloo",
        text: "Masale wala samosa... zindagi mein yahi toh hai.",
        translation: "Spiced samosa... this is what life is about."
      },
      {
        id: makeId(),
        character: "Mirchi Madam",
        text: "Main kabhi nahi socha tha ki main in logon ke saath khushi manaaungi!",
        translation: "I never thought I'd celebrate happiness with these people!"
      },
      {
        id: makeId(),
        character: "Dhaniya Devi",
        text: "Sir... team kaisi lagi?",
        translation: "Sir... how was the team?"
      },
      {
        id: makeId(),
        character: "Inspector Aloo",
        text: "...Masaledar.",
        translation: "...Spicy."
      }
    ],
    actionPrompt: "Pixar-style 3D cinematic joyful celebration render, wide festive shot, all five characters celebrating in market square at warm magical night, hundreds of golden string lights and earthen diyas covering every surface and rooftop creating warm dreamy atmosphere, Pyaaz Uncle front left doing absolute full bhangra with both arms raised high rivers of genuinely happy tears flying off face catching diya light like diamonds, Tamatar Bhai and Dhaniya Devi center clinking clay chai cups both heads thrown back laughing fully, Tamatar's gold chain catching light beautifully, Inspector Aloo right side seated on crate eyes closed in pure samosa bliss face the most relaxed it has ever been, Mirchi Madam dancing gracefully in absolute center red saree spinning into perfect full circle of flowing fire, green hair fully down and free for first time swirling with the spin, face showing genuine uninhibited laughter, enormous colorful confetti explosion of turmeric yellow and chili red and coriander green raining from above covering everyone, joyful vegetable townspeople celebrating in background, warm golden magical night, maximum joy energy, hyperdetailed Pixar 3D cinematic render, 9:16 vertical"
  },
  {
    id: "scene-16",
    sceneNumber: 16,
    title: "THE VIRAL SELFIE — THE FINALE",
    location: "MARKET SQUARE STAGE",
    timeOfDay: "MAGICAL NIGHT",
    estimatedDuration: "0:45",
    dialogue: [
      {
        id: makeId(),
        character: "Tiny Methi kid",
        text: "BHAIYA DIDI! PHOTO! PHOTO! PLEAAASE!",
        translation: "BROTHER SISTER! PHOTO! PHOTO! PLEAAASE!"
      },
      {
        id: makeId(),
        character: "Tamatar Bhai",
        text: "Haan haan aa jao, mera angle left se achha aata hai.",
        translation: "Yes yes come on, my angle is better from the left."
      },
      {
        id: makeId(),
        character: "Mirchi Madam",
        text: "Main yeh believe nahi kar sakti ki main yeh kar rahi hoon.",
        translation: "I cannot believe I'm doing this."
      },
      {
        id: makeId(),
        character: "Pyaaz Uncle",
        text: "Meri aankhein toh khuli rahengi na photo mein?",
        translation: "My eyes will stay open in the photo won't they?"
      },
      {
        id: makeId(),
        character: "Everyone",
        text: "NAHI UNCLE. 😭😂",
        translation: "NO UNCLE! 😭😂"
      },
      {
        id: makeId(),
        character: "Inspector Aloo",
        text: "Kitni baar kehna hai... main ek officer hoon. Officers pose nahi karte.",
        translation: "How many times must I say... I am an officer. Officers don't pose."
      },
      {
        id: makeId(),
        character: "Dhaniya Devi",
        text: "Sab ek saath — MASALEDAAR ZINDAGIIIII!",
        translation: "All together — SPICY LIIIFE!"
      },
      {
        id: makeId(),
        character: "All together",
        text: "MASALEDAAAARR ZINDAGIIIIII! 🌿🥔🧅🍅🌶️",
        translation: "SPICY LIIIIFE! 🌿🥔🧅🍅🌶️"
      },
      {
        id: makeId(),
        character: "Methi kid",
        text: "...47 million views already?!",
        translation: "...47 million views already?!"
      }
    ],
    actionPrompt: "Pixar-style 3D cinematic comedic finale render, perfect closing group selfie chaos, tiny Methi kid in extreme foreground holding comically oversized glowing phone facing directly toward viewer showing the selfie being captured, phone screen displaying real-time notification: 47M VIEWS and counting with firework emojis, all five characters chaotically crammed together behind in brilliant selfie formation — Pyaaz Uncle far left fully squeezed between others eyes predictably closed mid-tear but with biggest smile ever, Tamatar Bhai flexing both arms showing muscles gold chain gleaming grin impossibly wide, Mirchi Madam center back doing full dramatic diva pose hand on hip and chin up pursed lips but genuine laugh crinkle visibly escaping at corner of eye, Dhaniya Devi right throwing double peace signs green leafy hair everywhere in joyful chaos, Inspector Aloo dead center doing world's most wooden stiff awkward smile sunglasses still firmly on, everyone slightly squished and slightly chaotic but genuinely happy, warm golden evening light on faces with cool phone screen blue glow adding cinematic contrast, diya lights and string lights glowing in background, absolute perfect comedic chaotic joy closing energy, hyperdetailed Pixar 3D cinematic finale render, 9:16 vertical"
  }
];
