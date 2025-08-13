<script setup lang="ts">
import { ref } from "vue";
import TextInput from "./form/TextInput.vue";
import { supabase } from "../lib/supabaseClient";
import { computed } from "@vue/reactivity";

const username = "arnoiscool";
const password = "coolisarno";

const loggedIn = ref<boolean>(false);
const inputUsername = ref<string>();
const inputPassword = ref<string>();
const rows = ref([
  {
    id: String,
    created_at: String,
    full_name: String,
    gender: String,
    date_of_birth: String,
    age: String,
    role: String,
    nationality: String,
    id_number: String,
    email: String,
    phone_number: String,
    emergency_name: String,
    emergency_number: String,
    church_name: String,
    church_code: String,
    youth_leader: String,
    youth_number: String,
    shirt_size: String,
    graduating: String,
    launch_conf: String,
    swimming: String,
    allergies: String,
    allergies_info: String,
    medication: String,
    medication_info: String,
    eyu_cap: String,
    bw_25_shirt: String,
    bw_25_shirt_size: String,
    online_payment: String,
    acknowledgement: String,
    paid: Boolean,
  },
]);
const showFilters = ref<boolean>(false);
const searchText = ref<string>("");
const chosenColumn = ref("");

const ID_column = ref<boolean>(false);
const datetime_column = ref<boolean>(false);
const full_name_column = ref<boolean>(true);
const gender_column = ref<boolean>(true);
const date_of_birth_column = ref<boolean>(true);
const age_column = ref<boolean>(true);
const role_column = ref<boolean>(true);
const nationality_column = ref<boolean>(true);
const id_number_column = ref<boolean>(true);
const email_column = ref<boolean>(true);
const phone_number_column = ref<boolean>(true);
const emergency_name_column = ref<boolean>(true);
const emergency_number_column = ref<boolean>(true);
const church_name_column = ref<boolean>(true);
const church_code_column = ref<boolean>(false);
const youth_leader_column = ref<boolean>(true);
const youth_number_column = ref<boolean>(true);
const shirt_size_column = ref<boolean>(true);
const graduating_column = ref<boolean>(true);
const launch_conf_column = ref<boolean>(true);
const swimming_column = ref<boolean>(true);
const allergies_column = ref<boolean>(true);
const allergies_info_column = ref<boolean>(true);
const medication_column = ref<boolean>(true);
const medication_info_column = ref<boolean>(true);
const eyu_cap_column = ref<boolean>(true);
const bw_25_shirt_column = ref<boolean>(true);
const bw_25_shirt_size_column = ref<boolean>(true);
const online_payment_column = ref<boolean>(true);
const acknowledgement_column = ref<boolean>(false);
const paid_column = ref<boolean>(true);
const church_names = ref<any>();
const showBreakup = ref<boolean>(false);
const showMasterList = ref<boolean>(true);

const filteredRows = computed(() => {
  if (!searchText.value) return rows.value;

  if (!chosenColumn.value)
    return rows.value.filter((row) =>
      Object.values(row).some((field) =>
        String(field).toLowerCase().includes(searchText.value.toLowerCase())
      )
    );

  return rows.value.filter((row) =>
    String(row[chosenColumn.value as keyof typeof row])
      .toLowerCase()
      .includes(searchText.value.toLowerCase())
  );
});

async function checkLogIn() {
  if (inputUsername.value == username && inputPassword.value == password) {
    loggedIn.value = true;

    let { data, error } = await supabase
      .from("registrations-25")
      .select("*")
      .order("created_at");

    if (data) rows.value = data;
    if (error) console.log(error);

    const counts: Record<string, { signups: number; paidSignups: number, nonPaying: number }> = {};

    rows.value.forEach((row) => {
      if (row["church_name"]) {
        if (counts[row["church_name"].toString()])
          counts[row["church_name"].toString()] = {
            signups: counts[row["church_name"].toString()]["signups"] + 1,
            paidSignups:
              counts[row["church_name"].toString()]["paidSignups"] +
              (row["paid"] ? 1 : 0),
            nonPaying:
              counts[row["church_name"].toString()]["nonPaying"] +
              (!row["online_payment"] ? 1 : 0),
          };
        else
          counts[row["church_name"].toString()] = {
            signups: 1,
            paidSignups: row["paid"] ? 1 : 0,
            nonPaying: row["online_payment"] ? 0 : 1
          };
      }
    });

    church_names.value = Object.entries(counts).map(([name, info]) => ({
      name,
      info,
    }));

    console.log(church_names.value);
  }
}

