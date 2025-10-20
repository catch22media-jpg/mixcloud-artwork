  const sleep = (t) => new Promise((r) => setTimeout(r, t));
  const setVal = (el, v) => {
    if (!el) return;
    const p = Object.getPrototypeOf(el);
    const d = Object.getOwnPropertyDescriptor(p, "value");
    if (d && d.set) {
      d.set.call(el, v);
      el.dispatchEvent(new Event("input", { bubbles: true }));
    }
  };
  const isVisible = (e) => !!e && e.getClientRects().length > 0;
  const clickEl = (e) => {
    if (!e) return;
    ["pointerdown", "mousedown", "pointerup", "mouseup", "click"].forEach((ev) =>
      e.dispatchEvent(new MouseEvent(ev, { bubbles: true, cancelable: true, view: window }))
    );
  };

  const GITHUB = "https://raw.githubusercontent.com/catch22media-jpg/mixcloud-artwork/main/";

  // -------------------------
  // 🔍 Full Genre Lookup Table
  // -------------------------
  const LOOKUP = {
    acoustic: {
      tags: ["acoustic","guitar","folk","organic","warm"],
      description: "Gentle acoustic guitar melodies intertwine with natural tones and earthy textures to create a heartfelt and organic soundscape. Perfect for storytelling, emotional moments, or scenes of reflection and simplicity, this piece radiates warmth and authenticity.\n\nMusic composed by Bobby Cole, a UK-based composer known for producing cinematic, orchestral, and atmospheric soundtracks for film, TV, and games.\n\nwww.bobbycole.co.uk"
    },
    ambient: {
      tags: ["ambient","soundscape","cinematic","relaxing","ethereal"],
      description: "A tranquil ambient composition that drifts through ethereal textures and evolving sonic layers. Perfect for meditative visuals, dreamy landscapes, or emotional storytelling that requires space and subtlety.\n\nMusic composed by Bobby Cole, a UK-based composer known for producing cinematic, orchestral, and atmospheric soundtracks for film, TV, and games.\n\nwww.bobbycole.co.uk"
    },
    blues: {
      tags: ["blues","guitar","soul","groove","vintage"],
      description: "Soulful guitar licks and smoky grooves blend with vintage rhythm and tone to capture the spirit of authentic blues. Ideal for scenes of nostalgia, grit, or late-night reflection filled with feeling and emotion.\n\nMusic composed by Bobby Cole, a UK-based composer known for producing cinematic, orchestral, and atmospheric soundtracks for film, TV, and games.\n\nwww.bobbycole.co.uk"
    },
    chill: {
      tags: ["chill","lofi","relax","vibe","smooth"],
      description: "Laid-back beats, gentle keys, and soft textures come together in a relaxed, atmospheric groove. Perfect for calm evenings, background moods, or any setting that calls for smooth, tranquil energy.\n\nMusic composed by Bobby Cole, a UK-based composer known for producing cinematic, orchestral, and atmospheric soundtracks for film, TV, and games.\n\nwww.bobbycole.co.uk"
    },
    christmas: {
      tags: ["christmas","holiday","festive","seasonal","instrumental"],
      description: "A joyful orchestral arrangement filled with festive cheer and classic holiday spirit. Sparkling bells, warm harmonies, and gentle rhythms make this perfect for Christmas campaigns, winter scenes, or family celebrations.\n\nMusic composed by Bobby Cole, a UK-based composer known for producing cinematic, orchestral, and atmospheric soundtracks for film, TV, and games.\n\nwww.bobbycole.co.uk"
    },
    classical: {
      tags: ["classical","orchestral","strings","piano","elegant"],
      description: "An elegant and timeless orchestral work showcasing refined melodies and rich harmonic textures. Perfect for period dramas, emotional storytelling, or any production seeking sophistication and grace.\n\nMusic composed by Bobby Cole, a UK-based composer known for producing cinematic, orchestral, and atmospheric soundtracks for film, TV, and games.\n\nwww.bobbycole.co.uk"
    },
    country: {
      tags: ["country","acoustic","americana","banjo","roots"],
      description: "Uplifting country rhythms with twanging guitars and toe-tapping energy create an authentic Americana vibe. Ideal for road trips, feel-good montages, or rustic storytelling filled with charm and personality.\n\nMusic composed by Bobby Cole, a UK-based composer known for producing cinematic, orchestral, and atmospheric soundtracks for film, TV, and games.\n\nwww.bobbycole.co.uk"
    },
    "dramatic trailer": {
      tags: ["trailer","epic","cinematic","intense","dramatic"],
      description: "Explosive percussion, soaring brass, and powerful string motifs combine to deliver a breathtaking cinematic trailer cue. Perfect for epic reveals, dramatic storytelling, or any sequence demanding tension and impact.\n\nMusic composed by Bobby Cole, a UK-based composer known for producing cinematic, orchestral, and atmospheric soundtracks for film, TV, and games.\n\nwww.bobbycole.co.uk"
    },
    electronic: {
      tags: ["electronic","synth","modern","beats","edm"],
      description: "Pulsing synths and hypnotic rhythms merge to form a sleek, futuristic electronic track. Ideal for technology promos, fashion visuals, or vibrant modern storytelling that thrives on energy and precision.\n\nMusic composed by Bobby Cole, a UK-based composer known for producing cinematic, orchestral, and atmospheric soundtracks for film, TV, and games.\n\nwww.bobbycole.co.uk"
    },
    trance: {
      tags: ["trance","edm","uplifting","anthem","club"],
      description: "Driving beats, euphoric synths, and sweeping breakdowns define this uplifting trance anthem. Perfect for high-energy visuals, club montages, or cinematic moments of inspiration and release.\n\nMusic composed by Bobby Cole, a UK-based composer known for producing cinematic, orchestral, and atmospheric soundtracks for film, TV, and games.\n\nwww.bobbycole.co.uk"
    },
    techno: {
      tags: ["techno","club","minimal","underground","dark"],
      description: "A relentless techno groove built from deep basslines, percussive precision, and hypnotic repetition. Ideal for night-life sequences, underground energy, or any scene needing intensity and drive.\n\nMusic composed by Bobby Cole, a UK-based composer known for producing cinematic, orchestral, and atmospheric soundtracks for film, TV, and games.\n\nwww.bobbycole.co.uk"
    },
    "drum and bass": {
      tags: ["drum and bass","breakbeat","energy","fast","club"],
      description: "Rapid breakbeats and pulsing basslines create an explosive high-tempo sound full of adrenaline and motion. Perfect for sports highlights, chase scenes, or futuristic visuals with speed and attitude.\n\nMusic composed by Bobby Cole, a UK-based composer known for producing cinematic, orchestral, and atmospheric soundtracks for film, TV, and games.\n\nwww.bobbycole.co.uk"
    },
    folk: {
      tags: ["folk","acoustic","storytelling","roots","traditional"],
      description: "A heartfelt acoustic arrangement inspired by traditional folk storytelling and warm organic tones. Perfect for documentaries, travel scenes, or heartfelt moments that celebrate simplicity and authenticity.\n\nMusic composed by Bobby Cole, a UK-based composer known for producing cinematic, orchestral, and atmospheric soundtracks for film, TV, and games.\n\nwww.bobbycole.co.uk"
    },
    funk: {
      tags: ["funk","groove","bass","retro","soul"],
      description: "Tight basslines, rhythmic guitars, and vintage brass create a classic funk groove full of swagger and style. Ideal for upbeat scenes, retro adverts, or anything that needs an injection of groove and movement.\n\nMusic composed by Bobby Cole, a UK-based composer known for producing cinematic, orchestral, and atmospheric soundtracks for film, TV, and games.\n\nwww.bobbycole.co.uk"
    },
    "hip hop": {
      tags: ["hip hop","urban","beats","street","808"],
      description: "Punchy drums, deep bass, and atmospheric textures combine in a smooth yet gritty hip hop instrumental. Perfect for urban visuals, cool branding, or rhythmic sequences that need confident energy.\n\nMusic composed by Bobby Cole, a UK-based composer known for producing cinematic, orchestral, and atmospheric soundtracks for film, TV, and games.\n\nwww.bobbycole.co.uk"
    },
    horror: {
      tags: ["horror","dark","suspense","tension","cinematic"],
      description: "Ominous drones, unsettling strings, and eerie textures blend to create a chilling horror atmosphere. Perfect for thriller trailers, haunted visuals, or tense moments of psychological fear.\n\nMusic composed by Bobby Cole, a UK-based composer known for producing cinematic, orchestral, and atmospheric soundtracks for film, TV, and games.\n\nwww.bobbycole.co.uk"
    },
    hymns: {
      tags: ["hymn","organ","choir","church","spiritual"],
      description: "A serene and reverent instrumental hymn arranged with organ and soft orchestral accompaniment. Perfect for spiritual content, ceremonies, or reflective moments of peace and devotion.\n\nMusic composed by Bobby Cole, a UK-based composer known for producing cinematic, orchestral, and atmospheric soundtracks for film, TV, and games.\n\nwww.bobbycole.co.uk"
    },
    jazz: {
      tags: ["jazz","piano","saxophone","swing","smooth"],
      description: "Smooth saxophones and flowing piano lines bring classic jazz vibes to life with warmth and sophistication. Perfect for lounges, vintage settings, or cinematic moments filled with cool style.\n\nMusic composed by Bobby Cole, a UK-based composer known for producing cinematic, orchestral, and atmospheric soundtracks for film, TV, and games.\n\nwww.bobbycole.co.uk"
    },
    kids: {
      tags: ["kids","playful","fun","bright","family"],
      description: "A cheerful and bouncy tune full of playful melodies and colourful instrumental tones. Perfect for children’s entertainment, animated stories, or family-friendly content that radiates joy.\n\nMusic composed by Bobby Cole, a UK-based composer known for producing cinematic, orchestral, and atmospheric soundtracks for film, TV, and games.\n\nwww.bobbycole.co.uk"
    },
    "national anthems": {
      tags: ["anthem","patriotic","orchestral","ceremonial","traditional"],
      description: "A proud and majestic orchestral anthem evoking national pride and ceremonial grandeur. Ideal for sporting events, heritage documentaries, or any moment celebrating unity and honour.\n\nMusic composed by Bobby Cole, a UK-based composer known for producing cinematic, orchestral, and atmospheric soundtracks for film, TV, and games.\n\nwww.bobbycole.co.uk"
    },
    "nursery rhymes": {
      tags: ["nursery","kids","simple","playful","fun"],
      description: "Delightful and whimsical, this instrumental nursery rhyme captures innocence and wonder with soft tones and charming rhythms. Perfect for early learning, storytelling, or gentle children’s themes.\n\nMusic composed by Bobby Cole, a UK-based composer known for producing cinematic, orchestral, and atmospheric soundtracks for film, TV, and games.\n\nwww.bobbycole.co.uk"
    },
    pop: {
      tags: ["pop","catchy","mainstream","bright","upbeat"],
      description: "An upbeat pop instrumental bursting with energy, melodic hooks, and modern production. Perfect for advertising, feel-good visuals, or contemporary storytelling with vibrant optimism.\n\nMusic composed by Bobby Cole, a UK-based composer known for producing cinematic, orchestral, and atmospheric soundtracks for film, TV, and games.\n\nwww.bobbycole.co.uk"
    },
    rock: {
      tags: ["rock","classic rock","guitar","energy","retro"],
      description: "Deeply gritty and full of raw power, this classic rock instrumental delivers roaring guitar riffs, driving drums, and a swaggering old-school energy that captures the essence of vintage amp-driven rock. Perfect for scenes of rebellion, road trips, or anything needing an injection of pure attitude and distortion-filled grit.\n\nMusic composed by Bobby Cole, a UK-based composer known for producing cinematic, orchestral, and atmospheric soundtracks for film, TV, and games.\n\nwww.bobbycole.co.uk"
    },
    world: {
      tags: ["world","cultural","travel","instrumental","fusion"],
      description: "Rich percussion, global instrumentation, and melodic colour unite in this worldly instrumental. Perfect for travel documentaries, multicultural projects, or global storytelling with energy and warmth.\n\nMusic composed by Bobby Cole, a UK-based composer known for producing cinematic, orchestral, and atmospheric soundtracks for film, TV, and games.\n\nwww.bobbycole.co.uk"
    },
    reggae: {
      tags: ["reggae","island","dub","groove","jamaica"],
      description: "Sunny reggae grooves and syncopated rhythms bring relaxed island vibes to life. Perfect for travel content, beach scenes, or feel-good moments filled with warmth and positivity.\n\nMusic composed by Bobby Cole, a UK-based composer known for producing cinematic, orchestral, and atmospheric soundtracks for film, TV, and games.\n\nwww.bobbycole.co.uk"
    },
    celtic: {
      tags: ["celtic","irish","folk","pipes","traditional"],
      description: "Flowing melodies and traditional instrumentation evoke the rolling landscapes and storytelling spirit of Celtic heritage. Perfect for fantasy films, historical content, or cultural projects steeped in folklore.\n\nMusic composed by Bobby Cole, a UK-based composer known for producing cinematic, orchestral, and atmospheric soundtracks for film, TV, and games.\n\nwww.bobbycole.co.uk"
    },
    latin: {
      tags: ["latin","bossa nova","samba","rhythm","tropical"],
      description: "Vibrant Latin rhythms and melodic flair create a lively, sun-soaked instrumental bursting with passion and groove. Perfect for dance sequences, travel visuals, or celebrations of movement and colour.\n\nMusic composed by Bobby Cole, a UK-based composer known for producing cinematic, orchestral, and atmospheric soundtracks for film, TV, and games.\n\nwww.bobbycole.co.uk"
    },
    asian: {
      tags: ["asian","oriental","world","instrumental","travel"],
      description: "Delicate instrumentation and traditional scales blend to create a serene and evocative Asian-inspired soundscape. Perfect for cultural films, travel stories, or meditative visual moments.\n\nMusic composed by Bobby Cole, a UK-based composer known for producing cinematic, orchestral, and atmospheric soundtracks for film, TV, and games.\n\nwww.bobbycole.co.uk"
    },
    african: {
      tags: ["african","drums","tribal","world","rhythm"],
      description: "Energetic percussion and rhythmic layers come together in a lively African-inspired groove filled with warmth and vitality. Perfect for cultural storytelling, nature content, or vibrant rhythmic montages.\n\nMusic composed by Bobby Cole, a UK-based composer known for producing cinematic, orchestral, and atmospheric soundtracks for film, TV, and games.\n\nwww.bobbycole.co.uk"
    }
  };

  // (rest of logic identical to working test version)
})();
// ------------------------------------------------------
// 🧩 Generate fuzzy keyword lists from tags + description
// ------------------------------------------------------
for (const g in LOOKUP) {
  const firstPara = (LOOKUP[g].description || "")
    .split("\n\n")[0]
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ");
  LOOKUP[g].fuzzy = [
    ...new Set([
      ...(LOOKUP[g].tags || []).map((t) => t.toLowerCase()),
      ...firstPara.split(" ").filter((w) => w.length > 3),
    ]),
  ];
}

