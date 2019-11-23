//obiekt javascriptowy składający się z parametrów

// jak robimy mocki to używajmy capslocka do nazw

const MIKOLAJ_NOTE = {
  user: "Mikolaj",
  categories: ["Giełda"],
  ideas: [
    {
      category: "Giełda",
      idea: "Bot"
    },
    {
      category: "Giełda",
      idea: "Kalkulator"
    }
  ]
};

const FILIP_NOTE = {
  user: "Filip",
  categories: ["Czapki"],
  ideas: [
    {
      category: "Czapki",
      idea: "Z daszkiem"
    },
    {
      category: "Czapki",
      idea: "Bez daszka"
    }
  ]
};

const NOTE_LIST = [
  MIKOLAJ_NOTE,
  FILIP_NOTE,
  MIKOLAJ_NOTE,
  FILIP_NOTE,
  MIKOLAJ_NOTE,
  FILIP_NOTE,
  MIKOLAJ_NOTE,
  FILIP_NOTE,
  MIKOLAJ_NOTE,
  FILIP_NOTE,
  MIKOLAJ_NOTE,
  FILIP_NOTE
];

export { NOTE_LIST as noteList };

// thanks to such expression we can import noteList as { noteList }
// from 'notes' (instead of { NOTE_LIST })