function toggleFilters() {
  showFilters.value = !showFilters.value;
}

function readableValue(text: any) {
  return text === true
    ? "Yes"
    : text === false
    ? "No"
    : text === undefined || text == null
    ? "-"
    : text;
}
</script>

<template>
  <div
    v-if="!loggedIn"
    class="flex flex-col gap-4 justify-center items-center h-dvh w-full"
  >
    <div class="w-1/2 min-w-72 flex flex-col gap-4 rounded-lg border py-4">
      <h1 class="text-3xl font-semibold">Big Weekend Admin Panel</h1>
      <div class="flex flex-col w-full justify-center items-center gap-4">
        <TextInput
          v-model="inputUsername"
          :title="'Username'"
          :placeholder="'-----'"
        />
        <TextInput
          v-model="inputPassword"
          :title="'Password'"
          :placeholder="'-----'"
        />
        <button
          @click="checkLogIn"
          class="px-4 pb-2 pt-3 rounded-lg bg-secondary text-white"
        >
          LOG IN
        </button>
      </div>
    </div>
  </div>

  <div class="w-full h-fit" v-if="loggedIn">
    <div
      class="box-border p-4 flex flex-col justify-start items-center gap-4 w-full h-fit"
    >
      <div class="w-full flex justify-between items-center">
        <h2 class="text-center md:text-left text-2xl font-semibold w-full">
          Student Breakup
        </h2>
        <img
          src="/arrow.png"
          @click="() => (showBreakup = !showBreakup)"
          :class="showBreakup ? 'rotate-180' : ''"
          class="w-6 h-4 invert-100 cursor-pointer"
        />
      </div>
      <div v-if="showBreakup" class="w-full flex flex-col rounded-lg">
        <div class="w-full flex">
          <p class="p-2 w-1/4 bg-secondary text-white font-semibold border">
            Church Name
          </p>
          <p class="p-2 w-1/4 bg-secondary text-white font-semibold border">
            Total Participants
          </p>
          <p class="p-2 w-1/4 bg-secondary text-white font-semibold border">
            Paid Participants
          </p>
          <p class="p-2 w-1/4 bg-secondary text-white font-semibold border">
            Non-Paying Participants
          </p>
        </div>
        <div v-for="church in church_names" class="w-full flex">
          <p class="p-2 w-1/4 border">{{ church["name"] }}</p>
          <p class="p-2 w-1/4 border">{{ church["info"]["signups"] }}</p>
          <p class="p-2 w-1/4 border">{{ church["info"]["paidSignups"] }}</p>
          <p class="p-2 w-1/4 border">{{ church["info"]["nonPaying"] }}</p>
        </div>
        <div class="w-full flex">
          <p class="p-2 w-1/4 border font-semibold">Total</p>
          <p class="p-2 w-1/4 border font-semibold">{{ rows.length }}</p>
          <p class="p-2 w-1/4 border font-semibold">
            {{ rows.filter((row) => row["paid"]).length }}
          </p>
          <p class="p-2 w-1/4 border font-semibold">
            {{ rows.filter((row) => !row["online_payment"]).length }}
          </p>
        </div>
      </div>
    </div>
    <div class="h-0.5 w-full bg-black"></div>
    <div
      class="box-border p-4 flex flex-col justify-start items-center gap-4 w-full h-dvh"
    >
      <div class="flex flex-wrap gap-4 justify-between items-center w-full">
        <div class="flex md:flex-row flex-col items-center gap-2">
          <h1 class="text-center md:text-left text-2xl font-semibold w-full">
            Registrations Master List
          </h1>
          <button
            @click="toggleFilters"
            class="w-fit text-nowrap cursor-pointer px-4 pb-2 pt-3 bg-primary text-white rounded-lg font-semibold"
          >
            {{ showFilters ? "HIDE" : "SHOW" }} FILTERS
          </button>
        </div>
        <div
          class="w-1/3 min-w-72 flex flex-col md:flex-row items-center gap-2"
        >
          <label class="m-0">Search by:</label>
          <select v-model="chosenColumn" class="p-3 border rounded-lg">
            <option selected value="">* (all columns)</option>
            <option value="ID">ID</option>
            <option value="datetime">Date Registered</option>
            <option value="full_name">Full Name</option>
            <option value="gender">Gender</option>
            <option value="date_of_birth">Date Of Birth</option>
            <option value="age">Age</option>
            <option value="role">Role</option>
            <option value="nationality">Nationality</option>
            <option value="id_number">ID Number</option>
            <option value="email">Email</option>
            <option value="phone_number">Phone Number</option>
            <option value="emergency_name">Emergency Name</option>
            <option value="emergency_number">Emergency Number</option>
            <option value="church_name">Church Name</option>
            <option value="youth_leader">Youth Leader</option>
            <option value="youth_number">Youth Leader Number</option>
            <option value="shirt_size">Shirt Size</option>
            <option value="allergies_info">Allergies Info</option>
            <option value="medication_info">Medication Info</option>
          </select>
          <input
            v-model="searchText"
            class="grow rounded-lg p-2 border"
            type="text"
            placeholder="e.g.: Name, Leader, Church, etc..."
          />
          <img
            src="/arrow.png"
            @click="() => (showMasterList = !showMasterList)"
            :class="showMasterList ? 'rotate-180' : ''"
            class="w-6 h-4 invert-100 cursor-pointer"
          />
        </div>
      </div>

      <div
        v-if="showFilters"
        class="w-full flex flex-wrap gap-x-4 gap-y-2 items-center justify-start"
      >
        <div class="flex gap-2">
          <input type="checkbox" v-model="ID_column" />
          <label>ID</label>
        </div>
        <div class="flex gap-2">
          <input type="checkbox" v-model="datetime_column" />
          <label>Date Registered</label>
        </div>
        <div class="flex gap-2">
          <input type="checkbox" v-model="full_name_column" />
          <label>Full Name</label>
        </div>
        <div class="flex gap-2">
          <input type="checkbox" v-model="gender_column" />
          <label>Gender</label>
        </div>
        <div class="flex gap-2">
          <input type="checkbox" v-model="date_of_birth_column" />
          <label>Date Of Birth</label>
        </div>
        <div class="flex gap-2">
          <input type="checkbox" v-model="age_column" />
          <label>Age</label>
        </div>
        <div class="flex gap-2">
          <input type="checkbox" v-model="role_column" />
          <label>Role</label>
        </div>
        <div class="flex gap-2">
          <input type="checkbox" v-model="nationality_column" />
          <label>Nationality</label>
        </div>
        <div class="flex gap-2">
          <input type="checkbox" v-model="id_number_column" />
          <label>ID Number</label>
        </div>
        <div class="flex gap-2">
          <input type="checkbox" v-model="email_column" />
          <label>Email</label>
        </div>
        <div class="flex gap-2">
          <input type="checkbox" v-model="phone_number_column" />
          <label>Phone Number</label>
        </div>
        <div class="flex gap-2">
          <input type="checkbox" v-model="emergency_name_column" />
          <label>Emergency Name</label>
        </div>
        <div class="flex gap-2">
          <input type="checkbox" v-model="emergency_number_column" />
          <label>Emergency Number</label>
        </div>
        <div class="flex gap-2">
          <input type="checkbox" v-model="church_name_column" />
          <label>Church Name</label>
        </div>
        <div class="flex gap-2">
          <input type="checkbox" v-model="church_code_column" />
          <label>Church Code</label>
        </div>
        <div class="flex gap-2">
          <input type="checkbox" v-model="youth_leader_column" />
          <label>Youth Leader</label>
        </div>
        <div class="flex gap-2">
          <input type="checkbox" v-model="youth_number_column" />
          <label>Youth Number</label>
        </div>
        <div class="flex gap-2">
          <input type="checkbox" v-model="shirt_size_column" />
          <label>Shirt Size</label>
        </div>
        <div class="flex gap-2">
          <input type="checkbox" v-model="graduating_column" />
          <label>Graduating</label>
        </div>
        <div class="flex gap-2">
          <input type="checkbox" v-model="launch_conf_column" />
          <label>Launch Conf</label>
        </div>
        <div class="flex gap-2">
          <input type="checkbox" v-model="swimming_column" />
          <label>Swimming</label>
        </div>
        <div class="flex gap-2">
          <input type="checkbox" v-model="allergies_column" />
          <label>Allergies</label>
        </div>
        <div class="flex gap-2">
          <input type="checkbox" v-model="allergies_info_column" />
          <label>Allergies Info</label>
        </div>
        <div class="flex gap-2">
          <input type="checkbox" v-model="medication_column" />
          <label>Medication</label>
        </div>
        <div class="flex gap-2">
          <input type="checkbox" v-model="medication_info_column" />
          <label>Medication Info</label>
        </div>
        <div class="flex gap-2">
          <input type="checkbox" v-model="eyu_cap_column" />
          <label>EYU Cap</label>
        </div>
        <div class="flex gap-2">
          <input type="checkbox" v-model="bw_25_shirt_column" />
          <label>BW 25 Shirt</label>
        </div>
        <div class="flex gap-2">
          <input type="checkbox" v-model="bw_25_shirt_size_column" />
          <label>BW 25 Shirt Size</label>
        </div>
        <div class="flex gap-2">
          <input type="checkbox" v-model="online_payment_column" />
          <label>Online Payment</label>
        </div>
        <div class="flex gap-2">
          <input type="checkbox" v-model="acknowledgement_column" />
          <label>Acknowledgement</label>
        </div>
        <div class="flex gap-2">
          <input type="checkbox" v-model="paid_column" />
          <label>Paid</label>
        </div>
      </div>

      <div
        v-if="showMasterList"
        class="border rounded-lg w-full overflow-y-scroll"
      >
        <table class="border-collapse">
          <thead>
            <tr>
              <th class="sticky top-0 bg-secondary text-white">
                <p class="p-2 border-b border-r text-nowrap">ID</p>
              </th>
              <th v-if="ID_column" class="sticky top-0 bg-secondary text-white">
                <p class="p-2 border-b border-r text-nowrap">Database ID</p>
              </th>
              <th
                v-if="datetime_column"
                class="sticky top-0 bg-secondary text-white"
              >
                <p class="p-2 border-b border-r text-nowrap">Date Registered</p>
              </th>
              <th
                v-if="full_name_column"
                class="sticky top-0 bg-secondary text-white"
              >
                <p class="p-2 border-b border-r text-nowrap">Full Name</p>
              </th>
              <th
                v-if="gender_column"
                class="sticky top-0 bg-secondary text-white"
              >
                <p class="p-2 border-b border-r text-nowrap">Gender</p>
              </th>
              <th
                v-if="date_of_birth_column"
                class="sticky top-0 bg-secondary text-white"
              >
                <p class="p-2 border-b border-r text-nowrap">DOB</p>
              </th>
              <th
                v-if="age_column"
                class="sticky top-0 bg-secondary text-white"
              >
                <p class="p-2 border-b border-r text-nowrap">Age</p>
              </th>
              <th
                v-if="role_column"
                class="sticky top-0 bg-secondary text-white"
              >
                <p class="p-2 border-b border-r text-nowrap">Role</p>
              </th>
              <th
                v-if="nationality_column"
                class="sticky top-0 bg-secondary text-white"
              >
                <p class="p-2 border-b border-r text-nowrap">Nationality</p>
              </th>
              <th
                v-if="id_number_column"
                class="sticky top-0 bg-secondary text-white"
              >
                <p class="p-2 border-b border-r text-nowrap">EID/Passport</p>
              </th>
              <th
                v-if="email_column"
                class="sticky top-0 bg-secondary text-white"
              >
                <p class="p-2 border-b border-r text-nowrap">Email Address</p>
              </th>
              <th
                v-if="phone_number_column"
                class="sticky top-0 bg-secondary text-white"
              >
                <p class="p-2 border-b border-r text-nowrap">Phone Number</p>
              </th>
              <th
                v-if="emergency_name_column"
                class="sticky top-0 bg-secondary text-white"
              >
                <p class="p-2 border-b border-r text-nowrap">
                  Emergency Contact
                </p>
              </th>
              <th
                v-if="emergency_number_column"
                class="sticky top-0 bg-secondary text-white"
              >
                <p class="p-2 border-b border-r text-nowrap">
                  Emergency Contact Number
                </p>
              </th>
              <th
                v-if="church_name_column"
                class="sticky top-0 bg-secondary text-white"
              >
                <p class="p-2 border-b border-r text-nowrap">Church Name</p>
              </th>
              <th
                v-if="church_code_column"
                class="sticky top-0 bg-secondary text-white"
              >
                <p class="p-2 border-b border-r text-nowrap">
                  Church Code (unused)
                </p>
              </th>
              <th
                v-if="youth_leader_column"
                class="sticky top-0 bg-secondary text-white"
              >
                <p class="p-2 border-b border-r text-nowrap">Youth Leader</p>
              </th>
              <th
                v-if="youth_number_column"
                class="sticky top-0 bg-secondary text-white"
              >
                <p class="p-2 border-b border-r text-nowrap">
                  Youth Leader Contact Number
                </p>
              </th>
              <th
                v-if="shirt_size_column"
                class="sticky top-0 bg-secondary text-white"
              >
                <p class="p-2 border-b border-r text-nowrap">Shirt Size</p>
              </th>
              <th
                v-if="graduating_column"
                class="sticky top-0 bg-secondary text-white"
              >
                <p class="p-2 border-b border-r text-nowrap">Graduating?</p>
              </th>
              <th
                v-if="launch_conf_column"
                class="sticky top-0 bg-secondary text-white"
              >
                <p class="p-2 border-b border-r text-nowrap">
                  Launch Conf Interest?
                </p>
              </th>
              <th
                v-if="swimming_column"
                class="sticky top-0 bg-secondary text-white"
              >
                <p class="p-2 border-b border-r text-nowrap">
                  Swimming Proficiency
                </p>
              </th>
              <th
                v-if="allergies_column"
                class="sticky top-0 bg-secondary text-white"
              >
                <p class="p-2 border-b border-r text-nowrap">Allergies?</p>
              </th>
              <th
                v-if="allergies_info_column"
                class="sticky top-0 bg-secondary text-white"
              >
                <p class="p-2 border-b border-r text-nowrap">
                  Allergy Information
                </p>
              </th>
              <th
                v-if="medication_column"
                class="sticky top-0 bg-secondary text-white"
              >
                <p class="p-2 border-b border-r text-nowrap">Medication?</p>
              </th>
              <th
                v-if="medication_info_column"
                class="sticky top-0 bg-secondary text-white"
              >
                <p class="p-2 border-b border-r text-nowrap">
                  Medication Information
                </p>
              </th>
              <th
                v-if="eyu_cap_column"
                class="sticky top-0 bg-secondary text-white"
              >
                <p class="p-2 border-b border-r text-nowrap">EYU Cap?</p>
              </th>
              <th
                v-if="bw_25_shirt_column"
                class="sticky top-0 bg-secondary text-white"
              >
                <p class="p-2 border-b border-r text-nowrap">
                  BW25 Limited Edition Sweater?
                </p>
              </th>
              <th
                v-if="bw_25_shirt_size_column"
                class="sticky top-0 bg-secondary text-white"
              >
                <p class="p-2 border-b border-r text-nowrap">
                  BW25 Limited Edition Sweater Size
                </p>
              </th>
              <th
                v-if="online_payment_column"
                class="sticky top-0 bg-secondary text-white"
              >
                <p class="p-2 border-b border-r text-nowrap">Paying Online?</p>
              </th>
              <th
                v-if="acknowledgement_column"
                class="sticky top-0 bg-secondary text-white"
              >
                <p class="p-2 border-b border-r text-nowrap">Acknowledgement</p>
              </th>
              <th
                v-if="paid_column"
                class="sticky top-0 right-0 bg-secondary drop-shadow-lg z-20 text-white"
              >
                <p class="p-2 border-b border-r text-nowrap">Paid?</p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, idx) in filteredRows" :key="idx">
              <td class="border-b border-r p-2 text-nowrap">{{ idx + 1 }}</td>
              <td v-if="ID_column" class="border-b border-r p-2 text-nowrap">
                {{ readableValue(row["id"]) }}
              </td>
              <td
                v-if="datetime_column"
                class="border-b border-r p-2 text-nowrap"
              >
                {{ readableValue(row["created_at"]) }}
              </td>
              <td
                v-if="full_name_column"
                class="border-b border-r p-2 text-nowrap"
              >
                {{ readableValue(row["full_name"]) }}
              </td>
              <td
                v-if="gender_column"
                class="border-b border-r p-2 text-nowrap"
              >
                {{ readableValue(row["gender"]) }}
              </td>
              <td
                v-if="date_of_birth_column"
                class="border-b border-r p-2 text-nowrap"
              >
                {{ readableValue(row["date_of_birth"]) }}
              </td>
              <td v-if="age_column" class="border-b border-r p-2 text-nowrap">
                {{ readableValue(row["age"]) }}
              </td>
              <td v-if="role_column" class="border-b border-r p-2 text-nowrap">
                {{ readableValue(row["role"]) }}
              </td>
              <td
                v-if="nationality_column"
                class="border-b border-r p-2 text-nowrap"
              >
                {{ readableValue(row["nationality"]) }}
              </td>
              <td
                v-if="id_number_column"
                class="border-b border-r p-2 text-nowrap"
              >
                {{ readableValue(row["id_number"]) }}
              </td>
              <td v-if="email_column" class="border-b border-r p-2 text-nowrap">
                {{ readableValue(row["email"]) }}
              </td>
              <td
                v-if="phone_number_column"
                class="border-b border-r p-2 text-nowrap"
              >
                {{ readableValue(row["phone_number"]) }}
              </td>
              <td
                v-if="emergency_name_column"
                class="border-b border-r p-2 text-nowrap"
              >
                {{ readableValue(row["emergency_name"]) }}
              </td>
              <td
                v-if="emergency_number_column"
                class="border-b border-r p-2 text-nowrap"
              >
                {{ readableValue(row["emergency_number"]) }}
              </td>
              <td
                v-if="church_name_column"
                class="border-b border-r p-2 text-nowrap"
              >
                {{ readableValue(row["church_name"]) }}
              </td>
              <td
                v-if="church_code_column"
                class="border-b border-r p-2 text-nowrap"
              >
                {{ readableValue(row["church_code"]) }}
              </td>
              <td
                v-if="youth_leader_column"
                class="border-b border-r p-2 text-nowrap"
              >
                {{ readableValue(row["youth_leader"]) }}
              </td>
              <td
                v-if="youth_number_column"
                class="border-b border-r p-2 text-nowrap"
              >
                {{ readableValue(row["youth_number"]) }}
              </td>
              <td
                v-if="shirt_size_column"
                class="border-b border-r p-2 text-nowrap"
              >
                {{ readableValue(row["shirt_size"]) }}
              </td>
              <td
                v-if="graduating_column"
                class="border-b border-r p-2 text-nowrap"
              >
                {{ readableValue(row["graduating"]) }}
              </td>
              <td
                v-if="launch_conf_column"
                class="border-b border-r p-2 text-nowrap"
              >
                {{ readableValue(row["launch_conf"]) }}
              </td>
              <td
                v-if="swimming_column"
                class="border-b border-r p-2 text-nowrap"
              >
                {{ readableValue(row["swimming"]) }}
              </td>
              <td
                v-if="allergies_column"
                class="border-b border-r p-2 text-nowrap"
              >
                {{ readableValue(row["allergies"]) }}
              </td>
              <td
                v-if="allergies_info_column"
                class="border-b border-r p-2 text-nowrap"
              >
                {{ readableValue(row["allergies_info"]) }}
              </td>
              <td
                v-if="medication_column"
                class="border-b border-r p-2 text-nowrap"
              >
                {{ readableValue(row["medication"]) }}
              </td>
              <td
                v-if="medication_info_column"
                class="border-b border-r p-2 text-nowrap"
              >
                {{ readableValue(row["medication_info"]) }}
              </td>
              <td
                v-if="eyu_cap_column"
                class="border-b border-r p-2 text-nowrap"
              >
                {{ readableValue(row["eyu_cap"]) }}
              </td>
              <td
                v-if="bw_25_shirt_column"
                class="border-b border-r p-2 text-nowrap"
              >
                {{ readableValue(row["bw_25_shirt"]) }}
              </td>
              <td
                v-if="bw_25_shirt_size_column"
                class="border-b border-r p-2 text-nowrap"
              >
                {{ readableValue(row["bw_25_shirt_size"]) }}
              </td>
              <td
                v-if="online_payment_column"
                class="border-b border-r p-2 text-nowrap"
              >
                {{ readableValue(row["online_payment"]) }}
              </td>
              <td
                v-if="acknowledgement_column"
                class="border-b border-r p-2 text-nowrap"
              >
                {{ readableValue(row["acknowledgement"]) }}
              </td>
              <td
                v-if="paid_column"
                :class="row['paid'] ? 'bg-green-900' : 'bg-red-900'"
                class="drop-shadow-lg drop-shadow-black z-10 sticky right-0 text-white border-b border-r p-2 text-nowrap"
              >
                {{ readableValue(row["paid"]) }}
              </td>
              <!-- <td v-for="field, idx in row" class="border-b border-r p-2 text-nowrap">
                {{
                    field === true
                    ? "yes"
                    : field === false
                    ? "no"
                    : field === undefined || field == null
                    ? "-"
                    : field
                }}
                </td> -->
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