// ------------------------------------------------------
// 🎯 Genre detection logic (name → tags → fuzzy → fallback)
// ------------------------------------------------------
const getGenre = (title) => {
  title = title.toLowerCase();
  for (const g in LOOKUP) {
    if (title.includes(g)) return g;
    for (const w of LOOKUP[g].fuzzy) if (title.includes(w)) return g;
  }
  return null;
};

// ------------------------------------------------------
// 🕓 Utility: waitFor() — waits until element appears
// ------------------------------------------------------
const waitFor = async (fn, ms = 12000, step = 200) => {
  const start = Date.now();
  for (;;) {
    const val = fn();
    if (val) return val;
    if (Date.now() - start > ms) return null;
    await sleep(step);
  }
};

// ------------------------------------------------------
// 🧾 Detect uploaded filename & set title
// ------------------------------------------------------
const grabFilename = () => {
  const els = [
    document.querySelector('[class*="FileNameWithoutExt"]'),
    document.querySelector(".styles__FileNameWithoutExt-css-in-js__sc-1wf9tw0-3"),
    document.querySelector('[data-testid="file-name"],[data-testid="uploaded-filename"]'),
  ];
  for (const el of els) if (el && el.textContent) return el.textContent.trim();
  return "";
};

let fname = grabFilename();
if (!fname) {
  const found = await waitFor(() => grabFilename(), 10000, 250);
  if (found) fname = grabFilename();
}
if (!fname) {
  fname = prompt("Couldn't detect uploaded filename — type the track title (without .wav):", "");
  if (!fname) return;
}
let title = fname.replace(/\.[^/.]+$/, "").trim();

