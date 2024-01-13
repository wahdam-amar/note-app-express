<template>
  <div>
    <h1>Notes App</h1>
    <form @submit.prevent="saveNote">
      <label>Title:</label>
      <input v-model="title" required />
      <label>Content:</label>
      <textarea v-model="content" required></textarea>
      <button type="submit">Save Note</button>
    </form>
    <ul>
      <li v-for="(note, index) in notes" :key="index">
        <strong>{{ note.title }}</strong>
        <p>{{ note.content }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      content: "",
      notes: [],
    };
  },
  methods: {
    async saveNote() {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: this.title,
          content: this.content,
        }),
      });

      if (response.ok) {
        const newNote = await response.json();
        this.notes.push(newNote);
        this.title = "";
        this.content = "";
      }
    },
    async fetchNotes() {
      const response = await fetch("/api/notes");
      if (response.ok) {
        this.notes = await response.json();
      }
    },
  },
  mounted() {
    this.fetchNotes();
  },
};
</script>

<style>
/* Your styles go here */
</style>
