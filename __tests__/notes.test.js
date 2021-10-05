const fs = require("fs");
const {
  filterByQuery,
  createNewNote,
} = require("../lib/notes.js");
const { animals } = require("../data/notes");

jest.mock('fs');

test("creates an note object", () => {
  const notes = createNewNote(
    { text: "1. Need to go to car wash 2. Finish homework", title: "things to do today" },
    animals
  );

  expect(notes.text).toBe("1. Need to go to car wash 2. Finish homework");
  expect(notes.title).toBe("things to do today");
});

test("filters by query", () => {
  const startingNotes = [
    {
      title: "October",
      text: ["Went to Oktoberfest", "Saw my little brother"] 
    },
    { 
        title: "September",
        text: ["Saw new movie", "had a party"]
    },
    {
        title: "Homework Checklist",
        text: ["1. Finish challenge 6", "2. Fix challenge 10"]
    }
  ];

  const updatedNotes = filterByQuery({ Title: "october" }, startingNotes);

  expect(updatedNotes.length).toEqual(1);
});