const titleBox = document.querySelector("#name");
if (!titleBox) return alert("❌ Title input (#name) not found.");

titleBox.focus();
setVal(titleBox, "");
await sleep(50);
setVal(titleBox, title);
await sleep(100);
setVal(titleBox, title + " ");
await sleep(80);
setVal(titleBox, title);
titleBox.dispatchEvent(new Event("change", { bubbles: true }));
titleBox.blur();
await sleep(200);

// ------------------------------------------------------
// ✅ Click "Confirm name"
// ------------------------------------------------------
const confirmBtn = [...document.querySelectorAll("button")].find((b) =>
  /confirm name/i.test(b.textContent || "")
);
if (confirmBtn) {
  confirmBtn.scrollIntoView({ behavior: "smooth", block: "center" });
  await sleep(150);
  clickEl(confirmBtn);
}

await sleep(2500);

// ------------------------------------------------------
// 🎵 Detect Genre (smart fuzzy matching)
// ------------------------------------------------------
const currentTitle = document.querySelector("#name");
let genre = getGenre((currentTitle && currentTitle.value) || title || "");

if (!genre) {
  const opts = Object.keys(LOOKUP)
    .map((g) => `<option value='${g}'>${g}</option>`)
    .join("");
  const box = document.createElement("div");
  box.innerHTML = `
  <div style='position:fixed;top:20%;left:50%;transform:translateX(-50%);
  background:#222;color:#fff;padding:20px;z-index:999999;border-radius:10px;
  min-width:260px;'>
    <div style="font-weight:600;margin-bottom:8px">Select Genre</div>
    <select id='sel' style='width:100%;padding:6px 8px;margin:6px 0'>${opts}</select>
    <button id='ok' style='padding:6px 10px;background:#09f;color:#fff;border:0;border-radius:6px;cursor:pointer'>
      OK
    </button>
  </div>`;
  document.body.appendChild(box);
  await new Promise((res) => {
    box.querySelector("#ok").onclick = () => {
      genre = box.querySelector("#sel").value;
      box.remove();
      res();
    };
  });
}

