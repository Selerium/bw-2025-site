<script setup lang="ts">
import { onMounted } from "vue";

const props = defineProps({
  rows: {
    type: Array<any>,
    required: true,
  },
});

const emit = defineEmits(['click-user']);

onMounted(() => {
  props.rows.forEach((row) => {
    const roomDiv = document.getElementById(`${row?.tower}${row?.room}-names`);

    if (roomDiv) {
      // we have the div, just add the new name
      const nameText = document.createElement("p");
      nameText.textContent = row?.full_name.toLowerCase();
      nameText.classList.add('cursor-pointer', 'hover:font-semibold', 'capitalize');
      nameText.onclick = () => { emit('click-user', row) };

      roomDiv.appendChild(nameText);
    } else {
      // get the room list div
      const roomsListDiv = document.getElementById(`rooms-list`);

      // create a div to hold the "room"
      const newRoomDiv = document.createElement("div");
      newRoomDiv.classList.add("w-1/3", "p-2",);
      newRoomDiv.id = `${row?.tower}${row?.room}`;
      newRoomDiv.style.order = `${row?.tower}${row?.room}`;

      // create the inner portion that will house the information
      const innerRoomDiv = document.createElement("div");
      innerRoomDiv.classList.add(
        "w-full",
        "rounded",
        "border",
        "p-2",
        "flex",
        "flex-col",
        "gap-2",
        'h-full'
      );

      // the heading of the room
      const innerRoomText = document.createElement("p");
      innerRoomText.textContent = `Tower ${row?.tower}, Room ${row?.room}`;
      innerRoomText.classList.add("font-semibold");

      // the div holding the names
      const listOfNamesDiv = document.createElement("div");
      listOfNamesDiv.classList.add(
        "flex",
        "flex-col",
        "justify-center",
        "items-start",
        "gap-2"
      );
      listOfNamesDiv.id = `${row?.tower}${row?.room}-names`;

      // the first name
      const nameText = document.createElement("p");
      nameText.textContent = row?.full_name.toLowerCase();
      nameText.classList.add('cursor-pointer', 'hover:font-semibold', 'capitalize');
      nameText.onclick = () => { emit('click-user', row) };

      // appending each child to the respective parent
      listOfNamesDiv.appendChild(nameText);
      innerRoomDiv.appendChild(innerRoomText);
      innerRoomDiv.appendChild(listOfNamesDiv);
      newRoomDiv.appendChild(innerRoomDiv);
      roomsListDiv?.appendChild(newRoomDiv);
    }
  });

  // removing the N/A N/A room
  const marni = document.getElementById(`N/AN/A`);
  marni?.remove();
});
</script>

<template>
  <div class="p-2 w-full">
    <div class="bg-white w-full border rounded p-2 flex flex-col gap-2">
      <p class="text-xl font-semibold">Room Allocation</p>
      <p>(Click on a name to see more info on a name)</p>
      <div id="rooms-list" class="flex flex-wrap">
        <!-- <div class="w-1/4 p-2">
          <div v-f class="w-full rounded border">
            <p>Tower X, Room X</p>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