const data = LOOKUP[genre];
if (!data) return alert(`❌ Genre '${genre}' not found in lookup.`);

// ------------------------------------------------------
// 📝 Fill description and tags
// ------------------------------------------------------
const desc = document.querySelector("#description");
if (desc) {
  setVal(desc, data.description);
  desc.dispatchEvent(new Event("change", { bubbles: true }));
}

const tagInput = document.querySelector("#genre-input");
if (tagInput) {
  for (const tag of data.tags || []) {
    tagInput.focus();
    setVal(tagInput, "");
    await sleep(80);
    setVal(tagInput, tag);
    tagInput.dispatchEvent(new Event("input", { bubbles: true }));
    await sleep(350);
    tagInput.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        which: 13,
        bubbles: true,
        cancelable: true,
      })
    );
    tagInput.dispatchEvent(
      new KeyboardEvent("keyup", {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        which: 13,
        bubbles: true,
        cancelable: true,
      })
    );
    await sleep(250);
  }
  tagInput.blur();
}

// ------------------------------------------------------
// 🖼️ Upload artwork from GitHub
// ------------------------------------------------------
const art = document.querySelector('input[type=file][name=picture]');
if (art) {
  try {
    const res = await fetch(GITHUB + encodeURIComponent(genre) + ".jpg");
    if (res.ok) {
      const blob = await res.blob();
      const file = new File([blob], `${genre}.jpg`, { type: blob.type });
      const dt = new DataTransfer();
      dt.items.add(file);
      art.files = dt.files;
      art.dispatchEvent(new Event("change", { bubbles: true }));
    }
  } catch (err) {
    console.warn("⚠️ Artwork fetch failed:", err);
  }
}

// ------------------------------------------------------
// 🚀 Publish
// ------------------------------------------------------
await sleep(1000);
const publishBtn = document.querySelector('button[data-testid=save-button]');
if (publishBtn && isVisible(publishBtn)) {
  clickEl(publishBtn);
  console.log("✅ Published:", title, "→", genre);
} else {
  console.warn("⚠️ Couldn't find Publish button.");
}